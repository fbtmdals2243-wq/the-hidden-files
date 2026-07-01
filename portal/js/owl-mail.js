function getOwlMails(){
  const caseStatus = (localStorage.getItem("caseStatus_CASE-000") || "").trim();

  const mails = [
    {
      id: "MAIL-001",
      from: "Eleanor Whitmore",
      subject: "Welcome to Archive Division",
      status: "Unread",
      body: `Officer,

Welcome to the Archive Division.

Your first duty is to complete orientation and receive Level I archive clearance.

Do not attempt to access sealed records before clearance is granted.

— Eleanor Whitmore
Senior Archivist`
    }
  ];

  if(caseStatus === "Under Review"){
    mails.unshift({
      id: "MAIL-002",
      from: "Eleanor Whitmore",
      subject: "CASE-000 Report Received",
      status: "Unread",
      body: `Officer,

I received your report regarding CASE-000.

Your findings have been forwarded to the Archive Review Committee.

Until further notice, the case status has been updated to UNDER REVIEW.

Do not access restricted records without authorization.

— Eleanor Whitmore
Senior Archivist`
    });
  }
if(caseStatus === "Committee Pending" || caseStatus === "Await Final Review"){
  mails.unshift({
    id: "MAIL-003",
    from: "Archive Review Committee",
    subject: "CASE-000 Review Scheduled",
    status: "Unread",
    body: `Officer,

Your report regarding CASE-000 has been received.

The Archive Review Committee has scheduled preliminary examination of your findings.

Further instructions will follow.

— Archive Review Committee`
  });
}
  return mails;
}

function showOwlMail(){
  const mails = getOwlMails();

  app.innerHTML = `
    <section class="panel">
      <div class="seal">OWL MAIL OFFICE</div>

      <h1>Owl Mail</h1>
      <h2>Internal Ministry Correspondence</h2>

      <div class="case-list">
        ${mails.map(mail=>`
          <button class="case-entry available" onclick="openOwlMail('${mail.id}')">
            <b>${mail.from}</b>
            <span>${mail.subject}</span>
            <small>${mail.status}</small>
          </button>
        `).join("")}
      </div>

      <div class="center">
        <button class="btn" onclick="showDashboard()">RETURN TO OFFICE</button>
      </div>
    </section>
  `;
}

function openOwlMail(mailId){
  const mail = getOwlMails().find(item => item.id === mailId);
localStorage.setItem("mailRead_" + mailId, "true");
if(mailId === "MAIL-003"){

  localStorage.setItem(
    "caseStatus_CASE-000",
    "Solved"
  );

}
  if(!mail){
    alert("Mail not found.");
    return;
  }

  app.innerHTML = `
    <section class="panel">
      <div class="seal">OWL MAIL RECORD</div>

      <h1>${mail.subject}</h1>
      <h2>From: ${mail.from}</h2>

      ${renderMinistryDocument({
        seal: "OWL MAIL",
        title: mail.subject,
        subtitle: "From: " + mail.from,
        classification: "Internal",
        department: "Archive Division",
        status: "Delivered",
        body: mail.body,
        footer: "OWL MAIL · INTERNAL CORRESPONDENCE"
      })}

      <div class="center">
        <button class="btn" onclick="showOwlMail()">BACK TO OWL MAIL</button>
      </div>
    </section>
  `;
}