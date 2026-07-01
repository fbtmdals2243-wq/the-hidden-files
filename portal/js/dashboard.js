function showDashboard(){
  const name = localStorage.getItem("ministryApplicantName") || "Officer";
  const employeeId = localStorage.getItem("ministryEmployeeId") || "MOM-000000";
  const identity = JSON.parse(localStorage.getItem("ministryIdentity") || "{}");
  const orientationComplete = localStorage.getItem("orientationComplete") === "true";

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
          <small>3 unread</small>
        </button>

        <button class="object assignment" onclick="openOfficeItem('Today’s Assignment')">
          📂
          <span>Today's Assignment</span>
          <small>${orientationComplete ? "Completed" : "Orientation required"}</small>
        </button>

        <button class="object prophet" onclick="openOfficeItem('Daily Prophet')">
          📰
          <span>Daily Prophet</span>
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
CURRENT TASK: ${orientationComplete ? "ARCHIVE ACCESS AVAILABLE" : "COMPLETE ORIENTATION"}</div>
    </section>
  `;
}

function openOfficeItem(item){
  if(item === "Today’s Assignment"){
    showWhitmoreIntro();
    return;
  }

  if(item === "Archive Cabinet"){
    const orientationComplete = localStorage.getItem("orientationComplete") === "true";

    if(!orientationComplete){
      alert("Archive Cabinet is locked. Complete First Day Orientation first.");
      return;
    }

    alert("The Hidden Files access will be implemented next.");
    return;
  }

  alert(item + " will be implemented next.");
}