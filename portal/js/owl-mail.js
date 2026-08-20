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
            mailId === "MAIL-008"
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
