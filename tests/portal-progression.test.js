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
    },


    snapshot(){

      return Object.fromEntries(
        values.entries()
      );
    }

  };
}


function loadPortal(initialValues){

  const localStorage =
    createStorage(initialValues);

  const app = {
    innerHTML:
      ""
  };

  const activity = {
    alerts: [],
    openedCase:
      null,
    networkOpened:
      false
  };


  const context = {

    app,
    localStorage,
    console,
    Date,

    alert(message){

      activity.alerts.push(
        message
      );
    },


    renderMinistryDocument(document){

      return `
        <article>
          ${document.department}
          ${document.title}
          ${document.body}
        </article>
      `;
    },


    openCase(caseId){

      activity.openedCase =
        caseId;
    },


    showPromotionReview(){},
    talkToWhitmore(){},

    showMinistryNetwork(){

      activity.networkOpened =
        true;
    },

    document: {
      getElementById(){

        return {
          value:
            ""
        };
      }
    }

  };


  vm.createContext(context);


  const scripts = [
    "portal/js/storage-engine.js",
    "portal/js/case-data.js",
    "portal/js/player-engine.js",
    "portal/js/world-engine.js",
    "portal/js/daily-work.js",
    "portal/js/training.js",
    "portal/js/news-data.js",
    "portal/js/prophet.js",
    "portal/js/notice-data.js",
    "portal/js/notice-board.js",
    "portal/js/owl-mail.js",
    "portal/js/personnel.js",
    "portal/js/orientation.js",
    "portal/js/dashboard.js"
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
          "case-data.js"
        )
      ){

        source +=
          "\nthis.__MinistryCases = MinistryCases;";
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
          "daily-work.js"
        )
      ){

        source +=
          "\nthis.__DailyWork = DailyWork;";
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


  return {
    context,
    localStorage,
    app,
    activity,
    Player:
      context.__Player,
    World:
      context.__World,
    DailyWork:
      context.__DailyWork,
    MinistryTraining:
      context.__MinistryTraining,
    MinistryStorage:
      context.__MinistryStorage,
    MinistryCases:
      context.__MinistryCases
  };
}


function pass(message){

  console.log(
    "PASS:",
    message
  );
}


const initialValues = {
  worldDay:
    8,
  orientationComplete:
    true,
  ministryApplicantName:
    "Integration Officer",
  ministryEmployeeId:
    "MOM-009999",
  ministryIdentity:
    JSON.stringify({
      department:
        "Auror Office"
    }),
  playerRank:
    "Archive Officer",
  playerClearance:
    "Level II",
  mailRead_MAIL_008:
    true,
  mailRead_MAIL_009:
    true,
  newsRead_NEWS_004:
    true,
  day6PersonnelRecordViewed:
    true,
  report_CASE_004:
    JSON.stringify({
      findings:
        "Existing report must survive."
    })
};


[
  "CASE-000",
  "CASE-001",
  "CASE-002",
  "CASE-003",
  "CASE-004"
].forEach(
  caseId => {

    initialValues[
      "caseStatus_" +
      caseId
    ] = "Solved";
  }
);


initialValues.caseStatus_CASE_005 =
  "Active";


/* The production keys contain hyphens. */
initialValues["mailRead_MAIL-008"] =
  true;
initialValues["mailRead_MAIL-009"] =
  true;
initialValues["newsRead_NEWS-004"] =
  true;
initialValues["report_CASE-004"] =
  JSON.stringify({
    findings:
      "Existing report must survive."
  });


const portal =
  loadPortal(initialValues);

const {
  context,
  localStorage,
  app,
  activity,
  Player,
  World,
  DailyWork,
  MinistryTraining,
  MinistryStorage,
  MinistryCases
} = portal;


const initialSnapshot =
  MinistryStorage.createSnapshot();

assert.equal(
  initialSnapshot.employeeId,
  "MOM-009999"
);
assert.equal(
  initialSnapshot.data.worldDay,
  "8"
);
assert.equal(
  initialSnapshot.data[
    "report_CASE-004"
  ],
  localStorage.getItem(
    "report_CASE-004"
  )
);
pass("Portal progress is available through the versioned storage layer");


assert.deepEqual(
  Object.keys(MinistryCases),
  [
    "CASE-000",
    "CASE-001",
    "CASE-002",
    "CASE-003",
    "CASE-004",
    "CASE-005",
    "CASE-006"
  ]
);
pass("All seven story cases are registered");


assert.equal(
  Player.getCompletedCases(),
  5
);
pass("Completed case tracking scales beyond CASE-000");


assert.equal(
  Player.getRecommendedDepartment(),
  "Auror Office"
);
assert.equal(
  Player.getAssignedDepartment(),
  "Archive Division"
);
pass("Recommended and assigned departments are separate");


const day8Mail =
  context.getOwlMails()
    .find(
      mail =>
        mail.id === "MAIL-010"
    );

assert.ok(day8Mail);
assert.match(
  day8Mail.body,
  /VACANCY-AR-117/
);
pass("Day 8 classified assignment is delivered");


context.showDashboard();
assert.match(
  app.innerHTML,
  /Read Recruitment Systems Audit/
);
assert.match(
  app.innerHTML,
  /Ministry Network/
);
assert.doesNotMatch(
  app.innerHTML,
  /END WORK DAY/
);
pass("Day 8 dashboard gates the assignment correctly");


context.openOfficeItem(
  "Ministry Network"
);
assert.equal(
  activity.networkOpened,
  true
);
pass("Office 3-B exposes the employee archive and account desk");


context.openOwlMail(
  "MAIL-010"
);
context.openOfficeItem(
  "Today’s Assignment"
);

assert.equal(
  activity.openedCase,
  "CASE-005"
);
pass("Day 8 assignment opens CASE-005");


Player.setCaseStatus(
  "CASE-005",
  "Under Review"
);
localStorage.setItem(
  "report_CASE-005",
  JSON.stringify({
    findings:
      "The appointment layer carries the signature."
  })
);

context.showDashboard();
assert.match(
  app.innerHTML,
  /CASE-005 Under Review/
);
assert.match(
  app.innerHTML,
  /END WORK DAY/
);
context.endWorkDay();

assert.equal(
  World.getDay(),
  9
);
pass("CASE-005 report advances the world to Day 9");


const day9Mail =
  context.getOwlMails()
    .find(
      mail =>
        mail.id === "MAIL-011"
    );

assert.ok(day9Mail);
assert.match(
  day9Mail.body,
  /You are the second/
);
assert.match(
  day9Mail.body,
  /cannot currently determine why your application qualified/
);
pass("Day 9 concludes the appointment mystery without erasing the next arc");


context.openOwlMail(
  "MAIL-011"
);

assert.equal(
  Player.getCaseStatus(
    "CASE-005"
  ),
  "Solved"
);
assert.equal(
  localStorage.getItem(
    "firstStoryArcCompleted"
  ),
  "true"
);
assert.equal(
  Player.getSpecialAssignment(),
  "Continuity Liaison"
);
pass("First story arc completion and career assignment are saved");


context.showPersonnelRecord();
assert.match(
  app.innerHTML,
  /Assigned Department:\s*Archive Division/
);
assert.match(
  app.innerHTML,
  /Identity Engine Recommendation:\s*Auror Office/
);
assert.match(
  app.innerHTML,
  /Identity Match:\s*NOT ESTABLISHED/
);
pass("Personnel record preserves the correct identity conclusion");


context.endWorkDay();
assert.equal(
  World.getDay(),
  10
);
pass("Day 9 advances to continuous Ministry service");


const day10Task =
  DailyWork.getTaskForDay(10);
const day17Task =
  DailyWork.getTaskForDay(17);

assert.equal(
  day10Task.id,
  day17Task.id
);
pass("Daily work rotates on a seven-day schedule");


function completeRoutineDay(day){

  assert.equal(
    World.getDay(),
    day
  );


  const task =
    DailyWork.getTaskForDay(day);

  const news =
    context.getMinistryNews()[0];

  const notice =
    context.getMinistryNotices()[0];


  assert.equal(
    news.id,
    "NEWS-DAY-" +
    day
  );

  assert.equal(
    notice.id,
    "NOTICE-DAY-" +
    day
  );


  context.showDashboard();

  assert.match(
    app.innerHTML,
    new RegExp(task.title)
  );

  assert.doesNotMatch(
    app.innerHTML,
    /END WORK DAY/
  );


  context.openNews(
    news.id
  );

  context.openNotice(
    notice.id
  );


  const choice =
    task.choices[0];

  assert.equal(
    DailyWork.complete(
      choice.id
    ),
    true
  );


  const pointsBeforeDuplicate =
    DailyWork.getServicePoints();

  DailyWork.complete(
    choice.id
  );

  assert.equal(
    DailyWork.getServicePoints(),
    pointsBeforeDuplicate
  );


  context.showDashboard();

  assert.match(
    app.innerHTML,
    /Daily Ministry Duty Complete/
  );

  assert.match(
    app.innerHTML,
    /END WORK DAY/
  );

  return {
    task,
    choice
  };
}


for(
  let day = 10;
  day <= 13;
  day += 1
){

  const completed =
    completeRoutineDay(day);


  if(day === 13){

    assert.equal(
      completed.task.id,
      "DUTY-PERSONNEL-CROSSREF"
    );

    context.showDailyWorkResult();

    assert.match(
      app.innerHTML,
      /POST-FILING EXCEPTION/
    );
  }


  context.endWorkDay();
}


assert.equal(
  World.getDay(),
  14
);


const day14Recall =
  context.getOwlMails()
    .find(
      mail =>
        mail.id === "MAIL-012"
    );

assert.ok(day14Recall);
assert.match(
  day14Recall.body,
  /MOM-000117/
);
assert.match(
  day14Recall.body,
  /COMPONENT 1 OF 3/
);
assert.match(
  day14Recall.body,
  /CHECK WORK SCHEDULES/
);
pass("Day 13 routine duty produces a personalized continuity recall");


context.showDashboard();
assert.match(
  app.innerHTML,
  /Read the Day 13 Decision Recall/
);
assert.doesNotMatch(
  app.innerHTML,
  /END WORK DAY/
);


context.openOwlMail(
  "MAIL-012"
);

assert.equal(
  localStorage.getItem(
    "secondStoryArcStarted"
  ),
  "true"
);


activity.openedCase =
  null;

context.openOfficeItem(
  "Today’s Assignment"
);

assert.equal(
  activity.openedCase,
  "CASE-006"
);
pass("Day 14 recall opens CASE-006 from Office 3-B");


Player.setCaseStatus(
  "CASE-006",
  "Under Review"
);
localStorage.setItem(
  "case006SubmittedDay",
  "14"
);
localStorage.setItem(
  "report_CASE-006",
  JSON.stringify({
    findings:
      "The record predates the current decision."
  })
);


context.showDashboard();
assert.match(
  app.innerHTML,
  /CASE-006 Under Review/
);
assert.match(
  app.innerHTML,
  /END WORK DAY/
);

context.endWorkDay();

assert.equal(
  World.getDay(),
  15
);


const day15Review =
  context.getOwlMails()
    .find(
      mail =>
        mail.id === "MAIL-013"
    );

assert.ok(day15Review);
assert.match(
  day15Review.body,
  /PROCEDURAL RESPONSE CORRESPONDENCE/
);


context.showDashboard();
assert.match(
  app.innerHTML,
  /Read CASE-006 Compatibility Review/
);
assert.doesNotMatch(
  app.innerHTML,
  /END WORK DAY/
);


context.openOwlMail(
  "MAIL-013"
);

assert.equal(
  Player.getCaseStatus(
    "CASE-006"
  ),
  "Solved"
);
assert.equal(
  localStorage.getItem(
    "sealedCompatibilityConditionOne"
  ),
  "true"
);
assert.equal(
  Player.getCompletedCases(),
  7
);
pass("CASE-006 closes with only the first sealed condition revealed");


context.showPersonnelRecord();
assert.match(
  app.innerHTML,
  /COMPONENT 1 OF 3 SATISFIED/
);
assert.match(
  app.innerHTML,
  /Identity Match:\s*NOT REQUIRED/
);
pass("Personnel record preserves the new finding without merging identities");


completeRoutineDay(15);
context.endWorkDay();


assert.equal(
  World.getDay(),
  16
);


const trainingDirective =
  context.getOwlMails()
    .find(
      mail =>
        mail.id === "MAIL-014"
    );

assert.ok(trainingDirective);
assert.match(
  trainingDirective.body,
  /CONTINUITY RECORDS HANDLING · GRADE I/
);
assert.match(
  trainingDirective.body,
  /future Level III review/
);


context.showDashboard();
assert.match(
  app.innerHTML,
  /Read the Continuity Training Directive/
);
assert.match(
  app.innerHTML,
  /Training Desk/
);
assert.doesNotMatch(
  app.innerHTML,
  /END WORK DAY/
);


context.openOfficeItem(
  "Training Desk"
);
assert.match(
  app.innerHTML,
  /Training Directive Required/
);


context.openOwlMail(
  "MAIL-014"
);

context.openOfficeItem(
  "Today’s Assignment"
);
assert.match(
  app.innerHTML,
  /Identity and Authorization/
);
pass("Day 16 assigns mandatory employee training before routine work");


assert.equal(
  MinistryTraining.submitAnswer(
    "MODULE-IDENTITY",
    "preserve"
  ).success,
  true
);
assert.equal(
  MinistryTraining.submitAnswer(
    "MODULE-CONFLICT",
    "dual-preserve"
  ).success,
  true
);
assert.equal(
  MinistryTraining.submitAnswer(
    "MODULE-CLEARANCE",
    "request"
  ).completed,
  true
);


assert.equal(
  Player.hasQualification(
    "QUAL-CONTINUITY-I"
  ),
  true
);
assert.equal(
  MinistryTraining.getTrainingCredits(),
  3
);


context.showPersonnelRecord();
assert.match(
  app.innerHTML,
  /Continuity Records Handling · Grade I · Active/
);
assert.match(
  app.innerHTML,
  /Training Credits:\s*3/
);
pass("Training qualification becomes part of the permanent personnel record");


context.showDashboard();
assert.match(
  app.innerHTML,
  new RegExp(
    DailyWork.getTaskForDay(16).title
  )
);
assert.doesNotMatch(
  app.innerHTML,
  /END WORK DAY/
);
pass("Routine Ministry work resumes after qualification");


for(
  let day = 16;
  day <= 24;
  day += 1
){

  completeRoutineDay(day);
  context.endWorkDay();
}


assert.equal(
  DailyWork.getCompletedCount(),
  14
);
assert.equal(
  DailyWork.getServicePoints(),
  42
);
pass("Fourteen continuous workdays save without duplicate rewards");


assert.equal(
  localStorage.getItem(
    "ministryEmployeeId"
  ),
  "MOM-009999"
);
assert.equal(
  localStorage.getItem(
    "playerRank"
  ),
  "Archive Officer"
);
assert.equal(
  localStorage.getItem(
    "playerClearance"
  ),
  "Level II"
);
assert.equal(
  JSON.parse(
    localStorage.getItem(
      "report_CASE-004"
    )
  ).findings,
  "Existing report must survive."
);
pass("Employee identity, career, clearance, and old reports survive");


context.showArchiveCabinet();
assert.match(
  app.innerHTML,
  /openCase\('CASE-005'\)/
);
assert.match(
  app.innerHTML,
  /openCase\('CASE-006'\)/
);
pass("Completed story cases remain available in the Archive Cabinet");


console.log(
  "\nPortal progression integration test completed successfully."
);
