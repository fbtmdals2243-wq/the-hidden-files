function showPersonnelRecord(){

  const worldDay =
    World.getDay();


  const day6PersonnelAuditRead =
    localStorage.getItem(
      "mailRead_MAIL-008"
    ) === "true";


  if(
    worldDay >= 6 &&
    day6PersonnelAuditRead
  ){

    localStorage.setItem(
      "day6PersonnelRecordViewed",
      "true"
    );
  }

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


  const registryIntegrityNotice =
    worldDay >= 6 &&
    day6PersonnelAuditRead

      ? `

Registry Integrity:
DISCREPANCY DETECTED

Continuity Cross-Reference:
MOM-000117

Match Type:
LEGACY AUTHORIZATION SIGNATURE

Registry Finding:
The current employee credential and MOM-000117 produced the same restricted continuity verification response.

Identity Match:
NOT ESTABLISHED

Source Record:
RESTRICTED BY PERSONNEL CONTINUITY SYSTEM

Required Action:
Retain current employee credentials and await classified instructions.`

      : "";


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

${registryIntegrityNotice}

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
