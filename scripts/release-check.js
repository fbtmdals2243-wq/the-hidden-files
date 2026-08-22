const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");


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


function runNode(args, label){

  const result =
    spawnSync(
      process.execPath,
      args,
      {
        cwd:
          repositoryRoot,
        stdio:
          "inherit"
      }
    );

  if(result.status !== 0){

    throw new Error(
      `${label} failed.`
    );
  }
}


const release =
  JSON.parse(
    fs.readFileSync(
      path.join(
        portalRoot,
        "release.json"
      ),
      "utf8"
    )
  );

const integrity =
  JSON.parse(
    fs.readFileSync(
      integrityPath,
      "utf8"
    )
  );


assert.equal(
  integrity.release,
  release.version,
  "Integrity release version must match release.json."
);

assert.equal(
  integrity.algorithm,
  "sha256"
);


const expectedFiles =
  listFiles(portalRoot)
    .filter(file => file !== integrityPath)
    .map(file => (
      path
        .relative(
          repositoryRoot,
          file
        )
        .split(path.sep)
        .join("/")
    ));

const recordedFiles =
  Object.keys(
    integrity.files
  ).sort();


assert.deepEqual(
  recordedFiles,
  expectedFiles,
  "Integrity manifest must list every portal file exactly once."
);


for(const relativePath of recordedFiles){

  assert.equal(
    sha256(
      path.join(
        repositoryRoot,
        relativePath
      )
    ),
    integrity.files[relativePath],
    `${relativePath} does not match its release hash.`
  );
}


const cloudConfig =
  fs.readFileSync(
    path.join(
      portalRoot,
      "js/cloud-config.js"
    ),
    "utf8"
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


const syntaxFiles = [
  ...listFiles(
    path.join(
      portalRoot,
      "js"
    )
  ).filter(file => file.endsWith(".js")),
  path.join(
    portalRoot,
    "service-worker.js"
  ),
  ...listFiles(
    path.join(
      repositoryRoot,
      "tests"
    )
  ).filter(file => file.endsWith(".js")),
  ...listFiles(
    path.join(
      repositoryRoot,
      "scripts"
    )
  ).filter(file => (
    file.endsWith(".js") &&
    file !== __filename
  ))
];


for(const file of syntaxFiles){

  runNode(
    [
      "--check",
      file
    ],
    `Syntax check for ${path.relative(repositoryRoot, file)}`
  );
}


runNode(
  [
    "tests/run-all.js"
  ],
  "Automated test suite"
);


console.log(
  `\nRELEASE READY: ${release.name} v${release.version}`
);
console.log(
  `Verified ${recordedFiles.length} portal files, ${syntaxFiles.length} JavaScript files, and ${release.testSuites} test suites.`
);
console.log(
  "Cloud mode remains disabled until an owner provisions and verifies the external Supabase project."
);
