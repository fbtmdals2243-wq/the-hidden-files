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
        <p>Before independent archive access can be granted, all junior officers must complete First Day Orientation.</p>
      </div>

      <div class="terminal">FIRST DAY ORIENTATION
[ ] Review Employee Profile
[ ] Read Ministry Notice
[ ] Complete Archive Training
[ ] Receive Archive Clearance</div>

      <div class="center">
        <button class="btn" onclick="startOrientation()">BEGIN ORIENTATION</button>
        <button class="btn" onclick="showDashboard()">RETURN TO OFFICE</button>
      </div>
    </section>
  `;
}

function startOrientation(){
  localStorage.setItem("orientationStep", "profile");
  showOrientationTask();
}

function showOrientationTask(){
  const step = localStorage.getItem("orientationStep") || "profile";

  const tasks = {
    profile: ["Review Employee Profile", "Confirm your Ministry employee record and magical identity."],
    notice: ["Read Ministry Notice", "Review today’s official Ministry notice."],
    training: ["Complete Archive Training", "Learn basic procedures for sealed records and restricted files."],
    clearance: ["Receive Archive Clearance", "Your Level I archive clearance is ready to be issued."]
  };

  const nextMap = {
    profile: "notice",
    notice: "training",
    training: "clearance",
    clearance: "complete"
  };

  const task = tasks[step];

  app.innerHTML = `
    <section class="panel">
      <div class="seal">FIRST DAY ORIENTATION</div>

      <h1>${task[0]}</h1>
      <h2>Orientation Task</h2>

      <div class="notice">
        <p>${task[1]}</p>
      </div>

      <div class="terminal">CURRENT TASK: ${task[0]}
STATUS: IN PROGRESS
ARCHIVE ACCESS: PENDING</div>

      <div class="center">
        <button class="btn" onclick="completeOrientationTask('${nextMap[step]}')">COMPLETE TASK</button>
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
        <p>First Day Orientation has been completed.</p>
        <p>You are now authorized to access limited Archive Division materials.</p>
      </div>

      <div class="terminal">ORIENTATION: COMPLETE
CLEARANCE: LEVEL I
ARCHIVE CABINET: UNLOCKED
THE HIDDEN FILES: LIMITED ACCESS AVAILABLE</div>

      <div class="center">
        <button class="btn" onclick="showDashboard()">RETURN TO OFFICE</button>
      </div>
    </section>
  `;
}