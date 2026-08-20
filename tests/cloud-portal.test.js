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
      values.set(key, String(value));
    },


    removeItem(key){
      values.delete(key);
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
        "MOM-002222",
      ministryApplicantName:
        "Archive Tester",
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
        "15",
      ["caseStatus_CASE-005"]:
        "Solved"
    });

  const app = {
    innerHTML:
      ""
  };

  const activity = {
    downloaded:
      false,
    confirmations:
      0
  };


  const context = {
    app,
    localStorage,
    console,
    Date,
    Blob,
    URL: {
      createObjectURL(){
        return "blob:ministry-test";
      },
      revokeObjectURL(){}
    },
    confirm(){

      activity.confirmations +=
        1;

      return true;
    },
    document: {
      getElementById(){
        return null;
      },
      createElement(tagName){

        assert.equal(
          tagName,
          "a"
        );

        return {
          href:
            "",
          download:
            "",
          click(){
            activity.downloaded = true;
          }
        };
      }
    },
    MinistryCloud: {
      async initialize(){

        return {
          mode:
            "local",
          configured:
            false,
          authenticated:
            false,
          email:
            null,
          lastSyncAt:
            null
        };
      }
    },
    Player: {
      getEmployeeId(){

        return localStorage.getItem(
          "ministryEmployeeId"
        ) || "MOM-000000";
      }
    },
    World: {
      getDay(){

        return Number(
          localStorage.getItem(
            "worldDay"
          ) || 1
        );
      },
      getDate(){

        return (
          "Day " +
          this.getDay()
        );
      }
    },
    showDashboard(){}
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
    "\nthis.MinistryStorage = MinistryStorage;";

  const portalSource =
    fs.readFileSync(
      path.resolve(
        __dirname,
        "../portal/js/cloud-portal.js"
      ),
      "utf8"
    );


  vm.runInContext(
    storageSource,
    context,
    {
      filename:
        "portal/js/storage-engine.js"
    }
  );

  vm.runInContext(
    portalSource,
    context,
    {
      filename:
        "portal/js/cloud-portal.js"
    }
  );


  await context.showMinistryNetwork();

  assert.match(
    app.innerHTML,
    /MINISTRY RECORDS TRANSFER DESK/
  );
  assert.match(
    app.innerHTML,
    /MOM-002222/
  );
  assert.match(
    app.innerHTML,
    /DOWNLOAD EMPLOYEE ARCHIVE/
  );
  assert.match(
    app.innerHTML,
    /CLOUD OVERWRITE: DISABLED/
  );
  pass("Local Records Transfer Desk renders without a cloud project");


  const snapshot =
    context.downloadMinistryArchive();

  await Promise.resolve();

  assert.equal(
    activity.downloaded,
    true
  );
  assert.equal(
    snapshot.employeeId,
    "MOM-002222"
  );
  assert.equal(
    snapshot.data.worldDay,
    "15"
  );
  pass("Employee archive download contains the current World Day");


  localStorage.setItem(
    "worldDay",
    "99"
  );

  localStorage.setItem(
    "playerRank",
    "Temporary Change"
  );


  await context.importMinistryArchive({
    async text(){
      return JSON.stringify(snapshot);
    }
  });


  assert.equal(
    localStorage.getItem(
      "worldDay"
    ),
    "15"
  );
  assert.equal(
    localStorage.getItem(
      "playerRank"
    ),
    "Archive Officer"
  );
  assert.equal(
    activity.confirmations,
    1
  );
  pass("Approved archive restoration replaces the complete local record");


  const tampered =
    JSON.parse(
      JSON.stringify(snapshot)
    );

  tampered.data.worldDay =
    "700";


  await context.importMinistryArchive({
    async text(){
      return JSON.stringify(tampered);
    }
  });


  assert.equal(
    localStorage.getItem(
      "worldDay"
    ),
    "15"
  );
  assert.equal(
    activity.confirmations,
    1
  );
  assert.match(
    app.innerHTML,
    /failed its security checksum inspection/
  );
  pass("Modified archive files are rejected before confirmation or mutation");


  const portalIndex =
    fs.readFileSync(
      path.resolve(
        __dirname,
        "../portal/index.html"
      ),
      "utf8"
    );

  const storagePosition =
    portalIndex.indexOf(
      "js/storage-engine.js"
    );

  const configPosition =
    portalIndex.indexOf(
      "js/cloud-config.js"
    );

  const cloudPosition =
    portalIndex.indexOf(
      "js/cloud-engine.js"
    );

  const playerPosition =
    portalIndex.indexOf(
      "js/player-engine.js"
    );


  assert.ok(
    storagePosition >= 0 &&
    configPosition > storagePosition &&
    cloudPosition > configPosition &&
    playerPosition > cloudPosition
  );
  assert.match(
    portalIndex,
    /js\/cloud-portal\.js/
  );
  pass("Portal loads cloud configuration safely after storage and before player use");


  console.log(
    "\nCloud Portal test completed successfully."
  );
}


run().catch(
  error => {

    console.error(error);
    process.exitCode = 1;
  }
);
