const app = document.getElementById("app");

function showRecruitment(){
  app.innerHTML = `
    <section class="panel">
      <div class="seal">BRITISH MINISTRY OF MAGIC</div>

      <h1>Recruitment Division</h1>
      <h2>Magical Personnel Intake Office</h2>

      <div class="notice">
        <p>The Ministry is currently accepting new candidates for internal appointment.</p>
        <p>All applicants must complete a Magical Identity Assessment before receiving official employee clearance.</p>
        <p class="muted">
          This process will evaluate magical aptitude, ethical judgment,
          decision-making, psychological tendency, and departmental compatibility.
        </p>
      </div>

      <div class="terminal">APPLICATION STATUS: OPEN
ASSESSMENT TYPE: MAGICAL IDENTITY
ESTIMATED TIME: 10 MINUTES
CLEARANCE ISSUANCE: PENDING</div>

      <div class="center">
        <button class="btn" onclick="showApplication()">BEGIN APPLICATION</button>
      </div>
    </section>
  `;
}

function showApplication(){
  app.innerHTML = `
    <section class="panel">
      <div class="seal">MINISTRY APPLICATION FORM</div>

      <h1>Applicant Registration</h1>
      <h2>Magical Personnel Intake Record</h2>

      <div class="notice">
        <label>Applicant Name</label>
        <input id="applicantName" class="field" placeholder="Enter your name">

        <label>Preferred Department</label>
        <select id="preferredDepartment" class="field">
          <option>Archive Division</option>
          <option>Auror Office</option>
          <option>Department of Mysteries</option>
          <option>Magical Law Enforcement</option>
          <option>Magical Creatures Division</option>
        </select>

        <label>Why do you wish to serve the Ministry?</label>
        <textarea id="motivation" class="field area" placeholder="Write your answer..."></textarea>
      </div>

      <div class="terminal">FORM STATUS: INCOMPLETE
CANDIDATE CLEARANCE: NOT ISSUED
NEXT STEP: MAGICAL IDENTITY ASSESSMENT</div>

      <div class="center">
        <button class="btn" onclick="submitApplication()">SUBMIT APPLICATION</button>
      </div>
    </section>
  `;
}

function submitApplication(){
  const name = document.getElementById("applicantName").value.trim();
  const department = document.getElementById("preferredDepartment").value;
  const motivation = document.getElementById("motivation").value.trim();

  if(!name){
    alert("Applicant name is required.");
    return;
  }

  localStorage.setItem("ministryApplicantName", name);
  localStorage.setItem("ministryPreferredDepartment", department);
  localStorage.setItem("ministryMotivation", motivation);

  showAssessmentIntro();
}
function showAssessmentIntro(){
  const name = localStorage.getItem("ministryApplicantName") || "Applicant";

  app.innerHTML = `
    <section class="panel">
      <div class="seal">MAGICAL IDENTITY ASSESSMENT</div>

      <h1>Assessment Notice</h1>
      <h2>Candidate Record: ${name}</h2>

      <div class="notice">
        <p>
          Your application has been received by the British Ministry of Magic.
        </p>

        <p>
          Before an employee identification card can be issued,
          you must complete a Ministry-approved Magical Identity Assessment.
        </p>

        <p class="muted">
          Your responses will be used to evaluate magical temperament,
          ethical judgment, departmental compatibility, and long-term clearance potential.
        </p>
      </div>

      <div class="terminal">APPLICATION STATUS: RECEIVED
CANDIDATE: ${name.toUpperCase()}
ASSESSMENT STATUS: READY
IDENTITY RECORD: NOT YET GENERATED</div>

      <div class="center">
        <button class="btn" onclick="startInterview()">BEGIN ASSESSMENT</button>
      </div>
    </section>
  `;
}
function showQuestionOne(){
  app.innerHTML = `
    <section class="panel">
      <div class="seal">ASSESSMENT 01 / ETHICAL JUDGMENT</div>

      <h1>Question One</h1>
      <h2>Restricted Magic Incident</h2>

      <div class="notice">
        <p>
          While transporting a sealed archive record, you witness a fellow Ministry employee
          using an unauthorized spell to access restricted material.
        </p>

        <p>
          What do you do?
        </p>

        <button class="choice" onclick="selectAnswer('duty')">
          Report the incident immediately.
        </button>

        <button class="choice" onclick="selectAnswer('empathy')">
          Ask why they did it before deciding.
        </button>

        <button class="choice" onclick="selectAnswer('loyalty')">
          Keep quiet, but watch them carefully.
        </button>

        <button class="choice" onclick="selectAnswer('independence')">
          Investigate the restricted material yourself.
        </button>
      </div>
    </section>
  `;
}

function selectAnswer(type){
  const scoreMap = {
    duty: {
      duty: 8,
      discretion: 4,
      loyalty: 2
    },

    empathy: {
      empathy: 8,
      logic: 3,
      discretion: 2
    },

    loyalty: {
      loyalty: 7,
      discretion: 5,
      empathy: 2
    },

    independence: {
      independence: 8,
      curiosity: 5,
      ambition: 3
    }
  };

  localStorage.setItem("assessment_q1", type);

  MinistryIdentityEngine.reset();
  MinistryIdentityEngine.applyAnswer(scoreMap[type]);

  const identity = MinistryIdentityEngine.generateIdentity();

  localStorage.setItem("ministryIdentity", JSON.stringify(identity));

  showIdentityPreview(identity);
}
function showIdentityPreview(identity){
  const name = localStorage.getItem("ministryApplicantName") || "Applicant";
  const wand = identity.wand;
  const employeeId = "MOM-" + Math.floor(100000 + Math.random() * 900000);

  localStorage.setItem("ministryEmployeeId", employeeId);

  app.innerHTML = `
    <section class="panel">
      <div class="seal">BRITISH MINISTRY OF MAGIC</div>

      <h1>Employee Record Created</h1>
      <h2>Magical Personnel Identification Issued</h2>

      <div class="id-card">
        <div class="id-header">MINISTRY EMPLOYEE IDENTIFICATION</div>

        <div class="id-body">
          <div class="id-photo">OFFICIAL<br>PORTRAIT</div>

          <div class="id-info">

<p><b>Name</b><span>${name}</span></p>

<p><b>Employee ID</b><span>${employeeId}</span></p>

<p><b>Department</b><span>${identity.department}</span></p>

<p><b>Rank</b><span>Junior Officer</span></p>

<p><b>Clearance</b><span>LEVEL I</span></p>

<p><b>House</b><span>${identity.house}</span></p>

<p><b>Patronus</b><span>${identity.patronus}</span></p>

<p><b>Status</b><span>ACTIVE</span></p>

<p><b>Issue Date</b><span>${new Date().toLocaleDateString()}</span></p>

</div>
        </div>

        <div class="id-footer">
          BRITISH MINISTRY OF MAGIC · PERSONNEL RECORD ACTIVE
        </div>
      </div>

      <div class="terminal">WAND REGISTRY
WOOD: ${wand.wood}
CORE: ${wand.core}
LENGTH: ${wand.length}
FLEXIBILITY: ${wand.flexibility}

STATUS: EMPLOYEE RECORD GENERATED
PORTAL ACCESS: PENDING</div>

      <div class="center">
      <button class="btn" onclick="enterPortal()">
ENTER MINISTRY PORTAL
</button>
        <button class="btn" onclick="downloadEmployeeId()">DOWNLOAD EMPLOYEE ID</button>
<button class="btn" onclick="showRecruitment()">RETURN TO RECRUITMENT</button>
      </div>
    </section>
  `;
}
showRecruitment();
function downloadEmployeeId(){
  alert("Employee ID download feature will be added in the next step.");
}
function enterPortal(){
    showPortalAuthentication();
}

function showPortalAuthentication(){
    app.innerHTML = `
        <section class="panel">
            <div class="seal">MINISTRY SECURITY NETWORK</div>

            <h1>Authenticating...</h1>

            <div class="terminal" id="authLog">
Verifying Employee Record...
            </div>
        </section>
    `;

    const messages = [
        "Checking Ministry Personnel Database...",
        "Employee Record Located.",
        "Clearance Level I Confirmed.",
        "Archive Division Access Granted.",
        "Opening Ministry Portal..."
    ];

    let i = 0;
    const log = document.getElementById("authLog");

    const timer = setInterval(() => {
        log.textContent += "\n" + messages[i];
        i++;

        if(i >= messages.length){
            clearInterval(timer);

            setTimeout(() => {
    showDashboard();
}, 1000);
        }
    }, 700);
}