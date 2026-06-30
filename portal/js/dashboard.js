function showDashboard(){
  const name = localStorage.getItem("ministryApplicantName") || "Officer";
  const employeeId = localStorage.getItem("ministryEmployeeId") || "MOM-000000";
  const identity = JSON.parse(localStorage.getItem("ministryIdentity") || "{}");

  app.innerHTML = `
    <section class="office-screen">
      <div class="office-header">
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

      <div class="office-room">
        <button class="desk-item mail" onclick="openOfficeItem('Owl Mail')">
          📨
          <span>Owl Mail</span>
          <small>3 unread messages</small>
        </button>

        <button class="desk-item casefile" onclick="openOfficeItem('Today’s Assignment')">
          📂
          <span>Today’s Assignment</span>
          <small>Orientation required</small>
        </button>

        <button class="desk-item prophet" onclick="openOfficeItem('Daily Prophet')">
          📰
          <span>Daily Prophet</span>
          <small>Morning edition</small>
        </button>

        <button class="desk-item cabinet" onclick="openOfficeItem('Archive Cabinet')">
          🗄
          <span>Archive Cabinet</span>
          <small>The Hidden Files locked</small>
        </button>

        <button class="desk-item profile" onclick="openOfficeItem('Employee Profile')">
          🪪
          <span>Employee Profile</span>
          <small>${identity.house || "Unassigned"} · ${identity.patronus || "Unknown"}</small>
        </button>
      </div>

      <div class="terminal">OFFICE SESSION: ACTIVE
LOCATION: ARCHIVE DIVISION / OFFICE 3-B
WEATHER: LONDON RAIN
CURRENT TASK: COMPLETE ORIENTATION</div>
    </section>
  `;
}

function openOfficeItem(item){
  if(item === "Today’s Assignment"){
    showOrientationMemo();
    return;
  }

  alert(item + " will be implemented next.");
}
function showOrientationMemo(){
  app.innerHTML = `
    <section class="panel">
      <div class="seal">OFFICIAL MEMORANDUM</div>

      <h1>First Day Orientation</h1>
      <h2>Archive Division · Junior Officer</h2>

      <div class="notice">
        <p><b>To:</b> Newly Appointed Officer</p>
        <p><b>From:</b> Archive Division Personnel Office</p>
        <p><b>Priority:</b> High</p>

        <hr>

        <p>
          Congratulations on your appointment to the British Ministry of Magic.
        </p>

        <p>
          Before independent archive access can be granted, all junior officers
          must complete First Day Orientation.
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
  localStorage.setItem("orientationStarted", "true");
  localStorage.setItem("orientationStep", "profile");

  showOrientationTask();
}
function showOrientationTask(){
  const step = localStorage.getItem("orientationStep") || "profile";

  const tasks = {
    profile: {
      title: "Review Employee Profile",
      body: "Confirm your Ministry employee record and magical identity before receiving archive clearance.",
      next: "notice"
    },
    notice: {
      title: "Read Ministry Notice",
      body: "Review today’s official Ministry notice regarding archive safety and document handling.",
      next: "training"
    },
    training: {
      title: "Complete Archive Training",
      body: "Learn basic procedures for sealed records, corrupted files, and restricted archive access.",
      next: "clearance"
    },
    clearance: {
      title: "Receive Archive Clearance",
      body: "Your Level I archive clearance is ready to be issued.",
      next: "complete"
    }
  };

  const task = tasks[step];

  app.innerHTML = `
    <section class="panel">
      <div class="seal">FIRST DAY ORIENTATION</div>

      <h1>${task.title}</h1>
      <h2>Orientation Task</h2>

      <div class="notice">
        <p>${task.body}</p>
      </div>

      <div class="terminal">CURRENT TASK: ${task.title}
STATUS: IN PROGRESS
ARCHIVE ACCESS: PENDING</div>

      <div class="center">
        <button class="btn" onclick="completeOrientationTask('${task.next}')">
          COMPLETE TASK
        </button>
      </div>
    </section>
  `;
}

function completeOrientationTask(next){
  if(next === "complete"){
    localStorage.setItem("orientationComplete", "true");
    showArchiveClearanceGranted();
    return;
  }

  localStorage.setItem("orientationStep", next);
  showOrientationTask();
}

function showArchiveClearanceGranted(){
  app.innerHTML = `
    <section class="panel">
      <div class="seal">ARCHIVE CLEARANCE UPDATED</div>

      <h1>Access Granted</h1>
      <h2>Archive Division Clearance · Level I</h2>

      <div class="notice">
        <p>
          First Day Orientation has been completed.
        </p>

        <p>
          You are now authorized to access limited Archive Division materials.
        </p>

        <p class="muted">
          The Hidden Files will become available through the Archive Cabinet.
        </p>
      </div>

      <div class="terminal">ORIENTATION: COMPLETE
CLEARANCE: LEVEL I
ARCHIVE CABINET: UNLOCKED
THE HIDDEN FILES: LIMITED ACCESS AVAILABLE</div>

      <div class="center">
        <button class="btn" onclick="showDashboard()">
          RETURN TO OFFICE
        </button>
      </div>
    </section>
  `;
}