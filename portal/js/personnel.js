function showPersonnelRecord(){

  const name = Player.getName();
  const employeeId = Player.getEmployeeId();
  const identity = Player.getIdentity();

  const completedCases =
    Player.getCompletedCases();

  const currentRank =
    Player.getRank();

  const currentClearance =
    Player.getClearance();

  const isPromoted =
    currentRank === "Archive Officer";

  const completedCaseList =
    completedCases >= 1
      ? "- CASE-000 · The Missing Owl · Completed"
      : "- No completed cases recorded";

  const reputation =
    completedCases >= 1
      ? "Excellent"
      : "Promising";

  let promotionStatus =
    "Not Eligible";

  if(
    completedCases >= 1 &&
    !isPromoted
  ){
    promotionStatus =
      "Eligible for Promotion Review";
  }

  if(isPromoted){
    promotionStatus =
      "Promoted to Archive Officer";
  }

  const careerTimeline = [
    "Joined the Ministry of Magic"
  ];

  if(completedCases >= 1){
    careerTimeline.push(
      "Completed CASE-000"
    );
  }

  if(
    completedCases >= 1 &&
    !isPromoted
  ){
    careerTimeline.push(
      "Promotion Review Eligible"
    );
  }

  if(isPromoted){
    careerTimeline.push(
      "Promoted to Archive Officer"
    );

    careerTimeline.push(
      "Level II Clearance Granted"
    );
  }

  const canRequestPromotion =
    completedCases >= 1 &&
    currentRank ===
      "Junior Archive Officer";


  app.innerHTML = `
    <section class="panel">

      <div class="seal">
        PERSONNEL RECORD
      </div>

      <h1>${name}</h1>

      <h2>${employeeId}</h2>

      ${renderMinistryDocument({

        seal:
          "MINISTRY PERSONNEL FILE",

        title:
          name,

        subtitle:
          employeeId,

        classification:
          "Employee Record",

        department:
          identity.department ||
          "Archive Division",

        status:
          "Active",

        body:`Department:
${identity.department || "Archive Division"}

Completed Cases:
${completedCases}

Case History:
${completedCaseList}

Current Rank:
${currentRank}

Clearance:
${currentClearance}

Reputation:
${reputation}

Promotion Status:
${promotionStatus}

Career Timeline:

${careerTimeline.join("\n")}`,

        footer:
          "PERSONNEL RECORD"

      })}

      <div class="center">

        ${
          canRequestPromotion
            ? `
              <button
                class="btn"
                onclick="showPromotionReview()">

                BEGIN PROMOTION REVIEW

              </button>
            `
            : ""
        }

        <button
          class="btn"
          onclick="showDashboard()">

          RETURN TO OFFICE

        </button>

      </div>

    </section>
  `;
}