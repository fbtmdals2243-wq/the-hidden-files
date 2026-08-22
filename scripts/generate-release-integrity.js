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

      if(entry.isDirectory()){
        return listFiles(absolutePath);
      }

      return [absolutePath];
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
    fs.readFileSync(
      path.join(
        portalRoot,
        "release.json"
      ),
      "utf8"
    )
  );

const files = {};


for(const file of listFiles(portalRoot)){

  const relativePath =
    path
      .relative(
        repositoryRoot,
        file
      )
      .split(path.sep)
      .join("/");

  files[relativePath] =
    sha256(file);
}


const integrity = {
  release:
    release.version,
  algorithm:
    "sha256",
  generatedAt:
    release.releasedAt,
  files
};


fs.writeFileSync(
  integrityPath,
  JSON.stringify(
    integrity,
    null,
    2
  ) + "\n",
  "utf8"
);


console.log(
  `Wrote ${Object.keys(files).length} portal hashes for ${release.version}.`
);
