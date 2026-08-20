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

  const recommendedDepartment =
    Player.getRecommendedDepartment();

  const assignedDepartment =
    Player.getAssignedDepartment();

  const specialAssignment =
    Player.getSpecialAssignment();

  const servicePoints =
    Player.getServicePoints();

  const completedDuties =
    Player.getCompletedDuties();

  const qualifications =
    Player.getQualifications();

  const trainingCredits =
    MinistryStorage.getNumber(
      "ministryTrainingCredits",
      0
    );

  const professionalNetwork =
    typeof MinistryRelationships !== "undefined"
      ? MinistryRelationships.colleagues
          .filter(
            colleague =>
              MinistryRelationships.isUnlocked(
                colleague.id
              )
          )
          .map(
            colleague => {

              const relationship =
                MinistryRelationships.getRecord(
                  colleague.id
                );

              return (
                "- " +
                colleague.name +
                " · " +
                MinistryRelationships.getTrustLabel(
                  relationship.trust
                ) +
                " · Trust " +
                relationship.trust +
                "/5"
              );
            }
          )
      : [];

  const professionalNetworkList =
    professionalNetwork.length > 0
      ? professionalNetwork.join("\n")
      : "- No professional contacts recorded";

  const firstStoryArcCompleted =
    localStorage.getItem(
      "firstStoryArcCompleted"
    ) === "true";

  const compatibilityConditionOne =
    localStorage.getItem(
      "sealedCompatibilityConditionOne"
    ) === "true";

  const levelThreeReviewCompleted =
    typeof MinistryCareerReview !== "undefined" &&
    MinistryCareerReview.isCompleted();

  const compatibilityConditionTwo =
    localStorage.getItem(
      "sealedCompatibilityConditionTwo"
    ) === "true";

  const compatibilityConditionThree =
    localStorage.getItem(
      "sealedCompatibilityConditionThree"
    ) === "true";

  const levelFourReviewCompleted =
    typeof MinistryFinalReview !== "undefined" &&
    MinistryFinalReview.isCompleted();

  const finalStoryArcCompleted =
    localStorage.getItem(
      "finalStoryArcCompleted"
    ) === "true";

  const historicalAppointeeIdentity =
    localStorage.getItem(
      "historicalAppointeeIdentity"
    ) || "SEALED";


  const completedCaseIds =
    Player.getCompletedCaseIds();

  const completedCases =
    completedCaseIds.length;


  const currentRank =
    Player.getRank();

  const currentClearance =
    Player.getClearance();


  const isPromoted =
    currentRank !==
    "Junior Archive Officer";


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


  const qualificationList =
    qualifications.length > 0

      ? qualifications
          .map(
            qualification =>
              "- " +
              qualification.title +
              " · Active"
          )
          .join("\n")

      : "- No qualifications recorded";


  let reputation =
    completedCases >= 1
      ? "Excellent"
      : "Promising";


  if(servicePoints >= 30){

    reputation =
      "Distinguished";
  }


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
      levelFourReviewCompleted
        ? "Level IV Continuity Authority Approved"
        : levelThreeReviewCompleted
        ? "Level III Career Review Approved"
        : "Promoted to Archive Officer";
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


  if(firstStoryArcCompleted){

    careerTimeline.push(
      "Continuity Appointment Confirmed"
    );

    careerTimeline.push(
      "Assigned as Continuity Liaison"
    );
  }


  if(compatibilityConditionOne){

    careerTimeline.push(
      "Compatibility Condition 1 Confirmed"
    );
  }


  if(levelThreeReviewCompleted){

    careerTimeline.push(
      "Level III Career Review Approved"
    );

    careerTimeline.push(
      "Promoted to Senior Archive Officer"
    );

    careerTimeline.push(
      "Level III Clearance Granted"
    );
  }


  if(compatibilityConditionTwo){

    careerTimeline.push(
      "Compatibility Condition 2 Confirmed"
    );
  }


  if(compatibilityConditionThree){

    careerTimeline.push(
      "Compatibility Condition 3 Confirmed"
    );

    careerTimeline.push(
      "All Continuity Compatibility Conditions Satisfied"
    );
  }


  if(levelFourReviewCompleted){

    careerTimeline.push(
      "Level IV Continuity Authority Approved"
    );

    careerTimeline.push(
      "Promoted to Principal Archive Officer"
    );

    careerTimeline.push(
      "One-Record Ω Continuity Warrant Issued"
    );
  }


  if(finalStoryArcCompleted){

    careerTimeline.push(
      "Restored CASE-ZERO · The First Deletion"
    );

    careerTimeline.push(
      "Restored Historical Identity: Rowan Mercer · MOM-000117"
    );

    careerTimeline.push(
      "Continued Active Service in Office 3-B"
    );
  }


  qualifications.forEach(
    qualification => {

      careerTimeline.push(
        "Qualified: " +
        qualification.title
      );
    }
  );


  if(completedDuties > 0){

    careerTimeline.push(
      "Completed Daily Duties: " +
      completedDuties
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


  let registryIntegrityNotice =
    "";


  if(
    worldDay >= 6 &&
    day6PersonnelAuditRead
  ){

    registryIntegrityNotice = `

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
Retain current employee credentials and await classified instructions.`;
  }


  if(firstStoryArcCompleted){

    registryIntegrityNotice = `

Continuity Determination:
APPOINTMENT AUTHORIZATION CONFIRMED

Continuity Position:
VACANCY-AR-117

Historical Appointee:
MOM-000117

Current Appointee:
${employeeId}

Identity Match:
NOT ESTABLISHED

Personnel Finding:
The shared continuity signature belongs to the Ministry appointment. The current employee identity remains active and distinct.

Credential Status:
VALID

Required Action:
Continue assigned Ministry duties as Continuity Liaison.`;
  }


  if(compatibilityConditionOne){

    registryIntegrityNotice += `

Sealed Compatibility Review:
COMPONENT 1 OF 3 SATISFIED

Confirmed Component:
PROCEDURAL RESPONSE CORRESPONDENCE

Historical Record:
MOM-000117 · LEGACY RECEIPT 117-C

Current Record:
DAY 13 PERSONNEL CROSS-REFERENCE DECISION

Identity Match:
NOT REQUIRED

Remaining Components:
2 SEALED · LEVEL IV AUTHORIZATION REQUIRED

Required Action:
Continue routine service and report any additional continuity echoes.`;
  }


  if(compatibilityConditionTwo){

    registryIntegrityNotice += `

Sealed Compatibility Review:
COMPONENT 2 OF 3 SATISFIED

Confirmed Component:
MNEMONIC RESPONSE CORRESPONDENCE

Historical Record:
MOM-000117 · MEMORY VIAL 117-M

Current Trigger:
LEVEL III APPOINTMENT AUTHORIZATION

Identity Match:
NOT ESTABLISHED

Remaining Components:
1 SEALED · LEVEL IV AUTHORIZATION REQUIRED

Personnel Finding:
MOM-000117 prepared a mnemonic response for a future holder of VACANCY-AR-117. Recognition of the appointment does not establish return of the historical identity.`;
  }


  if(compatibilityConditionThree){

    registryIntegrityNotice += `

Sealed Compatibility Review:
COMPONENT 3 OF 3 SATISFIED

Confirmed Component:
PROTECTIVE INTENT CORRESPONDENCE

Historical Action:
DELETION SUSPENDED · EVIDENCE PRESERVED · REVIEW REQUESTED

Current Record:
INDEPENDENT PROTECTIVE ARCHIVE DECISIONS

Identity Match:
NOT REQUIRED · NOT ESTABLISHED

Personnel Finding:
All three compatibility components belong to the continuing appointment. They do not merge the identities of its two holders.`;
  }


  if(levelFourReviewCompleted){

    registryIntegrityNotice += `

Final Board Record:
LEVEL IV CONTINUITY AUTHORITY APPROVED

Qualification:
CONTINUITY RECORDS HANDLING · GRADE II

Rank:
PRINCIPAL ARCHIVE OFFICER

Special Authority:
ONE-RECORD Ω CONTINUITY WARRANT · CASE-ZERO ONLY

General Level V Access:
NOT GRANTED`;
  }


  if(finalStoryArcCompleted){

    registryIntegrityNotice += `

CASE-ZERO Final Determination:
FIRST DELETED IDENTITY RESTORED

Historical Appointee:
${historicalAppointeeIdentity} · MOM-000117

Historical Role:
FIRST CONTINUITY RECORDS LIAISON

Current Appointee:
${name} · ${employeeId}

Identity Relation:
SEPARATE PEOPLE

Appointment Relation:
FIRST AND SECOND HOLDERS OF VACANCY-AR-117

Current Employment:
ACTIVE · CONTINUING SERVICE

Personnel Finding:
Rowan Mercer's identity was the first deletion. The current officer lawfully restored that record without inheriting or replacing Rowan's identity.`;
  }


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
          assignedDepartment,

        status:
          "Active",

        body:`Assigned Department:
${assignedDepartment}

Identity Engine Recommendation:
${recommendedDepartment}

Special Assignment:
${specialAssignment}

Daily Duties Completed:
${completedDuties}

Ministry Service Points:
${servicePoints}

Training Credits:
${trainingCredits}

Qualifications:
${qualificationList}

Professional Network:
${professionalNetworkList}

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
