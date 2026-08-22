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

const defaultPortalUrl =
  "https://fbtmdals2243-wq.github.io/the-hidden-files/portal/";

const hostedPortalUrl =
  new URL(
    process.env.THF_HOSTED_PORTAL_URL || defaultPortalUrl
  );

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

const localIntegrity =
  JSON.parse(
    fs.readFileSync(
      path.join(
        portalRoot,
        "release-integrity.json"
      ),
      "utf8"
    )
  );


function sha256(buffer){

  return crypto
    .createHash("sha256")
    .update(buffer)
    .digest("hex");
}


function releaseUrl(relativePath){

  const portalRelativePath =
    relativePath.replace(
      /^portal\//,
      ""
    );

  const url =
    new URL(
      portalRelativePath,
      hostedPortalUrl
    );

  url.searchParams.set(
    "release",
    release.version
  );

  return url;
}


async function fetchFile(relativePath){

  const url =
    releaseUrl(relativePath);

  const response =
    await fetch(
      url,
      {
        headers: {
          "Cache-Control":
            "no-cache"
        },
        redirect:
          "follow"
      }
    );

  assert.equal(
    response.status,
    200,
    `${relativePath} returned HTTP ${response.status}.`
  );

  const finalUrl =
    new URL(response.url);

  assert.equal(
    finalUrl.origin,
    hostedPortalUrl.origin,
    `${relativePath} redirected away from the hosted release origin.`
  );

  return {
    body:
      Buffer.from(
        await response.arrayBuffer()
      ),
    contentType:
      response.headers.get("content-type") || "",
    url:
      finalUrl
  };
}


async function mapWithConcurrency(items, limit, worker){

  const results =
    new Array(items.length);

  let nextIndex =
    0;

  async function run(){

    while(nextIndex < items.length){

      const currentIndex =
        nextIndex;

      nextIndex +=
        1;

      results[currentIndex] =
        await worker(
          items[currentIndex]
        );
    }
  }

  await Promise.all(
    Array.from(
      {
        length:
          Math.min(
            limit,
            items.length
          )
      },
      run
    )
  );

  return results;
}


async function main(){

  assert.equal(
    hostedPortalUrl.protocol,
    "https:",
    "Hosted release verification requires HTTPS."
  );

  assert.equal(
    localIntegrity.release,
    release.version,
    "Local release metadata and integrity manifest disagree."
  );

  const hostedReleaseFile =
    await fetchFile(
      "portal/release.json"
    );

  const hostedRelease =
    JSON.parse(
      hostedReleaseFile.body.toString("utf8")
    );

  assert.equal(
    hostedRelease.version,
    release.version,
    "Hosted release version does not match the tested local release."
  );

  const hostedIntegrityFile =
    await fetchFile(
      "portal/release-integrity.json"
    );

  const hostedIntegrity =
    JSON.parse(
      hostedIntegrityFile.body.toString("utf8")
    );

  assert.deepEqual(
    hostedIntegrity,
    localIntegrity,
    "Hosted integrity manifest does not match the tested local manifest."
  );

  const relativePaths =
    Object.keys(
      localIntegrity.files
    ).sort();

  const hostedFiles =
    await mapWithConcurrency(
      relativePaths,
      6,
      fetchFile
    );

  relativePaths.forEach((relativePath, index) => {

    assert.equal(
      sha256(
        hostedFiles[index].body
      ),
      localIntegrity.files[relativePath],
      `${relativePath} does not match its tested release hash.`
    );
  });

  const manifestIndex =
    relativePaths.indexOf(
      "portal/manifest.webmanifest"
    );

  const serviceWorkerIndex =
    relativePaths.indexOf(
      "portal/service-worker.js"
    );

  assert.notEqual(
    manifestIndex,
    -1
  );

  assert.notEqual(
    serviceWorkerIndex,
    -1
  );

  assert.match(
    hostedFiles[manifestIndex].contentType,
    /^application\/manifest\+json(?:;|$)/i,
    "Hosted manifest has an invalid content type."
  );

  assert.match(
    hostedFiles[serviceWorkerIndex].contentType,
    /^(?:application|text)\/javascript(?:;|$)/i,
    "Hosted service worker has an invalid content type."
  );

  console.log(
    `HOSTED RELEASE VERIFIED: ${release.name} v${release.version}`
  );

  console.log(
    `Verified ${relativePaths.length} hosted portal files against ${localIntegrity.algorithm.toUpperCase()} release hashes.`
  );

  console.log(
    hostedPortalUrl.toString()
  );
}


main().catch(error => {

  console.error(
    `HOSTED RELEASE CHECK FAILED: ${error.message}`
  );

  process.exitCode =
    1;
});
