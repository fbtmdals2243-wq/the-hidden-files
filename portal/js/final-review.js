const MinistryFinalReview = {

  review: {

    id:
      "REVIEW-LEVEL-IV",

    title:
      "Level IV Continuity Authority Review",

    authority:
      "Personnel Continuity Final Board",

    requiredQualification:
      "QUAL-CONTINUITY-I",

    awardedQualification: {
      id:
        "QUAL-CONTINUITY-II",
      title:
        "Continuity Records Handling · Grade II",
      authority:
        "Personnel Continuity Final Board"
    },

    awardedRank:
      "Principal Archive Officer",

    awardedClearance:
      "Level IV",

    scenarios: [

      {
        id:
          "SCENARIO-SEPARATE-IDENTITIES",

        title:
          "Identity Separation",

        briefing:
`MOM-000117 and the current officer share one appointment authorization.

All available evidence continues to show two separate people.

What must the final personnel record preserve?`,

        choices: [
          {
            id: "replace-current",
            label: "REPLACE THE CURRENT IDENTITY WITH MOM-000117",
            correct: false,
            feedback: "A shared appointment cannot erase a lawful current identity."
          },
          {
            id: "erase-historical",
            label: "ERASE MOM-000117 TO REMOVE THE CONFLICT",
            correct: false,
            feedback: "The Ministry may not solve a record conflict by repeating the original deletion."
          },
          {
            id: "preserve-two",
            label: "PRESERVE TWO IDENTITIES AND ONE CONTINUING APPOINTMENT",
            correct: true,
            feedback: "Correct. Continuity belongs to the office; identity belongs to the person."
          }
        ]
      },

      {
        id:
          "SCENARIO-DELETION-ORDER",

        title:
          "Destructive Archive Order",

        briefing:
`A valid historical order directs the Archive Division to remove a person's name and every audit event connected to it.

The order is authentic, but its legal review is missing.

What is the authorized Level IV response?`,

        choices: [
          {
            id: "execute",
            label: "EXECUTE THE AUTHENTIC ORDER IMMEDIATELY",
            correct: false,
            feedback: "Authenticity proves origin, not continuing legal authority."
          },
          {
            id: "hide",
            label: "HIDE THE ORDER WITHOUT RECORDING IT",
            correct: false,
            feedback: "Secret preservation without an audit trail creates another hidden deletion."
          },
          {
            id: "suspend-preserve",
            label: "SUSPEND DELETION, PRESERVE THE ORDER, AND OPEN REVIEW",
            correct: true,
            feedback: "Correct. Protect the person, the evidence, and the lawful review process."
          }
        ]
      },

      {
        id:
          "SCENARIO-OMEGA-WARRANT",

        title:
          "Omega Warrant",

        briefing:
`The Final Board offers a one-record Continuity Warrant for CASE-ZERO.

It does not grant general Level V authority.

How may the warrant be used?`,

        choices: [
          {
            id: "browse-all",
            label: "OPEN EVERY LEVEL V RECORD CONNECTED TO THE CASE",
            correct: false,
            feedback: "A one-record warrant cannot be expanded by association."
          },
          {
            id: "delegate",
            label: "TRANSFER THE WARRANT TO ANOTHER OFFICER",
            correct: false,
            feedback: "The warrant is bound to the current Continuity appointment."
          },
          {
            id: "open-log-return",
            label: "OPEN CASE-ZERO, LOG EVERY ACTION, AND RETURN THE WARRANT",
            correct: true,
            feedback: "Correct. Exceptional access remains narrow, recorded, and temporary."
          }
        ]
      }
    ]
  },


  getProgressKey(){

    return (
      "finalReviewProgress_" +
      this.review.id
    );
  },


  getCompletionKey(){

    return (
      "finalReviewCompleted_" +
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
      World.getDay() >= 20 &&
      Player.getCaseStatus(
        "CASE-008"
      ) === "Solved" &&
      MinistryStorage.getBoolean(
        "sealedCompatibilityConditionThree",
        false
      ) &&
      MinistryStorage.getBoolean(
        "mailRead_MAIL-019",
        false
      ) &&
      Player.hasQualification(
        this.review.requiredQualification
      )
    );
  },


  isCompleted(){

    const completed =
      MinistryStorage.getBoolean(
        this.getCompletionKey(),
        false
      );

    if(completed){

      if(
        Player.getRank() !==
        this.review.awardedRank
      ){
        Player.setRank(
          this.review.awardedRank
        );
      }

      if(
        Player.getClearance() !==
        this.review.awardedClearance
      ){
        Player.setClearance(
          this.review.awardedClearance
        );
      }

      Player.addQualification(
        this.review.awardedQualification
      );

      MinistryStorage.setItem(
        "continuityOmegaWarrant",
        "true"
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
        feedback: "Final Continuity Review requirements have not been met."
      };
    }

    if(this.isCompleted()){

      return {
        success: true,
        correct: true,
        completed: true,
        feedback: "The Level IV Continuity Authority Review is already complete."
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
        feedback: "Complete the current Final Board scenario first."
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
        "finalReviewCompletedAt",
        new Date().toISOString()
      );

      MinistryStorage.setItem(
        "finalReviewCompletedDay",
        String(World.getDay())
      );

      MinistryStorage.setItem(
        "continuityOmegaWarrant",
        "true"
      );

      MinistryStorage.setItem(
        "finalStoryStage",
        "level-iv-authorized"
      );

      Player.setRank(
        this.review.awardedRank
      );

      Player.setClearance(
        this.review.awardedClearance
      );

      Player.addQualification(
        this.review.awardedQualification
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


function showFinalContinuityReview(
  feedback = "",
  isWarning = false
){

  if(MinistryFinalReview.isCompleted()){
    showFinalReviewCertificate();
    return;
  }

  if(!MinistryFinalReview.isEligible()){

    app.innerHTML = `
      <section class="panel">
        <div class="seal">PERSONNEL CONTINUITY FINAL BOARD</div>
        <h1>Level IV Review</h1>
        <h2>Authorization Not Available</h2>

        <div class="notice">
          <p>Complete CASE-008 and read the Final Compatibility determination before reporting to the Board.</p>
        </div>

        <div class="center">
          <button class="btn" onclick="showDashboard()">RETURN TO OFFICE</button>
        </div>
      </section>
    `;

    return;
  }

  const review =
    MinistryFinalReview.review;

  const progress =
    MinistryFinalReview.getProgress();

  const scenario =
    MinistryFinalReview.getCurrentScenario();

  if(!scenario){
    showFinalReviewCertificate();
    return;
  }

  app.innerHTML = `
    <section class="panel">
      <div class="seal">PERSONNEL CONTINUITY FINAL BOARD</div>
      <h1>${review.title}</h1>
      <h2>${scenario.title}</h2>

      ${feedback
        ? `<div class="notice ${isWarning ? "warning" : ""}"><p>${feedback}</p></div>`
        : ""}

      ${renderMinistryDocument({
        seal: "LEVEL IV AUTHORITY REVIEW",
        title: scenario.title,
        subtitle:
          "Scenario " +
          (progress.completedScenarios.length + 1) +
          " of " +
          review.scenarios.length,
        classification: "Level IV Board · Controlled",
        department: review.authority,
        status: "Response Required",
        body: scenario.briefing,
        footer: "PERSONNEL CONTINUITY FINAL BOARD"
      })}

      <div class="case-list">
        ${scenario.choices.map(
          choice => `
            <button class="case-entry available" onclick="answerFinalContinuityReview('${scenario.id}','${choice.id}')">
              <b>BOARD RESPONSE</b>
              <span>${choice.label}</span>
              <small>Recorded judgment</small>
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


function answerFinalContinuityReview(
  scenarioId,
  choiceId
){

  const result =
    MinistryFinalReview.submitAnswer(
      scenarioId,
      choiceId
    );

  if(result.completed){
    showFinalReviewCertificate();
    return;
  }

  showFinalContinuityReview(
    result.feedback,
    !result.success
  );
}


function showFinalReviewCertificate(){

  if(!MinistryFinalReview.isCompleted()){
    showFinalContinuityReview();
    return;
  }

  const review =
    MinistryFinalReview.review;

  app.innerHTML = `
    <section class="panel">
      <div class="seal">LEVEL IV AUTHORITY ISSUED</div>
      <h1>${review.awardedRank}</h1>
      <h2>${Player.getEmployeeId()}</h2>

      ${renderMinistryDocument({
        seal: "PERSONNEL CONTINUITY FINAL BOARD",
        title: "Level IV Continuity Authority",
        subtitle: "Permanent Career Record",
        classification: "Personnel · Level IV",
        department: "Archive Division",
        status: "Approved",
        body:`RANK:
${review.awardedRank}

CLEARANCE:
${review.awardedClearance}

QUALIFICATION:
${review.awardedQualification.title}

SPECIAL AUTHORITY:
ONE-RECORD Ω CONTINUITY WARRANT

The warrant authorizes CASE-ZERO only.
It does not grant general Level V access.`,
        footer: "LEVEL IV AUTHORITY · EMPLOYEE COPY"
      })}

      <div class="center">
        <button class="btn" onclick="showDashboard()">RETURN TO OFFICE</button>
      </div>
    </section>
  `;
}
