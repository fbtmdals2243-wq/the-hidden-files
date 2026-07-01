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