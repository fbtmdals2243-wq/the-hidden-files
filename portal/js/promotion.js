function showPromotionReview(){
  const name = Player.getName();
  const currentRank = Player.getRank();
  const completedCases = Player.getCompletedCases();

  const eligible =
    completedCases >= 1 &&
    currentRank === "Junior Archive Officer";

  app.innerHTML = `
    <section class="panel">
      <div class="seal">MINISTRY PROMOTION REVIEW</div>

      <h1>Promotion Review</h1>
      <h2>Archive Division Personnel Committee</h2>

      ${renderMinistryDocument({
        seal: "PROMOTION REVIEW BOARD",
        title: name,
        subtitle: "Internal Personnel Assessment",
        classification: "Personnel Record",
        department: "Archive Division",
        status: eligible ? "Eligible" : "Not Eligible",
        body: `Current Rank:
${currentRank}

Completed Cases:
${completedCases}

Reputation:
${completedCases >= 1 ? "Excellent" : "Promising"}

Recommended Rank:
Archive Officer

Review Result:
${eligible ? "Promotion may be approved." : "Promotion requirements have not been met."}`,
        footer: "MINISTRY PERSONNEL COMMITTEE"
      })}

      <div class="center">
        ${
          eligible
            ? `
              <button class="btn" onclick="approvePromotion()">
                APPROVE PROMOTION
              </button>
            `
            : ""
        }

        <button class="btn" onclick="showPersonnelRecord()">
          RETURN TO PERSONNEL RECORD
        </button>
      </div>
    </section>
  `;
}

function approvePromotion(){
  Player.setRank("Archive Officer");
Player.setClearance("Level II");
  localStorage.setItem("promotionStatus", "Promoted");
  localStorage.setItem(
    "promotionDate",
    new Date().toISOString()
  );

  showPromotionSuccess();
}

function showPromotionSuccess(){
  const name = Player.getName();

  app.innerHTML = `
    <section class="panel">
      <div class="seal">PROMOTION APPROVED</div>

      <h1>Congratulations, Officer ${name}</h1>
      <h2>Archive Division Appointment Confirmed</h2>

      ${renderMinistryDocument({
        seal: "OFFICIAL PROMOTION ORDER",
        title: "Archive Officer",
        subtitle: "Promotion Appointment",
        classification: "Personnel Record",
        department: "Archive Division",
        status: "Approved",
        body: `The Ministry Personnel Committee hereby confirms the promotion of:

${name}

Previous Rank:
Junior Archive Officer

New Rank:
Archive Officer

This appointment is effective immediately.`,
        footer: "BRITISH MINISTRY OF MAGIC · PERSONNEL OFFICE"
      })}

      <div class="center">
        <button class="btn" onclick="showPersonnelRecord()">
          VIEW UPDATED PERSONNEL RECORD
        </button>

        <button class="btn" onclick="showDashboard()">
          RETURN TO OFFICE
        </button>
      </div>
    </section>
  `;
}