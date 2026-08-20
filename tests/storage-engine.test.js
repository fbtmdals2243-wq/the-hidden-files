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
      ministryIdentity:
        JSON.stringify({
          department:
            "Auror Office"
        }),
      playerRank:
        "Archive Officer",
      playerClearance:
        "Level II",
      worldDay:
        "14",
      ["caseStatus_CASE-005"]:
        "Solved",
      ["report_CASE-005"]:
        JSON.stringify({
          findings:
            "Preserve this report."
        }),
      dailyDutyCompleted_Day14:
        "true",
      themePreference:
        "unrelated-site-value"
    });


  const context = {
    localStorage,
    console,
    Date
  };


  vm.createContext(context);


  const source =
    fs.readFileSync(
      path.resolve(
        __dirname,
        "../portal/js/storage-engine.js"
      ),
      "utf8"
    ) +
    "\nthis.__MinistryStorage = MinistryStorage;";


  vm.runInContext(
    source,
    context,
    {
      filename:
        "portal/js/storage-engine.js"
    }
  );


  const storage =
    context.__MinistryStorage;


  assert.equal(
    localStorage.getItem(
      "ministrySaveSchemaVersion"
    ),
    "1"
  );
  pass("Existing localStorage save adopts schema version 1");


  assert.equal(
    storage.getItem(
      "ministryEmployeeId"
    ),
    "MOM-001117"
  );
  assert.equal(
    storage.getNumber(
      "worldDay"
    ),
    14
  );
  assert.equal(
    storage.getBoolean(
      "dailyDutyCompleted_Day14"
    ),
    true
  );
  assert.equal(
    storage.getJSON(
      "report_CASE-005"
    ).findings,
    "Preserve this report."
  );
  pass("Typed reads preserve existing employee progress");


  const snapshot =
    storage.createSnapshot();


  assert.equal(
    snapshot.schemaVersion,
    1
  );
  assert.equal(
    snapshot.employeeId,
    "MOM-001117"
  );
  assert.equal(
    typeof snapshot.checksum,
    "string"
  );
  assert.equal(
    snapshot.data.themePreference,
    undefined
  );
  assert.equal(
    snapshot.data["report_CASE-005"],
    localStorage.getItem(
      "report_CASE-005"
    )
  );
  pass("Snapshot contains game data and excludes unrelated site storage");


  localStorage.setItem(
    "ministryEmployeeId",
    "MOM-CHANGED"
  );
  localStorage.setItem(
    "worldDay",
    "99"
  );


  const restored =
    storage.restoreSnapshot(
      snapshot
    );


  assert.equal(
    restored.success,
    true
  );
  assert.equal(
    localStorage.getItem(
      "ministryEmployeeId"
    ),
    "MOM-001117"
  );
  assert.equal(
    localStorage.getItem(
      "worldDay"
    ),
    "14"
  );
  pass("Valid snapshot restores employee identity and World Day");


  const tamperedSnapshot =
    JSON.parse(
      JSON.stringify(snapshot)
    );

  tamperedSnapshot.data.worldDay =
    "500";


  const rejectedTamper =
    storage.restoreSnapshot(
      tamperedSnapshot
    );


  assert.equal(
    rejectedTamper.success,
    false
  );
  assert.equal(
    rejectedTamper.reason,
    "checksum-mismatch"
  );
  assert.equal(
    localStorage.getItem(
      "worldDay"
    ),
    "14"
  );
  pass("Checksum rejects altered save data before mutation");


  const missingChecksumSnapshot =
    JSON.parse(
      JSON.stringify(snapshot)
    );

  delete missingChecksumSnapshot.checksum;


  const rejectedMissingChecksum =
    storage.restoreSnapshot(
      missingChecksumSnapshot
    );


  assert.equal(
    rejectedMissingChecksum.success,
    false
  );
  assert.equal(
    rejectedMissingChecksum.reason,
    "invalid-checksum"
  );
  pass("Snapshot import requires a valid checksum");


  const mismatchedEmployeeSnapshot =
    JSON.parse(
      JSON.stringify(snapshot)
    );

  mismatchedEmployeeSnapshot.employeeId =
    "MOM-OTHER";


  const rejectedEmployeeMismatch =
    storage.restoreSnapshot(
      mismatchedEmployeeSnapshot
    );


  assert.equal(
    rejectedEmployeeMismatch.success,
    false
  );
  assert.equal(
    rejectedEmployeeMismatch.reason,
    "employee-id-mismatch"
  );
  pass("Snapshot metadata must match its employee record");


  const unknownKeySnapshot =
    JSON.parse(
      JSON.stringify(snapshot)
    );

  unknownKeySnapshot.data.externalToken =
    "must-not-import";

  unknownKeySnapshot.checksum =
    storage.calculateChecksum(
      unknownKeySnapshot.data
    );


  const rejectedUnknown =
    storage.restoreSnapshot(
      unknownKeySnapshot
    );


  assert.equal(
    rejectedUnknown.success,
    false
  );
  assert.equal(
    rejectedUnknown.reason,
    "unknown-key"
  );
  assert.equal(
    localStorage.getItem(
      "externalToken"
    ),
    null
  );
  pass("Snapshot import rejects unknown non-game keys");


  localStorage.setItem(
    "caseStatus_CASE-999",
    "Active"
  );


  const replaced =
    storage.restoreSnapshot(
      snapshot,
      {
        replace:
          true
      }
    );


  assert.equal(
    replaced.success,
    true
  );
  assert.equal(
    localStorage.getItem(
      "caseStatus_CASE-999"
    ),
    null
  );
  assert.equal(
    localStorage.getItem(
      "themePreference"
    ),
    "unrelated-site-value"
  );
  pass("Replace restore clears old game keys without deleting unrelated storage");


  const noRemote =
    await storage.pushToRemote();


  assert.equal(
    noRemote.success,
    false
  );
  assert.equal(
    noRemote.reason,
    "remote-not-configured"
  );
  pass("Cloud sync fails safely before an adapter is configured");


  let remoteSnapshot =
    null;


  const configured =
    storage.configureRemoteAdapter({

      async saveSnapshot(value){

        remoteSnapshot =
          value;
      },


      async loadSnapshot(){

        return remoteSnapshot;
      }

    });


  assert.equal(
    configured,
    true
  );


  assert.equal(
    storage.clearRemoteAdapter({}),
    false
  );
  assert.notEqual(
    storage.remoteAdapter,
    null
  );
  pass("An unrelated service cannot remove the active cloud adapter");


  const pushed =
    await storage.pushToRemote();


  assert.equal(
    pushed.success,
    true
  );
  assert.equal(
    remoteSnapshot.employeeId,
    "MOM-001117"
  );


  localStorage.setItem(
    "worldDay",
    "777"
  );


  const pulled =
    await storage.pullFromRemote();


  assert.equal(
    pulled.success,
    true
  );
  assert.equal(
    localStorage.getItem(
      "worldDay"
    ),
    "14"
  );
  pass("Remote adapter can save and restore the same validated snapshot");


  console.log(
    "\nStorage Engine test completed successfully."
  );
}


run().catch(
  error => {

    console.error(error);
    process.exitCode = 1;
  }
);
