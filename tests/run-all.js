const path = require("node:path");
const { spawnSync } = require("node:child_process");


const tests = [
  "storage-engine.test.js",
  "records-safety.test.js",
  "cloud-engine.test.js",
  "cloud-portal.test.js",
  "new-employee-journey.test.js",
  "case006-submission.test.js",
  "training-engine.test.js",
  "career-review.test.js",
  "case007-submission.test.js",
  "relationship-engine.test.js",
  "final-arc.test.js",
  "portal-progression.test.js"
];


for(const test of tests){

  console.log(`\n=== ${test} ===`);

  const result =
    spawnSync(
      process.execPath,
      [path.join(__dirname, test)],
      {
        stdio: "inherit"
      }
    );

  if(result.status !== 0){
    process.exit(result.status || 1);
  }
}


console.log(
  "\nALL THE HIDDEN FILES TESTS PASSED."
);
