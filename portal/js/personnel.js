function showPersonnelRecord(){

  const name =
    Player.getName();

  const employeeId =
    Player.getEmployeeId();

  const identity =
    Player.getIdentity();


  const completedCaseIds =
    Player.getCompletedCaseIds();

  const completedCases =
    completedCaseIds.length;


  const currentRank =
    Player.getRank();

  const currentClearance =
    Player.getClearance();


  const isPromoted =
    currentRank ===
    "Archive Officer";


  const completedCaseList =
    completedCaseIds.length > 0

      ? completedCaseIds
          .map(caseId => {

            const caseData =
              typeof MinistryCases !== "undefined"
                ? MinistryCases[caseId]
                : null;

            const caseTitle =
              caseData
                ? caseData.title
                : "Classified Case";

            return (
              "- " +
              caseId +
              " · " +
              caseTitle +
              " · Completed"
            );

          })
          .join("\n")

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


  completedCaseIds.forEach(
    caseId => {

      careerTimeline.push(
        "Completed " + caseId
      );


      if(
        caseId === "CASE-000" &&
        isPromoted
      ){

        careerTimeline.push(
          "Promoted to Archive Officer"
        );

        careerTimeline.push(
          "Level II Clearance Granted"
        );
      }

    }
  );


  if(
    completedCases >= 1 &&
    !isPromoted
  ){

    careerTimeline.push(
      "Promotion Review Eligible"
    );
  }


  if(
    isPromoted &&
    !completedCaseIds.includes(
      "CASE-000"
    )
  ){

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
