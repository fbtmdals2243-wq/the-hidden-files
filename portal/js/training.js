const MinistryTraining = {

  course: {

    id:
      "TRAIN-CONTINUITY-I",

    title:
      "Continuity Records Handling",

    grade:
      "Grade I",

    qualificationId:
      "QUAL-CONTINUITY-I",

    qualificationTitle:
      "Continuity Records Handling · Grade I",

    authority:
      "Ministry Training Office",

    classification:
      "Internal · Level II",

    summary:
`This mandatory course authorizes a Continuity Liaison
to preserve, compare, and escalate legacy personnel records
without collapsing historical and current identities.

The course does not grant permission to enter Room 4-7,
open Level IV compatibility components,
or alter a Continuity Subject record.`,

    modules: [

      {
        id:
          "MODULE-IDENTITY",

        title:
          "Identity and Authorization",

        briefing:
`A current employee and a historical Continuity Subject
are recognized by the same appointment authorization.

No evidence establishes that they share an identity.

What must the reviewing officer record?`,

        choices: [

          {
            id:
              "merge",

            label:
              "MERGE BOTH PERSONNEL IDENTITIES",

            correct:
              false,

            feedback:
              "Authorization correspondence does not establish identity. Preserve both employee records separately."
          },

          {
            id:
              "preserve",

            label:
              "PRESERVE BOTH IDENTITIES AND DOCUMENT THE SHARED AUTHORIZATION",

            correct:
              true,

            feedback:
              "Correct. Identity and authorization must remain separate findings."
          },

          {
            id:
              "erase",

            label:
              "REMOVE THE HISTORICAL RECORD",

            correct:
              false,

            feedback:
              "Continuity records cannot be erased by a Level II officer. Preserve and escalate the discrepancy."
          }

        ]
      },


      {
        id:
          "MODULE-CONFLICT",

        title:
          "Contradictory Record Preservation",

        briefing:
`A sealed legacy receipt describes a decision
before the current employee made that decision.

Both timestamps pass Ministry authentication.

What is the correct records action?`,

        choices: [

          {
            id:
              "overwrite",

            label:
              "KEEP THE NEWER RECORD AND OVERWRITE THE LEGACY RECEIPT",

            correct:
              false,

            feedback:
              "Never resolve an authenticated contradiction by destroying one side of the evidence."
          },

          {
            id:
              "choose-old",

            label:
              "ACCEPT THE OLDER TIMESTAMP AS AUTOMATICALLY CORRECT",

            correct:
              false,

            feedback:
              "Age does not establish priority when both records are authenticated."
          },

          {
            id:
              "dual-preserve",

            label:
              "PRESERVE BOTH RECORDS, DOCUMENT THE CONFLICT, AND ESCALATE",

            correct:
              true,

            feedback:
              "Correct. Contradictory authenticated records remain intact until authorized review."
          }

        ]
      },


      {
        id:
          "MODULE-CLEARANCE",

        title:
          "Clearance and Escalation",

        briefing:
`A Level II liaison confirms that two components
of a compatibility condition remain sealed at Level IV.

Routine work can continue without opening them.

What action is authorized?`,

        choices: [

          {
            id:
              "force-open",

            label:
              "USE THE CURRENT CREDENTIAL TO FORCE THE SEAL",

            correct:
              false,

            feedback:
              "Credential recognition does not replace clearance. Forced access would violate Ministry security protocol."
          },

          {
            id:
              "request",

            label:
              "CONTINUE AUTHORIZED DUTIES AND REQUEST HIGHER CLEARANCE REVIEW",

            correct:
              true,

            feedback:
              "Correct. Record the restriction, continue Level II work, and request authorized escalation."
          },

          {
            id:
              "ignore",

            label:
              "DELETE THE REFERENCE AND CLOSE THE MATTER",

            correct:
              false,

            feedback:
              "A sealed restriction must remain in the audit record even when no immediate access is required."
          }

        ]
      }

    ]
  },


  getProgressKey(){

    return (
      "trainingProgress_" +
      this.course.id
    );
  },


  getCompletionKey(){

    return (
      "trainingCompleted_" +
      this.course.id
    );
  },


  getCompletionTimeKey(){

    return (
      "trainingCompletedAt_" +
      this.course.id
    );
  },


  getProgress(){

    const savedProgress =
      MinistryStorage.getJSON(
        this.getProgressKey(),
        {}
      );

    const completedModules =
      Array.isArray(
        savedProgress.completedModules
      )
        ? savedProgress.completedModules
            .filter(
              moduleId =>
                typeof moduleId === "string" &&
                this.course.modules.some(
                  module =>
                    module.id === moduleId
                )
            )
        : [];

    const answers =
      Array.isArray(savedProgress.answers)
        ? savedProgress.answers
            .filter(
              answer =>
                answer &&
                typeof answer === "object" &&
                typeof answer.moduleId === "string" &&
                typeof answer.choiceId === "string"
            )
        : [];


    return {
      completedModules:
        Array.from(
          new Set(completedModules)
        ),
      answers
    };
  },


  saveProgress(progress){

    return MinistryStorage.setJSON(
      this.getProgressKey(),
      progress
    );
  },


  getTrainingCredits(){

    return MinistryStorage.getNumber(
      "ministryTrainingCredits",
      0
    );
  },


  isAvailable(){

    return (
      World.getDay() >= 16 &&
      Player.getCaseStatus(
        "CASE-006"
      ) === "Solved"
    );
  },


  isCompleted(){

    if(
      Player.hasQualification(
        this.course.qualificationId
      )
    ){

      return true;
    }


    const legacyCompletion =
      MinistryStorage.getBoolean(
        this.getCompletionKey(),
        false
      );


    if(legacyCompletion){

      Player.addQualification({
        id:
          this.course.qualificationId,
        title:
          this.course.qualificationTitle,
        authority:
          this.course.authority,
        issuedAt:
          MinistryStorage.getItem(
            this.getCompletionTimeKey(),
            new Date().toISOString()
          )
      });
    }


    return legacyCompletion;
  },


  getCurrentModule(){

    const progress =
      this.getProgress();


    return this.course.modules.find(
      module =>
        !progress.completedModules.includes(
          module.id
        )
    ) || null;
  },


  submitAnswer(moduleId, choiceId){

    if(!this.isAvailable()){

      return {
        success:
          false,
        correct:
          false,
        completed:
          false,
        reason:
          "course-unavailable",
        feedback:
          "This training course has not been assigned."
      };
    }


    if(this.isCompleted()){

      return {
        success:
          true,
        correct:
          true,
        completed:
          true,
        reason:
          null,
        feedback:
          "This qualification is already active."
      };
    }


    const currentModule =
      this.getCurrentModule();


    if(
      !currentModule ||
      currentModule.id !== moduleId
    ){

      return {
        success:
          false,
        correct:
          false,
        completed:
          false,
        reason:
          "module-out-of-order",
        feedback:
          "Complete the current training module first."
      };
    }


    const choice =
      currentModule.choices.find(
        item =>
          item.id === choiceId
      );


    if(!choice){

      return {
        success:
          false,
        correct:
          false,
        completed:
          false,
        reason:
          "choice-not-found",
        feedback:
          "The selected training response is unavailable."
      };
    }


    if(!choice.correct){

      return {
        success:
          false,
        correct:
          false,
        completed:
          false,
        reason:
          "incorrect-response",
        feedback:
          choice.feedback
      };
    }


    const progress =
      this.getProgress();


    progress.completedModules.push(
      currentModule.id
    );

    progress.answers.push({
      moduleId:
        currentModule.id,
      choiceId:
        choice.id,
      completedAt:
        new Date().toISOString()
    });


    this.saveProgress(progress);


    MinistryStorage.setItem(
      "ministryTrainingCredits",
      String(
        this.getTrainingCredits() + 1
      )
    );


    const courseCompleted =
      progress.completedModules.length >=
      this.course.modules.length;


    if(courseCompleted){

      const issuedAt =
        new Date().toISOString();


      MinistryStorage.setItem(
        this.getCompletionKey(),
        "true"
      );


      MinistryStorage.setItem(
        this.getCompletionTimeKey(),
        issuedAt
      );


      Player.addQualification({
        id:
          this.course.qualificationId,
        title:
          this.course.qualificationTitle,
        authority:
          this.course.authority,
        issuedAt
      });
    }


    return {
      success:
        true,
      correct:
        true,
      completed:
        courseCompleted,
      reason:
        null,
      feedback:
        choice.feedback
    };
  }

};


function showTrainingDesk(
  feedback = "",
  isWarning = false
){

  const course =
    MinistryTraining.course;


  if(
    MinistryTraining.isCompleted()
  ){

    showTrainingCertificate();

    return;
  }


  if(
    !MinistryTraining.isAvailable()
  ){

    app.innerHTML = `
      <section class="panel">

        <div class="seal">
          MINISTRY TRAINING OFFICE
        </div>

        <h1>
          Training Desk
        </h1>

        <h2>
          No Active Course
        </h2>


        ${renderMinistryDocument({

          seal:
            "TRAINING ASSIGNMENT REGISTER",

          title:
            "Employee Training Status",

          subtitle:
            Player.getEmployeeId(),

          classification:
            "Internal",

          department:
            "Ministry Training Office",

          status:
            "Not Yet Assigned",

          body:`Current Qualification Courses:
NONE

Continuity Records Handling · Grade I
requires a completed CASE-006 review and World Day 16.`,

          footer:
            "TRAINING OFFICE · EMPLOYEE COPY"

        })}


        <div class="center">

          <button
            class="btn"
            onclick="showDashboard()">

            RETURN TO OFFICE

          </button>

        </div>

      </section>
    `;

    return;
  }


  const directiveRead =
    MinistryStorage.getBoolean(
      "mailRead_MAIL-014",
      false
    );


  if(!directiveRead){

    app.innerHTML = `
      <section class="panel">

        <div class="seal">
          MINISTRY TRAINING OFFICE
        </div>

        <h1>
          Training Directive Required
        </h1>

        <h2>
          ${course.title}
        </h2>


        <div class="notice warning">

          <p>
            Read the mandatory training directive
            in Owl Mail before beginning this course.
          </p>

        </div>


        <div class="center">

          <button
            class="btn"
            onclick="showOwlMail()">

            OPEN OWL MAIL

          </button>

          <button
            class="btn"
            onclick="showDashboard()">

            RETURN TO OFFICE

          </button>

        </div>

      </section>
    `;

    return;
  }


  const progress =
    MinistryTraining.getProgress();

  const currentModule =
    MinistryTraining.getCurrentModule();


  if(!currentModule){

    showTrainingCertificate();

    return;
  }


  const feedbackNotice =
    feedback
      ? `
        <div class="notice ${isWarning ? "warning" : ""}">
          <p>${feedback}</p>
        </div>
      `
      : "";


  app.innerHTML = `
    <section class="panel">

      <div class="seal">
        MINISTRY TRAINING OFFICE
      </div>

      <h1>
        ${course.title}
      </h1>

      <h2>
        ${course.grade} Qualification
      </h2>


      ${renderMinistryDocument({

        seal:
          "MANDATORY EMPLOYEE TRAINING",

        title:
          course.title,

        subtitle:
          course.id,

        classification:
          course.classification,

        department:
          course.authority,

        status:
          "In Progress",

        body:
          course.summary,

        footer:
          "MINISTRY TRAINING OFFICE · CONTROLLED COPY"

      })}


      <div class="terminal">COURSE: ${course.id}
MODULE: ${progress.completedModules.length + 1} / ${course.modules.length}
TRAINING CREDITS: ${MinistryTraining.getTrainingCredits()}
QUALIFICATION STATUS: IN PROGRESS</div>


      ${feedbackNotice}


      <div class="notice">

        <h3>
          ${currentModule.title}
        </h3>

        <p>
          ${currentModule.briefing}
        </p>

      </div>


      <div class="case-list">

        ${
          currentModule.choices.map(
            choice => `
              <button
                class="case-entry available"
                onclick="answerTrainingQuestion('${currentModule.id}','${choice.id}')">

                <b>
                  OFFICIAL RESPONSE
                </b>

                <span>
                  ${choice.label}
                </span>

                <small>
                  Submit training answer
                </small>

              </button>
            `
          ).join("")
        }

      </div>


      <div class="center">

        <button
          class="btn"
          onclick="showDashboard()">

          RETURN TO OFFICE

        </button>

      </div>

    </section>
  `;
}


function answerTrainingQuestion(
  moduleId,
  choiceId
){

  const result =
    MinistryTraining.submitAnswer(
      moduleId,
      choiceId
    );


  if(!result.success){

    showTrainingDesk(
      result.feedback,
      true
    );

    return;
  }


  if(result.completed){

    showTrainingCertificate();

    return;
  }


  showTrainingDesk(
    result.feedback,
    false
  );
}


function showTrainingCertificate(){

  const course =
    MinistryTraining.course;

  const qualification =
    Player.getQualifications()
      .find(
        item =>
          item.id ===
          course.qualificationId
      );

  const issuedAt =
    qualification &&
    qualification.issuedAt
      ? qualification.issuedAt
      : MinistryStorage.getItem(
          MinistryTraining.getCompletionTimeKey(),
          "Recorded"
        );


  app.innerHTML = `
    <section class="panel">

      <div class="seal">
        QUALIFICATION ISSUED
      </div>

      <h1>
        ${course.qualificationTitle}
      </h1>

      <h2>
        ${Player.getName()}
      </h2>


      ${renderMinistryDocument({

        seal:
          "BRITISH MINISTRY OF MAGIC",

        title:
          "Employee Qualification Certificate",

        subtitle:
          Player.getEmployeeId(),

        classification:
          "Personnel Training Record",

        department:
          course.authority,

        status:
          "Active",

        body:`Qualification:
${course.qualificationTitle}

Course:
${course.id}

Modules Completed:
${course.modules.length}

Training Credits:
${MinistryTraining.getTrainingCredits()}

Issued:
${issuedAt}

Authorized Scope:
Preserve and compare Level II continuity records.
Document identity and authorization separately.
Escalate sealed or contradictory records without alteration.

Restricted Scope:
Room 4-7 entry and Level IV compatibility components remain unauthorized.`,

        footer:
          "QUALIFICATION RECORD · PERSONNEL COPY"

      })}


      <div class="terminal">QUALIFICATION: ${course.qualificationId}
STATUS: ACTIVE
EMPLOYEE: ${Player.getEmployeeId()}
FUTURE LEVEL III REVIEW: ELIGIBLE</div>


      <div class="center">

        <button
          class="btn"
          onclick="showPersonnelRecord()">

          VIEW PERSONNEL RECORD

        </button>

        <button
          class="btn"
          onclick="showDashboard()">

          RETURN TO OFFICE

        </button>

      </div>

    </section>
  `;
}
