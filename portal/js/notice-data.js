function getMinistryNotices(){

  const caseStatus =
    Player.getCaseStatus(
      "CASE-000"
    );

  const worldDay =
    World.getDay();


  function getNoticeStatus(
    noticeId,
    defaultStatus = "Active"
  ){

    const isRead =
      localStorage.getItem(
        "noticeRead_" + noticeId
      ) === "true";

    return isRead
      ? "Reviewed"
      : defaultStatus;
  }


  const notices = [

    {
      id:
        "NOTICE-001",

      title:
        "Archive Division Security Reminder",

      category:
        "Security",

      status:
        getNoticeStatus(
          "NOTICE-001",
          "Active"
        ),

      body:`Employees are reminded that Level I Archive clearance does not permit access to sealed Ministry records.

Unauthorized access attempts will be investigated.

Employees receiving higher clearance remain responsible for observing departmental access restrictions.`
    }

  ];


  /* =====================================================
     CASE-000 UNDER REVIEW
  ===================================================== */

  if(
    caseStatus ===
    "Under Review"
  ){

    notices.unshift({

      id:
        "NOTICE-002",

      title:
        "CASE-000 Status Updated",

      category:
        "Investigation",

      status:
        getNoticeStatus(
          "NOTICE-002",
          "New"
        ),

      body:`CASE-000 has officially entered the UNDER REVIEW stage.

Review Committee members have been notified.

Further instructions will be delivered through Owl Mail.`

    });
  }


  /* =====================================================
     DAY 2 NOTICE
  ===================================================== */

  if(
    worldDay >= 2 &&
    caseStatus === "Solved"
  ){

    notices.unshift({

      id:
        "NOTICE-003",

      title:
        "Restricted Archive Access Procedure Updated",

      category:
        "Security",

      status:
        getNoticeStatus(
          "NOTICE-003",
          "New"
        ),

      body:`Effective immediately, Level II officers may access selected restricted Archive Division records.

Level II clearance does not authorize unrestricted access.

Restricted files must be opened only when officially assigned or released by senior personnel.

A new restricted record is currently undergoing clearance review.

Employees are reminded that unauthorized examination of sealed records may result in suspension of archive privileges.

— Ministry Security Office`

    });
  }


  return notices;
}