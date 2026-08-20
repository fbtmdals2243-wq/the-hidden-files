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
      "Final Officer",
    ministryEmployeeId:
      "MOM-028028",
    playerAssignedDepartment:
      "Archive Division",
    playerSpecialAssignment:
      "Continuity Liaison",
    playerRank:
      "Senior Archive Officer",
    playerClearance:
      "Level III",
    playerQualifications:
      JSON.stringify([
        {
          id: "QUAL-CONTINUITY-I",
          title: "Continuity Records Handling · Grade I"
        }
      ]),
    worldDay:
      "20",
    firstStoryArcCompleted:
      "true",
    sealedCompatibilityConditionOne:
      "true",
    sealedCompatibilityConditionTwo:
      "true",
    sealedCompatibilityStage:
      "2",
    ["caseStatus_CASE-007"]:
      "Solved",
    ["mailRead_MAIL-017"]:
      "true"
  });


const app = { innerHTML: "" };

const fields = {
  reportFindings: {
    value:
      "The records match protective intent without matching identity."
  },
  reportRecommendation: {
    value:
      "Preserve both identities and open a narrow lawful review."
  }
};

const alerts = [];


const context = {
  app,
  localStorage,
  console,
  Date,
  alert(message){ alerts.push(message); },
  document: {
    getElementById(id){ return fields[id]; }
  },
  renderMinistryDocument(document){
    return `<article>${document.title}${document.body}</article>`;
  },
  showDashboard(){},
  showArchiveCabinet(){},
  showCaseList(){},
  showOwlMail(){}
};


vm.createContext(context);


[
  "portal/js/storage-engine.js",
  "portal/js/case-data.js",
  "portal/js/player-engine.js",
  "portal/js/world-engine.js",
  "portal/js/final-review.js",
  "portal/js/case-engine.js",
  "portal/js/owl-mail.js",
  "portal/js/personnel.js"
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
    if(scriptPath.endsWith("final-review.js")){
      source += "\nthis.__MinistryFinalReview = MinistryFinalReview;";
    }

    vm.runInContext(
      source,
      context,
      { filename: scriptPath }
    );
  }
);


const MinistryStorage = context.__MinistryStorage;
const Player = context.__Player;
const World = context.__World;
const MinistryFinalReview = context.__MinistryFinalReview;


const inquiry =
  context.getOwlMails()
    .find(mail => mail.id === "MAIL-018");

assert.ok(inquiry);
assert.match(inquiry.body, /IDENTITY MATCH:\nNOT REQUESTED/);

context.openOwlMail("MAIL-018");
context.submitReport("CASE-008");

assert.equal(Player.getCaseStatus("CASE-008"), "Under Review");
assert.equal(localStorage.getItem("case008SubmittedDay"), "20");
assert.ok(localStorage.getItem("report_CASE-008"));
pass("CASE-008 opens and records its review day through the real case engine");


World.setDay(21);

const determination =
  context.getOwlMails()
    .find(mail => mail.id === "MAIL-019");

assert.ok(determination);
assert.match(determination.body, /PROTECTIVE INTENT CORRESPONDENCE/);
assert.match(determination.body, /NOT REQUIRED · NOT ESTABLISHED/);

context.openOwlMail("MAIL-019");

assert.equal(Player.getCaseStatus("CASE-008"), "Solved");
assert.equal(
  localStorage.getItem("sealedCompatibilityConditionThree"),
  "true"
);
pass("CASE-008 confirms protection correspondence without merging identities");


const incorrect =
  MinistryFinalReview.submitAnswer(
    "SCENARIO-SEPARATE-IDENTITIES",
    "replace-current"
  );

assert.equal(incorrect.success, false);
assert.equal(
  MinistryFinalReview.getProgress().completedScenarios.length,
  0
);
assert.equal(Player.getClearance(), "Level III");

assert.equal(
  MinistryFinalReview.submitAnswer(
    "SCENARIO-SEPARATE-IDENTITIES",
    "preserve-two"
  ).success,
  true
);
assert.equal(
  MinistryFinalReview.submitAnswer(
    "SCENARIO-DELETION-ORDER",
    "suspend-preserve"
  ).success,
  true
);
assert.equal(
  MinistryFinalReview.submitAnswer(
    "SCENARIO-OMEGA-WARRANT",
    "open-log-return"
  ).completed,
  true
);

assert.equal(Player.getRank(), "Principal Archive Officer");
assert.equal(Player.getClearance(), "Level IV");
assert.equal(Player.hasQualification("QUAL-CONTINUITY-II"), true);
assert.equal(localStorage.getItem("continuityOmegaWarrant"), "true");
pass("Final Board review is retry-safe and grants narrow Level IV authority");


World.setDay(22);

const warrant =
  context.getOwlMails()
    .find(mail => mail.id === "MAIL-020");

assert.ok(warrant);
assert.match(warrant.body, /does not grant general Level V clearance/i);

context.openOwlMail("MAIL-020");

fields.reportFindings.value =
  "MOM-000117 was Rowan Mercer, the first deleted identity.";
fields.reportRecommendation.value =
  "Restore Rowan's name while retaining the current officer's identity.";

context.submitReport("CASE-ZERO");

assert.equal(Player.getCaseStatus("CASE-ZERO"), "Under Review");
assert.equal(localStorage.getItem("caseZeroSubmittedDay"), "22");
assert.ok(localStorage.getItem("report_CASE-ZERO"));
pass("CASE-ZERO submission uses the real report and review flow");


World.setDay(23);

const restored =
  context.getOwlMails()
    .find(mail => mail.id === "MAIL-021");

assert.ok(restored);
assert.match(restored.body, /NAME:\nROWAN MERCER/);
assert.match(restored.body, /You are not Rowan Mercer/);

context.openOwlMail("MAIL-021");

assert.equal(Player.getCaseStatus("CASE-ZERO"), "Solved");
assert.equal(
  localStorage.getItem("historicalAppointeeIdentity"),
  "Rowan Mercer"
);
assert.equal(localStorage.getItem("firstDeletionRestored"), "true");
assert.equal(localStorage.getItem("finalStoryArcCompleted"), "true");
pass("CASE-ZERO restores Rowan Mercer as a separate historical appointee");


context.openOmegaEpilogue();

assert.equal(Player.getCaseStatus("CASE-OMEGA"), "Solved");
assert.equal(localStorage.getItem("caseOmegaViewed"), "true");
assert.equal(localStorage.getItem("caseOmegaViewedDay"), "23");
assert.match(app.innerHTML, /TWO LAWFUL PEOPLE/);
assert.match(app.innerHTML, /There will be work tomorrow/);
pass("CASE-OMEGA closes the narrative while preserving continuing service");


context.showPersonnelRecord();
assert.match(app.innerHTML, /Rowan Mercer · MOM-000117/);
assert.match(app.innerHTML, /Identity Relation:\nSEPARATE PEOPLE/);
assert.match(app.innerHTML, /Current Employment:\nACTIVE · CONTINUING SERVICE/);

const snapshot =
  MinistryStorage.createSnapshot();

assert.equal(snapshot.data.finalStoryArcCompleted, "true");
assert.equal(snapshot.data.historicalAppointeeIdentity, "Rowan Mercer");
assert.equal(
  snapshot.data["finalReviewCompleted_REVIEW-LEVEL-IV"],
  "true"
);
assert.equal(snapshot.data.caseOmegaViewed, "true");
pass("Final career, identity, case, and epilogue state survives employee backup");


const portalIndex =
  fs.readFileSync(
    path.join(repositoryRoot, "portal/index.html"),
    "utf8"
  );

assert.ok(
  portalIndex.indexOf("js/final-review.js") >
    portalIndex.indexOf("js/career-review.js") &&
  portalIndex.indexOf("js/relationship.js") >
    portalIndex.indexOf("js/final-review.js")
);

const archiveIndex =
  fs.readFileSync(
    path.join(repositoryRoot, "index.html"),
    "utf8"
  );

assert.match(archiveIndex, /MINISTRY EMPLOYEE PORTAL/);
assert.match(
  fs.readFileSync(
    path.join(repositoryRoot, "portal/js/case-engine.js"),
    "utf8"
  ),
  /OPEN ARCHIVE OS/
);
pass("Portal and future Archive OS expose a two-way navigation path");


assert.deepEqual(alerts, []);

console.log("\nFinal narrative arc test completed successfully.");
