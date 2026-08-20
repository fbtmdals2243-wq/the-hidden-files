function getMinistryNews(){

  const caseStatus =
    Player.getCaseStatus(
      "CASE-000"
    );

  const case004Status =
    Player.getCaseStatus(
      "CASE-004"
    );

  const worldDay =
    World.getDay();


  function getNewsStatus(newsId){

    const isRead =
      localStorage.getItem(
        "newsRead_" + newsId
      ) === "true";

    return isRead
      ? "Read"
      : "Published";
  }


  const news = [

    {
      id:
        "NEWS-001",

      title:
        "Minor Archive Irregularity Reported",

      category:
        "Ministry Affairs",

      status:
        getNewsStatus(
          "NEWS-001"
        ),

      body:`A minor irregularity has been reported within the Archive Division.

Ministry officials have stated that the matter is procedural and currently under internal review.

No public risk has been identified.`
    }

  ];


  /* =====================================================
     CASE-000 UNDER REVIEW
  ===================================================== */

  if(
    caseStatus ===
    "Under Review"
  ){

    news.unshift({

      id:
        "NEWS-002",

      title:
        "Archive Investigation Continues",

      category:
        "Internal Affairs",

      status:
        getNewsStatus(
          "NEWS-002"
        ),

      body:`An internal investigation has begun following an irregular Owl Mail delivery recorded by the Archive Division.

Officials have confirmed that the case remains under review.

No further comment has been released by the Ministry.`

    });
  }


  /* =====================================================
     DAY 2 NEWS
  ===================================================== */

  if(
    worldDay >= 2 &&
    caseStatus === "Solved"
  ){

    news.unshift({

      id:
        "NEWS-003",

      title:
        "Ministry Reviews Internal Archive Security",

      category:
        "Ministry Affairs",

      status:
        getNewsStatus(
          "NEWS-003"
        ),

      body:`The Ministry of Magic has begun a routine review of internal archive security procedures following a recently concluded investigation.

Officials described the review as precautionary and stated that no immediate threat to Ministry operations has been identified.

Several departments have been instructed to examine record-handling procedures and restricted-access protocols.

The Archive Division declined to comment on the investigation that prompted the review.

Sources inside the Ministry suggest additional restricted files may soon be reopened for examination.`

    });
  }


  /* =====================================================
     DAY 7 NEWS
  ===================================================== */

  if(
    worldDay >= 7 &&
    (
      case004Status === "Under Review" ||
      case004Status === "Solved"
    )
  ){

    news.unshift({

      id:
        "NEWS-004",

      title:
        "Ministry Denies Widespread Credential Delays",

      category:
        "Ministry Affairs",

      status:
        getNewsStatus(
          "NEWS-004"
        ),

      body:`The Ministry of Magic has denied reports of a widespread security failure after several employees experienced brief credential verification delays yesterday morning.

The interruptions began shortly after 08:41 and affected entry checkpoints in three administrative departments.

A Ministry spokesperson described the incident as a routine validation of legacy authorization records and stated that no employee identities had been lost, replaced, or compromised.

Personnel Registry staff have been instructed to preserve all active credentials while the review continues.

Employees have also been advised not to request replacement identification unless directly contacted by their department.

The Ministry declined to explain why a legacy system was able to interrupt current security checks.

Normal operations have resumed.`

    });
  }


  return news;
}
