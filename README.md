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
- CASE-000 through CASE-007
- First Personnel Continuity story arc
- Second Personnel Continuity arc opening
- Day 10 and later recurring Ministry work orders
- Rotating daily news and notices
- Permanent Service Points and duty history
- Ministry Training Desk and permanent qualification records
- Continuity Records Handling · Grade I course
- Level III Career Readiness Review
- Senior Archive Officer promotion and Level III clearance
- Persistent colleague relationships and daily professional check-ins
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
Day 10  Continuing daily Ministry service begins
Day 13  A routine personnel decision produces a sealed exception
Day 14  CASE-006 · The Decision Before It Was Made
Day 15  Compatibility Condition One review
Day 16  Mandatory Continuity Records Handling qualification
Day 17  Level III Career Readiness Review
Day 18  CASE-007 · The Memory That Recognized You
Day 19  Compatibility Condition Two review
Day 20+ Continuing Ministry service and colleague relationships
```

The first arc establishes that the player and MOM-000117 are separate recorded identities connected to one unresolved Ministry appointment. The identity of MOM-000117 and the sealed compatibility condition remain available for future story arcs.

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

CASE-007 then confirms only the second sealed compatibility component:
MNEMONIC RESPONSE CORRESPONDENCE. A memory prepared by MOM-000117 recognizes
the current appointment, while the official record continues to state that an
identity match is not established. The final component remains sealed.

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


## Automated progression test

Node.js is required only for testing.

```bash
node tests/run-all.js
```

The test verifies:

- recruitment identity through Day 6 preservation
- CASE-000 through CASE-007 registration
- scalable completed-case tracking
- Day 8 and Day 9 story progression
- first-arc career assignment
- Day 13 through Day 15 second-arc progression
- personalized duty recall and first compatibility component
- Day 16 training directive and three-module qualification
- Day 17 Level III career review and permanent career milestone
- Day 18 through Day 19 CASE-007 and compatibility component two
- daily colleague relationships with duplicate interaction protection
- permanent qualification, training-credit, archive, and cloud-save preservation
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
    ├── training.js
    ├── career-review.js
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
├── new-employee-journey.test.js
├── storage-engine.test.js
├── cloud-engine.test.js
├── cloud-portal.test.js
├── case006-submission.test.js
├── career-review.test.js
├── case007-submission.test.js
├── relationship-engine.test.js
├── training-engine.test.js
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
