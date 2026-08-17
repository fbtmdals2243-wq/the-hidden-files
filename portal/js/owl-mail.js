function getOwlMails(){

  const caseStatus =
    Player.getCaseStatus(
      "CASE-000"
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
     CASE-000 REPORT
  ===================================================== */

  if(
    caseStatus ===
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


  /* =====================================================
     COMMITTEE REVIEW
  ===================================================== */

  if(
    caseStatus ===
      "Committee Pending" ||
    caseStatus ===
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
     DAY 2 MAIL
  ===================================================== */

  if(
    worldDay >= 2 &&
    caseStatus === "Solved"
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
   OPEN MAIL
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


  /*
    Existing CASE-000 progression.
  */

  if(
    mailId ===
    "MAIL-003"
  ){

    Player.setCaseStatus(
      "CASE-000",
      "Solved"
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
          "Internal",

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