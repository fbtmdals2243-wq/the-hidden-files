const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");


const repositoryRoot =
  path.resolve(__dirname, "..");


function createStorage(){

  const values = new Map();

  return {
    get length(){ return values.size; },
    key(index){ return Array.from(values.keys())[index] || null; },
    getItem(key){ return values.has(key) ? values.get(key) : null; },
    setItem(key, value){ values.set(key, String(value)); },
    removeItem(key){ values.delete(key); }
  };
}


function pass(message){
  console.log("PASS:", message);
}


const localStorage = createStorage();
const app = { innerHTML: "" };


const context = {
  app,
  localStorage,
  console,
  Date,
  alert(){},
  showDashboard(){},
  showMinistryNetwork(){},
  renderMinistryDocument(document){
    return `<article>${document.title}${document.body}</article>`;
  }
};


vm.createContext(context);


function runScript(scriptPath, exportLine = ""){

  vm.runInContext(
    fs.readFileSync(
      path.join(repositoryRoot, scriptPath),
      "utf8"
    ) + exportLine,
    context,
    { filename: scriptPath }
  );
}


runScript(
  "portal/js/identity-engine.js",
  "\nthis.__IdentityEngine = MinistryIdentityEngine;"
);

const IdentityEngine = context.__IdentityEngine;

IdentityEngine.reset();
IdentityEngine.applyAnswer({
  logic: 7,
  curiosity: 6,
  discretion: 4,
  duty: 3
});

const identity =
  IdentityEngine.generateIdentity();

assert.equal(identity.house, "Ravenclaw");
assert.equal(identity.department, "Archive Division");
assert.equal(identity.patronus, "Raven");
pass("Recruitment assessment creates a complete magical identity");


localStorage.setItem("ministryApplicantName", "New Officer");
localStorage.setItem("ministryEmployeeId", "MOM-NEW001");
localStorage.setItem("ministryIdentity", JSON.stringify(identity));
localStorage.setItem("playerAssignedDepartment", "Archive Division");
localStorage.setItem("playerRank", "Junior Archive Officer");
localStorage.setItem("playerClearance", "Level I");
localStorage.setItem("worldDay", "1");
localStorage.setItem("orientationComplete", "true");
localStorage.setItem("caseStatus_CASE-000", "Solved");
localStorage.setItem("caseCompleted_CASE-000", new Date().toISOString());


runScript("portal/js/storage-engine.js", "\nthis.__Storage = MinistryStorage;");
runScript("portal/js/case-data.js", "\nthis.__Cases = MinistryCases;");
runScript("portal/js/player-engine.js", "\nthis.__Player = Player;");
runScript("portal/js/world-engine.js", "\nthis.__World = World;");
runScript("portal/js/daily-work.js");
runScript("portal/js/training.js");
runScript("portal/js/career-review.js");
runScript("portal/js/relationship.js");
runScript("portal/js/owl-mail.js");
runScript("portal/js/personnel.js");
runScript("portal/js/promotion.js");


const Player = context.__Player;
const World = context.__World;
const Storage = context.__Storage;

context.approvePromotion();

assert.equal(Player.getRank(), "Archive Officer");
assert.equal(Player.getClearance(), "Level II");
assert.equal(Player.getEmployeeId(), "MOM-NEW001");
pass("CASE-000 promotion preserves the permanent employee number");


World.setDay(2);
Player.setCaseStatus("CASE-001", "Solved");
localStorage.setItem("caseCompleted_CASE-001", new Date().toISOString());
localStorage.setItem("report_CASE-001", JSON.stringify({ findings: "Memory fracture confirmed." }));

World.setDay(3);
Player.setCaseStatus("CASE-002", "Solved");
localStorage.setItem("caseCompleted_CASE-002", new Date().toISOString());
localStorage.setItem("report_CASE-002", JSON.stringify({ findings: "Identity deliberately removed." }));

World.setDay(4);
Player.setCaseStatus("CASE-003", "Under Review");
localStorage.setItem("report_CASE-003", JSON.stringify({ findings: "Room 4-7 remains registered." }));

World.setDay(5);

const chamberReview =
  context.getOwlMails()
    .find(mail => mail.id === "MAIL-007");

assert.ok(chamberReview);
assert.match(chamberReview.body, /PERSONNEL CONTINUITY CHAMBER/);
context.openOwlMail("MAIL-007");

assert.equal(Player.getCaseStatus("CASE-003"), "Solved");
assert.equal(
  localStorage.getItem("continuityChamberDiscovered"),
  "true"
);
pass("Day 5 review closes CASE-003 without erasing its report");


World.setDay(6);

const personnelAudit =
  context.getOwlMails()
    .find(mail => mail.id === "MAIL-008");

assert.ok(personnelAudit);
assert.match(personnelAudit.body, /MOM-000117/);
context.openOwlMail("MAIL-008");
context.showPersonnelRecord();

assert.match(app.innerHTML, /DISCREPANCY DETECTED/);
assert.match(app.innerHTML, /LEGACY AUTHORIZATION SIGNATURE/);
assert.match(app.innerHTML, /Identity Match:\s*NOT ESTABLISHED/);
assert.equal(Player.getEmployeeId(), "MOM-NEW001");
assert.equal(Player.getRank(), "Archive Officer");
assert.equal(Player.getClearance(), "Level II");
assert.equal(
  JSON.parse(
    localStorage.getItem("report_CASE-003")
  ).findings,
  "Room 4-7 remains registered."
);
pass("New employee reaches Day 6 with identity, career, and reports intact");


const snapshot = Storage.createSnapshot();

assert.equal(snapshot.employeeId, "MOM-NEW001");
assert.equal(snapshot.data.worldDay, "6");
assert.ok(snapshot.data["report_CASE-001"]);
assert.ok(snapshot.data["report_CASE-002"]);
assert.ok(snapshot.data["report_CASE-003"]);
pass("Day 6 employee state is ready for archive or cloud transfer");


console.log("\nNew Employee Journey test completed successfully.");
