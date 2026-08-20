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
    ministryApplicantName: "Level Three Officer",
    ministryEmployeeId: "MOM-007007",
    worldDay: "18",
    playerRank: "Senior Archive Officer",
    playerClearance: "Level III",
    playerQualifications: JSON.stringify([
      {
        id: "QUAL-CONTINUITY-I",
        title: "Continuity Records Handling · Grade I"
      }
    ]),
    dailyDutyCompletedCount: "7",
    ministryServicePoints: "18",
    ["caseStatus_CASE-006"]: "Solved",
    ["caseStatus_CASE-007"]: "Active",
    ["careerReviewCompleted_REVIEW-LEVEL-III"]: "true",
    ["mailRead_MAIL-016"]: "true",
    sealedCompatibilityConditionOne: "true",
    sealedCompatibilityStage: "1"
  });


const app = { innerHTML: "" };


const fields = {
  reportFindings: {
    value: "The memory contained a dormant appointment trigger."
  },
  reportRecommendation: {
    value: "Preserve the vial and keep historical and current identities separate."
  }
};


const context = {
  app,
  localStorage,
  console,
  Date,
  alert(){},
  document: {
    getElementById(id){ return fields[id]; }
  },
  renderMinistryDocument(document){
    return `<article>${document.title}${document.body}</article>`;
  },
  showDashboard(){}
};


vm.createContext(context);


[
  "portal/js/storage-engine.js",
  "portal/js/case-data.js",
  "portal/js/player-engine.js",
  "portal/js/world-engine.js",
  "portal/js/daily-work.js",
  "portal/js/career-review.js",
  "portal/js/case-engine.js",
  "portal/js/owl-mail.js"
].forEach(
  scriptPath => {
    vm.runInContext(
      fs.readFileSync(
        path.join(repositoryRoot, scriptPath),
        "utf8"
      ),
      context,
      { filename: scriptPath }
    );
  }
);


context.submitReport("CASE-007");

assert.equal(
  localStorage.getItem("caseStatus_CASE-007"),
  "Under Review"
);
assert.equal(
  localStorage.getItem("case007SubmittedDay"),
  "18"
);
assert.ok(localStorage.getItem("report_CASE-007"));
pass("CASE-007 submission records its report and review day");


vm.runInContext("World.setDay(19);", context);

const reviewMail =
  context.getOwlMails()
    .find(mail => mail.id === "MAIL-017");

assert.ok(reviewMail);
assert.match(reviewMail.body, /MNEMONIC RESPONSE CORRESPONDENCE/);
assert.match(reviewMail.body, /IDENTITY MATCH:\nNOT ESTABLISHED/);
assert.match(reviewMail.body, /COMPONENT 3:\nSEALED/);
pass("CASE-007 review reveals only the second compatibility component");


context.openOwlMail("MAIL-017");

assert.equal(
  localStorage.getItem("caseStatus_CASE-007"),
  "Solved"
);
assert.equal(
  localStorage.getItem("sealedCompatibilityStage"),
  "2"
);
assert.equal(
  localStorage.getItem("sealedCompatibilityConditionTwo"),
  "true"
);
assert.equal(
  localStorage.getItem("sealedCompatibilityConditionOne"),
  "true"
);
assert.ok(localStorage.getItem("caseCompleted_CASE-007"));
pass("CASE-007 review preserves both compatibility milestones");


console.log("\nCASE-007 submission test completed successfully.");
