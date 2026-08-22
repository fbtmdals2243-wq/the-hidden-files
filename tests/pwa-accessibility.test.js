const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");


const portalRoot =
  path.resolve(
    __dirname,
    "../portal"
  );


function readPortal(relativePath){

  return fs.readFileSync(
    path.join(
      portalRoot,
      relativePath
    ),
    "utf8"
  );
}


function pass(message){

  console.log(
    "PASS:",
    message
  );
}


function getPngDimensions(relativePath){

  const data =
    fs.readFileSync(
      path.join(
        portalRoot,
        relativePath
      )
    );

  assert.equal(
    data.subarray(1, 4).toString("ascii"),
    "PNG"
  );

  return {
    width:
      data.readUInt32BE(16),
    height:
      data.readUInt32BE(20)
  };
}


const indexHtml =
  readPortal("index.html");

const privacyHtml =
  readPortal("privacy.html");

const offlineHtml =
  readPortal("offline.html");

const appShellSource =
  readPortal("js/app-shell.js");

const serviceWorkerSource =
  readPortal("service-worker.js");

const portalCss =
  readPortal("css/portal.css");

const manifest =
  JSON.parse(
    readPortal(
      "manifest.webmanifest"
    )
  );


assert.equal(
  manifest.start_url,
  "./"
);
assert.equal(
  manifest.scope,
  "./"
);
assert.equal(
  manifest.display,
  "standalone"
);
assert.equal(
  manifest.theme_color,
  "#0b120f"
);
assert.equal(
  manifest.background_color,
  "#030504"
);
assert.ok(
  manifest.icons.some(
    icon => icon.sizes === "192x192"
  )
);
assert.ok(
  manifest.icons.some(
    icon => icon.sizes === "512x512"
  )
);
pass("Web app manifest supplies a scoped standalone Ministry Portal");


assert.deepEqual(
  getPngDimensions(
    "icons/ministry-seal-192.png"
  ),
  {
    width:
      192,
    height:
      192
  }
);
assert.deepEqual(
  getPngDimensions(
    "icons/ministry-seal-512.png"
  ),
  {
    width:
      512,
    height:
      512
  }
);
pass("Install icons provide valid 192px and 512px PNG assets");


const shellBlock =
  serviceWorkerSource.match(
    /const APP_SHELL = \[([\s\S]*?)\n\];/
  );

assert.ok(shellBlock);

const cachedPaths =
  Array.from(
    shellBlock[1].matchAll(
      /"(\.\/[^"\n]*)"/g
    ),
    match => match[1]
  );

assert.ok(
  cachedPaths.length > 30
);

for(const cachedPath of cachedPaths){

  const localPath =
    cachedPath === "./"
      ? "index.html"
      : cachedPath.replace(/^\.\//, "");

  assert.equal(
    fs.existsSync(
      path.join(
        portalRoot,
        localPath
      )
    ),
    true,
    `${cachedPath} must exist`
  );
}

const indexResources = [
  ...Array.from(
    indexHtml.matchAll(
      /<script\s+src="([^"]+)"/g
    ),
    match => `./${match[1]}`
  ),
  ...Array.from(
    indexHtml.matchAll(
      /<link\s+rel="stylesheet"\s+href="([^"]+)"/g
    ),
    match => `./${match[1]}`
  )
];

for(const resource of indexResources){

  assert.ok(
    cachedPaths.includes(resource),
    `${resource} must be in the offline shell`
  );
}
pass("Offline shell contains every JavaScript and stylesheet dependency");


assert.match(
  serviceWorkerSource,
  /request\.method !== "GET"/
);
assert.match(
  serviceWorkerSource,
  /url\.origin !== self\.location\.origin/
);
assert.match(
  serviceWorkerSource,
  /request\.mode === "navigate"/
);
assert.match(
  serviceWorkerSource,
  /cache\.match\("\.\/offline\.html"\)/
);
assert.doesNotMatch(
  shellBlock[1],
  /https?:|supabase|\/auth\/|\/rest\//i
);
assert.doesNotMatch(
  serviceWorkerSource,
  /skipWaiting\s*\(/
);
pass("Service worker caches same-origin static files without cloud APIs or forced activation");


assert.match(
  indexHtml,
  /<a class="skip-link" href="#app">/
);
assert.match(
  indexHtml,
  /<main id="app" tabindex="-1">/
);
assert.match(
  indexHtml,
  /id="networkStatus"[\s\S]*role="status"[\s\S]*aria-live="polite"/
);
assert.match(
  indexHtml,
  /id="installAppButton"/
);
assert.ok(
  indexHtml.indexOf("js/app-shell.js") <
  indexHtml.indexOf("js/portal.js")
);
pass("Portal shell exposes skip navigation, live network status, and install controls");


assert.match(
  appShellSource,
  /beforeinstallprompt/
);
assert.match(
  appShellSource,
  /new MutationObserver/
);
assert.match(
  appShellSource,
  /"offline"/
);
assert.match(
  appShellSource,
  /"online"/
);
assert.match(
  appShellSource,
  /navigator\.serviceWorker\.register/
);
assert.match(
  appShellSource,
  /window\.location\.protocol !== "file:"/
);
pass("App shell manages installation, focus, connectivity, and safe local-file fallback");


assert.match(
  portalCss,
  /:focus-visible/
);
assert.match(
  portalCss,
  /prefers-reduced-motion:reduce/
);
assert.match(
  portalCss,
  /safe-area-inset-bottom/
);
assert.match(
  portalCss,
  /min-height:44px/
);
assert.match(
  portalCss,
  /@media\(max-width:600px\)/
);
pass("Keyboard focus, reduced motion, touch targets, and mobile safe areas are styled");


assert.match(
  privacyHtml,
  /rel="manifest"/
);
assert.match(
  privacyHtml,
  /js\/app-shell\.js/
);
assert.match(
  offlineHtml,
  /Your device record remains intact/
);
assert.match(
  offlineHtml,
  /RETRY MINISTRY PORTAL/
);
pass("Privacy and offline pages remain inside the installable accessible portal");


console.log(
  "\nPWA and accessibility test completed successfully."
);
