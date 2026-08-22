# THE HIDDEN FILES · Deployment Runbook

- Release channel: Public Alpha
- Current version: `2.0.0-public-alpha.1`


## 1. Verify the candidate

From the repository root, run:

```bash
node scripts/generate-release-integrity.js
node scripts/release-check.js
```

The second command must finish with `RELEASE READY`. It verifies every portal
SHA-256 hash, JavaScript syntax, disabled cloud configuration, and all fifteen
automated suites.

If the integrity generator changes `portal/release-integrity.json`, review and
commit that file with the code that caused the hash change. Never hand-edit a
hash to make a failing check pass.


## 2. Publish

The GitHub Pages source is the repository's `main` branch. Publish only a
candidate whose working tree matches the tested release integrity manifest.

Do not add a Supabase secret key, `service_role` key, password, or unreviewed
analytics snippet to a browser file. Cloud mode must remain disabled until the
external checklist in `PUBLIC_ALPHA_CHECKLIST.md` is complete.


## 3. Hosted smoke test

From the repository root, first run the deterministic hosted release check:

```bash
node scripts/hosted-release-check.js
```

It fetches the deployed release metadata and all 41 portal files, verifies HTTP
success, compares every SHA-256 hash with the tested local integrity manifest,
and confirms the manifest and service-worker content types.

Verify these exact paths return HTTP 200:

```text
/portal/
/portal/manifest.webmanifest
/portal/service-worker.js
/portal/offline.html
/portal/privacy.html
/portal/release.json
/portal/release-integrity.json
/portal/icons/ministry-seal-192.png
/portal/icons/ministry-seal-512.png
```

Confirm that the manifest is served as `application/manifest+json`, the
service worker is served as JavaScript, and the hosted hashes match
`portal/release-integrity.json`.

Open the hosted portal and verify:

1. The Recruitment or Welcome Back screen renders.
2. No portal-owned console error is produced.
3. The install control appears in an eligible HTTPS browser.
4. A screen transition moves focus to the new `h1`.
5. The Data & Privacy page returns to the portal.


## 4. Cache changes

Any change to a cached portal asset requires:

1. A release-version or cache-version update in `portal/service-worker.js`.
2. Regeneration of `portal/release-integrity.json`.
3. A complete `node scripts/release-check.js` run.

The service worker intentionally does not force activation. An update becomes
active after all older portal tabs close, preventing a running employee session
from mixing old and new scripts.


## 5. Rollback

Use a normal revert commit on `main`; do not rewrite published history. After a
rollback, give the service worker a new cache version, regenerate integrity,
rerun the release check, and verify the hosted files again.

Employee saves use a forward-compatible versioned storage layer. Do not remove
or rename established localStorage keys during an emergency rollback.
