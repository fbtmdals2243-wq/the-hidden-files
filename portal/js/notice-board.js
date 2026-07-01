function showNoticeBoard(){
  const notices = getMinistryNotices();

  app.innerHTML = `
    <section class="panel">
      <div class="seal">MINISTRY NOTICE BOARD</div>

      <h1>Notice Board</h1>
      <h2>Archive Division Internal Notices</h2>

      <div class="case-list">
        ${notices.map(notice=>`
          <button class="case-entry available" onclick="openNotice('${notice.id}')">
            <b>${notice.category}</b>
            <span>${notice.title}</span>
            <small>${notice.status}</small>
          </button>
        `).join("")}
      </div>

      <div class="center">
        <button class="btn" onclick="showDashboard()">RETURN TO OFFICE</button>
      </div>
    </section>
  `;
}

function openNotice(noticeId){
  const notice = getMinistryNotices().find(item => item.id === noticeId);
localStorage.setItem("noticeRead_" + noticeId, "true");
  if(!notice){
    alert("Notice not found.");
    return;
  }

  app.innerHTML = `
    <section class="panel">
      <div class="seal">MINISTRY NOTICE</div>

      <h1>${notice.title}</h1>
      <h2>${notice.category}</h2>

      ${renderMinistryDocument({
        seal: "MINISTRY NOTICE",
        title: notice.title,
        subtitle: notice.category,
        classification: "Internal",
        department: "Archive Division",
        status: notice.status,
        body: notice.body,
        footer: "MINISTRY NOTICE · INTERNAL USE"
      })}

      <div class="center">
        <button class="btn" onclick="showNoticeBoard()">BACK TO NOTICE BOARD</button>
      </div>
    </section>
  `;
}