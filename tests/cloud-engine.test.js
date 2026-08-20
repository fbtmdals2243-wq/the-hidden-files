const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");


function createLocalStorage(initialValues = {}){

  const values =
    new Map(
      Object.entries(initialValues)
        .map(
          ([key, value]) =>
            [key, String(value)]
        )
    );


  return {

    get length(){
      return values.size;
    },


    key(index){

      return (
        Array.from(
          values.keys()
        )[index] ||
        null
      );
    },


    getItem(key){

      return values.has(key)
        ? values.get(key)
        : null;
    },


    setItem(key, value){

      values.set(
        key,
        String(value)
      );
    },


    removeItem(key){
      values.delete(key);
    }

  };
}


function createFakeClient(){

  let session =
    null;

  let savedRow =
    null;

  const listeners = [];


  function notify(event){

    listeners.forEach(
      listener =>
        listener(
          event,
          session
        )
    );
  }


  return {

    auth: {

      async getSession(){

        return {
          data: {
            session
          },
          error:
            null
        };
      },


      async signUp(){

        return {
          data: {
            user: {
              id:
                "user-confirming"
            },
            session:
              null
          },
          error:
            null
        };
      },


      async signInWithPassword(credentials){

        session = {
          user: {
            id:
              "user-001",
            email:
              credentials.email
          }
        };

        notify(
          "SIGNED_IN"
        );

        return {
          data: {
            session
          },
          error:
            null
        };
      },


      async signOut(options){

        assert.equal(
          options.scope,
          "local"
        );

        session =
          null;

        notify(
          "SIGNED_OUT"
        );

        return {
          error:
            null
        };
      },


      onAuthStateChange(listener){

        listeners.push(
          listener
        );

        return {
          data: {
            subscription: {
              unsubscribe(){}
            }
          }
        };
      }

    },


    from(tableName){

      assert.equal(
        tableName,
        "ministry_player_saves"
      );


      return {

        async upsert(row, options){

          assert.equal(
            options.onConflict,
            "user_id"
          );

          assert.equal(
            row.user_id,
            "user-001"
          );

          savedRow =
            JSON.parse(
              JSON.stringify(row)
            );

          return {
            error:
              null
          };
        },


        select(columns){

          assert.equal(
            columns,
            "snapshot, updated_at"
          );

          return {
            eq(column, value){

              assert.equal(
                column,
                "user_id"
              );

              assert.equal(
                value,
                "user-001"
              );

              return {
                async maybeSingle(){

                  return {
                    data:
                      savedRow
                        ? {
                            snapshot:
                              savedRow.snapshot,
                            updated_at:
                              savedRow.updated_at
                          }
                        : null,
                    error:
                      null
                  };
                }
              };
            }
          };
        }

      };
    },


    getSavedRow(){
      return savedRow;
    }

  };
}


function pass(message){

  console.log(
    "PASS:",
    message
  );
}


async function run(){

  const localStorage =
    createLocalStorage({
      ministryEmployeeId:
        "MOM-001117",
      ministryApplicantName:
        "Cloud Officer",
      ministryIdentity:
        JSON.stringify({
          department:
            "Archive Division"
        }),
      playerRank:
        "Archive Officer",
      playerClearance:
        "Level II",
      worldDay:
        "12",
      ["caseStatus_CASE-005"]:
        "Solved",
      ["report_CASE-005"]:
        JSON.stringify({
          findings:
            "Cloud preservation test."
        })
    });


  const context = {
    localStorage,
    console,
    Date,
    window: {
      MINISTRY_CLOUD_CONFIG: {
        enabled:
          false,
        url:
          "",
        publishableKey:
          ""
      }
    }
  };


  vm.createContext(context);


  const storageSource =
    fs.readFileSync(
      path.resolve(
        __dirname,
        "../portal/js/storage-engine.js"
      ),
      "utf8"
    ) +
    "\nthis.__MinistryStorage = MinistryStorage;";

  const cloudSource =
    fs.readFileSync(
      path.resolve(
        __dirname,
        "../portal/js/cloud-engine.js"
      ),
      "utf8"
    ) +
    "\nthis.__MinistryCloud = MinistryCloud;";


  vm.runInContext(
    storageSource,
    context,
    {
      filename:
        "portal/js/storage-engine.js"
    }
  );

  vm.runInContext(
    cloudSource,
    context,
    {
      filename:
        "portal/js/cloud-engine.js"
    }
  );


  const storage =
    context.__MinistryStorage;

  const cloud =
    context.__MinistryCloud;


  await cloud.initialize();

  assert.equal(
    cloud.getStatus().mode,
    "local"
  );
  assert.equal(
    storage.remoteAdapter,
    null
  );
  assert.equal(
    localStorage.getItem(
      "worldDay"
    ),
    "12"
  );
  pass("Disabled cloud configuration preserves local-only play");


  cloud.resetForTesting();


  const fakeClient =
    createFakeClient();

  const validConfig = {
    enabled:
      true,
    url:
      "https://example.supabase.co",
    publishableKey:
      "publishable-key-for-safe-browser-testing"
  };


  await cloud.initialize({
    client:
      fakeClient,
    config:
      validConfig
  });


  assert.equal(
    cloud.getStatus().mode,
    "ready"
  );
  assert.equal(
    cloud.getStatus().configured,
    true
  );
  pass("Configured cloud client starts without overwriting local data");


  const weakPassword =
    await cloud.signIn(
      "officer@example.com",
      "short"
    );

  assert.equal(
    weakPassword.success,
    false
  );
  assert.equal(
    weakPassword.reason,
    "invalid-password"
  );
  pass("Account input validation blocks weak credentials before network use");


  const registration =
    await cloud.signUp(
      "Officer@Example.com",
      "secure-passphrase"
    );

  assert.equal(
    registration.success,
    true
  );
  assert.equal(
    registration.requiresEmailConfirmation,
    true
  );
  assert.equal(
    cloud.isAuthenticated(),
    false
  );
  pass("Registration supports email confirmation without inventing a session");


  const login =
    await cloud.signIn(
      "Officer@Example.com",
      "secure-passphrase"
    );

  assert.equal(
    login.success,
    true
  );
  assert.equal(
    cloud.getStatus().email,
    "officer@example.com"
  );
  assert.notEqual(
    storage.remoteAdapter,
    null
  );
  pass("Authenticated employee session activates the cloud adapter");


  const pushed =
    await storage.pushToRemote();

  assert.equal(
    pushed.success,
    true
  );
  assert.equal(
    fakeClient.getSavedRow()
      .employee_id,
    "MOM-001117"
  );
  assert.equal(
    fakeClient.getSavedRow()
      .user_id,
    "user-001"
  );
  pass("Cloud save is written against the authenticated user ID");


  localStorage.setItem(
    "worldDay",
    "88"
  );
  localStorage.setItem(
    "playerRank",
    "Changed Locally"
  );


  const pulled =
    await storage.pullFromRemote({
      replace:
        true
    });

  assert.equal(
    pulled.success,
    true
  );
  assert.equal(
    localStorage.getItem(
      "worldDay"
    ),
    "12"
  );
  assert.equal(
    localStorage.getItem(
      "playerRank"
    ),
    "Archive Officer"
  );
  assert.equal(
    JSON.parse(
      localStorage.getItem(
        "report_CASE-005"
      )
    ).findings,
    "Cloud preservation test."
  );
  pass("Cloud restore recovers World Day, career, and old reports together");


  const signedOut =
    await cloud.signOut();

  assert.equal(
    signedOut.success,
    true
  );
  assert.equal(
    cloud.isAuthenticated(),
    false
  );
  assert.equal(
    storage.remoteAdapter,
    null
  );
  assert.equal(
    localStorage.getItem(
      "ministryEmployeeId"
    ),
    "MOM-001117"
  );
  pass("Local sign-out disconnects cloud access without deleting employee progress");


  const schema =
    fs.readFileSync(
      path.resolve(
        __dirname,
        "../supabase/schema.sql"
      ),
      "utf8"
    );

  assert.match(
    schema,
    /enable row level security/i
  );
  assert.match(
    schema,
    /\(select auth\.uid\(\)\) = user_id/g
  );
  assert.match(
    schema,
    /revoke all[\s\S]*from anon/i
  );
  pass("Database contract enforces per-user RLS and denies anonymous access");


  console.log(
    "\nCloud Engine test completed successfully."
  );
}


run().catch(
  error => {

    console.error(error);
    process.exitCode = 1;
  }
);
