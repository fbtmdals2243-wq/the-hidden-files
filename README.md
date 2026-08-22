# THE HIDDEN FILES

THE HIDDEN FILES is a browser-based British Ministry of Magic employee experience built with static HTML, CSS, and vanilla JavaScript.

The player does not simply open a mystery game. They are recruited, interviewed, assigned an employee identity, and return to Office 3-B for continuing Ministry work.

The target feeling is:

> I logged into work today.


## Current static release

The current portal includes:

- Recruitment, application, and interview
- Identity Engine results
- Permanent employee number
- Returning Employee resume flow
- Office 3-B dashboard
- Eleanor Whitmore and First Day Orientation
- Rank, clearance, promotion, and personnel records
- Owl Mail, Daily Prophet, and Notice Board
- World Day progression and End Work Day
- Investigation reports saved in localStorage
- CASE-000 through CASE-008, CASE-ZERO, and CASE-OMEGA
- Complete Personnel Continuity narrative
- Day 10 and later recurring Ministry work orders
- Rotating daily news and notices
- Permanent Service Points and duty history
- Ministry Training Desk and permanent qualification records
- Continuity Records Handling · Grade I course
- Level III Career Readiness Review
- Senior Archive Officer promotion and Level III clearance
- Level IV Continuity Authority Final Board
- Principal Archive Officer promotion and Grade II qualification
- One-record Ω Continuity Warrant
- Restored historical identity of MOM-000117
- Narrative epilogue with continuing post-story employment
- Persistent colleague relationships and daily professional check-ins
- Downloadable and restorable employee archive files
- Optional Ministry Network account and cloud-save client
- Save Schema Version 2 with automatic pre-restore recovery checkpoints
- Local-versus-incoming record comparison before replacement
- One-action undo for the latest file or cloud restore
- Local record deletion with employee-number confirmation
- Public data and privacy notice
- Installable web app manifest and Ministry seal icons
- Offline portal shell for previously loaded static game screens
- Same-origin static caching that excludes cloud and account APIs
- Keyboard focus, reduced-motion, touch-target, and mobile safe-area support


## Story progression

```text
Day 1   CASE-000 · The Missing Owl
Day 2   CASE-001 · Memory Fracture
Day 3   CASE-002 · The Officer Who Never Existed
Day 4   CASE-003 · Sub-Level 4
Day 5   Personnel Continuity Chamber review
Day 6   CASE-004 · The Second Signature
Day 7   Prior Authorization Claim review
Day 8   CASE-005 · The Position That Never Closed
Day 9   Continuity Appointment determination
Day 10  Continuing daily Ministry service begins
Day 13  A routine personnel decision produces a sealed exception
Day 14  CASE-006 · The Decision Before It Was Made
Day 15  Compatibility Condition One review
Day 16  Mandatory Continuity Records Handling qualification
Day 17  Level III Career Readiness Review
Day 18  CASE-007 · The Memory That Recognized You
Day 19  Compatibility Condition Two review
Day 20  CASE-008 · The Name Beneath the Number
Day 21  Compatibility Condition Three + Level IV Final Board
Day 22  CASE-ZERO · The First Deletion
Day 23  Rowan Mercer restoration + CASE-OMEGA epilogue
Day 24+ Continuing Ministry service and colleague relationships
```

The complete story establishes that the player and MOM-000117 are separate
recorded identities connected to one protected Ministry appointment.

The second arc begins inside ordinary Ministry work rather than replacing it.
A routine Day 13 decision is found in a MOM-000117 record that was authenticated
before the player made the decision. CASE-006 confirms only the first of three
sealed compatibility components; it does not establish an identity match.

After CASE-006, the player must complete a three-module Ministry training
course before returning to routine work. The resulting Grade I qualification
is stored permanently in the employee personnel record and establishes future
Level III review eligibility without increasing clearance immediately.

On Day 17, qualified employees with the required service record complete a
three-scenario Personnel Advancement Board review. Approval permanently grants
the rank of Senior Archive Officer and Level III clearance.

CASE-007 confirms the second sealed compatibility component:
MNEMONIC RESPONSE CORRESPONDENCE. A memory prepared by MOM-000117 recognizes
the current appointment, while the official record continues to state that an
identity match is not established.

CASE-008 confirms the third component, PROTECTIVE INTENT CORRESPONDENCE. The
two appointment holders independently chose to suspend destructive action,
protect affected people, and preserve authenticated evidence. This does not
require or establish a shared identity.

The Level IV Final Board grants the rank of Principal Archive Officer,
Continuity Records Handling · Grade II, and a one-record Ω warrant. CASE-ZERO
then restores MOM-000117 as Rowan Mercer, the first Continuity Records Liaison
and the first person deleted by the original program. The player remains the
second, separate appointee. CASE-OMEGA connects the portal to the future Archive
OS epilogue, after which ordinary Ministry work continues indefinitely.

The Colleagues desk turns Eleanor Whitmore, Dr. Miriam Vale, and Gideon March
into persistent professional relationships. One optional check-in per colleague
per work day builds trust without allowing repeated-click reward farming.


## Run locally

No build step is required.

Open:

```text
portal/index.html
```

For consistent browser storage and routing, a simple local web server is recommended:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000/portal/
```

The install and offline features require an HTTP or HTTPS origin and therefore
do not activate when `portal/index.html` is opened as a direct `file://` URL.
The core local game still opens directly, but using the local server keeps one
stable browser origin for employee records and matches the hosted release.

The Archive OS home page and the employee portal link to each other. The
CASE-OMEGA epilogue may open the Archive OS directly, while the Archive OS
sidebar provides a return path to the Ministry employee portal.


## Automated progression test

Node.js is required only for testing.

```bash
node tests/run-all.js
```

The test verifies:

- recruitment identity through Day 6 preservation
- CASE-000 through CASE-008, CASE-ZERO, and CASE-OMEGA registration
- scalable completed-case tracking
- Day 8 and Day 9 story progression
- first-arc career assignment
- Day 13 through Day 15 second-arc progression
- personalized duty recall and first compatibility component
- Day 16 training directive and three-module qualification
- Day 17 Level III career review and permanent career milestone
- Day 18 through Day 19 CASE-007 and compatibility component two
- Day 20 through Day 23 final compatibility, Level IV, CASE-ZERO, and epilogue
- Rowan Mercer restoration while preserving the current player identity
- daily colleague relationships with duplicate interaction protection
- permanent qualification, training-credit, archive, and cloud-save preservation
- recommended versus assigned department separation
- fourteen continuous daily work cycles
- daily news and notice state
- duplicate Service Point protection
- preservation of employee number, rank, clearance, and old reports
- save snapshot validation and checksum protection
- Version 1 to Version 2 save migration without progress loss
- pre-restore recovery checkpoint and one-time undo
- local record deletion without touching unrelated browser storage
- account login, per-user cloud save, restore, and local sign-out behavior
- valid install manifest and 192px/512px application icons
- complete offline shell coverage for every portal script and stylesheet
- offline navigation, stale-cache cleanup, and background revalidation behavior
- same-origin GET-only service-worker boundaries that exclude cloud APIs
- skip navigation, live connection status, reduced motion, and mobile touch targets


## Project structure

```text
portal/
├── index.html
├── privacy.html
├── offline.html
├── manifest.webmanifest
├── service-worker.js
├── icons/
│   ├── ministry-seal-192.png
│   └── ministry-seal-512.png
├── css/
│   └── portal.css
└── js/
    ├── app-shell.js
    ├── player-engine.js
    ├── world-engine.js
    ├── storage-engine.js
    ├── cloud-engine.js
    ├── cloud-portal.js
    ├── daily-work.js
    ├── training.js
    ├── career-review.js
    ├── final-review.js
    ├── relationship.js
    ├── dashboard.js
    ├── case-data.js
    ├── case-engine.js
    ├── owl-mail.js
    ├── news-data.js
    ├── notice-data.js
    └── ...

supabase/
├── schema.sql
└── SETUP.md

tests/
├── run-all.js
├── pwa-accessibility.test.js
├── service-worker-runtime.test.js
├── new-employee-journey.test.js
├── storage-engine.test.js
├── cloud-engine.test.js
├── cloud-portal.test.js
├── case006-submission.test.js
├── career-review.test.js
├── case007-submission.test.js
├── relationship-engine.test.js
├── final-arc.test.js
├── training-engine.test.js
└── portal-progression.test.js
```


## Save system

The current static release stores progress in browser localStorage and can export a
validated employee archive for manual backup or transfer.

Existing keys are retained for compatibility, including employee identity, rank, clearance, world day, reports, case status, and communication read state.

The optional Ministry Network client supports Supabase Auth and per-user cloud
saves. It is disabled by default, so the static portal continues to work without
a server. Activation instructions and Row Level Security requirements are in
[supabase/SETUP.md](supabase/SETUP.md).

Before replacing a local record from an archive file or the Ministry Network,
the portal now compares employee number, World Day, rank, clearance, and record
checksum. The current record is saved as one protected recovery checkpoint and
can be restored from the Records Transfer Desk. Recovery metadata is excluded
from exported archives to prevent recursive backups.

Players can remove the employee record and recovery checkpoint from the current
browser after entering the exact employee number. This local action preserves
unrelated browser storage and does not claim to delete a separately configured
cloud account. The public explanation is available at
[portal/privacy.html](portal/privacy.html).


## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- Browser localStorage
- Node.js built-in test utilities


## Author

Created by Ryu TaeO.
