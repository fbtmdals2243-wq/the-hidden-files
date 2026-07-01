function getNPC(id){
    return MinistryNPCs[id];
}
let currentDialogue = [];
let currentDialogueIndex = 0;
let dialogueFinishedCallback = null;
let typeTimer = null;
let isTyping = false;

function startDialogue(dialogue, onFinish){
  currentDialogue = dialogue;
  currentDialogueIndex = 0;
  dialogueFinishedCallback = onFinish;
  showDialogueLine();
}

function showDialogueLine(){
  const line = currentDialogue[currentDialogueIndex];
  const npc = getNPC(line.npc);

  app.innerHTML = `
  <section class="panel dialogue-panel">
    <div class="seal">${line.location || "BRITISH MINISTRY OF MAGIC"}</div>

    <div class="dialogue-layout">
      <div class="npc-portrait">
       <div class="portrait-frame">

    <span>${npc.initials}</span>

</div>

<h2>${npc.name}</h2>

<p>${npc.position}</p>

<p class="muted">

${npc.department}

</p>

<p class="muted">

${npc.years}

</p>
      </div>

      <div class="dialogue-box">
        <h1>${line.speaker}</h1>

        <div class="notice npc-dialogue">
          <p id="dialogueText"></p>
        </div>

        <div class="center">
          <button class="btn" id="dialogueBtn" onclick="nextDialogue()" disabled>
            ${currentDialogueIndex === currentDialogue.length - 1 ? "CONTINUE" : "NEXT"}
          </button>
        </div>
      </div>
    </div>
  </section>
`;

  typeDialogue(line.text);
}

function typeDialogue(text){
  const target = document.getElementById("dialogueText");
  const btn = document.getElementById("dialogueBtn");

  let i = 0;
  isTyping = true;
  target.textContent = "";
  btn.disabled = true;

  clearInterval(typeTimer);

  typeTimer = setInterval(()=>{
    target.textContent += text[i];
    i++;

    if(i >= text.length){
      clearInterval(typeTimer);
      isTyping = false;
      btn.disabled = false;
    }
  }, 28);
}

function nextDialogue(){
  if(isTyping) return;

  currentDialogueIndex++;

  if(currentDialogueIndex >= currentDialogue.length){
    if(dialogueFinishedCallback){
      dialogueFinishedCallback();
    }
    return;
  }

  showDialogueLine();
}