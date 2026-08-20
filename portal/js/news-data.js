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


  /* =====================================================
     CONTINUING DAILY NEWS
  ===================================================== */

  const firstStoryArcCompleted =
    localStorage.getItem(
      "firstStoryArcCompleted"
    ) === "true";


  if(
    worldDay >= 10 &&
    firstStoryArcCompleted
  ){

    const dailyNews = [

      {
        title:
          "Floo Network Inspection Expands Across London",

        category:
          "Magical Transportation",

        body:
`Ministry inspectors have expanded routine Floo Network checks across central London after several fireplaces reported delayed destination confirmations.

Officials stated that travel remains safe and advised commuters to speak destination names clearly.

No connection has been found between the delays and recent Ministry credential reviews.`
      },

      {
        title:
          "Welsh Dragon Reserve Requests New Flight Corridor",

        category:
          "Magical Creatures",

        body:
`The Welsh Dragon Reserve has submitted a request for a temporary protected flight corridor after two juvenile Common Welsh Greens moved beyond their usual range.

The Ministry has asked nearby broom traffic to avoid the marked airspace.

No injuries have been reported.`
      },

      {
        title:
          "Muggle Artefact Amnesty Collection Reopens",

        category:
          "Ministry Affairs",

        body:
`The Misuse of Muggle Artefacts Office has reopened its voluntary amnesty desk.

Wizarding households may surrender improperly enchanted household objects without immediate penalty.

Officials are particularly concerned about self-writing telephones and aggressively helpful vacuum cleaners.`
      },

      {
        title:
          "St Mungo's Announces Memory Recovery Study",

        category:
          "Health and Research",

        body:
`St Mungo's Hospital has announced a controlled study into the recovery of memories damaged by long-term containment charms.

Researchers emphasized that the programme does not involve erased Ministry personnel records.

Applications will open to qualified volunteers next month.`
      },

      {
        title:
          "Weather Charm Workers Reach Temporary Agreement",

        category:
          "Wizarding Britain",

        body:
`The Guild of Atmospheric Charm Workers has reached a temporary agreement with the Ministry following complaints about excessive indoor rain.

Government offices will continue normal operations while ventilation charms are recalibrated.

Archive employees are advised to protect uncovered parchment.`
      },

      {
        title:
          "Knight Bus Adds Early Ministry Service",

        category:
          "Magical Transportation",

        body:
`The Knight Bus will introduce an early morning Ministry route on a trial basis.

The service is intended for employees affected by overnight Floo maintenance.

Passengers are reminded that Ministry identification does not guarantee a seated journey.`
      },

      {
        title:
          "Wizengamot Reviews Historical Record Standards",

        category:
          "Government",

        body:
`The Wizengamot has opened a procedural review of how long-term magical records are preserved across Ministry departments.

The review will examine conflicting dates, obsolete department names, and records that remain active after their original purpose has ended.

The Archive Division has been asked to provide technical guidance.`
      }

    ];


    const article =
      dailyNews[
        (worldDay - 10) %
        dailyNews.length
      ];

    const dailyNewsId =
      "NEWS-DAY-" +
      worldDay;


    news.unshift({

      id:
        dailyNewsId,

      title:
        article.title,

      category:
        article.category,

      status:
        getNewsStatus(
          dailyNewsId
        ),

      body:
        article.body

    });
  }


  return news;
}
