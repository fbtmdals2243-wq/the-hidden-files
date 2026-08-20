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
      "Test Officer",
    ministryEmployeeId:
      "MOM-006006",
    worldDay:
      "14",
    firstStoryArcCompleted:
      "true",
    dailyDutyCompleted_Day13:
      "true",
    dailyDutyResult_Day13:
      JSON.stringify({
        choiceLabel:
          "CHECK WORK SCHEDULES",
        evaluation:
          "Investigative"
      }),
    ["mailRead_MAIL-012"]:
      "true",
    ["caseStatus_CASE-006"]:
      "Active"
  });


const app = {
  innerHTML:
    ""
};


const fields = {
  reportFindings: {
    value:
      "The receipt existed before the current decision."
  },
  reportRecommendation: {
    value:
      "Preserve both records and restrict further testing."
  }
};


const context = {
  app,
  localStorage,
  console,
  Date,

  alert(){},

  document: {
    getElementById(id){
      return fields[id];
    }
  },

  renderMinistryDocument(document){

    return `
      <article>
        ${document.title}
        ${document.body}
      </article>
    `;
  },

  showDashboard(){}
};


vm.createContext(context);


const scripts = [
  "portal/js/storage-engine.js",
  "portal/js/case-data.js",
  "portal/js/player-engine.js",
  "portal/js/world-engine.js",
  "portal/js/daily-work.js",
  "portal/js/case-engine.js",
  "portal/js/owl-mail.js"
];


scripts.forEach(
  scriptPath => {

    vm.runInContext(
      fs.readFileSync(
        path.join(
          repositoryRoot,
          scriptPath
        ),
        "utf8"
      ),
      context,
      {
        filename:
          scriptPath
      }
    );
  }
);


context.submitReport(
  "CASE-006"
);


assert.equal(
  localStorage.getItem(
    "caseStatus_CASE-006"
  ),
  "Under Review"
);
assert.equal(
  localStorage.getItem(
    "case006SubmittedDay"
  ),
  "14"
);


const report =
  JSON.parse(
    localStorage.getItem(
      "report_CASE-006"
    )
  );

assert.equal(
  report.findings,
  fields.reportFindings.value
);
assert.equal(
  report.recommendation,
  fields.reportRecommendation.value
);
assert.match(
  app.innerHTML,
  /REPORT STATUS: SUBMITTED/
);
pass("CASE-006 submission records its report and review day");


vm.runInContext(
  "World.setDay(15);",
  context
);


const reviewMail =
  context.getOwlMails()
    .find(
      mail =>
        mail.id === "MAIL-013"
    );

assert.ok(reviewMail);
assert.match(
  reviewMail.body,
  /COMPONENT 1/
);
assert.match(
  reviewMail.body,
  /Components 2 and 3 remain sealed/
);
pass("CASE-006 review waits until the following work day");


context.openOwlMail(
  "MAIL-013"
);


assert.equal(
  localStorage.getItem(
    "caseStatus_CASE-006"
  ),
  "Solved"
);
assert.equal(
  localStorage.getItem(
    "sealedCompatibilityStage"
  ),
  "1"
);
assert.equal(
  localStorage.getItem(
    "sealedCompatibilityConditionOne"
  ),
  "true"
);
assert.ok(
  localStorage.getItem(
    "caseCompleted_CASE-006"
  )
);
pass("CASE-006 review saves the first compatibility milestone");


console.log(
  "\nCASE-006 submission test completed successfully."
);
