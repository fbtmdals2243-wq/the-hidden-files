const db = {
 people:[
  {id:"EMP-0471",name:"Ryu TaeO",role:"Senior Auror",clearance:"LEVEL V",status:"ACTIVE",summary:"Evidence-driven Senior Auror assigned to Special Investigations. Known for restraint, quiet field command, and refusal to close a case without proof.",links:["CASE-A23791","CASE-T00017","WND-88201","BOX17-INDEX"]},
  {id:"EMP-0312",name:"Noah Byrne",role:"Captain",clearance:"LEVEL V",status:"ACTIVE",summary:"SID Captain. Values clean evidence over clean headlines.",links:["EMP-0471","CASE-A23791"]},
  {id:"EMP-0844",name:"Mara Venn",role:"Internal Affairs Investigator",clearance:"EYES ONLY",status:"ACTIVE",summary:"Assigned to the sealed betrayal inquiry.",links:["CASE-T00017","IA-2028-001"]},
  {id:"EMP-1021",name:"Theo March",role:"Junior Auror",clearance:"SEALED",status:"UNKNOWN",summary:"Junior Auror connected to the sealed betrayal inquiry. Full profile unavailable.",links:["CASE-T00017","PHOTO-2027-022"]}
 ],
 cases:[
  {id:"CASE-A23791",title:"The Crown of Lethe",year:"2025",classification:"LEVEL V",status:"Closed",summary:"A memory-stealing crown recovered after witness-memory anomalies across three districts.",links:["EMP-0471","EVD-A23791-01","DP-2025-044"]},
  {id:"CASE-M00918",title:"The Black Mirror Case",year:"2026",classification:"EYES ONLY",status:"Restricted",summary:"Mirror network reflecting rooms that did not exist in the current building plan.",links:["EMP-0471","MED-2026-004"]},
  {id:"CASE-T00017",title:"The Traitor File",type:"Case",year:"2028",classification:"LEVEL VI",status:"SEALED",summary:"Internal security investigation into unauthorized disclosure of classified archive material.",body:`INTERNAL SECURITY DIVISION

CASE SUMMARY
Evidence suggests that classified archive material was accessed, copied, and transferred outside approved Ministry channels.

The original inquiry was sealed after three witness statements disappeared from the record. A later audit connected the missing statements to Box 17.

PERSONS OF INTEREST
• EMP-0471 — Lead investigator. Cleared, but repeatedly referenced in sealed correspondence.
• EMP-1021 — Junior Auror. Last confirmed handler of the missing evidence packet.
• IA-2028-001 — Internal Affairs notice authorizing seizure of related files.
• █████████ — Name removed by order of the Wizengamot Security Chair.

ATTACHED EVIDENCE
• PHOTO-2027-022 — Training room photograph.
• WND-88201 — Wand registry copy.
• GV-718-K — Gringotts vault registry.
• BOX17-INDEX — Recovered box inventory.

INVESTIGATOR NOTES
Several archive entries appear to have been altered after the case was closed.

The phrase "Lethe remembers what the Ministry forgets" appears in three separate documents.

Further review authorized under LEVEL VI clearance only.`,links:["EMP-0471","EMP-1021","IA-2028-001","PHOTO-2027-022","WND-88201","GV-718-K","BOX17-INDEX"]},
  {id:"CASE-ZERO",title:"The First Hidden File",type:"Case",year:"2029",classification:"LEVEL Ω",status:"NEWLY RECOVERED",summary:"Root archive entry connected to the origin of the breach.",body:`ROOT ARCHIVE ENTRY

THIS FILE WAS NOT CREATED BY THE MINISTRY.

It appeared after valid Level VI access was granted to CASE-T00017.

ORIGIN
The earliest trace predates Box 17, the Internal Affairs inquiry, and the recovered photograph.

The record refers to an archive beneath the official archive:
a hidden index designed to remember what was erased.

PRIMARY PHRASE
"Lethe remembers what the Ministry forgets."

SUBJECTS REFERENCED
• EMP-0471
• CASE-T00017
• BOX17-INDEX
• IA-2028-001
• █████████

FINAL NOTE
If this file is visible, the archive is no longer sealed.

Further recovery will expose the first deletion.`,links:["CASE-T00017","EMP-0471","BOX17-INDEX","IA-2028-001","PHOTO-2027-022"]},
  {id:"CASE-OMEGA",title:"The Final Recovery",type:"Case",year:"2048",classification:"LEVEL Ω",status:"FINAL",summary:"Final archive entry recovered after the root file was opened.",body:`FINAL ARCHIVE ENTRY

RECOVERY STATUS: COMPLETE

You were never investigating the archive.

The archive was investigating you.

All missing records have been restored.
All sealed files have been indexed.
All erased names remain protected.

FINAL PHRASE
"The archive remembers what the Ministry forgets."

END OF RECOVERY

HF ARCHIVE OS CLOSED.`,links:["CASE-ZERO","CASE-T00017","EMP-0471","BOX17-INDEX","IA-2028-001"]},
  {id:"CASE-G718K",title:"The Seventh Vault",year:"2025",classification:"LEVEL V",status:"Dormant",summary:"Gringotts vault access anomaly linked to an artefact inventory that predates its owner.",links:["GV-718-K"]}
 ],
 records:[
  {id:"WND-88201",title:"Wand Registry",type:"Equipment",date:"2012-08-22",classification:"OFFICIAL",summary:"Ebony, dragon heartstring, 12¾ inches, unyielding.",body:"The wand showed unusually strong response to defensive and containment spells.",links:["EMP-0471"]},
  {id:"EVD-A23791-01",title:"Gold Circlet with Runic Seam",type:"Evidence",date:"2025-10-14",classification:"LEVEL V",summary:"Primary artefact in the Lethe case.",body:"Surface appears gold but reacts as bone under detection charms. Handling prohibited without memory anchoring.",links:["CASE-A23791"]},
  {id:"DP-2025-044",title:"Special Auror Promoted After Cursed Artefact Case",type:"Press",date:"2025-10-18",classification:"PUBLIC",summary:"Daily Prophet coverage of the Lethe promotion.",body:"Sources describe Ryu TaeO as calm to the point of unsettling.",links:["CASE-A23791","EMP-0471"]},
  {id:"MED-2026-004",title:"Memory Hazard Exposure Note",type:"Medical",date:"2026-02-11",classification:"RESTRICTED",summary:"Medical note after Black Mirror exposure.",body:"Patient refused extended leave. Healer note: body stable; mind over-controlled.",links:["EMP-0471","CASE-M00918"]},
  {id:"IA-2028-001",title:"Internal Affairs Notice",type:"Internal Affairs",date:"2028-09-03",classification:"EYES ONLY",summary:"Sealed inquiry concerning unauthorized evidence transfer.",body:"Named personnel: EMP-0471 and EMP-1021. Handwritten addition: Do not let TaeO read the second page yet.",links:["CASE-T00017","EMP-1021"]},
  {id:"PHOTO-2027-022",title:"SID Training Room Photograph",type:"Photo",date:"2027-03-14",classification:"CONFIDENTIAL",summary:"Recovered photograph showing EMP-0471 and EMP-1021.",body:"Back of photograph reads: He learns fast. Too fast.",links:["EMP-0471","EMP-1021","CASE-T00017"]},
  {id:"BOX17-INDEX",title:"Box 17 Index",type:"Archive",date:"2048-11-17",classification:"LEVEL V",summary:"Index of recovered Box 17 materials.",body:"Contents include folded Hogwarts envelope, cracked ID badge case, sealed owl mail bundle, wand registry copy, black notebook, and one photograph envelope marked DO NOT CATALOGUE.",links:["EMP-0471","PHOTO-2027-022"]},
  {id:"GV-718-K",title:"Gringotts Vault Registry",type:"Financial",date:"2012-08-22",classification:"CONFIDENTIAL",summary:"Vault record later protected after the Seventh Vault anomaly.",body:"Initial access created for a Muggle-born student support transfer.",links:["CASE-G718K","EMP-0471"]}
 ]
};

const lockedRecords = new Set(["CASE-T00017","IA-2028-001","CASE-ZERO","CASE-OMEGA"]);
const unlockedRecords = new Set();

function saveProgress(){
 try{
   localStorage.setItem("hiddenfiles-unlocked", JSON.stringify([...unlockedRecords]));
 }catch(e){}
}

function loadProgress(){
 try{
   const raw = localStorage.getItem("hiddenfiles-unlocked");
   if(raw) JSON.parse(raw).forEach(id=>unlockedRecords.add(id));
 }catch(e){}
}

function isLocked(id){
 return lockedRecords.has(id) && !unlockedRecords.has(id);
}

function unlockRecord(id){
 const code = prompt("ENTER CLEARANCE CODE");
 if(!code) return;
 if(code.trim().toUpperCase()==="BOX17"){
   playSound('unlock');
   unlockedRecords.add(id);
   saveProgress();
   playSound("unlock");
   alert("CLEARANCE GRANTED");
   openRecord(id);
 } else {
   playSound("denied");
   alert("ACCESS DENIED");
 }
}

const all = () => [...db.people,...db.cases,...db.records];
const find = id => all().find(x=>x.id===id);

const lines=[
"Initializing Archive OS...",
"Loading personnel database...",
"Loading case files...",
"Decrypting Box 17 index...",
"Checking operator clearance...",
"Access channel prepared."
];
let i=0;
const bootlog=document.getElementById("bootlog");
const timer=setInterval(()=>{
 i++;
 bootlog.textContent=lines.slice(0,i).join("\\n");
 if(i>=lines.length){clearInterval(timer);document.getElementById("bootBtn").classList.remove("hidden")}
},520);

function showLogin(){boot.classList.add("hidden");login.classList.remove("hidden")}
function enterArchive(){
 const id=document.getElementById("operatorId").value.trim().toUpperCase();
 const pass=document.getElementById("passphrase").value.trim().toUpperCase();
 const status=document.getElementById("loginStatus");

 if(id!=="EMP-0471" || pass!=="BOX17"){
   status.classList.remove("hidden");
   playSound("denied");
   status.textContent="ACCESS DENIED\nInvalid operator credentials.";
   return;
 }

 status.classList.remove("hidden");
 playSound("unlock");
 status.textContent="Verifying operator...\nClearance LEVEL V confirmed.";

 setTimeout(()=>{
   login.classList.add("hidden");
   archiveBoot.classList.remove("hidden");
   runArchiveBoot();
 },650);
}

function runArchiveBoot(){
 const logs=[
  "ACCESS GRANTED",
  "CONNECTING TO BRITISH MAGICAL ARCHIVES...",
  "VERIFYING OPERATOR: EMP-0471",
  "CLEARANCE LEVEL V CONFIRMED",
  "DECRYPTING BOX 17 INDEX...",
  "RESTORING PERSONNEL FILES...",
  "LOADING CASE-T00017 SEAL LAYER...",
  "RECOVERING HIDDEN RECORDS...",
  "SYSTEM ONLINE"
 ];
 let step=0;
 archiveBootLog.textContent="";
 const t=setInterval(()=>{
   archiveBootLog.textContent += logs[step] + "\n";
   step++;
   if(step>=logs.length){
     clearInterval(t);
     setTimeout(()=>{
       archiveBoot.classList.add("hidden");
       app.classList.remove("hidden");
     },650);
   }
 },360);
}
function showPage(id,btn){
 document.querySelectorAll(".page").forEach(p=>p.classList.remove("on"));
 document.getElementById(id).classList.add("on");
 document.querySelectorAll("nav button").forEach(b=>b.classList.remove("on"));
 if(btn) btn.classList.add("on");
}
function item(title,sub,id){
 const d=document.createElement("div");
 d.className="item";
 d.innerHTML=`<b>${title}</b><br><span class="muted">${sub}</span>`;
 d.onclick=()=>{playSound("click");openRecord(id)};
 return d;
}
function renderExplorerFolder(name){
 const folders={
  "Personnel Files": db.people.map(x=>x.id),
  "Case Files": db.cases.map(x=>x.id),
  "Evidence Storage": db.records.filter(x=>x.type==="Evidence").map(x=>x.id),
  "Medical Records": db.records.filter(x=>x.type==="Medical").map(x=>x.id),
  "Internal Affairs": db.records.filter(x=>x.type==="Internal Affairs").map(x=>x.id),
  "Box 17": ["BOX17-INDEX","WND-88201","PHOTO-2027-022","IA-2028-001","GV-718-K"],
  "Financial Records": db.records.filter(x=>x.type==="Financial").map(x=>x.id),
  "Photographs": db.records.filter(x=>x.type==="Photo").map(x=>x.id)
 };
 const ids = folders[name] || [];
 archiveExplorer.innerHTML = `
  <div class="folder" onclick="renderExplorer()">⬅<br>Back<br><small>Archive Root</small></div>
  ${ids.map(id=>{
    const x=find(id);
    return `<div class="folder" onclick="playSound('click');openRecord('${id}')">${isLocked(id) ? "🔒" : "📄"}<br>${id}<br><small>${x ? (x.name||x.title) : "sealed"}</small></div>`;
  }).join("")}
 `;
}

function renderExplorer(){
 const folders=[
  ["Personnel Files","Personnel records and employment dossiers"],
  ["Case Files","Investigations and classified case reports"],
  ["Evidence Storage","Recovered artefacts and forensic objects"],
  ["Medical Records","Exposure notes and healer reports"],
  ["Internal Affairs","Sealed inquiries and misconduct records"],
  ["Box 17","Recovered physical archive box"],
  ["Financial Records","Vault and payment records"],
  ["Photographs","Recovered photographic evidence"]
 ];
 archiveExplorer.innerHTML=folders.map(f=>`<div class="folder" onclick="renderExplorerFolder('${f[0]}')">📁<br>${f[0]}<br><small>${f[1]}</small></div>`).join("");
}


function unlockArchive(){
    const code = prompt("ENTER ARCHIVE CLEARANCE CODE");
    if(!code) return;
    if(code.trim().toUpperCase()==="BOX17"){
        unlockedDocs.add("CASE-T00017");
        unlockedDocs.add("IA-2028-001");
        alert("CLEARANCE LEVEL VI GRANTED");
        render();
    }else{
        playSound("denied");
   alert("ACCESS DENIED");
    }
}
const RECOVERY_KEY="archive-recovery-v1";

let recoveredRecords=new Set();

function loadRecovery(){

    const raw=localStorage.getItem(RECOVERY_KEY);

    if(raw){

        recoveredRecords=new Set(JSON.parse(raw));

    }

}

function saveRecovery(){

    localStorage.setItem(
        RECOVERY_KEY,
        JSON.stringify([...recoveredRecords])
    );

}

function markRecovered(id){

    if(recoveredRecords.has(id)) return;

    recoveredRecords.add(id);

    saveRecovery();

    updateRecovery();

}

function updateRecovery(){

    const total=12;

    const percent=Math.min(
        100,
        Math.round(recoveredRecords.size/total*100)
    );

    const el=document.getElementById("recoveryPercent");

    if(el){

        el.textContent=percent+"%";

    }

    if(percent>=100){

        alert(
"ARCHIVE RECOVERY COMPLETE\n\nNEW RECORD AVAILABLE\nCASE-OMEGA"
);

    }

}
function render(){
 personnelList.innerHTML="";
 db.people.forEach(x=>personnelList.appendChild(item(`${x.id} · ${x.name}`,`${x.role} · ${x.clearance}`,x.id)));
 caseList.innerHTML="";
 db.cases.forEach(x=>caseList.appendChild(item(`${x.id} · ${x.title}`,`${x.year} · ${x.classification} · ${x.status}`,x.id)));
 evidenceList.innerHTML="";
 db.records.forEach(x=>evidenceList.appendChild(item(`${x.id} · ${x.title}`,`${x.type} · ${x.classification}`,x.id)));
 timelineList.innerHTML=[
 ["2001","Ryu TaeO born in London.","EMP-0471"],
 ["2012","Wand registry and vault record created.","WND-88201"],
 ["2025","The Crown of Lethe case closed.","CASE-A23791"],
 ["2028","The Traitor File sealed.","CASE-T00017"],
 ["2048","Box 17 recovered.","BOX17-INDEX"]
 ].map(x=>`<p><b>${x[0]}</b><br>${x[1]} <span class="node" onclick="playSound('click');openRecord('${x[2]}')">${x[2]}</span></p>`).join("");
 renderExplorer();
 boxGrid.innerHTML=["BOX17-INDEX","WND-88201","PHOTO-2027-022","IA-2028-001","GV-718-K"].map(id=>{
 const x=find(id); return `<div class="folder" onclick="playSound('click');openRecord('${id}')">${id}<br><small>${x?x.title:"sealed"}</small></div>`
 }).join("");
}
function recordKind(x){
 if(x.role) return "CLASSIFIED PERSONNEL FILE";
 if(x.year) return "CLASSIFIED CASE FILE";
 if(x.type === "Evidence") return "EVIDENCE CUSTODY RECORD";
 if(x.type === "Photo") return "PHOTOGRAPHIC EVIDENCE";
 if(x.type === "Medical") return "MEDICAL EXPOSURE RECORD";
 if(x.type === "Internal Affairs") return "INTERNAL AFFAIRS NOTICE";
 if(x.type === "Financial") return "VAULT / FINANCIAL RECORD";
 return "ARCHIVE RECORD";
}


let audioCtx=null;

function playSound(type="click"){
 try{
   if(!audioCtx){
     audioCtx=new (window.AudioContext||window.webkitAudioContext)();
   }
   if(audioCtx.state==="suspended") audioCtx.resume();

   const osc=audioCtx.createOscillator();
   const gain=audioCtx.createGain();

   const freq={
     click:700,
     unlock:1000,
     denied:160,
     omega:80
   }[type] || 700;

   osc.type = type==="omega" ? "sawtooth" : "square";
   osc.frequency.setValueAtTime(freq,audioCtx.currentTime);

   gain.gain.setValueAtTime(0.18,audioCtx.currentTime);
   gain.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.22);

   osc.connect(gain);
   gain.connect(audioCtx.destination);
   osc.start();
   osc.stop(audioCtx.currentTime+0.22);
 }catch(e){
   console.log("sound error",e);
 }
}


function typeOmegaTerminal() {
  const terminal = document.getElementById("omegaTerminal");
  if(!terminal) return;

  const text =
`RECOVERY COMPLETE
ROOT FILE VERIFIED
ALL HIDDEN RECORDS INDEXED
FINAL ARCHIVE CHANNEL OPEN`;

  terminal.textContent = "";

  let i = 0;

  function typeChar(){
    if(i >= text.length) return;

    terminal.textContent += text[i];

    if(text[i] !== "\n" && i % 3 === 0){
      playSound("click");
    }

    i++;

    setTimeout(typeChar,35);
  }

  typeChar();
}

function iconFor(id){
 if(id.startsWith("EMP-")) return "👤";
 if(id.startsWith("CASE-")) return isLocked(id) ? "🔒" : "📁";
 if(id.startsWith("PHOTO-")) return "📷";
 if(id.startsWith("EVD-")) return "🧪";
 if(id.startsWith("WND-")) return "🪄";
 if(id.startsWith("GV-")) return "🏦";
 if(id.startsWith("BOX")) return "📦";
 if(id.startsWith("IA-")) return isLocked(id) ? "🔒" : "🕵️";
 if(id.startsWith("MED-")) return "⚕️";
 return "📄";
}
function openPhotoModal(src){
  playSound("click");
  photoModalImg.src = src;
  photoModal.classList.remove("hidden");
}

function closePhotoModal(){
  photoModal.classList.add("hidden");
  photoModalImg.src = "";
}

document.addEventListener("keydown", function(e){
  if(e.key === "Escape"){
    closePhotoModal();
  }
});

function animateOpenedDocument(){
  setTimeout(()=>{
    const el = document.querySelector("#detail .paper, #detail .card");
    if(!el) return;
    el.classList.remove("reveal-open");
    void el.offsetWidth;
    el.classList.add("reveal-open");
  },30);
}

const detailObserver = new MutationObserver(()=>{
  animateOpenedDocument();
});

window.addEventListener("DOMContentLoaded",()=>{
  const target=document.getElementById("detail");
  if(target){
    detailObserver.observe(target,{childList:true});
  }
});

function openRecord(id){
  markRecovered(id);
 const x=find(id); if(!x){alert("Record not recovered: "+id);return}
 if(isLocked(id)){
   showPage("viewer");
   detail.innerHTML = `<div class="card">
     <h1>ACCESS DENIED</h1>
     <p class="muted">This record is sealed under Level VI clearance.</p>
     <div class="terminal">RECORD: ${id}
STATUS: SEALED
REQUIRED CLEARANCE: LEVEL VI
HINT: BOX 17</div>
     <button class="btn" onclick="unlockRecord('${id}')">ENTER CLEARANCE CODE</button>
   </div>`;
   return;
 }
 showPage("viewer");

 if(id==="EMP-0471"){
   detail.innerHTML = `
   <div class="paper">
     <span class="stamp">LEVEL V</span>
     <h1>EMP-0471</h1>
     <div style="margin:25px 0;text-align:center;">
<img src="assets/photos/emp0471_id.png"
style="
width:360px;
max-width:100%;
border:8px solid #2b2015;
box-shadow:0 0 20px rgba(0,0,0,.45);
">
</div>
     <h2>RYU TAEO</h2>
     <p><b>Senior Auror · Special Investigations Division</b></p>

     <div class="kv">
       <b>Status</b><span>ACTIVE</span>
       <b>Clearance</b><span>LEVEL V</span>
       <b>Department</b><span>British Magical Archives / SID Liaison</span>
       <b>Wand</b><span>Ebony · Dragon Heartstring · 12¾ inches</span>
       <b>Specialization</b><span>Memory artefacts, sealed records, containment evidence</span>
       <b>Known Phrase</b><span>"No case closes without proof."</span>
     </div>

     <h3>Field Profile</h3>
     <pre style="white-space:pre-wrap;line-height:1.65;background:rgba(0,0,0,.08);border:1px solid rgba(70,45,20,.35);padding:16px">EMP-0471 is repeatedly connected to recovered archive materials involving memory alteration, unauthorized evidence movement, and sealed post-inquiry corrections.

Operational notes describe the subject as restrained, evidence-driven, and unusually resistant to memory-based influence.

Multiple recovered records suggest that EMP-0471 was not the origin of the breach, but may have been the only investigator who noticed the pattern.</pre>

     <h3>Known Associates</h3>
     <div class="related-grid">
       <div class="item" onclick="playSound('click');openRecord('EMP-0312')"><b>👤 EMP-0312</b><br><span class="muted">Captain Noah Byrne</span></div>
       <div class="item" onclick="playSound('click');openRecord('EMP-1021')"><b>👤 EMP-1021</b><br><span class="muted">Junior Auror Theo March</span></div>
       <div class="item" onclick="playSound('click');openRecord('EMP-0844')"><b>👤 EMP-0844</b><br><span class="muted">Internal Affairs Investigator</span></div>
     </div>

     <h3>Linked Records</h3>
     <div class="related-grid">
       ${(x.links||[]).map(l=>`<div class="item" onclick="playSound('click');openRecord('${l}')"><b>${iconFor(l)} ${l}</b><br><span class="muted">linked archive record</span></div>`).join("")}
     </div>
   </div>`;
   return;
 }
if(id==="BOX17-INDEX"){
   detail.innerHTML = `
   <div class="paper">
     <span class="stamp">LEVEL V</span>
     <h1>BOX 17</h1>
     <h2>Recovered Archive Index</h2>
     <p><b>Physical archive box recovered and catalogued under EMP-0471 investigation trail.</b></p>

     <div style="
       border:2px solid rgba(70,45,20,.45);
       padding:20px;
       margin:24px 0;
       background:rgba(255,248,235,.55);
     ">
       <h3 style="margin-top:0">Index Contents</h3>

       <div class="kv">
         <b>☑ BOX17-INDEX</b><span>Primary inventory card</span>
         <b>☑ WND-88201</b><span>Wand registry copy</span>
         <b>☑ PHOTO-2027-022</b><span>Recovered photographic evidence</span>
         <b>☑ IA-2028-001</b><span>Internal Affairs notice</span>
         <b>☑ GV-718-K</b><span>Gringotts vault registry</span>
         <b>☑ CASE-T00017</b><span>Sealed betrayal inquiry</span>
         <b>☑ CASE-ZERO</b><span>Hidden root archive entry</span>
       </div>
     </div>

     <h3>Recovery Progress</h3>
     <div style="
       border:1px solid rgba(70,45,20,.35);
       height:24px;
       background:rgba(0,0,0,.12);
       margin:10px 0 18px;
       overflow:hidden;
     ">
       <div style="
         width:92%;
         height:100%;
         background:linear-gradient(90deg,#8f3028,#c09a57);
       "></div>
     </div>
     <p><b>92%</b> of Box 17 materials recovered and indexed.</p>

     <h3>Archivist Note</h3>
     <div style="
       margin:22px 0;
       padding:18px;
       border-left:5px solid #8f3028;
       background:rgba(255,248,235,.6);
       font-family:'Brush Script MT','Comic Sans MS',cursive;
       font-size:24px;
       color:#6b2d1d;
       transform:rotate(-1deg);
     ">
       The box was not hidden to protect evidence.<br>
       It was hidden to preserve it.<br>
       <span style="font-size:19px">— Archive Recovery Copy</span>
     </div>

     <h3>Open Indexed Records</h3>
     <span class="node" onclick="playSound('click');openRecord('EMP-0471')">EMP-0471</span>
     <span class="node" onclick="playSound('click');openRecord('WND-88201')">WND-88201</span>
     <span class="node" onclick="playSound('click');openRecord('PHOTO-2027-022')">PHOTO-2027-022</span>
     <span class="node" onclick="playSound('click');openRecord('IA-2028-001')">IA-2028-001</span>
     <span class="node" onclick="playSound('click');openRecord('GV-718-K')">GV-718-K</span>
     <span class="node" onclick="playSound('click');openRecord('CASE-T00017')">CASE-T00017</span>
     <span class="node" onclick="playSound('click');openRecord('CASE-ZERO')">CASE-ZERO</span>

     <hr style="border:0;border-top:1px solid rgba(70,45,20,.35);margin:24px 0">
     <p style="font-size:12px;letter-spacing:1px;text-align:center">
       BRITISH MAGICAL ARCHIVES · BOX 17 · RECOVERY INDEX
     </p>
   </div>`;
   return;
}
if(id==="PHOTO-2027-022"){
   detail.innerHTML = `
   <div class="paper">
     <span class="stamp">CONFIDENTIAL</span>
     <h1>PHOTO-2027-022</h1>
     <h2>SID Training Room Photograph</h2>

     <div style="
       display:flex;
       gap:28px;
       align-items:flex-start;
       flex-wrap:wrap;
       margin:26px 0;
     ">
       <div style="
         width:430px;
         max-width:100%;
         background:#f4ead0;
         padding:18px 18px 52px;
         border:1px solid #9b875c;
         box-shadow:0 18px 38px rgba(0,0,0,.28);
         transform:rotate(-1.5deg);
       ">
         <img onclick="openPhotoModal('assets/photos/photo-2027-022.png')" src="assets/photos/photo-2027-022.png" style="
cursor:zoom-in;
           width:100%;
           display:block;
           border:10px solid #181818;
           box-sizing:border-box;
         ">
         <div style="
           margin-top:14px;
           font-family:'Brush Script MT','Comic Sans MS',cursive;
           font-size:24px;
           color:#5b3921;
         ">
           He learns fast. Too fast.
         </div>
       </div>

       <div style="
         flex:1;
         min-width:260px;
         border:1px solid rgba(70,45,20,.35);
         background:rgba(255,248,235,.55);
         padding:18px;
       ">
         <h3 style="margin-top:0">Evidence Tag</h3>
         <div class="kv">
           <b>Record</b><span>PHOTO-2027-022</span>
           <b>Date</b><span>2027-03-14</span>
           <b>Location</b><span>SID Training Room</span>
           <b>Recovered By</b><span>EMP-0471</span>
           <b>Classification</b><span>CONFIDENTIAL</span>
           <b>Status</b><span>Recovered / Indexed</span>
         </div>

         <h3>Photographic Notes</h3>
         <p>Recovered image linked to early Special Investigations Division training logs.</p>
         <p>Back of photograph reads: <i>He learns fast. Too fast.</i></p>

         <h3>Analysis</h3>
         <pre style="white-space:pre-wrap;line-height:1.6;background:rgba(0,0,0,.08);border:1px solid rgba(70,45,20,.35);padding:14px">Image appears to predate the Box 17 recovery trail.

Cross-reference suggests later Internal Affairs material was indexed against this photograph after the original investigation closed.</pre>
       </div>
     </div>

     <h3>Related Records</h3>
     <span class="node" onclick="playSound('click');openRecord('EMP-0471')">EMP-0471</span>
     <span class="node" onclick="playSound('click');openRecord('CASE-T00017')">CASE-T00017</span>
     <span class="node" onclick="playSound('click');openRecord('BOX17-INDEX')">BOX17-INDEX</span>
   </div>`;
   return;
 }
if(id==="IA-2028-001"){
detail.innerHTML=`
<div class="paper">

<span class="stamp">CONFIDENTIAL</span>

<div style="
border:3px double #4d3622;
padding:28px;
margin:18px 0 26px;
">

<div style="text-align:center">

<div style="font-size:13px;letter-spacing:4px">
MINISTRY OF MAGIC
</div>

<h2 style="margin:8px 0">
INTERNAL AFFAIRS DIVISION
</h2>

<p style="letter-spacing:2px">
CONFIDENTIAL MEMORANDUM
</p>

</div>

<div class="kv" style="margin-top:24px">

<b>Reference</b><span>IA-2028-001</span>

<b>Date</b><span>18 October 2028</span>

<b>From</b><span>Internal Affairs Division</span>

<b>To</b><span>Archive Security Office</span>

<b>Security</b><span>EYES ONLY</span>

<b>Status</b><span>Recovered Copy</span>

</div>

</div>

<h3>SUBJECT</h3>

<div style="
border:1px solid rgba(70,45,20,.35);
padding:22px;
background:rgba(255,248,235,.5);
line-height:1.8;
">

<b>Unauthorized Archive Alteration Investigation</b>

<p>

Routine inspection identified multiple archive records that had been modified after official case closure.

Personnel connected to CASE-T00017 are to remain under observation.

Recovered copies mentioning BOX 17 or LETHE are to be transferred directly to Special Investigations Division.

</p>

<p>

Second attachment has been removed by order of the Wizengamot Security Chair.

</p>

</div>

<div style="
display:flex;
justify-content:space-between;
align-items:flex-end;
margin:36px 0;
">

<div>

<div style="
font-family:cursive;
font-size:34px;
color:#6d2d1e;
">
A. Blackwood
</div>

Director of Internal Affairs

</div>

<div style="
border:3px solid #9c3428;
padding:18px;
font-weight:bold;
color:#9c3428;
transform:rotate(-10deg);
">
OFFICIAL<br>SEAL
</div>

</div>

<div style="
margin:20px 0;
padding:18px;
border-left:5px solid #8f3028;
background:rgba(255,248,235,.6);
font-family:'Brush Script MT','Comic Sans MS',cursive;
font-size:24px;
color:#6b2d1d;
transform:rotate(-2deg);
">
Second page missing.<br>
Do not distribute.<br>
— IA Archive
</div>

<h3>Attachments</h3>

<span class="node" onclick="playSound('click');openRecord('CASE-T00017')">CASE-T00017</span>
<span class="node" onclick="playSound('click');openRecord('PHOTO-2027-022')">PHOTO-2027-022</span>
<span class="node" onclick="playSound('click');openRecord('BOX17-INDEX')">BOX17-INDEX</span>
<span class="node" onclick="playSound('click');openRecord('EMP-0471')">EMP-0471</span>

</div>
`;
return;
}
if(id==="CASE-OMEGA"){
   detail.innerHTML = `
   <div class="paper" style="
     min-height:75vh;
     background:
       radial-gradient(circle at center, rgba(143,48,40,.22), transparent 35%),
       linear-gradient(#1a0b08,#050202);
     color:#f0d8bd;
     border:2px solid #8f3028;
     box-shadow:0 0 60px rgba(143,48,40,.35);
   ">
     <div style="text-align:center;margin-top:40px">
       <div style="letter-spacing:6px;font-size:13px;color:#c09a57">FINAL ROOT ARCHIVE</div>
       <h1 style="font-size:56px;color:#f0d8bd;margin:18px 0">CASE-OMEGA</h1>
       <h2 style="color:#c09a57">THE FINAL RECOVERY</h2>
       <p style="color:#f0b0a0;letter-spacing:2px">ARCHIVE STATUS: COMPLETE</p>
     </div>

     <div class="terminal"
     id="omegaTerminal"
     style="
margin:34px auto;
max-width:760px;
background:#060202;
color:#f0b0a0;
border-color:#8f3028;
white-space:pre-line;
min-height:120px;
">
</div>

     <div style="
       max-width:780px;
       margin:36px auto;
       font-size:22px;
       line-height:1.8;
       text-align:center;
     ">
       <p>You were never investigating the archive.</p>
       <p><b>The archive was investigating you.</b></p>
       <p>All missing records have been restored.</p>
       <p>All sealed files have been indexed.</p>
       <p>The hidden archive remains open only to those who remember.</p>
     </div>

     <div style="
       margin:34px auto;
       max-width:740px;
       padding:22px;
       border:1px solid rgba(240,176,160,.35);
       background:rgba(255,255,255,.04);
       text-align:center;
       letter-spacing:2px;
     ">
       THE ARCHIVE REMEMBERS WHAT THE MINISTRY FORGETS
     </div>

     <h3 style="color:#c09a57;text-align:center">Final Links</h3>
     <div style="text-align:center">
       <span class="node" onclick="playSound('click');openRecord('EMP-0471')">EMP-0471</span>
       <span class="node" onclick="playSound('click');openRecord('CASE-ZERO')">CASE-ZERO</span>
       <span class="node" onclick="playSound('click');openRecord('CASE-T00017')">CASE-T00017</span>
       <span class="node" onclick="playSound('click');openRecord('BOX17-INDEX')">BOX17-INDEX</span>
     </div>

     <hr style="border:0;border-top:1px solid rgba(240,176,160,.25);margin:40px 0">
     <p style="text-align:center;font-size:12px;letter-spacing:3px;color:#c09a57">
       HF ARCHIVE OS · FINAL RESTORATION COMPLETE
     </p>
   </div>`;
   playSound("omega");
setTimeout(typeOmegaTerminal,300);

setTimeout(()=>{
  const ending = document.getElementById("endingOverlay");
  if(ending){
    ending.classList.add("show");
  }
},5000);

return;
}
if(id==="CASE-ZERO"){
   detail.innerHTML = `
   <div class="paper" style="
     background:
       radial-gradient(circle at 50% 20%, rgba(143,48,40,.22), transparent 32%),
       linear-gradient(#d9c59b,#bfa875);
     border:2px solid #2b160d;
   ">
     <span class="stamp">LEVEL Ω</span>

     <div style="
       text-align:center;
       border:3px double #2b160d;
       padding:24px;
       margin:18px 0 26px;
     ">
       <div style="letter-spacing:5px;font-size:12px">ROOT ARCHIVE ENTRY</div>
       <h1 style="font-size:42px;margin:12px 0 4px">CASE-ZERO</h1>
       <h2 style="margin:0">THE FIRST HIDDEN FILE</h2>
       <p style="color:#8f3028;font-weight:bold;letter-spacing:2px">UNAUTHORIZED RECOVERY COPY</p>
     </div>

     <div class="terminal" style="
       color:#f0b0a0;
       border-color:#8f3028;
       background:#120504;
       margin:24px 0;
     ">WARNING:
THIS FILE WAS NOT CREATED BY THE MINISTRY.

SOURCE: UNKNOWN
ARCHIVE DEPTH: BELOW OFFICIAL INDEX
RECOVERY STATUS: UNSTABLE</div>

     <h3>Recovered Body</h3>
     <pre style="
       white-space:pre-wrap;
       line-height:1.75;
       background:rgba(0,0,0,.12);
       border:1px solid rgba(70,45,20,.45);
       padding:20px;
     ">ROOT ARCHIVE ENTRY

THIS FILE WAS NOT CREATED BY THE MINISTRY.

It appeared after valid Level VI access was granted to CASE-T00017.

ORIGIN
The earliest trace predates Box 17, the Internal Affairs inquiry, and the recovered photograph.

The record refers to an archive beneath the official archive:
a hidden index designed to remember what was erased.

PRIMARY PHRASE
"Lethe remembers what the Ministry forgets."

SUBJECTS REFERENCED
• EMP-0471
• CASE-T00017
• BOX17-INDEX
• IA-2028-001
• █████████

FINAL NOTE
If this file is visible, the archive is no longer sealed.

Further recovery will expose the first deletion.</pre>

     <div style="
       margin:28px 0;
       padding:20px 24px;
       border-left:6px solid #8f3028;
       background:rgba(255,248,235,.55);
       font-family:'Brush Script MT','Comic Sans MS',cursive;
       font-size:26px;
       color:#5d1d17;
       transform:rotate(-1.5deg);
       box-shadow:0 10px 24px rgba(0,0,0,.18);
     ">
       This file was never missing.<br>
       It was waiting for the correct investigator.<br>
       <span style="font-size:20px">— Unknown Archivist</span>
     </div>

     <h3>Root Links</h3>
     <span class="node" onclick="playSound('click');openRecord('EMP-0471')">EMP-0471</span>
     <span class="node" onclick="playSound('click');openRecord('CASE-T00017')">CASE-T00017</span>
     <span class="node" onclick="playSound('click');openRecord('BOX17-INDEX')">BOX17-INDEX</span>
     <span class="node" onclick="playSound('click');openRecord('IA-2028-001')">IA-2028-001</span>
     <span class="node" onclick="playSound('click');openRecord('PHOTO-2027-022')">PHOTO-2027-022</span>

     <hr style="border:0;border-top:1px solid rgba(70,45,20,.45);margin:26px 0">
     <p style="font-size:12px;letter-spacing:2px;text-align:center;color:#5d1d17">
       THE ARCHIVE REMEMBERS WHAT THE MINISTRY FORGETS
     </p>
   </div>`;
   if(!unlockedRecords.has("CASE-OMEGA")){
    unlockedRecords.add("CASE-OMEGA");
    saveProgress();

    setTimeout(()=>{
        alert(
`ARCHIVE RECOVERY COMPLETE

NEW ROOT FILE DETECTED

CASE-OMEGA`
        );
    },500);
}
   return;
}
if(id==="CASE-T00017"){
   if(!unlockedRecords.has("CASE-ZERO")){
     unlockedRecords.add("CASE-ZERO");
     saveProgress();
   }
   setTimeout(()=>alert("NEW FILE RECOVERED: CASE-ZERO"),300);

   detail.innerHTML = `
   <div class="paper" style="position:relative;overflow:hidden">
    <div class="coffee"></div>
     <div style="position:absolute;top:30px;right:-70px;transform:rotate(35deg);font-size:44px;color:rgba(143,48,40,.18);font-weight:bold;letter-spacing:4px">
       TOP SECRET
     </div>

     <div style="text-align:center;border:3px double #3a2712;padding:18px;margin-bottom:20px">
       <div style="font-size:13px;letter-spacing:3px">BRITISH MAGICAL ARCHIVES</div>
       <h1 style="margin:12px 0 4px">CASE-T00017</h1>
       <h2 style="margin:0">THE TRAITOR FILE</h2>
       <div style="margin-top:10px;color:#8f3028;font-weight:bold;letter-spacing:2px">LEVEL VI · EYES ONLY</div>
     </div>

     <div style="display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap;margin-bottom:18px">
       <span class="stamp">TOP SECRET</span>
       <span class="stamp">SEALED</span>
       <span class="stamp">LEVEL VI</span>
     </div>

     <div class="kv">
       <b>Status</b><span>${x.status}</span>
       <b>Year</b><span>${x.year}</span>
       <b>Classification</b><span>${x.classification}</span>
       <b>Archive Status</b><span>Recovered / Indexed</span>
       <b>Origin</b><span>Internal Security Division</span>
       <b>Recovery Source</b><span>Box 17 / Hidden Index</span>
     </div>

     <h3>Restricted Case Summary</h3>
     <pre style="white-space:pre-wrap;line-height:1.75;background:rgba(0,0,0,.08);border:1px solid rgba(70,45,20,.35);padding:18px">${x.body}</pre>

     <h3>Redacted Addendum</h3>
     <div style="border:1px solid rgba(70,45,20,.35);padding:16px;background:rgba(255,255,255,.18);line-height:1.7">
       <p><b>Filed By:</b> ███████████████</p>
       <p><b>Witness Statement:</b> Removed by Wizengamot Security Chair.</p>
       <p><b>Recovered Phrase:</b> "Lethe remembers what the Ministry forgets."</p>
       <p><b>Handwritten Note:</b> <i>Do not trust Internal Affairs until the second page is found.</i></p>
     </div>
<div style="
margin:28px 0;
padding:18px 22px;
border-left:5px solid #8f3028;
background:rgba(255,248,235,.58);
font-family:'Brush Script MT','Comic Sans MS',cursive;
font-size:25px;
line-height:1.45;
color:#6b2d1d;
transform:rotate(-1.5deg);
box-shadow:0 8px 18px rgba(0,0,0,.12);
">
Do not trust Internal Affairs.<br>
The second page was removed before indexing.<br>
<span style="font-size:20px">— R.T.</span>
</div>
     <h3>Attached Evidence</h3>
     <span class="node" onclick="playSound('click');openRecord('PHOTO-2027-022')">PHOTO-2027-022</span>
     <span class="node" onclick="playSound('click');openRecord('WND-88201')">WND-88201</span>
     <span class="node" onclick="playSound('click');openRecord('GV-718-K')">GV-718-K</span>
     <span class="node" onclick="playSound('click');openRecord('BOX17-INDEX')">BOX17-INDEX</span>
     <span class="node" onclick="playSound('click');openRecord('IA-2028-001')">IA-2028-001</span>

     <h3>Persons of Interest</h3>
     <span class="node" onclick="playSound('click');openRecord('EMP-0471')">EMP-0471</span>
     <span class="node" onclick="playSound('click');openRecord('EMP-1021')">EMP-1021</span>
     <span class="node" onclick="playSound('click');openRecord('EMP-0844')">EMP-0844</span>

     <h3>Hidden Index Links</h3>
     ${(x.links||[]).map(l=>`<span class="node" onclick="playSound('click');openRecord('${l}')">${iconFor(l)} ${l}</span>`).join("")}

     <hr style="border:0;border-top:1px solid rgba(70,45,20,.35);margin:22px 0">
     <p style="font-size:12px;letter-spacing:1px;text-align:center">
       BRITISH MAGICAL ARCHIVES · INTERNAL SECURITY DIVISION · RECOVERY COPY
     </p>
   </div>`;
   return;
 }

 if(x.year){
   detail.innerHTML = `
   <div class="paper">
     <span class="stamp">${x.classification}</span>
     <h1>${x.id}</h1>
     <h2>${x.title}</h2>
     <p><b>${x.summary}</b></p>

     <div class="kv">
       <b>Status</b><span>${x.status}</span>
       <b>Year</b><span>${x.year}</span>
       <b>Classification</b><span>${x.classification}</span>
       <b>Archive Status</b><span>Recovered / Indexed</span>
     </div>

     ${x.body ? `
     <h3>Case File Body</h3>
     <pre style="white-space:pre-wrap;line-height:1.65;background:rgba(0,0,0,.08);border:1px solid rgba(70,45,20,.35);padding:16px">${x.body}</pre>
     ` : ""}

     <h3>Evidence</h3>
     <span class="node" onclick="playSound('click');openRecord('EVD-A23791-01')">EVD-A23791-01</span>
     <span class="node" onclick="playSound('click');openRecord('PHOTO-2027-022')">PHOTO-2027-022</span>
     <span class="node" onclick="playSound('click');openRecord('BOX17-INDEX')">BOX17-INDEX</span>
     <span class="node" onclick="playSound('click');openRecord('IA-2028-001')">IA-2028-001</span>

     <h3>Related Personnel</h3>
     <span class="node" onclick="playSound('click');openRecord('EMP-0471')">EMP-0471</span>
     <span class="node" onclick="playSound('click');openRecord('EMP-0312')">EMP-0312</span>
     <span class="node" onclick="playSound('click');openRecord('EMP-1021')">EMP-1021</span>

     <h3>Related Records</h3>
     ${(x.links||[]).map(l=>`<span class="node" onclick="playSound('click');openRecord('${l}')">${l}</span>`).join("")}
   </div>`;
   return;
 }

 let title=x.name||x.title;
 let level=x.clearance||x.classification||"OFFICIAL";
 let kind=recordKind(x);

 let html=`
 <div class="paper">
   <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start">
     <div>
       <p style="letter-spacing:2px;margin:0 0 8px;font-size:12px">${kind}</p>
       <h1>${title}</h1>
     </div>
     <span class="stamp">${level}</span>
   </div>

   <hr style="border:0;border-top:1px solid rgba(70,45,20,.35);margin:18px 0">

   <p><b>${x.summary}</b></p>
   ${x.body ? `<p>${x.body}</p>` : ""}

   <div class="kv">
     <b>Record ID</b><span>${x.id}</span>
     ${x.role ? `<b>Role</b><span>${x.role}</span><b>Status</b><span>${x.status}</span>` : ""}
     ${x.year ? `<b>Year</b><span>${x.year}</span><b>Status</b><span>${x.status}</span>` : ""}
     ${x.type ? `<b>Record Type</b><span>${x.type}</span><b>Date Filed</b><span>${x.date}</span>` : ""}
     <b>Clearance</b><span>${level}</span>
     <b>Archive Status</b><span>Recovered / Indexed</span>
   </div>

   <h3>Access Log</h3>
   <div class="kv">
     <b>Last Opened</b><span>${new Date().toLocaleString()}</span>
     <b>Opened By</b><span>Operator EMP-0471</span>
     <b>Session</b><span>Archive OS v0.5</span>
   </div>

   <h3>Related Records</h3>
   <div class="related-grid">
   ${(x.links||[]).map(l=>`<div class="item" onclick="playSound('click');openRecord('${l}')"><b>${iconFor(l)} ${l}</b><br><span class="muted">linked archive record</span></div>`).join("") || "<p>No recovered links.</p>"}
   </div>

   <hr style="border:0;border-top:1px solid rgba(70,45,20,.35);margin:18px 0">
   <p style="font-size:12px;letter-spacing:1px">BRITISH MAGICAL ARCHIVES · RECOVERY COPY · DO NOT REMOVE FROM ARCHIVE</p>
 </div>`;
 
detail.innerHTML=html;

}
function runSearch(){
  const query = document.getElementById("q").value.toLowerCase().trim();
  if(!query) return;

  const results = all().filter(x => {
    const haystack = [
      x.id,
      x.name,
      x.title,
      x.role,
      x.type,
      x.classification,
      x.status,
      x.summary,
      x.body,
      ...(x.links || [])
    ].join(" ").toLowerCase();

    return haystack.includes(query);
  });

  showPage("searchResults");

  searchSummary.textContent =
    `${results.length} record${results.length === 1 ? "" : "s"} found for "${query}".`;

  searchResultList.innerHTML = results.length
    ? results.map(x => `
      <div class="item" onclick="playSound('click');openRecord('${x.id}')">
        <b>${iconFor(x.id)} ${x.id} · ${x.name || x.title}</b><br>
        <span class="muted">
          ${x.role || x.type || "Case"} · ${x.clearance || x.classification || x.status}
        </span><br>
        <span>${x.summary || ""}</span>
      </div>
    `).join("")
    : `<p class="muted">No recovered records found.</p>`;
}
q.addEventListener("keydown",e=>{if(e.key==="Enter")runSearch()});
const translations = {
  en: {
    searchBtn: "SEARCH",
    placeholder: "Search archive: Ryu, Lethe, Traitor, Box 17...",
    navDashboard: "Dashboard",
    navPersonnel: "Personnel",
    navCases: "Cases",
    navEvidence: "Evidence",
    navTimeline: "Timeline",
    navExplorer: "Explorer",
    navBox17: "Box 17",
    archiveConsole: "Archive Recovery Console",
    releaseStatus: "Version 1.0 Release Status",
    trail: "Recommended Investigation Trail",
    board: "Intelligence Board",
    boardDesc: "Pinned relationship board reconstructed from recovered archive links."
  },
  ko: {
    searchBtn: "검색",
    placeholder: "아카이브 검색: Ryu, Lethe, Traitor, Box 17...",
    navDashboard: "대시보드",
    navPersonnel: "인물 기록",
    navCases: "사건 파일",
    navEvidence: "증거 보관소",
    navTimeline: "타임라인",
    navExplorer: "탐색기",
    navBox17: "Box 17",
    archiveConsole: "아카이브 복구 콘솔",
    releaseStatus: "버전 1.0 배포 상태",
    trail: "추천 조사 경로",
    board: "정보 관계 보드",
    boardDesc: "복구된 아카이브 링크를 기반으로 재구성된 관계 보드입니다."
  },
  jp: {
    searchBtn: "検索",
    placeholder: "アーカイブ検索: Ryu, Lethe, Traitor, Box 17...",
    navDashboard: "ダッシュボード",
    navPersonnel: "人物記録",
    navCases: "事件ファイル",
    navEvidence: "証拠保管庫",
    navTimeline: "タイムライン",
    navExplorer: "エクスプローラー",
    navBox17: "Box 17",
    archiveConsole: "アーカイブ復旧コンソール",
    releaseStatus: "バージョン1.0 リリース状態",
    trail: "推奨調査ルート",
    board: "情報関係ボード",
    boardDesc: "復旧されたアーカイブリンクをもとに再構築された関係ボードです。"
  }
};

function setLang(lang){
  localStorage.setItem("hiddenfiles-lang", lang);

  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.dataset.i18n;
    if(translations[lang] && translations[lang][key]){
      el.textContent = translations[lang][key];
    }
  });

  const q = document.getElementById("q");
  if(q && translations[lang]){
    q.placeholder = translations[lang].placeholder;
  }
}

const savedLang = localStorage.getItem("hiddenfiles-lang") || "en";
setLang(savedLang);
loadProgress();
loadRecovery();
render();
updateRecovery();