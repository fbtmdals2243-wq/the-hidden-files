const whitmoreDialogue = [
  {
    npc: "whitmore",
    speaker: "Eleanor Whitmore",
    location: "ARCHIVE DIVISION · OFFICE 3-B",
    text: "Good morning."
  },
  {
    npc: "whitmore",
    speaker: "Eleanor Whitmore",
    location: "ARCHIVE DIVISION · OFFICE 3-B",
    text: "You must be our new recruit."
  },
  {
    npc: "whitmore",
    speaker: "Eleanor Whitmore",
    location: "ARCHIVE DIVISION · OFFICE 3-B",
    text: "My name is Eleanor Whitmore. Senior Archivist."
  },
  {
    npc: "whitmore",
    speaker: "Eleanor Whitmore",
    location: "ARCHIVE DIVISION · OFFICE 3-B",
    text: "I'll be responsible for your orientation."
  },
  {
    npc: "whitmore",
    speaker: "Eleanor Whitmore",
    location: "ARCHIVE DIVISION · OFFICE 3-B",
    text: "Follow closely. The Ministry has little patience for officers who ignore procedure."
  }
];

function showWhitmoreIntro() {
  startDialogue(
    whitmoreDialogue,
    function(){
      showOfficeWalkthrough();
    }
  );
}
const officeWalkthroughDialogue = [
  {
    npc: "whitmore",
    speaker: "Eleanor Whitmore",
    location: "ARCHIVE DIVISION · OFFICE 3-B",
    text: "Before we begin your orientation, you should understand this office."
  },
  {
    npc: "whitmore",
    speaker: "Eleanor Whitmore",
    location: "ARCHIVE DIVISION · OFFICE 3-B",
    text: "Your Employee ID is more than identification. It is your personnel record, clearance status, and career history."
  },
  {
    npc: "whitmore",
    speaker: "Eleanor Whitmore",
    location: "ARCHIVE DIVISION · OFFICE 3-B",
    text: "Owl Mail is the Ministry's primary internal communication channel. Ignore it, and you will miss more than invitations."
  },
  {
    npc: "whitmore",
    speaker: "Eleanor Whitmore",
    location: "ARCHIVE DIVISION · OFFICE 3-B",
    text: "The Daily Prophet is not always accurate, but it is always useful. Learn to read between the lines."
  },
  {
    npc: "whitmore",
    speaker: "Eleanor Whitmore",
    location: "ARCHIVE DIVISION · OFFICE 3-B",
    text: "Today's Assignment contains your current duties. A Ministry officer without duties is usually in trouble."
  },
  {
    npc: "whitmore",
    speaker: "Eleanor Whitmore",
    location: "ARCHIVE DIVISION · OFFICE 3-B",
    text: "The Archive Cabinet remains locked until your orientation is complete. Some records are sealed for good reasons."
  },
  {
    npc: "whitmore",
    speaker: "Eleanor Whitmore",
    location: "ARCHIVE DIVISION · OFFICE 3-B",
    text: "Now, Officer, you are ready to begin."
  }
];

function showOfficeWalkthrough(){
  startDialogue(
    officeWalkthroughDialogue,
    showOrientationMemo
  );
}
function talkToWhitmore(){
    const mailRead =
  localStorage.getItem("mailRead_MAIL-002") === "true";

const newsRead =
  localStorage.getItem("newsRead_NEWS-002") === "true";

const noticeRead =
  localStorage.getItem("noticeRead_NOTICE-002") === "true";

const allUpdatesReviewed =
  mailRead && newsRead && noticeRead;
  const caseStatus = localStorage.getItem("caseStatus_CASE-000");
if(caseStatus === "Under Review" && allUpdatesReviewed){
  startDialogue(
    [
      {
        npc: "whitmore",
        speaker: "Eleanor Whitmore",
        location: "ARCHIVE DIVISION · OFFICE 3-B",
        text: "I see you've reviewed the mail, notice board, and the Prophet article."
      },
      {
        npc: "whitmore",
        speaker: "Eleanor Whitmore",
        location: "ARCHIVE DIVISION · OFFICE 3-B",
        text: "Good. A Ministry officer must understand not only the case, but how the Ministry reacts to it."
      },
      {
        npc: "whitmore",
        speaker: "Eleanor Whitmore",
        location: "ARCHIVE DIVISION · OFFICE 3-B",
        text: "For now, wait for the committee's response. Further instructions will arrive soon."
      }
    ],
    function(){
  localStorage.setItem("caseStatus_CASE-000", "Committee Pending");
  showDashboard();
}
  );

  return;
}
  if(caseStatus === "Under Review"){
    startDialogue(
      [
        {
          npc: "whitmore",
          speaker: "Eleanor Whitmore",
          location: "ARCHIVE DIVISION · OFFICE 3-B",
          text: "I received your report on CASE-000."
        },
        {
          npc: "whitmore",
          speaker: "Eleanor Whitmore",
          location: "ARCHIVE DIVISION · OFFICE 3-B",
          text: "The Archive Division has marked your findings for review."
        },
        {
          npc: "whitmore",
          speaker: "Eleanor Whitmore",
          location: "ARCHIVE DIVISION · OFFICE 3-B",
          text: "For a first assignment, your work was acceptable. Do not let that make you careless."
        }
      ],
      showDashboard
    );

    return;
  }

  showWhitmoreIntro();
}