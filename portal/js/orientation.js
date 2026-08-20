function showOrientationMemo(){

  app.innerHTML = `
    <section class="panel">

      <div class="seal">
        OFFICIAL MEMORANDUM
      </div>

      <h1>
        First Day Orientation
      </h1>

      <h2>
        Archive Division · Junior Officer
      </h2>


      <div class="notice">

        <p>
          <b>From:</b>
          Archive Division Personnel Office
        </p>

        <p>
          <b>Priority:</b>
          High
        </p>

        <p>
          Congratulations on your appointment.
        </p>

        <p>
          Before independent archive access can be granted,
          all junior officers must complete First Day Orientation.
        </p>

      </div>


      <div class="terminal">FIRST DAY ORIENTATION
[ ] Review Employee Profile
[ ] Read Ministry Notice
[ ] Complete Archive Training
[ ] Receive Archive Clearance</div>


      <div class="center">

        <button
          class="btn"
          onclick="startOrientation()">

          BEGIN ORIENTATION

        </button>


        <button
          class="btn"
          onclick="showDashboard()">

          RETURN TO OFFICE

        </button>

      </div>

    </section>
  `;
}


/* =========================================================
   START ORIENTATION
========================================================= */

function startOrientation(){

  localStorage.setItem(
    "orientationStep",
    "profile"
  );

  showOrientationTask();
}


/* =========================================================
   ORIENTATION TASKS
========================================================= */

function showOrientationTask(){

  const step =
    localStorage.getItem(
      "orientationStep"
    ) || "profile";


  const tasks = {

    profile: [

      "Review Employee Profile",

      "Confirm your Ministry employee record and magical identity."

    ],


    notice: [

      "Read Ministry Notice",

      "Review today’s official Ministry notice."

    ],


    training: [

      "Complete Archive Training",

      "Learn basic procedures for sealed records and restricted files."

    ],


    clearance: [

      "Receive Archive Clearance",

      "Your Level I archive clearance is ready to be issued."

    ]

  };


  const nextMap = {

    profile:
      "notice",

    notice:
      "training",

    training:
      "clearance",

    clearance:
      "complete"

  };


  const task =
    tasks[step];


  if(!task){

    localStorage.setItem(
      "orientationStep",
      "profile"
    );

    showOrientationTask();

    return;
  }


  app.innerHTML = `
    <section class="panel">

      <div class="seal">
        FIRST DAY ORIENTATION
      </div>

      <h1>
        ${task[0]}
      </h1>

      <h2>
        Orientation Task
      </h2>


      <div class="notice">

        <p>
          ${task[1]}
        </p>

      </div>


      <div class="terminal">CURRENT TASK: ${task[0]}
STATUS: IN PROGRESS
ARCHIVE ACCESS: PENDING</div>


      <div class="center">

        <button
          class="btn"
          onclick="completeOrientationTask('${nextMap[step]}')">

          COMPLETE TASK

        </button>

      </div>

    </section>
  `;
}


/* =========================================================
   COMPLETE ORIENTATION TASK
========================================================= */

function completeOrientationTask(next){

  if(
    next ===
    "complete"
  ){

    localStorage.setItem(
      "orientationComplete",
      "true"
    );


    /*
      신규 직원에게만 Level I 지급.
      기존 상위 Clearance는 유지한다.
    */

    if(
      !localStorage.getItem(
        "playerClearance"
      )
    ){

      Player.setClearance(
        "Level I"
      );
    }


    showArchiveClearanceGranted();

    return;
  }


  localStorage.setItem(
    "orientationStep",
    next
  );


  showOrientationTask();
}


/* =========================================================
   CLEARANCE GRANTED
========================================================= */

function showArchiveClearanceGranted(){

  const clearance =
    Player.getClearance();


  app.innerHTML = `
    <section class="panel">

      <div class="seal">
        ARCHIVE CLEARANCE UPDATED
      </div>

      <h1>
        Access Granted
      </h1>

      <h2>
        Archive Division Clearance · ${clearance}
      </h2>


      <div class="notice">

        <p>
          First Day Orientation has been completed.
        </p>

        <p>
          You are now authorized to access
          approved Archive Division materials.
        </p>

      </div>


      <div class="terminal">ORIENTATION: COMPLETE
CLEARANCE: ${clearance}
ARCHIVE CABINET: UNLOCKED
THE HIDDEN FILES: ACCESS AVAILABLE</div>


      <div class="center">

        <button
          class="btn"
          onclick="showDashboard()">

          RETURN TO OFFICE

        </button>

      </div>

    </section>
  `;
}


/* =========================================================
   ARCHIVE CABINET
========================================================= */

function showArchiveCabinet(){

  const hasLevelII = Player.hasClearance("Level II");
  const worldDay = World.getDay();

  const case001Available =
    hasLevelII &&
    worldDay >= 2 &&
    localStorage.getItem("mailRead_MAIL-004") === "true" &&
    localStorage.getItem("newsRead_NEWS-003") === "true" &&
    localStorage.getItem("noticeRead_NOTICE-003") === "true";

  const case002Available =
    hasLevelII &&
    worldDay >= 3 &&
    localStorage.getItem("mailRead_MAIL-005") === "true";

  const case003Available =
    hasLevelII &&
    worldDay >= 4 &&
    localStorage.getItem("mailRead_MAIL-006") === "true";

  const case004Available =
    hasLevelII &&
    worldDay >= 6 &&
    localStorage.getItem("mailRead_MAIL-008") === "true" &&
    localStorage.getItem("day6PersonnelRecordViewed") === "true";

  const case005Available =
    hasLevelII &&
    worldDay >= 8 &&
    localStorage.getItem("mailRead_MAIL-010") === "true";

  const case006Available =
    hasLevelII &&
    worldDay >= 14 &&
    localStorage.getItem("mailRead_MAIL-012") === "true";

  function renderCaseEntry(
    caseId,
    title,
    isAvailable,
    lockedMessage
  ){

    if(isAvailable){
      return `
        <button
          class="case-entry available"
          onclick="openCase('${caseId}')">

          <b>${caseId}</b>

          <span>${title}</span>

          <small>
            Status: ${Player.getCaseStatus(caseId)}
          </small>

        </button>
      `;
    }

    return `
      <button class="case-entry locked">

        <b>${caseId}</b>

        <span>${title}</span>

        <small>${lockedMessage}</small>

      </button>
    `;
  }

  const case001LockedMessage =
    !hasLevelII
      ? "🔒 Clearance Level II Required"
      : "⏳ Review Day 2 Ministry communications";

  app.innerHTML = `
    <section class="panel">

      <div class="seal">
        BRITISH MINISTRY OF MAGIC
      </div>

      <h1>ARCHIVE CABINET</h1>

      <h2>${Player.getClearance()} ACCESS</h2>

      <div class="notice">
        <h3>PUBLIC ARCHIVE</h3>
      </div>

      <div class="case-list">
        ${renderCaseEntry(
          "CASE-000",
          "The Missing Owl",
          true,
          ""
        )}
      </div>

      <div class="notice">
        <h3>RESTRICTED ARCHIVE</h3>
      </div>

      <div class="case-list">

        ${renderCaseEntry(
          "CASE-001",
          "Memory Fracture",
          case001Available,
          case001LockedMessage
        )}

        ${renderCaseEntry(
          "CASE-002",
          "The Officer Who Never Existed",
          case002Available,
          "⏳ Read the Day 3 Undersecretary briefing"
        )}

        ${renderCaseEntry(
          "CASE-003",
          "Sub-Level 4",
          case003Available,
          "⏳ Read the Sub-Level 4 access directive"
        )}

        ${renderCaseEntry(
          "CASE-004",
          "The Second Signature",
          case004Available,
          "⏳ Review the Day 6 personnel integrity record"
        )}

        ${renderCaseEntry(
          "CASE-005",
          "The Position That Never Closed",
          case005Available,
          "⏳ Read the Day 8 Recruitment Systems Audit"
        )}

        ${renderCaseEntry(
          "CASE-006",
          "The Decision Before It Was Made",
          case006Available,
          "⏳ Await a Personnel Continuity recall"
        )}

        <button class="case-entry locked">
          <b>CASE-ZERO</b>
          <span>Restricted Archive Origin</span>
          <small>🔒 Clearance Level V Required</small>
        </button>

      </div>

      <div class="terminal">ARCHIVE STATUS: ACTIVE
WORLD DATE: ${World.getDate()}
CLEARANCE: ${Player.getClearance()}
PUBLIC FILES: AVAILABLE
LEVEL II ACCESS: ${hasLevelII ? "GRANTED" : "DENIED"}
CASE-001: ${case001Available ? "RELEASED" : "PENDING"}
CASE-002: ${case002Available ? "RELEASED" : "PENDING"}
CASE-003: ${case003Available ? "RELEASED" : "PENDING"}
CASE-004: ${case004Available ? "RELEASED" : "PENDING"}
CASE-005: ${case005Available ? "RELEASED" : "PENDING"}
CASE-006: ${case006Available ? "RELEASED" : "PENDING"}</div>

      <div class="center">
        <button
          class="btn"
          onclick="showDashboard()">
          RETURN TO OFFICE
        </button>
      </div>

    </section>
  `;
}
