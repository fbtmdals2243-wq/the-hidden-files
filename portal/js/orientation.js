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

  const case000Status =
    Player.getCaseStatus(
      "CASE-000"
    );


  const case001Status =
    Player.getCaseStatus(
      "CASE-001"
    );


  const hasLevelII =
    Player.hasClearance(
      "Level II"
    );


  const worldDay =
    World.getDay();


  /*
    Day 2 Ministry communications
  */

  const day2MailRead =
    localStorage.getItem(
      "mailRead_MAIL-004"
    ) === "true";


  const day2NewsRead =
    localStorage.getItem(
      "newsRead_NEWS-003"
    ) === "true";


  const day2NoticeRead =
    localStorage.getItem(
      "noticeRead_NOTICE-003"
    ) === "true";


  /*
    CASE-001 release conditions

    1. Level II
    2. Day 2 or later
    3. Day 2 communications reviewed
  */

  const case001Available =
    hasLevelII &&
    worldDay >= 2 &&
    day2MailRead &&
    day2NewsRead &&
    day2NoticeRead;


  app.innerHTML = `
    <section class="panel">

      <div class="seal">
        BRITISH MINISTRY OF MAGIC
      </div>

      <h1>
        ARCHIVE CABINET
      </h1>

      <h2>
        ${Player.getClearance()} ACCESS
      </h2>


      <div class="notice">

        <h3>
          PUBLIC ARCHIVE
        </h3>

      </div>


      <div class="case-list">

        <button
          class="case-entry available"
          onclick="openCase('CASE-000')">

          <b>
            CASE-000
          </b>

          <span>
            The Missing Owl
          </span>

          <small>
            Status: ${case000Status}
          </small>

        </button>

      </div>


      <div class="notice">

        <h3>
          RESTRICTED ARCHIVE
        </h3>

      </div>


      <div class="case-list">


        ${
          case001Available

          ? `

            <button
              class="case-entry available"
              onclick="openCase('CASE-001')">

              <b>
                CASE-001
              </b>

              <span>
                Memory Fracture
              </span>

              <small>
                Status: ${case001Status}
              </small>

            </button>

          `

          : hasLevelII && worldDay >= 2

            ? `

              <button
                class="case-entry locked">

                <b>
                  CASE-001
                </b>

                <span>
                  Memory Fracture
                </span>

                <small>
                  ⏳ Review Day 2 Ministry communications
                </small>

              </button>

            `

            : `

              <button
                class="case-entry locked">

                <b>
                  CASE-001
                </b>

                <span>
                  Memory Fracture
                </span>

                <small>
                  🔒 Clearance Level II Required
                </small>

              </button>

            `
        }


        <button
          class="case-entry locked">

          <b>
            CASE-ZERO
          </b>

          <span>
            Restricted Archive Origin
          </span>

          <small>
            🔒 Clearance Level V Required
          </small>

        </button>

      </div>


      <div class="terminal">ARCHIVE STATUS: ACTIVE
WORLD DATE: ${World.getDate()}
CLEARANCE: ${Player.getClearance()}
PUBLIC FILES: AVAILABLE
LEVEL II ACCESS: ${hasLevelII ? "GRANTED" : "DENIED"}
CASE-001: ${case001Available ? "RELEASED" : "PENDING"}</div>


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