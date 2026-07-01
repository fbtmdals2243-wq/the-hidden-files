function showDashboard(){
  const name = localStorage.getItem("ministryApplicantName") || "Officer";
  const employeeId = localStorage.getItem("ministryEmployeeId") || "MOM-000000";
  const identity = JSON.parse(localStorage.getItem("ministryIdentity") || "{}");
  const orientationComplete = localStorage.getItem("orientationComplete") === "true";
  const case000Status = localStorage.getItem("caseStatus_CASE-000") || "Active";

  const mailRead = localStorage.getItem("mailRead_MAIL-002") === "true";
  const committeeMailRead = localStorage.getItem("mailRead_MAIL-003") === "true";
  const newsRead = localStorage.getItem("newsRead_NEWS-002") === "true";
  const noticeRead = localStorage.getItem("noticeRead_NOTICE-002") === "true";

  const mailLabel =
    case000Status === "Committee Pending"
      ? (committeeMailRead ? "Reviewed" : "Committee mail")
      : case000Status === "Under Review"
        ? (mailRead ? "Reviewed" : "New mail")
        : "1 unread";

  const newsLabel =
    case000Status === "Under Review"
      ? (newsRead ? "Reviewed" : "New article")
      : "Morning edition";

  const noticeLabel =
    case000Status === "Under Review"
      ? (noticeRead ? "Reviewed" : "1 new notice")
      : "Security reminder";

  const assignmentLabel =
  case000Status === "Solved"
    ? "Assignment completed"
    : case000Status === "Committee Pending"
      ? "Await committee response"
      : case000Status === "Under Review"
        ? "Await review result"
        : orientationComplete
          ? "Completed"
          : "Orientation required";

  let currentTask = "Archive Access Available";

if(case000Status === "Under Review"){
  currentTask = "CASE-000 Under Review";
}

if(case000Status === "Committee Pending"){
  currentTask = "Await Committee Response";
}

if(case000Status === "Solved"){
  currentTask = "CASE-000 Completed";
}

  app.innerHTML = `
    <section class="office-scene">
      <div class="office-window">
        <div class="rain"></div>
        <div class="window-text">LONDON · ARCHIVE DIVISION</div>
      </div>

      <div class="office-topbar">
        <div>
          <div class="seal">BRITISH MINISTRY OF MAGIC</div>
          <h1>Office 3-B</h1>
          <h2>Good Morning, Officer ${name}</h2>
        </div>

        <div class="office-status">
          <b>${employeeId}</b><br>
          ${identity.department || "Archive Division"}<br>
          Clearance Level I
        </div>
      </div>

      <div class="desk-scene">
        <button class="object employee-id" onclick="openOfficeItem('Employee Profile')">
          🪪
          <span>Employee ID</span>
        </button>

        <button class="object owl-mail" onclick="openOfficeItem('Owl Mail')">
          📨
          <span>Owl Mail</span>
          <small>${mailLabel}</small>
        </button>

        <button class="object assignment" onclick="openOfficeItem('Today’s Assignment')">
          📂
          <span>Today's Assignment</span>
          <small>${assignmentLabel}</small>
        </button>

        <button class="object prophet" onclick="openOfficeItem('Daily Prophet')">
          📰
          <span>Daily Prophet</span>
          <small>${newsLabel}</small>
        </button>

        <button class="object notice-board" onclick="openOfficeItem('Notice Board')">
          📌
          <span>Notice Board</span>
          <small>${noticeLabel}</small>
        </button>

        <button class="object coffee" onclick="openOfficeItem('Coffee')">
          ☕
          <span>Coffee</span>
        </button>

        <button class="object cabinet ${orientationComplete ? "unlocked" : "locked"}" onclick="openOfficeItem('Archive Cabinet')">
          🗄
          <span>Archive Cabinet</span>
          <small>${orientationComplete ? "Access granted" : "Locked"}</small>
        </button>
      </div>

      <div class="terminal office-terminal">OFFICE SESSION: ACTIVE
LOCATION: ARCHIVE DIVISION / OFFICE 3-B
WEATHER: LONDON RAIN
CURRENT TASK: ${orientationComplete ? currentTask : "COMPLETE ORIENTATION"}</div>
    </section>
  `;
}

function openOfficeItem(item){
    if(item === "Employee Profile"){
  showPersonnelRecord();
  return;
}
  if(item === "Today’s Assignment"){
  talkToWhitmore();
  return;
}
if(item === "Owl Mail"){
  showOwlMail();
  return;
}
  if(item === "Archive Cabinet"){
    const orientationComplete = localStorage.getItem("orientationComplete") === "true";

    if(!orientationComplete){
      alert("Archive Cabinet is locked. Complete First Day Orientation first.");
      return;
    }

    showArchiveCabinet();
return;
  }
if(item === "Daily Prophet"){
    showDailyProphet();
    return;
}
if(item === "Notice Board"){
  showNoticeBoard();
  return;
}
  alert(item + " will be implemented next.");
}