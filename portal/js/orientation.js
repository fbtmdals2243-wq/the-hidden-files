function showOrientationMemo(){
  app.innerHTML = `
    <section class="panel">
      <div class="seal">OFFICIAL MEMORANDUM</div>

      <h1>First Day Orientation</h1>
      <h2>Archive Division · Junior Officer</h2>

      <div class="notice">
        <p><b>From:</b> Archive Division Personnel Office</p>
        <p><b>Priority:</b> High</p>

        <p>Congratulations on your appointment.</p>

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
        <button class="btn" onclick="startOrientation()">
          BEGIN ORIENTATION
        </button>

        <button class="btn" onclick="showDashboard()">
          RETURN TO OFFICE
        </button>
      </div>
    </section>
  `;
}


function startOrientation(){

  localStorage.setItem(
    "orientationStep",
    "profile"
  );

  showOrientationTask();
}


function showOrientationTask(){

  const step =
    localStorage.getItem("orientationStep")
    || "profile";

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
    profile: "notice",
    notice: "training",
    training: "clearance",
    clearance: "complete"
  };

  const task = tasks[step];

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

      <h1>${task[0]}</h1>

      <h2>Orientation Task</h2>

      <div class="notice">
        <p>${task[1]}</p>
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


function completeOrientationTask(next){

  if(next === "complete"){

    localStorage.setItem(
      "orientationComplete",
      "true"
    );

    /*
      신규 직원에게만 Level I을 지급한다.
      이미 승진해서 Level II 이상인 직원을
      실수로 Level I으로 내리지 않기 위한 보호장치.
    */
    if(!localStorage.getItem("playerClearance")){
      Player.setClearance("Level I");
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


function showArchiveClearanceGranted(){

  app.innerHTML = `
    <section class="panel">

      <div class="seal">
        ARCHIVE CLEARANCE UPDATED
      </div>

      <h1>Access Granted</h1>

      <h2>
        Archive Division Clearance · Level I
      </h2>

      <div class="notice">

        <p>
          First Day Orientation has been completed.
        </p>

        <p>
          You are now authorized to access
          limited Archive Division materials.
        </p>

      </div>

      <div class="terminal">ORIENTATION: COMPLETE
CLEARANCE: LEVEL I
ARCHIVE CABINET: UNLOCKED
THE HIDDEN FILES: LIMITED ACCESS AVAILABLE</div>

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


function showArchiveCabinet(){

  const case000Status =
    Player.getCaseStatus("CASE-000");

  const hasLevelII =
    Player.hasClearance("Level II");

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

        <button
          class="case-entry available"
          onclick="openCase('CASE-000')">

          <b>CASE-000</b>

          <span>The Missing Owl</span>

          <small>
            Status: ${case000Status}
          </small>

        </button>

      </div>

      <div class="notice">
        <h3>RESTRICTED ARCHIVE</h3>
      </div>

      <div class="case-list">

        ${
          hasLevelII

          ? `

          <button class="case-entry available">

            <b>CASE-001</b>

            <span>Memory Fracture</span>

            <small>
              Classification: Level II
            </small>

          </button>

          `

          : `

          <button class="case-entry locked">

            <b>CASE-001</b>

            <span>Memory Fracture</span>

            <small>
              🔒 Clearance Level II Required
            </small>

          </button>

          `
        }

        <button class="case-entry locked">

          <b>CASE-ZERO</b>

          <span>Restricted Archive Origin</span>

          <small>
            🔒 Clearance Level V Required
          </small>

        </button>

      </div>

      <div class="terminal">ARCHIVE STATUS: ACTIVE
CLEARANCE: ${Player.getClearance()}
PUBLIC FILES: AVAILABLE
RESTRICTED FILES: ${
        hasLevelII
          ? "LEVEL II ACCESS GRANTED"
          : "ACCESS DENIED"
      }</div>

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