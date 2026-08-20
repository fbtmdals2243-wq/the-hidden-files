# THE HIDDEN FILES

THE HIDDEN FILES is a browser-based British Ministry of Magic employee experience built with static HTML, CSS, and vanilla JavaScript.

The player does not simply open a mystery game. They are recruited, interviewed, assigned an employee identity, and return to Office 3-B for continuing Ministry work.

The target feeling is:

> I logged into work today.


## Current playable alpha

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
- CASE-000 through CASE-005
- First Personnel Continuity story arc
- Day 10 and later recurring Ministry work orders
- Rotating daily news and notices
- Permanent Service Points and duty history
- Downloadable and restorable employee archive files
- Optional Ministry Network account and cloud-save client


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
Day 10+ Continuing daily Ministry service
```

The first arc establishes that the player and MOM-000117 are separate recorded identities connected to one unresolved Ministry appointment. The identity of MOM-000117 and the sealed compatibility condition remain available for future story arcs.


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


## Automated progression test

Node.js is required only for testing.

```bash
node tests/storage-engine.test.js
node tests/cloud-engine.test.js
node tests/cloud-portal.test.js
node tests/portal-progression.test.js
```

The test verifies:

- CASE-000 through CASE-005 registration
- scalable completed-case tracking
- Day 8 and Day 9 story progression
- first-arc career assignment
- recommended versus assigned department separation
- fourteen continuous daily work cycles
- daily news and notice state
- duplicate Service Point protection
- preservation of employee number, rank, clearance, and old reports
- save snapshot validation and checksum protection
- account login, per-user cloud save, restore, and local sign-out behavior


## Project structure

```text
portal/
├── index.html
├── css/
│   └── portal.css
└── js/
    ├── player-engine.js
    ├── world-engine.js
    ├── storage-engine.js
    ├── cloud-engine.js
    ├── cloud-portal.js
    ├── daily-work.js
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
├── storage-engine.test.js
├── cloud-engine.test.js
├── cloud-portal.test.js
└── portal-progression.test.js
```


## Save system

The current alpha stores progress in browser localStorage and can export a
validated employee archive for manual backup or transfer.

Existing keys are retained for compatibility, including employee identity, rank, clearance, world day, reports, case status, and communication read state.

The optional Ministry Network client supports Supabase Auth and per-user cloud
saves. It is disabled by default, so the static portal continues to work without
a server. Activation instructions and Row Level Security requirements are in
[supabase/SETUP.md](supabase/SETUP.md).


## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- Browser localStorage
- Node.js built-in test utilities


## Author

Created by Ryu TaeO.
