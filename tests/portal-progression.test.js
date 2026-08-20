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
      null
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
    "portal/js/case-data.js",
    "portal/js/player-engine.js",
    "portal/js/world-engine.js",
    "portal/js/daily-work.js",
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
  MinistryCases
} = portal;


assert.deepEqual(
  Object.keys(MinistryCases),
  [
    "CASE-000",
    "CASE-001",
    "CASE-002",
    "CASE-003",
    "CASE-004",
    "CASE-005"
  ]
);
pass("All six story cases are registered");


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
assert.doesNotMatch(
  app.innerHTML,
  /END WORK DAY/
);
pass("Day 8 dashboard gates the assignment correctly");


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


for(
  let day = 10;
  day <= 23;
  day += 1
){

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
pass("Completed CASE-005 remains available in the Archive Cabinet");


console.log(
  "\nPortal progression integration test completed successfully."
);
