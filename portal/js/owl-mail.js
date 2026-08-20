function getOwlMails(){

  const case000Status =
    Player.getCaseStatus(
      "CASE-000"
    );

  const case001Status =
    Player.getCaseStatus(
      "CASE-001"
    );

  const case002Status =
    Player.getCaseStatus(
      "CASE-002"
    );

  const case003Status =
    Player.getCaseStatus(
      "CASE-003"
    );

  const case004Status =
    Player.getCaseStatus(
      "CASE-004"
    );

  const case005Status =
    Player.getCaseStatus(
      "CASE-005"
    );

  const worldDay =
    World.getDay();


  function getMailStatus(mailId){

    const isRead =
      localStorage.getItem(
        "mailRead_" + mailId
      ) === "true";

    return isRead
      ? "Read"
      : "Unread";
  }


  const mails = [

    {
      id:
        "MAIL-001",

      from:
        "Eleanor Whitmore",

      subject:
        "Welcome to Archive Division",

      status:
        getMailStatus(
          "MAIL-001"
        ),

      body:`Officer,

Welcome to the Archive Division.

Your first duty is to complete orientation and receive Level I archive clearance.

Do not attempt to access sealed records before clearance is granted.

— Eleanor Whitmore
Senior Archivist`
    }

  ];


  /* =====================================================
     CASE-000
  ===================================================== */

  if(
    case000Status ===
    "Under Review"
  ){

    mails.unshift({

      id:
        "MAIL-002",

      from:
        "Eleanor Whitmore",

      subject:
        "CASE-000 Report Received",

      status:
        getMailStatus(
          "MAIL-002"
        ),

      body:`Officer,

I received your report regarding CASE-000.

Your findings have been forwarded to the Archive Review Committee.

Until further notice, the case status has been updated to UNDER REVIEW.

Do not access restricted records without authorization.

— Eleanor Whitmore
Senior Archivist`

    });
  }


  if(
    case000Status ===
      "Committee Pending" ||
    case000Status ===
      "Await Final Review"
  ){

    mails.unshift({

      id:
        "MAIL-003",

      from:
        "Archive Review Committee",

      subject:
        "CASE-000 Review Scheduled",

      status:
        getMailStatus(
          "MAIL-003"
        ),

      body:`Officer,

Your report regarding CASE-000 has been received.

The Archive Review Committee has scheduled preliminary examination of your findings.

Further instructions will follow.

— Archive Review Committee`

    });
  }


  /* =====================================================
     DAY 2
  ===================================================== */

  if(
    worldDay >= 2 &&
    case000Status === "Solved"
  ){

    mails.unshift({

      id:
        "MAIL-004",

      from:
        "Eleanor Whitmore",

      subject:
        "Second-Day Assignment Notice",

      status:
        getMailStatus(
          "MAIL-004"
        ),

      body:`Officer,

Your work on CASE-000 has been formally entered into your personnel record.

Your promotion and Level II archive clearance have also been confirmed.

A restricted assignment is currently being prepared for you.

Until the file is released, review today's Ministry communications and remain available in Office 3-B.

Do not mistake higher clearance for unrestricted authority.

— Eleanor Whitmore
Senior Archivist`

    });
  }


  /* =====================================================
     DAY 3
  ===================================================== */

  if(
    worldDay >= 3 &&
    case001Status === "Solved"
  ){

    mails.unshift({

      id:
        "MAIL-005",

      from:
        "Office of the Undersecretary",

      subject:
        "Mandatory Internal Briefing",

      status:
        getMailStatus(
          "MAIL-005"
        ),

      body:`Officer,

Your report concerning CASE-001 has been reviewed.

One item requires immediate clarification.

The employee identification referenced in your investigation:

MOM-000117

does not appear in the current Ministry personnel registry.

However, historical security systems continue to recognize the identification as valid.

You are instructed not to discuss this identifier with other employees.

A classified internal briefing is being prepared.

Remain in Office 3-B until further instruction.

This communication is restricted.

— Office of the Undersecretary
British Ministry of Magic`

    });
  }


  /* =====================================================
     DAY 4
  ===================================================== */

  if(
    worldDay >= 4 &&
    case002Status === "Solved"
  ){

    mails.unshift({

      id:
        "MAIL-006",

      from:
        "Office of the Undersecretary",

      subject:
        "Sub-Level 4 Access Directive",

      status:
        getMailStatus(
          "MAIL-006"
        ),

      body:`Officer,

Your findings regarding MOM-000117 have been accepted.

The final historical access record connected to that employee identifier originated from:

SUB-LEVEL 4

You are hereby granted temporary investigative authorization to enter the Sub-Level 4 archive corridor.

This authorization does not alter your permanent clearance level.

Your Level II credentials will be temporarily recognized for one restricted investigation only.

You are not authorized to open unrelated sealed chambers.

You are not authorized to remove documents.

You are not authorized to discuss what you observe with personnel outside this investigation.

A sealed case file will be released after you acknowledge this directive.

If the historical records are correct, MOM-000117 entered Sub-Level 4 thirty years ago.

No record shows the officer leaving.

— Office of the Undersecretary
British Ministry of Magic`

    });
  }


  /* =====================================================
     DAY 5
     CASE-003 REVIEW RESULT
  ===================================================== */

  if(
    worldDay >= 5 &&
    (
      case003Status === "Under Review" ||
      case003Status === "Solved"
    )
  ){

    mails.unshift({

      id:
        "MAIL-007",

      from:
        "Office of the Undersecretary",

      subject:
        "CASE-003 Review Result · Room 4-7",

      status:
        getMailStatus(
          "MAIL-007"
        ),

      body:`Officer,

Your report concerning CASE-003 has been reviewed.

The Ministry confirms the following information.

ROOM 4-7 EXISTS.

The chamber was removed from standard Ministry floor plans thirty years ago.

Its original designation was:

PERSONNEL CONTINUITY CHAMBER

The chamber was created to preserve Ministry authorization records when an employee's identity could no longer remain inside the standard personnel system.

MOM-000117 was registered as a Continuity Subject.

This explains why the employee identifier remained valid after the corresponding personnel identity was deleted.

However, one discrepancy remains.

Continuity records are not supposed to generate active security events.

They are archival.

They cannot authenticate.

They cannot open cabinets.

And they cannot refresh security seals.

Yet MOM-000117 did exactly that.

At 02:13.

The Ministry therefore cannot conclude that the credential is merely a historical remnant.

Your CASE-003 investigation is officially closed.

A new authorization review is now underway.

Do not attempt to access Room 4-7 again.

Do not discuss the term "Personnel Continuity Chamber" outside authorized channels.

Further instructions will follow.

— Office of the Undersecretary
British Ministry of Magic`

    });
  }


  /* =====================================================
     DAY 6
     PERSONNEL INTEGRITY ALERT
  ===================================================== */

  if(
    worldDay >= 6 &&
    case003Status === "Solved"
  ){

    mails.unshift({

      id:
        "MAIL-008",

      from:
        "Ministry Personnel Registry",

      subject:
        "Mandatory Personnel Integrity Audit",

      status:
        getMailStatus(
          "MAIL-008"
        ),

      body:`Officer,

This notice was generated by the active Ministry personnel system.

At 08:41, during your morning authentication, your employee credential produced a legacy continuity verification response.

The response should not exist on an active personnel record.

The only matching authorization signature currently held by the Ministry is attached to:

MOM-000117

This message does not establish that you and MOM-000117 are the same person.

It does not establish a family, departmental, or credential-transfer relationship.

It confirms only that the current Ministry system accepted both employee records through the same restricted continuity signature.

The origin of that signature is not visible to the Personnel Registry.

Your employee number remains active.

Do not surrender, replace, or attempt to alter your Ministry credentials.

Open your Employee Record in Office 3-B and review the newly attached registry notice.

Further access instructions will follow.

— Ministry Personnel Registry
Integrity and Continuity Review Desk`

    });
  }


  /* =====================================================
     DAY 7
     CASE-004 REVIEW RESULT
  ===================================================== */

  if(
    worldDay >= 7 &&
    (
      case004Status === "Under Review" ||
      case004Status === "Solved"
    )
  ){

    mails.unshift({

      id:
        "MAIL-009",

      from:
        "Office of the Undersecretary",

      subject:
        "CASE-004 Review Result · Prior Authorization Claim",

      status:
        getMailStatus(
          "MAIL-009"
        ),

      body:`Officer,

Your report concerning CASE-004 has been reviewed by the Personnel Continuity Oversight Panel.

The Ministry confirms that the signature attached to your active employee record is an exact match for:

PC-117-CONTINUITY

The signature was not copied, transferred, inherited, or manually reassigned.

It entered your credential through a prior authorization claim.

The recovered sequence is as follows.

DAY 1 · 09:11:58

Room 4-7 submitted an authorization claim for an unassigned Recruitment credential.

DAY 1 · 09:12:04

Your current Ministry employee number was generated.

DAY 1 · 09:12:09

Your verified identity was attached to that number.

The authorization claim therefore existed six seconds before your employee number existed in the active personnel registry.

The claim did not contain your name, wand registration, department, or any other standard identity marker.

It contained only the instruction:

RETAIN AUTHORIZATION

SOURCE:
PERSONNEL CONTINUITY CHAMBER / ROOM 4-7

HISTORICAL RECORD:
MOM-000117

This result does not establish that you and MOM-000117 are the same person.

It establishes that Room 4-7 recognized a credential assigned to you before the Ministry finished creating it.

Your employee status remains ACTIVE.

Your clearance remains LEVEL II.

No disciplinary action has been authorized.

CASE-004 is officially closed.

Do not attempt to remove the continuity signature.

A continuing assignment is being prepared.

— Office of the Undersecretary
British Ministry of Magic`

    });
  }


  /* =====================================================
     DAY 8
     RECRUITMENT SYSTEMS AUDIT
  ===================================================== */

  if(
    worldDay >= 8 &&
    case004Status === "Solved"
  ){

    mails.unshift({

      id:
        "MAIL-010",

      from:
        "Recruitment Oversight Office",

      subject:
        "Classified Assignment · Unresolved Vacancy AR-117",

      status:
        getMailStatus(
          "MAIL-010"
        ),

      body:`Officer,

The Office of the Undersecretary has authorized a limited audit of your original Ministry appointment.

CASE-004 established that Room 4-7 submitted an authorization claim before your employee number was generated.

Recruitment Oversight has now identified the target of that claim:

VACANCY-AR-117

DEPARTMENT:
ARCHIVE DIVISION

POSITION:
CONTINUITY RECORDS LIAISON

ORIGINAL APPOINTEE:
MOM-000117

The position was created thirty-one years ago.

It has never been formally closed.

The Personnel system currently records the position as both OCCUPIED and ELIGIBLE FOR RECRUITMENT.

On Day 1, your application was routed into this position before your identity was attached to a Ministry credential.

You are assigned to determine:

1. Why VACANCY-AR-117 remained open.

2. How the vacancy selected your application.

3. Whether the shared continuity signature belongs to the employee, the position, or another Ministry authorization layer.

This inquiry does not suspend your employment.

Your credentials remain active.

The sealed file is now available as:

CASE-005
THE POSITION THAT NEVER CLOSED

— Recruitment Oversight Office
British Ministry of Magic`

    });
  }


  /* =====================================================
     DAY 9
     CASE-005 FINAL DETERMINATION
  ===================================================== */

  if(
    worldDay >= 9 &&
    (
      case005Status === "Under Review" ||
      case005Status === "Solved"
    )
  ){

    mails.unshift({

      id:
        "MAIL-011",

      from:
        "Office of the Undersecretary",

      subject:
        "CASE-005 Final Determination · Continuity Appointment",

      status:
        getMailStatus(
          "MAIL-011"
        ),

      body:`Officer,

Your report concerning CASE-005 has been accepted.

The Personnel Continuity Oversight Panel has reached a final determination regarding VACANCY-AR-117.

The continuity signature does not establish that you and MOM-000117 share an identity.

The available evidence supports a different conclusion.

PC-117-CONTINUITY belongs to the Ministry appointment attached to VACANCY-AR-117.

MOM-000117 was the first recorded holder of that appointment.

You are the second.

Thirty years ago, the Office of the Undersecretary ordered the position to remain recruitment-eligible while its original authorization stayed active inside Room 4-7.

That order created a continuity-held post: one Ministry position capable of preserving a historical occupant while accepting a future compatible appointee.

On Day 1, the Recruitment system determined that your application satisfied the sealed compatibility condition.

The condition itself remains unavailable.

The Ministry cannot currently determine why your application qualified.

It can determine that your appointment is lawful, active, and distinct from the erased identity of MOM-000117.

CASE-005 is officially closed.

Your permanent personnel status is confirmed as follows.

ASSIGNED DEPARTMENT:
ARCHIVE DIVISION

RANK:
ARCHIVE OFFICER

CLEARANCE:
LEVEL II

SPECIAL ASSIGNMENT:
CONTINUITY LIAISON

You will retain your current employee number and credentials.

You are authorized to review future continuity anomalies assigned through Office 3-B.

You are not authorized to reopen Room 4-7 or unseal the identity of MOM-000117.

That identity remains a classified matter.

Daily Ministry duties will continue while further continuity files are prepared.

Report to Office 3-B on your next work day.

— Office of the Undersecretary
British Ministry of Magic`

    });
  }


  return mails;
}


/* =========================================================
   OWL MAIL LIST
========================================================= */

function showOwlMail(){

  const mails =
    getOwlMails();


  app.innerHTML = `
    <section class="panel">

      <div class="seal">
        OWL MAIL OFFICE
      </div>

      <h1>
        Owl Mail
      </h1>

      <h2>
        Internal Ministry Correspondence
      </h2>


      <div class="case-list">

        ${
          mails.map(
            mail => `

              <button
                class="case-entry available"
                onclick="openOwlMail('${mail.id}')">

                <b>
                  ${mail.from}
                </b>

                <span>
                  ${mail.subject}
                </span>

                <small>
                  ${mail.status}
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


/* =========================================================
   OPEN OWL MAIL
========================================================= */

function openOwlMail(mailId){

  const mail =
    getOwlMails().find(
      item =>
        item.id === mailId
    );


  if(!mail){

    alert(
      "Mail not found."
    );

    return;
  }


  localStorage.setItem(
    "mailRead_" + mailId,
    "true"
  );


  /* =====================================================
     CASE-000 PROGRESSION
  ===================================================== */

  if(
    mailId ===
    "MAIL-003"
  ){

    Player.setCaseStatus(
      "CASE-000",
      "Solved"
    );
  }


  /* =====================================================
     CASE-003 REVIEW COMPLETE
  ===================================================== */

  if(
    mailId ===
    "MAIL-007"
  ){

    Player.setCaseStatus(
      "CASE-003",
      "Solved"
    );


    localStorage.setItem(
      "caseCompleted_CASE-003",
      new Date().toISOString()
    );


    localStorage.setItem(
      "continuityChamberDiscovered",
      "true"
    );
  }


  /* =====================================================
     CASE-004 REVIEW COMPLETE
  ===================================================== */

  if(
    mailId ===
    "MAIL-009"
  ){

    Player.setCaseStatus(
      "CASE-004",
      "Solved"
    );


    localStorage.setItem(
      "caseCompleted_CASE-004",
      new Date().toISOString()
    );


    localStorage.setItem(
      "continuityPriorClaimConfirmed",
      "true"
    );
  }


  /* =====================================================
     CASE-005 FINAL DETERMINATION
  ===================================================== */

  if(
    mailId ===
    "MAIL-011"
  ){

    Player.setCaseStatus(
      "CASE-005",
      "Solved"
    );


    localStorage.setItem(
      "caseCompleted_CASE-005",
      new Date().toISOString()
    );


    localStorage.setItem(
      "firstStoryArcCompleted",
      "true"
    );


    localStorage.setItem(
      "playerAssignedDepartment",
      "Archive Division"
    );


    localStorage.setItem(
      "playerSpecialAssignment",
      "Continuity Liaison"
    );
  }


  app.innerHTML = `
    <section class="panel">

      <div class="seal">
        OWL MAIL RECORD
      </div>

      <h1>
        ${mail.subject}
      </h1>

      <h2>
        From: ${mail.from}
      </h2>


      ${renderMinistryDocument({

        seal:
          "OWL MAIL",

        title:
          mail.subject,

        subtitle:
          "From: " +
          mail.from,

        classification:
          (
            mailId === "MAIL-005" ||
            mailId === "MAIL-006" ||
            mailId === "MAIL-007" ||
            mailId === "MAIL-008" ||
            mailId === "MAIL-009" ||
            mailId === "MAIL-010" ||
            mailId === "MAIL-011"
          )
            ? "Restricted"
            : "Internal",

        department:
          "Archive Division",

        status:
          "Delivered",

        body:
          mail.body,

        footer:
          "OWL MAIL · INTERNAL CORRESPONDENCE"

      })}


      <div class="center">

        <button
          class="btn"
          onclick="showOwlMail()">

          BACK TO OWL MAIL

        </button>

      </div>

    </section>
  `;
}
