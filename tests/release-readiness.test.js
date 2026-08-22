const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");


const repositoryRoot =
  path.resolve(
    __dirname,
    ".."
  );

const portalRoot =
  path.join(
    repositoryRoot,
    "portal"
  );

const integrityPath =
  path.join(
    portalRoot,
    "release-integrity.json"
  );


function pass(message){

  console.log(
    "PASS:",
    message
  );
}


function read(relativePath){

  return fs.readFileSync(
    path.join(
      repositoryRoot,
      relativePath
    ),
    "utf8"
  );
}


function listFiles(directory){

  return fs
    .readdirSync(
      directory,
      {
        withFileTypes:
          true
      }
    )
    .flatMap(entry => {

      const absolutePath =
        path.join(
          directory,
          entry.name
        );

      return entry.isDirectory()
        ? listFiles(absolutePath)
        : [absolutePath];
    })
    .filter(file => (
      file !== integrityPath &&
      path.basename(file) !== ".DS_Store"
    ))
    .sort();
}


function sha256(file){

  return crypto
    .createHash("sha256")
    .update(
      fs.readFileSync(file)
    )
    .digest("hex");
}


const release =
  JSON.parse(
    read(
      "portal/release.json"
    )
  );

const integrity =
  JSON.parse(
    read(
      "portal/release-integrity.json"
    )
  );


assert.equal(
  release.version,
  "2.0.0-public-alpha.1"
);
assert.equal(
  release.saveSchema,
  2
);
assert.equal(
  release.storyThrough,
  "CASE-OMEGA"
);
assert.equal(
  release.continuingService,
  true
);
assert.equal(
  release.cloudMode,
  "disabled-by-default"
);
pass("Release metadata fixes the public alpha version and product boundary");


for(const htmlPath of [
  "portal/index.html",
  "portal/privacy.html",
  "portal/offline.html"
]){

  assert.match(
    read(htmlPath),
    new RegExp(
      `name="app-version" content="${release.version.replaceAll(".", "\\.")}"`
    )
  );
}

assert.match(
  read("portal/js/app-shell.js"),
  /releaseVersionElement\.textContent/
);
assert.match(
  read("portal/service-worker.js"),
  new RegExp(
    `"${release.version.replaceAll(".", "\\.")}"`
  )
);
assert.match(
  read("portal/service-worker.js"),
  /"\.\/release-integrity\.json"/
);
pass("Portal, privacy, offline, and cache layers expose one release version");


const actualPortalFiles =
  listFiles(portalRoot)
    .map(file => (
      path
        .relative(
          repositoryRoot,
          file
        )
        .split(path.sep)
        .join("/")
    ));

assert.deepEqual(
  Object.keys(
    integrity.files
  ).sort(),
  actualPortalFiles
);

for(const relativePath of actualPortalFiles){

  assert.equal(
    integrity.files[relativePath],
    sha256(
      path.join(
        repositoryRoot,
        relativePath
      )
    )
  );
}
pass("SHA-256 release manifest covers every deployable portal file");


const runAllSource =
  read("tests/run-all.js");

const suiteCount =
  Array.from(
    runAllSource.matchAll(
      /"[^"]+\.test\.js"/g
    )
  ).length;

assert.equal(
  suiteCount,
  release.testSuites
);
assert.match(
  runAllSource,
  /"release-readiness\.test\.js"/
);
pass("Release metadata matches the executable automated suite count");


const cloudConfig =
  read(
    "portal/js/cloud-config.js"
  );

assert.match(
  cloudConfig,
  /enabled:\s*\n\s*false/
);
assert.match(
  cloudConfig,
  /url:\s*\n\s*""/
);
assert.match(
  cloudConfig,
  /publishableKey:\s*\n\s*""/
);
assert.doesNotMatch(
  cloudConfig,
  /service_role\s*[:=]\s*["'][^"']+/i
);
pass("Public release contains no activated cloud project or privileged key");


for(const requiredDocument of [
  "DEPLOYMENT.md",
  "PUBLIC_ALPHA_CHECKLIST.md",
  "RELEASE_NOTES.md"
]){

  assert.equal(
    fs.existsSync(
      path.join(
        repositoryRoot,
        requiredDocument
      )
    ),
    true
  );
}

assert.match(
  read("RELEASE_NOTES.md"),
  new RegExp(
    release.version.replaceAll(".", "\\.")
  )
);
assert.match(
  read("PUBLIC_ALPHA_CHECKLIST.md"),
  /External owner action required/
);
assert.match(
  read("DEPLOYMENT.md"),
  /node scripts\/release-check\.js/
);
pass("Release notes, deployment runbook, checklist, and external boundaries are present");


console.log(
  "\nRelease readiness test completed successfully."
);
