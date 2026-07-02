function showPersonnelRecord(){

  const name = Player.getName();

  const employeeId = Player.getEmployeeId();

  const identity = Player.getIdentity();

  const completedCases = Player.getCompletedCases();

  const completedCaseList =
    completedCases === 1
      ? "- CASE-000 · The Missing Owl · Completed"
      : "- No completed cases recorded";

  const reputation =
    completedCases >= 1
      ? "Excellent"
      : "Promising";

  const promotionStatus =
    completedCases >= 1
      ? "Eligible for Promotion Review"
      : "Not Eligible";

  const careerTimeline = [
    "Joined the Ministry of Magic"
  ];

  if(completedCases >= 1){
    careerTimeline.push("Completed CASE-000");
    careerTimeline.push("Promotion Review Eligible");
  }

  app.innerHTML = `
    <section class="panel">

      <div class="seal">
        PERSONNEL RECORD
      </div>

      <h1>${name}</h1>

      <h2>${employeeId}</h2>

      ${renderMinistryDocument({

        seal:"MINISTRY PERSONNEL FILE",

        title:name,

        subtitle:employeeId,

        classification:"Employee Record",

        department:identity.department || "Archive Division",

        status:"Active",

        body:`Department:
${identity.department || "Archive Division"}

Completed Cases:
${completedCases}

Case History:
${completedCaseList}

Current Rank:
${Player.getRank()}

Reputation:
${reputation}

Promotion Status:
${promotionStatus}

Career Timeline:

${careerTimeline.join("\n")}`,

        footer:"PERSONNEL RECORD"

      })}

      <div class="center">

        <button class="btn"
          onclick="showDashboard()">

          RETURN TO OFFICE

        </button>

      </div>

    </section>
  `;
}