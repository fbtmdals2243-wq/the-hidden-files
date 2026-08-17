function showDashboard(){

  /* =====================================================
     PLAYER DATA
  ===================================================== */

  const name =
    Player.getName();

  const employeeId =
    Player.getEmployeeId();

  const identity =
    Player.getIdentity();

  const clearance =
    Player.getClearance();

  const rank =
    Player.getRank();


  /* =====================================================
     WORLD DATA
  ===================================================== */

  const worldDate =
    World.getDate();


  /* =====================================================
     PROGRESS DATA
  ===================================================== */

  const orientationComplete =
    localStorage.getItem(
      "orientationComplete"
    ) === "true";


  const case000Status =
    Player.getCaseStatus(
      "CASE-000"
    );


  /* =====================================================
     READ STATES
  ===================================================== */

  const mailRead =
    localStorage.getItem(
      "mailRead_MAIL-002"
    ) === "true";


  const committeeMailRead =
    localStorage.getItem(
      "mailRead_MAIL-003"
    ) === "true";


  const newsRead =
    localStorage.getItem(
      "newsRead_NEWS-002"
    ) === "true";


  const noticeRead =
    localStorage.getItem(
      "noticeRead_NOTICE-002"
    ) === "true";


  /* =====================================================
     OWL MAIL LABEL
  ===================================================== */

  let mailLabel =
    "1 unread";


  if(
    case000Status ===
    "Under Review"
  ){

    mailLabel =
      mailRead
        ? "Reviewed"
        : "New mail";
  }


  if(
    case000Status ===
    "Committee Pending"
  ){

    mailLabel =
      committeeMailRead
        ? "Reviewed"
        : "Committee mail";
  }


  if(
    case000Status ===
    "Solved"
  ){

    mailLabel =
      "Reviewed";
  }


  /* =====================================================
     NEWS LABEL
  ===================================================== */

  let newsLabel =
    "Morning edition";


  if(
    case000Status ===
    "Under Review"
  ){

    newsLabel =
      newsRead
        ? "Reviewed"
        : "New article";
  }


  /* =====================================================
     NOTICE LABEL
  ===================================================== */

  let noticeLabel =
    "Security reminder";


  if(
    case000Status ===
    "Under Review"
  ){

    noticeLabel =
      noticeRead
        ? "Reviewed"
        : "1 new notice";
  }


  /* =====================================================
     ASSIGNMENT
  ===================================================== */

  let assignmentLabel =
    orientationComplete
      ? "Completed"
      : "Orientation required";


  let currentTask =
    orientationComplete
      ? "Archive Access Available"
      : "Complete Orientation";


  if(
    case000Status ===
    "Under Review"
  ){

    assignmentLabel =
      "Await review result";

    currentTask =
      "CASE-000 Under Review";
  }


  if(
    case000Status ===
    "Committee Pending"
  ){

    assignmentLabel =
      "Await committee response";

    currentTask =
      "Await Committee Response";
  }


  if(
    case000Status ===
    "Solved"
  ){

    assignmentLabel =
      "Assignment completed";

    currentTask =
      "CASE-000 Completed";
  }


  /* =====================================================
     END DAY PERMISSION
  ===================================================== */

  const canEndWorkDay =
    orientationComplete &&
    case000Status === "Solved";


  /* =====================================================
     DASHBOARD
  ===================================================== */

  app.innerHTML = `
    <section class="office-scene">

      <div class="office-window">

        <div class="rain"></div>

        <div class="window-text">
          LONDON · MINISTRY OF MAGIC
        </div>

      </div>


      <div class="office-topbar">

        <div>

          <div class="seal">
            BRITISH MINISTRY OF MAGIC
          </div>

          <h1>
            Office 3-B
          </h1>

          <h2>
            Good Morning, Officer ${name}
          </h2>

        </div>


        <div class="office-status">

          <b>${employeeId}</b>

          <br>

          ${identity.department || "Archive Division"}

          <br>

          ${rank}

          <br>

          Clearance ${clearance}

        </div>

      </div>


      <div class="desk-scene">


        <button
          class="object employee-id"
          onclick="openOfficeItem('Employee Profile')">

          🪪

          <span>
            Employee ID
          </span>

          <small>
            Personnel record
          </small>

        </button>


        <button
          class="object owl-mail"
          onclick="openOfficeItem('Owl Mail')">

          📨

          <span>
            Owl Mail
          </span>

          <small>
            ${mailLabel}
          </small>

        </button>


        <button
          class="object assignment"
          onclick="openOfficeItem('Today’s Assignment')">

          📂

          <span>
            Today's Assignment
          </span>

          <small>
            ${assignmentLabel}
          </small>

        </button>


        <button
          class="object prophet"
          onclick="openOfficeItem('Daily Prophet')">

          📰

          <span>
            Daily Prophet
          </span>

          <small>
            ${newsLabel}
          </small>

        </button>


        <button
          class="object notice-board"
          onclick="openOfficeItem('Notice Board')">

          📌

          <span>
            Notice Board
          </span>

          <small>
            ${noticeLabel}
          </small>

        </button>


        <button
          class="object coffee"
          onclick="openOfficeItem('Coffee')">

          ☕

          <span>
            Coffee
          </span>

          <small>
            Ministry issue
          </small>

        </button>


        <button
          class="object cabinet ${
            orientationComplete
              ? "unlocked"
              : "locked"
          }"
          onclick="openOfficeItem('Archive Cabinet')">

          🗄

          <span>
            Archive Cabinet
          </span>

          <small>
            ${
              orientationComplete
                ? "Access granted"
                : "Locked"
            }
          </small>

        </button>

      </div>


      <div class="terminal office-terminal">OFFICE SESSION: ACTIVE
DATE: ${worldDate}
LOCATION: MINISTRY OF MAGIC / OFFICE 3-B
WEATHER: LONDON RAIN
EMPLOYEE: ${employeeId}
RANK: ${rank}
CLEARANCE: ${clearance}
CURRENT TASK: ${currentTask}</div>


      ${
        canEndWorkDay
          ? `
            <div class="center">

              <button
                class="btn"
                onclick="endWorkDay()">

                END WORK DAY

              </button>

            </div>
          `
          : ""
      }

    </section>
  `;
}


/* =========================================================
   END WORK DAY
========================================================= */

function endWorkDay(){

  const completedDay =
    World.getDay();


  const nextDay =
    World.nextDay();


  localStorage.setItem(
    "lastCompletedWorldDay",
    String(completedDay)
  );


  app.innerHTML = `
    <section class="panel">

      <div class="seal">
        MINISTRY WORK SESSION
      </div>

      <h1>
        Work Day Complete
      </h1>

      <h2>
        Day ${completedDay}
      </h2>


      <div class="notice">

        <p>
          Your Ministry work session
          has been recorded.
        </p>

        <p>
          Personnel records and case progress
          have been preserved.
        </p>

        <p class="muted">
          The Ministry will continue operating
          while you are away.
        </p>

      </div>


      <div class="terminal">WORK DAY: ${completedDay}
STATUS: COMPLETE

PERSONNEL RECORD: SAVED
CASE RECORDS: SAVED
CLEARANCE: ${Player.getClearance()}

NEXT WORK DAY: DAY ${nextDay}
MINISTRY STATUS: ACTIVE</div>


      <div class="center">

        <button
          class="btn"
          onclick="startNextWorkDay()">

          START NEXT WORK DAY

        </button>

      </div>

    </section>
  `;
}


/* =========================================================
   START NEXT DAY
========================================================= */

function startNextWorkDay(){

  showDashboard();
}


/* =========================================================
   OFFICE INTERACTIONS
========================================================= */

function openOfficeItem(item){


  if(
    item ===
    "Employee Profile"
  ){

    showPersonnelRecord();

    return;
  }


  if(
    item ===
    "Today’s Assignment"
  ){

    talkToWhitmore();

    return;
  }


  if(
    item ===
    "Owl Mail"
  ){

    showOwlMail();

    return;
  }


  if(
    item ===
    "Archive Cabinet"
  ){

    const orientationComplete =
      localStorage.getItem(
        "orientationComplete"
      ) === "true";


    if(
      !orientationComplete
    ){

      alert(
        "Archive Cabinet is locked. Complete First Day Orientation first."
      );

      return;
    }


    showArchiveCabinet();

    return;
  }


  if(
    item ===
    "Daily Prophet"
  ){

    showDailyProphet();

    return;
  }


  if(
    item ===
    "Notice Board"
  ){

    showNoticeBoard();

    return;
  }


  if(
    item ===
    "Coffee"
  ){

    alert(
      "The coffee is still warm."
    );

    return;
  }

}