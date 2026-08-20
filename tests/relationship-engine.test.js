const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");


const repositoryRoot =
  path.resolve(__dirname, "..");


function createStorage(initialValues = {}){

  const values =
    new Map(
      Object.entries(initialValues)
        .map(
          ([key, value]) =>
            [key, String(value)]
        )
    );

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


const localStorage =
  createStorage({
    ministryApplicantName: "Network Officer",
    ministryEmployeeId: "MOM-027027",
    worldDay: "14",
    playerRank: "Archive Officer",
    playerClearance: "Level II",
    secondStoryArcStarted: "true"
  });


const app = { innerHTML: "" };


const context = {
  app,
  localStorage,
  console,
  Date,
  showDashboard(){},
  renderMinistryDocument(document){
    return `<article>${document.title}${document.body}</article>`;
  }
};


vm.createContext(context);


[
  "portal/js/storage-engine.js",
  "portal/js/player-engine.js",
  "portal/js/world-engine.js",
  "portal/js/relationship.js"
].forEach(
  scriptPath => {

    let source =
      fs.readFileSync(
        path.join(repositoryRoot, scriptPath),
        "utf8"
      );

    if(scriptPath.endsWith("storage-engine.js")){
      source += "\nthis.__MinistryStorage = MinistryStorage;";
    }
    if(scriptPath.endsWith("player-engine.js")){
      source += "\nthis.__Player = Player;";
    }
    if(scriptPath.endsWith("world-engine.js")){
      source += "\nthis.__World = World;";
    }
    if(scriptPath.endsWith("relationship.js")){
      source += "\nthis.__MinistryRelationships = MinistryRelationships;";
    }

    vm.runInContext(source, context, { filename: scriptPath });
  }
);


const MinistryStorage = context.__MinistryStorage;
const World = context.__World;
const MinistryRelationships = context.__MinistryRelationships;


assert.equal(
  MinistryRelationships.isUnlocked("NPC-ELEANOR-WHITMORE"),
  true
);
assert.equal(
  MinistryRelationships.isUnlocked("NPC-MIRIAM-VALE"),
  true
);
assert.equal(
  MinistryRelationships.isUnlocked("NPC-GIDEON-MARCH"),
  false
);
pass("Colleagues unlock from actual shared Ministry history");


const firstCheckIn =
  MinistryRelationships.interact(
    "NPC-MIRIAM-VALE",
    "ask-method"
  );

assert.equal(firstCheckIn.success, true);
assert.equal(firstCheckIn.trust, 1);
assert.equal(firstCheckIn.trustLabel, "Professional Contact");

const duplicate =
  MinistryRelationships.interact(
    "NPC-MIRIAM-VALE",
    "check-welfare"
  );

assert.equal(duplicate.success, false);
assert.equal(duplicate.reason, "already-spoke-today");
assert.equal(
  MinistryRelationships.getRecord("NPC-MIRIAM-VALE").trust,
  1
);
pass("One professional check-in per colleague per day prevents trust farming");


localStorage.setItem(
  "sealedCompatibilityConditionOne",
  "true"
);
World.setDay(15);

assert.equal(
  MinistryRelationships.isUnlocked("NPC-GIDEON-MARCH"),
  true
);

assert.equal(
  MinistryRelationships.interact(
    "NPC-GIDEON-MARCH",
    "verify-boundary"
  ).success,
  true
);
pass("Gideon enters the network after the first compatibility review");


for(let day = 15; day <= 20; day += 1){
  World.setDay(day);
  MinistryRelationships.interact(
    "NPC-MIRIAM-VALE",
    "request-review"
  );
}

const miriamRecord =
  MinistryRelationships.getRecord(
    "NPC-MIRIAM-VALE"
  );

assert.equal(miriamRecord.trust, 5);
assert.equal(
  MinistryRelationships.getTrustLabel(miriamRecord.trust),
  "Office Ally"
);
assert.equal(miriamRecord.interactionCount, 7);
pass("Repeated work-day contact builds a capped permanent relationship");


context.showColleagues();
assert.match(app.innerHTML, /Eleanor Whitmore/);
assert.match(app.innerHTML, /Dr. Miriam Vale/);
assert.match(app.innerHTML, /Gideon March/);
assert.match(app.innerHTML, /Office Ally/);
pass("Office 3-B renders the unlocked professional network");


const snapshot =
  MinistryStorage.createSnapshot();

assert.ok(snapshot.data.playerRelationships);
assert.match(snapshot.data.playerRelationships, /NPC-MIRIAM-VALE/);
pass("Relationship history is included in employee archives");


const portalIndex =
  fs.readFileSync(
    path.join(repositoryRoot, "portal/index.html"),
    "utf8"
  );

assert.ok(
  portalIndex.indexOf("js/relationship.js") >
    portalIndex.indexOf("js/career-review.js") &&
  portalIndex.indexOf("js/personnel.js") >
    portalIndex.indexOf("js/relationship.js")
);
pass("Portal loads Relationships before Personnel and Dashboard");


console.log("\nRelationship Engine test completed successfully.");
