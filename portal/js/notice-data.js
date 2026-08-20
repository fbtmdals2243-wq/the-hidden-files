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


  /* =====================================================
     CONTINUING DAILY NOTICE
  ===================================================== */

  const firstStoryArcCompleted =
    localStorage.getItem(
      "firstStoryArcCompleted"
    ) === "true";


  if(
    worldDay >= 10 &&
    firstStoryArcCompleted
  ){

    const dailyNotices = [

      {
        title:
          "Lift 4 Service Interruption",

        category:
          "Facilities",

        body:
`Lift 4 will not stop at Sub-Levels 3 through 5 between 13:00 and 15:00.

Employees requiring archive access should use the eastern stairwell or request a temporary Portkey from Facilities.

Do not attempt to redirect the lift manually.`
      },

      {
        title:
          "Wand Safety Inspection",

        category:
          "Security",

        body:
`All employees assigned to Office 3-B must confirm that their registered wand remains matched to their active personnel record.

This is a routine inspection.

Do not surrender a wand to an employee who cannot display current Security Office credentials.`
      },

      {
        title:
          "Owl Mail Desk Relocation",

        category:
          "Operations",

        body:
`The internal Owl Mail collection desk has moved temporarily to the second-floor western corridor.

Priority red capsules should continue to be delivered directly to the Mail Office.

Unlabelled capsules will be returned to the sending department.`
      },

      {
        title:
          "Memory Container Seal Check",

        category:
          "Archive Procedure",

        body:
`Archive officers must inspect the outer seal of every memory container before reshelving.

Internal movement does not automatically indicate damage.

Report fractures, unauthorized labels, or audible speech to a Memory Specialist.`
      },

      {
        title:
          "Interdepartmental Record Audit",

        category:
          "Personnel",

        body:
`Department administrators will review shared personnel and location records this afternoon.

Employees may experience brief delays when opening office directories.

Active credentials must not be replaced during the audit.`
      },

      {
        title:
          "Restricted Corridor Cleaning Schedule",

        category:
          "Facilities",

        body:
`Restricted Archive Corridor cleaning will begin after the final work session.

All evidence containers must be removed from the floor.

Cleaning staff are not authorized to open sealed cabinets, regardless of apparent dust levels.`
      },

      {
        title:
          "Monthly Service Record Reminder",

        category:
          "Personnel",

        body:
`Employees are reminded that completed daily duties contribute to the permanent Ministry service record.

Service Points do not automatically alter rank or clearance.

Promotion and departmental transfer decisions require a separate Personnel review.`
      }

    ];


    const noticeTemplate =
      dailyNotices[
        (worldDay - 10) %
        dailyNotices.length
      ];

    const dailyNoticeId =
      "NOTICE-DAY-" +
      worldDay;


    notices.unshift({

      id:
        dailyNoticeId,

      title:
        noticeTemplate.title,

      category:
        noticeTemplate.category,

      status:
        getNoticeStatus(
          dailyNoticeId,
          "New"
        ),

      body:
        noticeTemplate.body

    });
  }


  return notices;
}
