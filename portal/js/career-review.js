const MinistryCareerReview = {

  review: {

    id:
      "REVIEW-LEVEL-III",

    title:
      "Level III Career Readiness Review",

    authority:
      "Personnel Advancement Board",

    requiredQualification:
      "QUAL-CONTINUITY-I",

    requiredDuties:
      6,

    requiredServicePoints:
      12,

    awardedRank:
      "Senior Archive Officer",

    awardedClearance:
      "Level III",

    scenarios: [

      {
        id:
          "SCENARIO-INTEGRITY",

        title:
          "Record Integrity",

        briefing:
`A historical authorization conflicts with an active employee record.

Both records are authenticated and neither can be disproved.

As the reviewing officer, what is your first responsibility?`,

        choices: [
          {
            id: "current-only",
            label: "PRESERVE ONLY THE CURRENT RECORD",
            correct: false,
            feedback: "An authenticated historical record cannot be discarded for convenience."
          },
          {
            id: "preserve-both",
            label: "PRESERVE BOTH RECORDS AND DOCUMENT THE CONFLICT",
            correct: true,
            feedback: "Correct. Level III judgment begins with evidence integrity."
          },
          {
            id: "merge",
            label: "MERGE THE RECORDS INTO ONE IDENTITY",
            correct: false,
            feedback: "Shared authorization is not proof of shared identity."
          }
        ]
      },

      {
        id:
          "SCENARIO-AUTHORITY",

        title:
          "Authority and Clearance",

        briefing:
`A sealed Level IV component becomes relevant to a Level III assignment.

The investigation can continue without opening it.

What action is authorized?`,

        choices: [
          {
            id: "open",
            label: "OPEN THE COMPONENT USING ASSIGNMENT AUTHORITY",
            correct: false,
            feedback: "Assignment authority does not replace the required clearance."
          },
          {
            id: "stop",
            label: "DELETE THE REFERENCE AND CLOSE THE CASE",
            correct: false,
            feedback: "A clearance boundary must be documented, not erased."
          },
          {
            id: "escalate",
            label: "CONTINUE AUTHORIZED WORK AND REQUEST LEVEL IV ESCALATION",
            correct: true,
            feedback: "Correct. Work within clearance and preserve the escalation trail."
          }
        ]
      },

      {
        id:
          "SCENARIO-PEOPLE",

        title:
          "Employee Duty of Care",

        briefing:
`A colleague's credential triggers an unexplained legacy response.

There is no evidence of misconduct, but the system recommends immediate suspension.

What should a senior officer do?`,

        choices: [
          {
            id: "suspend",
            label: "SUSPEND THE EMPLOYEE WITHOUT REVIEW",
            correct: false,
            feedback: "An unexplained system response is not evidence of misconduct."
          },
          {
            id: "ignore",
            label: "IGNORE THE RESPONSE TO PROTECT THE EMPLOYEE",
            correct: false,
            feedback: "Duty of care includes investigating a genuine security event."
          },
          {
            id: "protect-review",
            label: "PROTECT CURRENT ACCESS, PRESERVE THE EVENT, AND OPEN REVIEW",
            correct: true,
            feedback: "Correct. Protect the employee and the Ministry while evidence is reviewed."
          }
        ]
      }
    ]
  },


  getProgressKey(){

    return (
      "careerReviewProgress_" +
      this.review.id
    );
  },


  getCompletionKey(){

    return (
      "careerReviewCompleted_" +
      this.review.id
    );
  },


  getCompletionTimeKey(){

    return (
      "careerReviewCompletedAt_" +
      this.review.id
    );
  },


  getProgress(){

    const saved =
      MinistryStorage.getJSON(
        this.getProgressKey(),
        {}
      );

    const completedScenarios =
      Array.isArray(saved.completedScenarios)
        ? saved.completedScenarios.filter(
            scenarioId =>
              this.review.scenarios.some(
                scenario =>
                  scenario.id === scenarioId
              )
          )
        : [];

    return {
      completedScenarios:
        Array.from(
          new Set(completedScenarios)
        ),
      answers:
        Array.isArray(saved.answers)
          ? saved.answers
          : []
    };
  },


  isEligible(){

    return (
      World.getDay() >= 17 &&
      Player.getCaseStatus(
        "CASE-006"
      ) === "Solved" &&
      Player.hasQualification(
        this.review.requiredQualification
      ) &&
      Player.getCompletedDuties() >=
        this.review.requiredDuties &&
      Player.getServicePoints() >=
        this.review.requiredServicePoints
    );
  },


  isCompleted(){

    const completed =
      MinistryStorage.getBoolean(
        this.getCompletionKey(),
        false
      );

    if(
      completed &&
      (
        Player.getRank() !==
          this.review.awardedRank ||
        Player.getClearance() !==
          this.review.awardedClearance
      )
    ){

      Player.setRank(
        this.review.awardedRank
      );

      Player.setClearance(
        this.review.awardedClearance
      );
    }

    return completed;
  },


  getCurrentScenario(){

    const progress =
      this.getProgress();

    return this.review.scenarios.find(
      scenario =>
        !progress.completedScenarios.includes(
          scenario.id
        )
    ) || null;
  },


  submitAnswer(scenarioId, choiceId){

    if(!this.isEligible()){

      return {
        success: false,
        correct: false,
        completed: false,
        feedback: "Career review requirements have not been met."
      };
    }

    if(this.isCompleted()){

      return {
        success: true,
        correct: true,
        completed: true,
        feedback: "This career review is already complete."
      };
    }

    const scenario =
      this.getCurrentScenario();

    if(
      !scenario ||
      scenario.id !== scenarioId
    ){

      return {
        success: false,
        correct: false,
        completed: false,
        feedback: "Complete the current review scenario first."
      };
    }

    const choice =
      scenario.choices.find(
        item => item.id === choiceId
      );

    if(!choice){

      return {
        success: false,
        correct: false,
        completed: false,
        feedback: "The selected response is unavailable."
      };
    }

    if(!choice.correct){

      return {
        success: false,
        correct: false,
        completed: false,
        feedback: choice.feedback
      };
    }

    const progress =
      this.getProgress();

    progress.completedScenarios.push(
      scenario.id
    );

    progress.answers.push({
      scenarioId:
        scenario.id,
      choiceId:
        choice.id,
      completedAt:
        new Date().toISOString()
    });

    MinistryStorage.setJSON(
      this.getProgressKey(),
      progress
    );

    const completed =
      progress.completedScenarios.length >=
      this.review.scenarios.length;

    if(completed){

      MinistryStorage.setItem(
        this.getCompletionKey(),
        "true"
      );

      MinistryStorage.setItem(
        this.getCompletionTimeKey(),
        new Date().toISOString()
      );

      Player.setRank(
        this.review.awardedRank
      );

      Player.setClearance(
        this.review.awardedClearance
      );
    }

    return {
      success: true,
      correct: true,
      completed,
      feedback: choice.feedback
    };
  }
};


function showCareerReview(
  feedback = "",
  isWarning = false
){

  const review =
    MinistryCareerReview.review;

  if(MinistryCareerReview.isCompleted()){

    showCareerReviewCertificate();
    return;
  }

  if(!MinistryCareerReview.isEligible()){

    app.innerHTML = `
      <section class="panel">
        <div class="seal">PERSONNEL ADVANCEMENT BOARD</div>
        <h1>Career Review</h1>
        <h2>Requirements Pending</h2>

        ${renderMinistryDocument({
          seal: "CAREER READINESS REGISTER",
          title: review.title,
          subtitle: Player.getEmployeeId(),
          classification: "Personnel · Internal",
          department: "Personnel Advancement Board",
          status: "Not Yet Eligible",
          body:`Required Work Day: Day 17
Required Qualification: Continuity Records Handling · Grade I
Required Daily Duties: ${review.requiredDuties}
Required Service Points: ${review.requiredServicePoints}

Current Daily Duties: ${Player.getCompletedDuties()}
Current Service Points: ${Player.getServicePoints()}`,
          footer: "PERSONNEL ADVANCEMENT BOARD"
        })}

        <div class="center">
          <button class="btn" onclick="showDashboard()">RETURN TO OFFICE</button>
        </div>
      </section>
    `;

    return;
  }

  if(
    MinistryStorage.getItem(
      "mailRead_MAIL-015",
      "false"
    ) !== "true"
  ){

    app.innerHTML = `
      <section class="panel">
        <div class="seal">PERSONNEL ADVANCEMENT BOARD</div>
        <h1>Career Review</h1>
        <h2>Directive Required</h2>
        <div class="notice warning">
          <p>Read the Level III Career Readiness directive in Owl Mail before beginning the review.</p>
        </div>
        <div class="center">
          <button class="btn" onclick="showOwlMail()">OPEN OWL MAIL</button>
          <button class="btn" onclick="showDashboard()">RETURN TO OFFICE</button>
        </div>
      </section>
    `;

    return;
  }

  const progress =
    MinistryCareerReview.getProgress();

  const scenario =
    MinistryCareerReview.getCurrentScenario();

  if(!scenario){
    showCareerReviewCertificate();
    return;
  }

  app.innerHTML = `
    <section class="panel">
      <div class="seal">PERSONNEL ADVANCEMENT BOARD</div>
      <h1>${review.title}</h1>
      <h2>Scenario ${progress.completedScenarios.length + 1} of ${review.scenarios.length}</h2>

      ${feedback
        ? `<div class="notice ${isWarning ? "warning" : ""}"><p>${feedback}</p></div>`
        : ""}

      ${renderMinistryDocument({
        seal: "CAREER JUDGMENT REVIEW",
        title: scenario.title,
        subtitle: review.id,
        classification: "Level III Readiness",
        department: review.authority,
        status: "Response Required",
        body: scenario.briefing,
        footer: "PERSONNEL ADVANCEMENT BOARD"
      })}

      <div class="case-list">
        ${scenario.choices.map(
          choice => `
            <button class="case-entry available" onclick="answerCareerReview('${scenario.id}','${choice.id}')">
              <b>OFFICIAL RESPONSE</b>
              <span>${choice.label}</span>
              <small>Record judgment</small>
            </button>
          `
        ).join("")}
      </div>

      <div class="center">
        <button class="btn" onclick="showDashboard()">RETURN TO OFFICE</button>
      </div>
    </section>
  `;
}


function answerCareerReview(
  scenarioId,
  choiceId
){

  const result =
    MinistryCareerReview.submitAnswer(
      scenarioId,
      choiceId
    );

  if(result.completed){
    showCareerReviewCertificate();
    return;
  }

  showCareerReview(
    result.feedback,
    !result.correct
  );
}


function showCareerReviewCertificate(){

  if(!MinistryCareerReview.isCompleted()){
    showCareerReview();
    return;
  }

  const review =
    MinistryCareerReview.review;

  app.innerHTML = `
    <section class="panel">
      <div class="seal">CAREER REVIEW APPROVED</div>
      <h1>${review.awardedRank}</h1>
      <h2>${review.awardedClearance} Clearance Granted</h2>

      ${renderMinistryDocument({
        seal: "MINISTRY CAREER RECORD",
        title: "Level III Appointment Certificate",
        subtitle: Player.getEmployeeId(),
        classification: "Personnel Record",
        department: review.authority,
        status: "Approved",
        body:`EMPLOYEE: ${Player.getName()}
EMPLOYEE NUMBER: ${Player.getEmployeeId()}

NEW RANK: ${Player.getRank()}
NEW CLEARANCE: ${Player.getClearance()}

The employee demonstrated record integrity,
clearance discipline, and duty of care.

Level IV materials remain restricted.`,
        footer: "PERSONNEL ADVANCEMENT BOARD"
      })}

      <div class="center">
        <button class="btn" onclick="showDashboard()">RETURN TO OFFICE</button>
      </div>
    </section>
  `;
}
