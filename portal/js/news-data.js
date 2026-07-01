function getMinistryNews(){
  const caseStatus = localStorage.getItem("caseStatus_CASE-000");

  const news = [
    {
      id: "NEWS-001",
      title: "Minor Archive Irregularity Reported",
      category: "Ministry Affairs",
      status: "Published",
      body: `A minor irregularity has been reported within the Archive Division.

Ministry officials have stated that the matter is procedural and currently under internal review.

No public risk has been identified.`
    }
  ];

  if(caseStatus === "Under Review"){
    news.unshift({
      id: "NEWS-002",
      title: "Archive Investigation Continues",
      category: "Internal Affairs",
      status: "Published",
      body: `An internal investigation has begun following an irregular Owl Mail delivery recorded by the Archive Division.

Officials have confirmed that the case remains under review.

No further comment has been released by the Ministry.`
    });
  }

  return news;
}