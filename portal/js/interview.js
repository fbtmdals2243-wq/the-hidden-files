let currentQuestionIndex = 0;

function startInterview(){
  MinistryIdentityEngine.reset();
  currentQuestionIndex = 0;
  showInterviewQuestion();
}

function showInterviewQuestion(){
  const q = MinistryQuestions[currentQuestionIndex];

  app.innerHTML = `
    <section class="panel">
      <div class="seal">MINISTRY RECRUITMENT INTERVIEW</div>

      <h1>${q.title}</h1>
      <h2>${q.stage}</h2>

      <div class="notice">
        <p><b>${q.interviewer}</b></p>
        <p class="muted">"There are no correct answers. Only truthful ones."</p>
      </div>

      <div class="terminal">${q.scenario}</div>

      <div class="notice">
        ${q.choices.map((choice, index)=>`
          <button class="choice" onclick="answerInterviewQuestion(${index})">
            ${choice.text}
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function answerInterviewQuestion(choiceIndex){
  const q = MinistryQuestions[currentQuestionIndex];
  const choice = q.choices[choiceIndex];

  MinistryIdentityEngine.applyAnswer(choice.scores);

  localStorage.setItem(
    `interview_${q.id}`,
    JSON.stringify({
      question: q.title,
      answer: choice.text,
      scores: choice.scores
    })
  );

  showInterviewerResponse(choice.response);
}

function showInterviewerResponse(response){
  const hasNext = currentQuestionIndex < MinistryQuestions.length - 1;

  app.innerHTML = `
    <section class="panel">
      <div class="seal">INTERVIEWER OBSERVATION</div>

      <h1>Response Recorded</h1>

      <div class="notice">
        <p>${response}</p>
      </div>

      <div class="terminal">RESPONSE STATUS: RECORDED
PERSONNEL PROFILE: UPDATED
${hasNext ? "NEXT INTERVIEW STAGE: READY" : "FINAL REVIEW: READY"}</div>

      <div class="center">
        <button class="btn" onclick="${hasNext ? "nextInterviewQuestion()" : "finishInterview()"}">
          ${hasNext ? "CONTINUE INTERVIEW" : "GENERATE PERSONNEL FILE"}
        </button>
      </div>
    </section>
  `;
}

function nextInterviewQuestion(){
  currentQuestionIndex++;
  showInterviewQuestion();
}

function finishInterview(){
  showProcessingScreen();
}
function showProcessingScreen(){
  app.innerHTML = `
    <section class="panel">
      <div class="seal">MINISTRY PERSONNEL OFFICE</div>

      <h1>Generating Personnel Record</h1>
      <h2>Please remain seated.</h2>

      <div class="terminal" id="processingLog">Initializing personnel analysis...</div>
    </section>
  `;

  const logs = [
    "Reviewing interview responses...",
    "Calculating magical temperament...",
    "Comparing historical Ministry profiles...",
    "Consulting wand registry...",
    "Detecting Patronus resonance...",
    "Assigning department compatibility...",
    "Generating employee identification..."
  ];

  let i = 0;
  const log = document.getElementById("processingLog");

  const timer = setInterval(()=>{
    log.textContent += "\n" + logs[i];
    i++;

    if(i >= logs.length){
      clearInterval(timer);

      setTimeout(()=>{
        const identity = MinistryIdentityEngine.generateIdentity();
        localStorage.setItem("ministryIdentity", JSON.stringify(identity));
        showIdentityPreview(identity);
      }, 900);
    }
  }, 650);
}