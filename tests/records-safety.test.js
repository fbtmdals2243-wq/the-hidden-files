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
        Array.from(values.keys())[index] ||
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


const localStorage =
  createLocalStorage({
    ministrySaveSchemaVersion:
      "1",
    ministryEmployeeId:
      "MOM-004700",
    ministryIdentity:
      JSON.stringify({
        department:
          "Archive Division"
      }),
    playerRank:
      "Principal Archive Officer",
    playerClearance:
      "Level IV",
    worldDay:
      "27",
    caseCompleted_CASE_OMEGA:
      "true",
    report_CASE_OMEGA:
      JSON.stringify({
        findings:
          "Continuing service authorized."
      }),
    unrelatedPreference:
      "preserve-me"
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
  "\nthis.__Storage = MinistryStorage;";


vm.runInContext(
  source,
  context,
  {
    filename:
      "portal/js/storage-engine.js"
  }
);


const storage =
  context.__Storage;


assert.equal(
  localStorage.getItem(
    "ministrySaveSchemaVersion"
  ),
  "2"
);
assert.equal(
  localStorage.getItem(
    "worldDay"
  ),
  "27"
);
pass("Schema version 1 employee records migrate without losing progress");


const currentSnapshot =
  storage.createSnapshot();

const currentSummary =
  storage.getSnapshotSummary(
    currentSnapshot
  );


assert.equal(
  currentSummary.valid,
  true
);
assert.equal(
  currentSummary.employeeId,
  "MOM-004700"
);
assert.equal(
  currentSummary.worldDay,
  27
);
assert.equal(
  currentSummary.rank,
  "Principal Archive Officer"
);
assert.equal(
  currentSummary.completedCases,
  1
);
pass("Record summary exposes safe restore metadata without changing progress");


const earlierData = {
  ...currentSnapshot.data,
  worldDay:
    "23",
  playerRank:
    "Senior Archive Officer",
  playerClearance:
    "Level III"
};

const earlierSnapshot = {
  ...currentSnapshot,
  createdAt:
    new Date(
      Date.now() - 86400000
    ).toISOString(),
  data:
    earlierData,
  checksum:
    storage.calculateChecksum(
      earlierData
    )
};


const comparison =
  storage.compareSnapshots(
    currentSnapshot,
    earlierSnapshot
  );


assert.equal(
  comparison.valid,
  true
);
assert.equal(
  comparison.relation,
  "local-ahead"
);
pass("Restore comparison warns when the current device is further ahead");


const restoredEarlier =
  storage.restoreSnapshot(
    earlierSnapshot,
    {
      replace:
        true,
      createCheckpoint:
        true,
      checkpointReason:
        "records-safety-test"
    }
  );


assert.equal(
  restoredEarlier.success,
  true
);
assert.equal(
  restoredEarlier.checkpointCreated,
  true
);
assert.equal(
  localStorage.getItem("worldDay"),
  "23"
);


const checkpoint =
  storage.getRecoveryCheckpoint();


assert.ok(checkpoint);
assert.equal(
  checkpoint.snapshot.data.worldDay,
  "27"
);
assert.equal(
  storage.createSnapshot()
    .data.ministryRecoveryCheckpoint,
  undefined
);
pass("Destructive restore preserves one non-recursive recovery checkpoint");


const recovered =
  storage.restoreRecoveryCheckpoint();


assert.equal(
  recovered.success,
  true
);
assert.equal(
  localStorage.getItem("worldDay"),
  "27"
);
assert.equal(
  localStorage.getItem("playerRank"),
  "Principal Archive Officer"
);
assert.equal(
  storage.getRecoveryCheckpoint(),
  null
);
pass("Undo restore returns the complete prior employee record exactly once");


storage.createRecoveryCheckpoint(
  "before-local-deletion"
);

const erased =
  storage.eraseLocalRecord();


assert.equal(
  erased.success,
  true
);
assert.equal(
  localStorage.getItem(
    "ministryEmployeeId"
  ),
  null
);
assert.equal(
  localStorage.getItem(
    "ministryRecoveryCheckpoint"
  ),
  null
);
assert.equal(
  localStorage.getItem(
    "unrelatedPreference"
  ),
  "preserve-me"
);
assert.equal(
  localStorage.getItem(
    "ministrySaveSchemaVersion"
  ),
  "2"
);
pass("Local deletion removes game and recovery data while preserving unrelated storage");


console.log(
  "\nRecords Safety test completed successfully."
);
