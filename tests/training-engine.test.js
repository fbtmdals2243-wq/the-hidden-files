const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");


const repositoryRoot =
  path.resolve(__dirname, "..");


function createStorage(initialValues = {}){

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


const localStorage =
  createStorage({
    ministryApplicantName:
      "Training Officer",
    ministryEmployeeId:
      "MOM-024024",
    worldDay:
      "15",
    ["caseStatus_CASE-006"]:
      "Solved"
  });


const app = {
  innerHTML:
    ""
};


const context = {
  app,
  localStorage,
  console,
  Date,

  showDashboard(){},
  showOwlMail(){},
  showPersonnelRecord(){},

  renderMinistryDocument(document){

    return `
      <article>
        ${document.title}
        ${document.body}
      </article>
    `;
  }
};


vm.createContext(context);


const scripts = [
  "portal/js/storage-engine.js",
  "portal/js/player-engine.js",
  "portal/js/world-engine.js",
  "portal/js/training.js"
];


scripts.forEach(
  scriptPath => {

    let source =
      fs.readFileSync(
        path.join(
          repositoryRoot,
          scriptPath
        ),
        "utf8"
      );


    if(
      scriptPath.endsWith(
        "storage-engine.js"
      )
    ){

      source +=
        "\nthis.__MinistryStorage = MinistryStorage;";
    }


    if(
      scriptPath.endsWith(
        "player-engine.js"
      )
    ){

      source +=
        "\nthis.__Player = Player;";
    }


    if(
      scriptPath.endsWith(
        "world-engine.js"
      )
    ){

      source +=
        "\nthis.__World = World;";
    }


    if(
      scriptPath.endsWith(
        "training.js"
      )
    ){

      source +=
        "\nthis.__MinistryTraining = MinistryTraining;";
    }


    vm.runInContext(
      source,
      context,
      {
        filename:
          scriptPath
      }
    );
  }
);


const MinistryStorage =
  context.__MinistryStorage;

const Player =
  context.__Player;

const World =
  context.__World;

const MinistryTraining =
  context.__MinistryTraining;


assert.equal(
  MinistryTraining.isAvailable(),
  false
);
assert.equal(
  MinistryTraining.submitAnswer(
    "MODULE-IDENTITY",
    "preserve"
  ).reason,
  "course-unavailable"
);
pass("Training remains locked before World Day 16");


World.setDay(16);

assert.equal(
  MinistryTraining.isAvailable(),
  true
);

context.showTrainingDesk();
assert.match(
  app.innerHTML,
  /Training Directive Required/
);
pass("Assigned course requires the Owl Mail directive");


localStorage.setItem(
  "mailRead_MAIL-014",
  "true"
);

context.showTrainingDesk();
assert.match(
  app.innerHTML,
  /Identity and Authorization/
);
assert.match(
  app.innerHTML,
  /MODULE: 1 \/ 3/
);


const incorrect =
  MinistryTraining.submitAnswer(
    "MODULE-IDENTITY",
    "merge"
  );

assert.equal(
  incorrect.success,
  false
);
assert.equal(
  incorrect.reason,
  "incorrect-response"
);
assert.equal(
  MinistryTraining.getProgress()
    .completedModules.length,
  0
);
assert.equal(
  MinistryTraining.getTrainingCredits(),
  0
);
pass("Incorrect training answers do not corrupt employee progress");


const firstResult =
  MinistryTraining.submitAnswer(
    "MODULE-IDENTITY",
    "preserve"
  );

assert.equal(
  firstResult.success,
  true
);
assert.equal(
  firstResult.completed,
  false
);
assert.equal(
  MinistryTraining.getTrainingCredits(),
  1
);


const duplicateResult =
  MinistryTraining.submitAnswer(
    "MODULE-IDENTITY",
    "preserve"
  );

assert.equal(
  duplicateResult.reason,
  "module-out-of-order"
);
assert.equal(
  MinistryTraining.getTrainingCredits(),
  1
);
pass("Completed modules cannot award duplicate training credits");


assert.equal(
  MinistryTraining.submitAnswer(
    "MODULE-CONFLICT",
    "dual-preserve"
  ).success,
  true
);


const finalResult =
  MinistryTraining.submitAnswer(
    "MODULE-CLEARANCE",
    "request"
  );

assert.equal(
  finalResult.success,
  true
);
assert.equal(
  finalResult.completed,
  true
);
assert.equal(
  MinistryTraining.isCompleted(),
  true
);
assert.equal(
  MinistryTraining.getTrainingCredits(),
  3
);
assert.equal(
  Player.hasQualification(
    "QUAL-CONTINUITY-I"
  ),
  true
);
assert.equal(
  Player.getQualifications().length,
  1
);
pass("Three approved modules issue one permanent qualification");


context.showTrainingDesk();
assert.match(
  app.innerHTML,
  /Employee Qualification Certificate/
);
assert.match(
  app.innerHTML,
  /FUTURE LEVEL III REVIEW: ELIGIBLE/
);
pass("Completed training renders an active employee certificate");


const snapshot =
  MinistryStorage.createSnapshot();

assert.equal(
  snapshot.data[
    "trainingCompleted_TRAIN-CONTINUITY-I"
  ],
  "true"
);
assert.ok(
  snapshot.data[
    "trainingProgress_TRAIN-CONTINUITY-I"
  ]
);
assert.ok(
  snapshot.data.playerQualifications
);
assert.equal(
  snapshot.data.ministryTrainingCredits,
  "3"
);
pass("Training progress and qualifications are included in employee archives");


const portalIndex =
  fs.readFileSync(
    path.resolve(
      __dirname,
      "../portal/index.html"
    ),
    "utf8"
  );

const playerPosition =
  portalIndex.indexOf(
    "js/player-engine.js"
  );

const worldPosition =
  portalIndex.indexOf(
    "js/world-engine.js"
  );

const dailyWorkPosition =
  portalIndex.indexOf(
    "js/daily-work.js"
  );

const trainingPosition =
  portalIndex.indexOf(
    "js/training.js"
  );

const personnelPosition =
  portalIndex.indexOf(
    "js/personnel.js"
  );


assert.ok(
  playerPosition >= 0 &&
  worldPosition > playerPosition &&
  dailyWorkPosition > worldPosition &&
  trainingPosition > dailyWorkPosition &&
  personnelPosition > trainingPosition
);
pass("Portal loads Training after employee and world engines and before personnel use");


console.log(
  "\nTraining Engine test completed successfully."
);
