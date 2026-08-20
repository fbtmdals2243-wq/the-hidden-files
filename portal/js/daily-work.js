const DailyWork = {

  tasks: [

    {
      id:
        "DUTY-MEMORY-INDEX",

      title:
        "Misfiled Memory Index",

      department:
        "Archive Division",

      classification:
        "Routine · Level II",

      summary:
`Three sealed memory vials were delivered
under the same catalogue number.

The contents remain stable, but only one vial
matches the destination listed in the ledger.

Review the discrepancy and choose an official action.`,

      choices: [
        {
          id:
            "contain",

          label:
            "SEAL ALL THREE FOR REVIEW",

          result:
            "All three vials were contained and transferred to a Memory Specialist. No record contamination occurred.",

          evaluation:
            "Cautious",

          points:
            3
        },
        {
          id:
            "trace",

          label:
            "TRACE THE ORIGINAL LEDGER ENTRY",

          result:
            "The duplicate catalogue entry was traced to an automated copying charm. The correct vial was restored to circulation.",

          evaluation:
            "Investigative",

          points:
            3
        },
        {
          id:
            "escalate",

          label:
            "REFER TO SENIOR ARCHIVIST",

          result:
            "The discrepancy was escalated without incident. Eleanor Whitmore approved a full shelf audit.",

          evaluation:
            "Procedural",

          points:
            2
        }
      ]
    },


    {
      id:
        "DUTY-OWL-LEDGER",

      title:
        "Interdepartmental Owl Ledger",

      department:
        "Ministry Mail Office",

      classification:
        "Routine · Internal",

      summary:
`An internal owl completed four deliveries
while the ledger records only three destinations.

No message is currently reported missing.

The Mail Office requires an Archive Division finding
before the route can be closed.`,

      choices: [
        {
          id:
            "route",

          label:
            "RECONSTRUCT THE OWL'S ROUTE",

          result:
            "Feather-trace records revealed an unlogged stop at the Magical Maintenance Office. The ledger was corrected.",

          evaluation:
            "Investigative",

          points:
            3
        },
        {
          id:
            "recipient",

          label:
            "VERIFY ALL RECIPIENT SIGNATURES",

          result:
            "All recipients were verified. One department had acknowledged delivery under an outdated office name.",

          evaluation:
            "Thorough",

          points:
            3
        },
        {
          id:
            "monitor",

          label:
            "FLAG THE OWL FOR MONITORING",

          result:
            "The route was closed provisionally and the owl was added to the next-day monitoring list.",

          evaluation:
            "Cautious",

          points:
            2
        }
      ]
    },


    {
      id:
        "DUTY-SEAL-AUDIT",

      title:
        "Legacy Security Seal Audit",

      department:
        "Ministry Security Office",

      classification:
        "Level II · Security",

      summary:
`A storage cabinet still carries a security seal
issued by a department that was renamed twelve years ago.

The seal is valid, but the current access list
contains no responsible officer.`,

      choices: [
        {
          id:
            "preserve",

          label:
            "PRESERVE AND DOCUMENT THE SEAL",

          result:
            "The legacy seal was preserved as evidence and a modern secondary seal was added.",

          evaluation:
            "Archive-Safe",

          points:
            3
        },
        {
          id:
            "registry",

          label:
            "TRACE THE RESPONSIBLE OFFICE",

          result:
            "The responsibility chain led to the Department of Magical Transportation. A current officer accepted custody.",

          evaluation:
            "Investigative",

          points:
            3
        },
        {
          id:
            "suspend",

          label:
            "SUSPEND ACCESS TEMPORARILY",

          result:
            "Access was suspended pending ownership confirmation. No unauthorized entry was recorded.",

          evaluation:
            "Security-First",

          points:
            2
        }
      ]
    },


    {
      id:
        "DUTY-PERSONNEL-CROSSREF",

      title:
        "Personnel Cross-Reference Review",

      department:
        "Personnel Registry",

      classification:
        "Level II · Personnel",

      summary:
`Two active employee records list the same office desk.

Both credentials are valid and neither employee
has requested a transfer.

The Registry requires a non-destructive correction.`,

      choices: [
        {
          id:
            "schedule",

          label:
            "CHECK WORK SCHEDULES",

          result:
            "The employees work alternating night and day shifts. The shared desk record was approved and annotated.",

          evaluation:
            "Contextual",

          points:
            3
        },
        {
          id:
            "office",

          label:
            "VERIFY THE OFFICE FLOOR PLAN",

          result:
            "A recent renovation created two desk numbers but the personnel map was never updated.",

          evaluation:
            "Investigative",

          points:
            3
        },
        {
          id:
            "registry",

          label:
            "MARK THE RECORDS FOR REVIEW",

          result:
            "Both records remained active while the Registry opened a routine location audit.",

          evaluation:
            "Procedural",

          points:
            2
        }
      ]
    },


    {
      id:
        "DUTY-TRANSFER-REQUEST",

      title:
        "Restricted File Transfer",

      department:
        "Interdepartmental Records Office",

      classification:
        "Level II · Transfer Review",

      summary:
`The Department of Mysteries has requested
a sealed Archive Division file.

The request carries valid Level IV authorization,
but the destination shelf does not appear
in the standard transfer directory.`,

      choices: [
        {
          id:
            "escort",

          label:
            "REQUIRE OFFICER ESCORT",

          result:
            "A cleared Unspeakable collected the file in person and accepted the chain-of-custody seal.",

          evaluation:
            "Security-First",

          points:
            3
        },
        {
          id:
            "verify",

          label:
            "VERIFY THROUGH THE UNDERSECRETARY",

          result:
            "The destination was confirmed as a rotating restricted shelf. The transfer proceeded under supervision.",

          evaluation:
            "Thorough",

          points:
            3
        },
        {
          id:
            "hold",

          label:
            "HOLD THE FILE IN ARCHIVE CUSTODY",

          result:
            "The file remained sealed in Office 3-B pending direct destination confirmation.",

          evaluation:
            "Cautious",

          points:
            2
        }
      ]
    },


    {
      id:
        "DUTY-EVIDENCE-CHAIN",

      title:
        "Evidence Chain Verification",

      department:
        "Magical Law Enforcement",

      classification:
        "Level II · Evidence",

      summary:
`A confiscated enchanted object arrived
with a complete evidence form but no arrival time.

The containment seal is intact.

Magical Law Enforcement needs the custody chain
verified before tomorrow's hearing.`,

      choices: [
        {
          id:
            "seal",

          label:
            "READ THE CONTAINMENT SEAL",

          result:
            "The seal retained an exact activation time, restoring the missing arrival entry.",

          evaluation:
            "Technical",

          points:
            3
        },
        {
          id:
            "witness",

          label:
            "CONTACT THE RECEIVING WITNESS",

          result:
            "The receiving officer supplied a signed statement and the custody chain was completed.",

          evaluation:
            "Procedural",

          points:
            3
        },
        {
          id:
            "quarantine",

          label:
            "QUARANTINE THE OBJECT",

          result:
            "The object remained safely contained while Law Enforcement requested an amended evidence form.",

          evaluation:
            "Cautious",

          points:
            2
        }
      ]
    },


    {
      id:
        "DUTY-NOTICE-VERIFY",

      title:
        "Department Notice Verification",

      department:
        "Ministry Administration",

      classification:
        "Routine · Administration",

      summary:
`Two official notices announce different closing times
for the same Floo Network maintenance window.

Both notices carry authentic Ministry seals.

Confirm which instruction remains active
before the evening commute begins.`,

      choices: [
        {
          id:
            "issuer",

          label:
            "CONTACT BOTH ISSUING OFFICES",

          result:
            "The later notice was confirmed as a corrected schedule. The obsolete copy was removed.",

          evaluation:
            "Thorough",

          points:
            3
        },
        {
          id:
            "timestamp",

          label:
            "COMPARE MAGICAL TIMESTAMPS",

          result:
            "The active notice carried the newer authorization imprint. Staff received the corrected closing time.",

          evaluation:
            "Technical",

          points:
            3
        },
        {
          id:
            "caution",

          label:
            "PUBLISH THE EARLIER CLOSING TIME",

          result:
            "The conservative schedule prevented stranded commuters while Administration resolved the conflict.",

          evaluation:
            "Cautious",

          points:
            2
        }
      ]
    }

  ],


  getTaskForDay(day = World.getDay()){

    const workDay =
      Number(day);

    if(
      !Number.isInteger(workDay) ||
      workDay < 10
    ){

      return null;
    }


    const taskIndex =
      (workDay - 10) %
      this.tasks.length;

    return this.tasks[taskIndex];
  },


  getCompletionKey(day = World.getDay()){

    return (
      "dailyDutyCompleted_Day" +
      day
    );
  },


  getResultKey(day = World.getDay()){

    return (
      "dailyDutyResult_Day" +
      day
    );
  },


  isCompleted(day = World.getDay()){

    return localStorage.getItem(
      this.getCompletionKey(day)
    ) === "true";
  },


  getResult(day = World.getDay()){

    const savedResult =
      localStorage.getItem(
        this.getResultKey(day)
      );

    if(!savedResult){
      return null;
    }


    try{
      return JSON.parse(savedResult);
    }
    catch(error){

      console.error(
        "Invalid daily duty result:",
        error
      );

      return null;
    }
  },


  getCompletedCount(){

    return Number(
      localStorage.getItem(
        "dailyDutyCompletedCount"
      ) || 0
    );
  },


  getServicePoints(){

    return Number(
      localStorage.getItem(
        "ministryServicePoints"
      ) || 0
    );
  },


  complete(choiceId){

    const day =
      World.getDay();

    const task =
      this.getTaskForDay(day);


    if(!task){
      return false;
    }


    const choice =
      task.choices.find(
        item =>
          item.id === choiceId
      );


    if(!choice){
      return false;
    }


    if(this.isCompleted(day)){
      return true;
    }


    const result = {
      day,
      taskId:
        task.id,
      taskTitle:
        task.title,
      choiceId:
        choice.id,
      choiceLabel:
        choice.label,
      result:
        choice.result,
      evaluation:
        choice.evaluation,
      points:
        choice.points,
      completedAt:
        new Date().toISOString()
    };


    localStorage.setItem(
      this.getResultKey(day),
      JSON.stringify(result)
    );


    localStorage.setItem(
      this.getCompletionKey(day),
      "true"
    );


    localStorage.setItem(
      "dailyDutyCompletedCount",
      String(
        this.getCompletedCount() + 1
      )
    );


    localStorage.setItem(
      "ministryServicePoints",
      String(
        this.getServicePoints() +
        choice.points
      )
    );


    return true;
  }

};


function showDailyWorkOrder(){

  const worldDay =
    World.getDay();

  const firstStoryArcCompleted =
    localStorage.getItem(
      "firstStoryArcCompleted"
    ) === "true";


  if(
    worldDay < 10 ||
    !firstStoryArcCompleted
  ){

    alert(
      "No daily Ministry work order is available."
    );

    return;
  }


  if(DailyWork.isCompleted(worldDay)){

    showDailyWorkResult();

    return;
  }


  const task =
    DailyWork.getTaskForDay(
      worldDay
    );


  app.innerHTML = `
    <section class="panel">

      <div class="seal">
        MINISTRY DAILY WORK ORDER
      </div>

      <h1>
        ${task.title}
      </h1>

      <h2>
        Day ${worldDay} · Continuity Liaison
      </h2>


      ${renderMinistryDocument({

        seal:
          "DAILY WORK ORDER",

        title:
          task.title,

        subtitle:
          "Duty " +
          task.id,

        classification:
          task.classification,

        department:
          task.department,

        status:
          "Action Required",

        body:
          task.summary,

        footer:
          "MINISTRY OPERATIONS · DAY " +
          worldDay

      })}


      <div class="notice">

        <h3>
          SELECT OFFICIAL ACTION
        </h3>

        <p class="muted">
          Each authorized action will complete today's duty.
          Your decision will be preserved in your service record.
        </p>

      </div>


      <div class="case-list">

        ${
          task.choices.map(
            choice => `
              <button
                class="case-entry available"
                onclick="completeDailyWork('${choice.id}')">

                <b>
                  OFFICIAL ACTION
                </b>

                <span>
                  ${choice.label}
                </span>

                <small>
                  Record decision
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


function completeDailyWork(choiceId){

  const completed =
    DailyWork.complete(
      choiceId
    );


  if(!completed){

    alert(
      "Unable to record this Ministry action."
    );

    return;
  }


  showDailyWorkResult();
}


function showDailyWorkResult(){

  const worldDay =
    World.getDay();

  const result =
    DailyWork.getResult(
      worldDay
    );


  if(!result){

    alert(
      "The duty is marked complete, but its archived result is unavailable."
    );


    showDashboard();

    return;
  }


  const continuityFlag =
    result.day === 13 &&
    localStorage.getItem(
      "firstStoryArcCompleted"
    ) === "true"

      ? `
        <div class="notice warning">

          <h3>
            POST-FILING EXCEPTION
          </h3>

          <p>
            Personnel Continuity has placed this duty receipt
            under sealed comparison review.
          </p>

          <p class="muted">
            No action is required today. Check Owl Mail
            at the start of your next work day.
          </p>

        </div>
      `

      : "";


  app.innerHTML = `
    <section class="panel">

      <div class="seal">
        DUTY RECORDED
      </div>

      <h1>
        Work Order Complete
      </h1>

      <h2>
        ${result.taskTitle}
      </h2>


      ${renderMinistryDocument({

        seal:
          "MINISTRY SERVICE RECORD",

        title:
          "Daily Duty Result",

        subtitle:
          "Day " +
          result.day,

        classification:
          "Employee Service Record",

        department:
          "Archive Division",

        status:
          "Completed",

        body:`Selected Action:
${result.choiceLabel}

Outcome:
${result.result}

Evaluation:
${result.evaluation}

Service Points Awarded:
${result.points}

Total Service Points:
${DailyWork.getServicePoints()}`,

        footer:
          "DAILY DUTY · PERSONNEL COPY"

      })}


      <div class="terminal">WORK DAY: ${result.day}
DUTY: ${result.taskId}
STATUS: COMPLETE
EVALUATION: ${result.evaluation.toUpperCase()}
SERVICE POINTS: +${result.points}
TOTAL SERVICE POINTS: ${DailyWork.getServicePoints()}</div>


      ${continuityFlag}


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
