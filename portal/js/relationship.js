const MinistryRelationships = {

  colleagues: [

    {
      id:
        "NPC-ELEANOR-WHITMORE",
      name:
        "Eleanor Whitmore",
      role:
        "Senior Archivist",
      department:
        "Archive Division · Office 3-B",
      unlockDay:
        1,
      introduction:
        "Your supervising archivist and the first colleague to recognize your work as Ministry service rather than a temporary assignment.",
      briefings: [
        "The cabinet is quiet this morning. That usually means another department has misplaced something important.",
        "Good records protect people as often as they expose mistakes. Remember both halves of that duty.",
        "Office 3-B has kept stranger files than yours. It has not kept many stranger appointments.",
        "Finish the work in front of you. The sealed questions will still be there tomorrow."
      ],
      advancedBriefing:
        "Level III gives you more doors, not fewer responsibilities. If a record can harm an employee, read it twice before you act.",
      choices: [
        {
          id: "ask-priority",
          label: "ASK ABOUT TODAY'S OFFICE PRIORITY",
          style: "Operational",
          response: "Check the official assignment first, then the routine ledger. If both are quiet, help the Mail Office before it asks."
        },
        {
          id: "share-concern",
          label: "DISCUSS THE CONTINUITY FILE",
          style: "Candid",
          response: "You are allowed to be unsettled by it. Just do not let an old record tell you who you are before the evidence does."
        },
        {
          id: "offer-help",
          label: "OFFER HELP WITH THE ARCHIVE",
          style: "Collegial",
          response: "Shelf C needs a seal count. It is not glamorous work, which is why a reliable officer notices when it matters."
        }
      ]
    },

    {
      id:
        "NPC-MIRIAM-VALE",
      name:
        "Dr. Miriam Vale",
      role:
        "Memory Archive Specialist",
      department:
        "Memory Archive",
      unlockDay:
        14,
      introduction:
        "A specialist in authenticated memory records who refuses to call an unexplained event prophecy until every ordinary cause is excluded.",
      briefings: [
        "Memory evidence is persuasive because it feels complete. That is exactly why its missing edges matter.",
        "A vial can preserve an experience, an instruction, or a trap. The label rarely tells you which.",
        "Do not confuse silence with emptiness. Some memories are waiting for the correct authority to listen."
      ],
      advancedBriefing:
        "Vial 117-M recognized your appointment. Its own language denied a return. Preserve that distinction, even if others prefer a simpler story.",
      choices: [
        {
          id: "ask-method",
          label: "ASK ABOUT MEMORY VERIFICATION",
          style: "Technical",
          response: "Begin with the seal, not the scene. A convincing image can be false; an authentic seal tells you when the contents became fixed."
        },
        {
          id: "request-review",
          label: "REQUEST A SECOND READING",
          style: "Thorough",
          response: "A second reading is sensible. We will use a clean Pensieve and compare what the memory refuses to show."
        },
        {
          id: "check-welfare",
          label: "ASK HOW THE MEMORY TEAM IS COPING",
          style: "Considerate",
          response: "Better now that someone asked. The night staff have been monitoring 117-M in pairs since it spoke."
        }
      ]
    },

    {
      id:
        "NPC-GIDEON-MARCH",
      name:
        "Gideon March",
      role:
        "Continuity Systems Examiner",
      department:
        "Personnel Continuity Systems",
      unlockDay:
        15,
      introduction:
        "A methodical examiner of obsolete authorization systems who treats every surviving audit event as a deliberate choice.",
      briefings: [
        "Legacy systems are not primitive systems. They are systems whose assumptions everyone forgot.",
        "Room 4-7 is still answering questions. Our problem is learning who taught it the answers.",
        "A missing audit event can be damage. A perfectly absent event is usually design."
      ],
      advancedBriefing:
        "Two compatibility components are now satisfied. The third remains Level IV, and I would prefer that boundary remain intact until we know who benefits from opening it.",
      choices: [
        {
          id: "ask-system",
          label: "ASK ABOUT THE LEGACY SYSTEM",
          style: "Investigative",
          response: "It preserves appointments independently of employees. That was intentional. Why VACANCY-AR-117 needed that protection is still sealed."
        },
        {
          id: "verify-boundary",
          label: "CONFIRM THE LEVEL IV BOUNDARY",
          style: "Security",
          response: "Confirmed. Your Level III credential may identify the component, but it cannot open or modify it."
        },
        {
          id: "offer-records",
          label: "OFFER YOUR DUTY RECORDS FOR COMPARISON",
          style: "Cooperative",
          response: "Authorized copies would help. I will compare patterns, not identities, and return every record to your personnel file."
        }
      ]
    }

  ],


  getRecords(){

    const saved =
      MinistryStorage.getJSON(
        "playerRelationships",
        {}
      );

    return (
      saved &&
      typeof saved === "object" &&
      !Array.isArray(saved)
    )
      ? saved
      : {};
  },


  saveRecords(records){

    return MinistryStorage.setJSON(
      "playerRelationships",
      records
    );
  },


  getColleague(colleagueId){

    return this.colleagues.find(
      colleague =>
        colleague.id === colleagueId
    ) || null;
  },


  isUnlocked(colleagueId){

    const colleague =
      this.getColleague(colleagueId);

    if(!colleague){
      return false;
    }

    if(World.getDay() < colleague.unlockDay){
      return false;
    }

    if(
      colleagueId === "NPC-MIRIAM-VALE" &&
      !MinistryStorage.getBoolean(
        "secondStoryArcStarted",
        false
      )
    ){
      return false;
    }

    if(
      colleagueId === "NPC-GIDEON-MARCH" &&
      !MinistryStorage.getBoolean(
        "sealedCompatibilityConditionOne",
        false
      )
    ){
      return false;
    }

    return true;
  },


  getRecord(colleagueId){

    const records =
      this.getRecords();

    const saved =
      records[colleagueId] || {};

    return {
      trust:
        Number.isFinite(Number(saved.trust))
          ? Math.max(
              0,
              Math.min(5, Number(saved.trust))
            )
          : 0,
      lastInteractionDay:
        Number(saved.lastInteractionDay) || 0,
      interactionCount:
        Number(saved.interactionCount) || 0,
      history:
        Array.isArray(saved.history)
          ? saved.history.slice(-20)
          : []
    };
  },


  getTrustLabel(trust){

    if(trust >= 5){
      return "Office Ally";
    }

    if(trust >= 3){
      return "Trusted Colleague";
    }

    if(trust >= 1){
      return "Professional Contact";
    }

    return "Newly Acquainted";
  },


  hasInteractedToday(colleagueId){

    return (
      this.getRecord(colleagueId)
        .lastInteractionDay ===
      World.getDay()
    );
  },


  getBriefing(colleagueId){

    const colleague =
      this.getColleague(colleagueId);

    if(!colleague){
      return "No colleague briefing is available.";
    }

    if(
      MinistryStorage.getBoolean(
        "sealedCompatibilityConditionTwo",
        false
      ) ||
      Player.hasClearance("Level III")
    ){
      return colleague.advancedBriefing;
    }

    const index =
      (
        World.getDay() -
        colleague.unlockDay
      ) % colleague.briefings.length;

    return colleague.briefings[
      Math.max(0, index)
    ];
  },


  interact(colleagueId, choiceId){

    const colleague =
      this.getColleague(colleagueId);

    if(
      !colleague ||
      !this.isUnlocked(colleagueId)
    ){

      return {
        success: false,
        reason: "colleague-locked",
        response: "This colleague is not yet available in your Ministry network."
      };
    }

    const choice =
      colleague.choices.find(
        item => item.id === choiceId
      );

    if(!choice){

      return {
        success: false,
        reason: "choice-not-found",
        response: "That conversation option is unavailable."
      };
    }

    if(this.hasInteractedToday(colleagueId)){

      return {
        success: false,
        reason: "already-spoke-today",
        response: "You have already completed today's professional check-in with this colleague."
      };
    }

    const records =
      this.getRecords();

    const record =
      this.getRecord(colleagueId);

    record.trust =
      Math.min(
        5,
        record.trust + 1
      );

    record.lastInteractionDay =
      World.getDay();

    record.interactionCount += 1;

    record.history.push({
      day:
        World.getDay(),
      choiceId:
        choice.id,
      style:
        choice.style,
      recordedAt:
        new Date().toISOString()
    });

    record.history =
      record.history.slice(-20);

    records[colleagueId] =
      record;

    this.saveRecords(records);

    return {
      success: true,
      reason: null,
      response: choice.response,
      style: choice.style,
      trust: record.trust,
      trustLabel:
        this.getTrustLabel(record.trust)
    };
  }
};


function showColleagues(){

  app.innerHTML = `
    <section class="panel">
      <div class="seal">MINISTRY COLLEAGUE DIRECTORY</div>
      <h1>Colleagues</h1>
      <h2>Professional Network · Office 3-B</h2>

      <div class="case-list">
        ${MinistryRelationships.colleagues.map(
          colleague => {

            const unlocked =
              MinistryRelationships.isUnlocked(
                colleague.id
              );

            const record =
              MinistryRelationships.getRecord(
                colleague.id
              );

            return unlocked
              ? `
                <button class="case-entry available" onclick="showColleague('${colleague.id}')">
                  <b>${colleague.name}</b>
                  <span>${colleague.role}</span>
                  <small>${MinistryRelationships.getTrustLabel(record.trust)} · Trust ${record.trust}/5</small>
                </button>
              `
              : `
                <button class="case-entry locked">
                  <b>CLASSIFIED CONTACT</b>
                  <span>Not yet introduced</span>
                  <small>Continue Ministry service</small>
                </button>
              `;
          }
        ).join("")}
      </div>

      <div class="notice">
        <p>Professional check-ins are optional and available once per colleague each work day.</p>
        <p class="muted">Relationship records are preserved with your employee archive.</p>
      </div>

      <div class="center">
        <button class="btn" onclick="showDashboard()">RETURN TO OFFICE</button>
      </div>
    </section>
  `;
}


function showColleague(
  colleagueId,
  feedback = "",
  isWarning = false
){

  const colleague =
    MinistryRelationships.getColleague(
      colleagueId
    );

  if(
    !colleague ||
    !MinistryRelationships.isUnlocked(
      colleagueId
    )
  ){
    showColleagues();
    return;
  }

  const record =
    MinistryRelationships.getRecord(
      colleagueId
    );

  const spokeToday =
    MinistryRelationships.hasInteractedToday(
      colleagueId
    );

  app.innerHTML = `
    <section class="panel">
      <div class="seal">MINISTRY COLLEAGUE RECORD</div>
      <h1>${colleague.name}</h1>
      <h2>${colleague.role}</h2>

      ${feedback
        ? `<div class="notice ${isWarning ? "warning" : ""}"><p>${feedback}</p></div>`
        : ""}

      ${renderMinistryDocument({
        seal: "PROFESSIONAL CHECK-IN",
        title: colleague.name,
        subtitle: colleague.department,
        classification: "Internal · Colleague Network",
        department: colleague.department,
        status: MinistryRelationships.getTrustLabel(record.trust),
        body:`${colleague.introduction}

TODAY'S BRIEFING:
"${MinistryRelationships.getBriefing(colleagueId)}"

TRUST: ${record.trust}/5
CHECK-INS RECORDED: ${record.interactionCount}`,
        footer: "MINISTRY COLLEAGUE DIRECTORY"
      })}

      ${spokeToday
        ? `
          <div class="notice">
            <p>Today's professional check-in is complete.</p>
            <p class="muted">Return on the next work day for a new conversation.</p>
          </div>
        `
        : `
          <div class="case-list">
            ${colleague.choices.map(
              choice => `
                <button class="case-entry available" onclick="talkToColleague('${colleague.id}','${choice.id}')">
                  <b>${choice.style.toUpperCase()}</b>
                  <span>${choice.label}</span>
                  <small>Professional check-in</small>
                </button>
              `
            ).join("")}
          </div>
        `}

      <div class="center">
        <button class="btn" onclick="showColleagues()">BACK TO COLLEAGUES</button>
        <button class="btn" onclick="showDashboard()">RETURN TO OFFICE</button>
      </div>
    </section>
  `;
}


function talkToColleague(
  colleagueId,
  choiceId
){

  const result =
    MinistryRelationships.interact(
      colleagueId,
      choiceId
    );

  showColleague(
    colleagueId,
    result.response,
    !result.success
  );
}
