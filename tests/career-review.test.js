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
    get length(){ return values.size; },
    key(index){ return Array.from(values.keys())[index] || null; },
    getItem(key){ return values.has(key) ? values.get(key) : null; },
    setItem(key, value){ values.set(key, String(value)); },
    removeItem(key){ values.delete(key); }
  };
}


function pass(message){
  console.log("PASS:", message);
}


const localStorage =
  createStorage({
    ministryApplicantName:
      "Career Officer",
    ministryEmployeeId:
      "MOM-025025",
    worldDay:
      "16",
    playerRank:
      "Archive Officer",
    playerClearance:
      "Level II",
    playerQualifications:
      JSON.stringify([
        {
          id: "QUAL-CONTINUITY-I",
          title: "Continuity Records Handling · Grade I"
        }
      ]),
    dailyDutyCompletedCount:
      "6",
    ministryServicePoints:
      "12",
    ["caseStatus_CASE-006"]:
      "Solved"
  });


const app = { innerHTML: "" };


const context = {
  app,
  localStorage,
  console,
  Date,
  showDashboard(){},
  showOwlMail(){},
  renderMinistryDocument(document){
    return `<article>${document.title}${document.body}</article>`;
  }
};


vm.createContext(context);


[
  "portal/js/storage-engine.js",
  "portal/js/player-engine.js",
  "portal/js/world-engine.js",
  "portal/js/career-review.js"
].forEach(
  scriptPath => {

    let source =
      fs.readFileSync(
        path.join(repositoryRoot, scriptPath),
        "utf8"
      );

    if(scriptPath.endsWith("storage-engine.js")){
      source += "\nthis.__MinistryStorage = MinistryStorage;";
    }

    if(scriptPath.endsWith("player-engine.js")){
      source += "\nthis.__Player = Player;";
    }

    if(scriptPath.endsWith("world-engine.js")){
      source += "\nthis.__World = World;";
    }

    if(scriptPath.endsWith("career-review.js")){
      source += "\nthis.__MinistryCareerReview = MinistryCareerReview;";
    }

    vm.runInContext(source, context, { filename: scriptPath });
  }
);


const MinistryStorage = context.__MinistryStorage;
const Player = context.__Player;
const World = context.__World;
const MinistryCareerReview = context.__MinistryCareerReview;


assert.equal(
  MinistryCareerReview.isEligible(),
  false
);
pass("Level III review remains locked before Day 17");


World.setDay(17);

assert.equal(
  MinistryCareerReview.isEligible(),
  true
);

context.showCareerReview();
assert.match(app.innerHTML, /Directive Required/);
pass("Eligible employee must read the Personnel Board directive");


localStorage.setItem("mailRead_MAIL-015", "true");

const incorrect =
  MinistryCareerReview.submitAnswer(
    "SCENARIO-INTEGRITY",
    "merge"
  );

assert.equal(incorrect.success, false);
assert.equal(
  MinistryCareerReview.getProgress()
    .completedScenarios.length,
  0
);
assert.equal(Player.getClearance(), "Level II");
pass("Incorrect review judgment is retry-safe");


assert.equal(
  MinistryCareerReview.submitAnswer(
    "SCENARIO-INTEGRITY",
    "preserve-both"
  ).success,
  true
);

assert.equal(
  MinistryCareerReview.submitAnswer(
    "SCENARIO-AUTHORITY",
    "escalate"
  ).success,
  true
);

const completed =
  MinistryCareerReview.submitAnswer(
    "SCENARIO-PEOPLE",
    "protect-review"
  );

assert.equal(completed.completed, true);
assert.equal(Player.getRank(), "Senior Archive Officer");
assert.equal(Player.getClearance(), "Level III");
pass("Approved review grants Senior Archive Officer and Level III");


const duplicate =
  MinistryCareerReview.submitAnswer(
    "SCENARIO-PEOPLE",
    "protect-review"
  );

assert.equal(duplicate.completed, true);
assert.equal(
  MinistryCareerReview.getProgress()
    .completedScenarios.length,
  3
);
pass("Completed review cannot award duplicate progress");


context.showCareerReviewCertificate();
assert.match(app.innerHTML, /Level III Appointment Certificate/);
assert.match(app.innerHTML, /Senior Archive Officer/);

const snapshot =
  MinistryStorage.createSnapshot();

assert.equal(
  snapshot.data[
    "careerReviewCompleted_REVIEW-LEVEL-III"
  ],
  "true"
);
assert.equal(snapshot.data.playerRank, "Senior Archive Officer");
assert.equal(snapshot.data.playerClearance, "Level III");
pass("Career milestone is preserved in employee archives");


const portalIndex =
  fs.readFileSync(
    path.join(repositoryRoot, "portal/index.html"),
    "utf8"
  );

assert.ok(
  portalIndex.indexOf("js/career-review.js") >
    portalIndex.indexOf("js/training.js") &&
  portalIndex.indexOf("js/personnel.js") >
    portalIndex.indexOf("js/career-review.js")
);
pass("Portal loads Career Review before Personnel and Dashboard");


console.log("\nCareer Review test completed successfully.");
