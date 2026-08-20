function showDashboard(){

  /* =====================================================
     PLAYER
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
     WORLD
  ===================================================== */

  const worldDay =
    World.getDay();

  const worldDate =
    World.getDate();


  /* =====================================================
     PROGRESS
  ===================================================== */

  const orientationComplete =
    localStorage.getItem(
      "orientationComplete"
    ) === "true";


  const case000Status =
    Player.getCaseStatus(
      "CASE-000"
    );

  const case001Status =
    Player.getCaseStatus(
      "CASE-001"
    );

  const case002Status =
    Player.getCaseStatus(
      "CASE-002"
    );

  const case003Status =
    Player.getCaseStatus(
      "CASE-003"
    );


  /* =====================================================
     MAIL READ STATES
  ===================================================== */

  const mail002Read =
    localStorage.getItem(
      "mailRead_MAIL-002"
    ) === "true";

  const mail003Read =
    localStorage.getItem(
      "mailRead_MAIL-003"
    ) === "true";

  const mail004Read =
    localStorage.getItem(
      "mailRead_MAIL-004"
    ) === "true";

  const mail005Read =
    localStorage.getItem(
      "mailRead_MAIL-005"
    ) === "true";

  const mail006Read =
    localStorage.getItem(
      "mailRead_MAIL-006"
    ) === "true";

  const mail007Read =
    localStorage.getItem(
      "mailRead_MAIL-007"
    ) === "true";

  const mail008Read =
    localStorage.getItem(
      "mailRead_MAIL-008"
    ) === "true";


  const day6PersonnelRecordViewed =
    localStorage.getItem(
      "day6PersonnelRecordViewed"
    ) === "true";


  /* =====================================================
     NEWS READ STATES
  ===================================================== */

  const news002Read =
    localStorage.getItem(
      "newsRead_NEWS-002"
    ) === "true";

  const news003Read =
    localStorage.getItem(
      "newsRead_NEWS-003"
    ) === "true";


  /* =====================================================
     NOTICE READ STATES
  ===================================================== */

  const notice002Read =
    localStorage.getItem(
      "noticeRead_NOTICE-002"
    ) === "true";

  const notice003Read =
    localStorage.getItem(
      "noticeRead_NOTICE-003"
    ) === "true";


  const day2CommunicationsComplete =
    mail004Read &&
    news003Read &&
    notice003Read;


  /* =====================================================
     LABELS
  ===================================================== */

  let mailLabel =
    "1 unread";

  let newsLabel =
    "Morning edition";

  let noticeLabel =
    "Security reminder";


  /* =====================================================
     CASE-000
  ===================================================== */

  if(
    case000Status ===
    "Under Review"
  ){

    mailLabel =
      mail002Read
        ? "Reviewed"
        : "New mail";

    newsLabel =
      news002Read
        ? "Reviewed"
        : "New article";

    noticeLabel =
      notice002Read
        ? "Reviewed"
        : "1 new notice";
  }


  if(
    case000Status ===
    "Committee Pending"
  ){

    mailLabel =
      mail003Read
        ? "Reviewed"
        : "Committee mail";
  }


  /* =====================================================
     DAY 2
  ===================================================== */

  if(
    worldDay === 2
  ){

    mailLabel =
      mail004Read
        ? "Reviewed"
        : "New mail";

    newsLabel =
      news003Read
        ? "Reviewed"
        : "New article";

    noticeLabel =
      notice003Read
        ? "Reviewed"
        : "1 new notice";
  }


  /* =====================================================
     DAY 3
  ===================================================== */

  if(
    worldDay === 3
  ){

    mailLabel =
      mail005Read
        ? "Reviewed"
        : "Restricted mail";

    newsLabel =
      "Morning edition";

    noticeLabel =
      "Security reminder";
  }


  /* =====================================================
     DAY 4
  ===================================================== */

  if(
    worldDay === 4
  ){

    mailLabel =
      mail006Read
        ? "Reviewed"
        : "Classified mail";

    newsLabel =
      "Morning edition";

    noticeLabel =
      "Security reminder";
  }


  /* =====================================================
     DAY 5
  ===================================================== */

  if(
    worldDay === 5
  ){

    mailLabel =
      mail007Read
        ? "Reviewed"
        : "Review result";

    newsLabel =
      "Morning edition";

    noticeLabel =
      "Security reminder";
  }


  /* =====================================================
     DAY 6+
  ===================================================== */

  if(
    worldDay >= 6
  ){

    mailLabel =
      mail008Read
        ? "Personnel audit read"
        : "Restricted personnel mail";

    newsLabel =
      "Morning edition";

    noticeLabel =
      "Security reminder";
  }


  /* =====================================================
     ASSIGNMENT
  ===================================================== */

  let assignmentLabel =
    "Orientation required";

  let currentTask =
    "Complete Orientation";


  /* =====================================================
     DAY 1
  ===================================================== */

  if(
    orientationComplete &&
    worldDay === 1
  ){

    assignmentLabel =
      case000Status === "Solved"
        ? "Assignment completed"
        : "CASE-000";

    currentTask =
      case000Status === "Solved"
        ? "CASE-000 Completed"
        : "Investigate CASE-000";
  }


  if(
    worldDay === 1 &&
    case000Status === "Under Review"
  ){

    assignmentLabel =
      "Await review result";

    currentTask =
      "CASE-000 Under Review";
  }


  if(
    worldDay === 1 &&
    case000Status === "Committee Pending"
  ){

    assignmentLabel =
      "Await committee response";

    currentTask =
      "Await Committee Response";
  }


  /* =====================================================
     DAY 2
  ===================================================== */

  if(
    worldDay === 2
  ){

    if(
      !day2CommunicationsComplete
    ){

      assignmentLabel =
        "Review communications";

      currentTask =
        "Review Day 2 Ministry Communications";
    }

    else if(
      case001Status !==
      "Solved"
    ){

      assignmentLabel =
        "CASE-001 active";

      currentTask =
        "Investigate CASE-001 · Memory Fracture";
    }

    else{

      assignmentLabel =
        "Assignment completed";

      currentTask =
        "CASE-001 Completed";
    }

  }


  /* =====================================================
     DAY 3
  ===================================================== */

  if(
    worldDay === 3
  ){

    if(
      !mail005Read
    ){

      assignmentLabel =
        "Restricted briefing";

      currentTask =
        "Read Undersecretary Briefing";
    }

    else if(
      case002Status !==
      "Solved"
    ){

      assignmentLabel =
        "CASE-002 active";

      currentTask =
        "Investigate CASE-002 · The Officer Who Never Existed";
    }

    else{

      assignmentLabel =
        "Assignment completed";

      currentTask =
        "CASE-002 Completed";
    }

  }


  /* =====================================================
     DAY 4
  ===================================================== */

  if(
    worldDay === 4
  ){

    if(
      !mail006Read
    ){

      assignmentLabel =
        "Classified directive";

      currentTask =
        "Read Sub-Level 4 Access Directive";
    }

    else if(
      case003Status ===
      "Under Review"
    ){

      assignmentLabel =
        "Report submitted";

      currentTask =
        "CASE-003 Under Review";
    }

    else if(
      case003Status ===
      "Solved"
    ){

      assignmentLabel =
        "Assignment completed";

      currentTask =
        "CASE-003 Completed";
    }

    else{

      assignmentLabel =
        "CASE-003 active";

      currentTask =
        "Investigate CASE-003 · Sub-Level 4";
    }

  }


  /* =====================================================
     DAY 5
  ===================================================== */

  if(
    worldDay === 5
  ){

    if(
      !mail007Read
    ){

      assignmentLabel =
        "Review result received";

      currentTask =
        "Read CASE-003 Review Result";
    }

    else{

      assignmentLabel =
        "Review complete";

      currentTask =
        "CASE-003 Closed · Await Further Authorization";
    }

  }


  /* =====================================================
     DAY 6+
  ===================================================== */

  if(
    worldDay >= 6
  ){

    if(
      !mail008Read
    ){

      assignmentLabel =
        "Personnel integrity alert";

      currentTask =
        "Read Mandatory Personnel Integrity Audit";
    }

    else if(
      !day6PersonnelRecordViewed
    ){

      assignmentLabel =
        "Employee record flagged";

      currentTask =
        "Inspect Your Employee Record";
    }

    else{

      assignmentLabel =
        "Registry review active";

      currentTask =
        "Personnel Continuity Discrepancy · Await Instructions";
    }
  }


  /* =====================================================
     END WORK DAY
  ===================================================== */

  let canEndWorkDay =
    false;


  if(
    worldDay === 1 &&
    case000Status === "Solved"
  ){

    canEndWorkDay =
      true;
  }


  if(
    worldDay === 2 &&
    case001Status === "Solved"
  ){

    canEndWorkDay =
      true;
  }


  if(
    worldDay === 3 &&
    case002Status === "Solved"
  ){

    canEndWorkDay =
      true;
  }


  if(
    worldDay === 4 &&
    (
      case003Status === "Under Review" ||
      case003Status === "Solved"
    )
  ){

    canEndWorkDay =
      true;
  }


  /*
    Day 5는 CASE-003 심사 결과를
    실제로 읽어야 종료할 수 있다.
  */

  if(
    worldDay === 5 &&
    mail007Read &&
    case003Status === "Solved"
  ){

    canEndWorkDay =
      true;
  }


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

          <b>
            ${employeeId}
          </b>

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

    const worldDay =
      World.getDay();


    /* DAY 1 */

    if(
      worldDay === 1
    ){

      talkToWhitmore();

      return;
    }


    /* DAY 2 */

    if(
      worldDay === 2
    ){

      const communicationsComplete =

        localStorage.getItem(
          "mailRead_MAIL-004"
        ) === "true"

        &&

        localStorage.getItem(
          "newsRead_NEWS-003"
        ) === "true"

        &&

        localStorage.getItem(
          "noticeRead_NOTICE-003"
        ) === "true";


      if(
        !communicationsComplete
      ){

        alert(
          "Review today's Owl Mail, Daily Prophet, and Notice Board before receiving your restricted assignment."
        );

        return;
      }


      openCase(
        "CASE-001"
      );

      return;
    }


    /* DAY 3 */

    if(
      worldDay === 3
    ){

      const briefingRead =
        localStorage.getItem(
          "mailRead_MAIL-005"
        ) === "true";


      if(
        !briefingRead
      ){

        alert(
          "Read the restricted Owl Mail from the Office of the Undersecretary first."
        );

        return;
      }


      openCase(
        "CASE-002"
      );

      return;
    }


    /* DAY 4 */

    if(
      worldDay === 4
    ){

      const directiveRead =
        localStorage.getItem(
          "mailRead_MAIL-006"
        ) === "true";


      if(
        !directiveRead
      ){

        alert(
          "Read the Sub-Level 4 Access Directive in Owl Mail first."
        );

        return;
      }


      const status =
        Player.getCaseStatus(
          "CASE-003"
        );


      if(
        status ===
        "Under Review"
      ){

        alert(
          "Your CASE-003 report has already been submitted. Await further Ministry instructions."
        );

        return;
      }


      if(
        status ===
        "Solved"
      ){

        alert(
          "CASE-003 has already been closed."
        );

        return;
      }


      openCase(
        "CASE-003"
      );

      return;
    }


    /* DAY 5 */

    if(
      worldDay === 5
    ){

      const reviewRead =
        localStorage.getItem(
          "mailRead_MAIL-007"
        ) === "true";


      if(
        !reviewRead
      ){

        alert(
          "Read the CASE-003 Review Result in Owl Mail."
        );

        return;
      }


      alert(
        "CASE-003 is closed. Await further classified authorization."
      );

      return;
    }


    /* DAY 6+ */

    if(
      worldDay >= 6
    ){

      const personnelAuditRead =
        localStorage.getItem(
          "mailRead_MAIL-008"
        ) === "true";


      if(
        !personnelAuditRead
      ){

        alert(
          "Read the Mandatory Personnel Integrity Audit in Owl Mail first."
        );

        return;
      }


      showPersonnelRecord();

      return;
    }


    alert(
      "No new Ministry assignment has been issued yet."
    );

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
