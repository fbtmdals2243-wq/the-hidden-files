# THE HIDDEN FILES Playtest Guide


## Start the portal

From the repository folder, run:

```bash
python3 -m http.server 8000
```

Then open this address in Chrome:

```text
http://localhost:8000/portal/
```

No installation or build step is required.


## Continue an existing employee

Use the same Chrome profile and the same address. The portal should display
`Welcome Back` with the existing employee number, rank, clearance, and current
World Day.

Before testing with a clean save, open `Ministry Network` and download an
employee archive. A Chrome Incognito window is the safest way to test a new
employee without changing the regular profile's localStorage record.


## Current complete route

```text
Day 1   Recruitment, Identity, Orientation, CASE-000
Day 2   CASE-001
Day 3   CASE-002
Day 4   CASE-003
Day 5   Personnel Continuity Chamber review
Day 6   CASE-004
Day 7   Prior Authorization Claim review
Day 8   CASE-005
Day 9   Continuity Liaison appointment
Day 10  Daily Ministry service begins
Day 13  Routine duty anomaly
Day 14  CASE-006
Day 15  Compatibility Condition One review
Day 16  Continuity Records Handling · Grade I
Day 17  Level III Career Readiness Review
Day 18  CASE-007
Day 19  Compatibility Condition Two review
Day 20+ Daily service continues
```


## Day 17 success check

After reading `MAIL-015`, complete the three Career Review scenarios. The
dashboard and Personnel Record must show:

```text
RANK: Senior Archive Officer
CLEARANCE: Level III
```

Incorrect responses are safe and may be retried.


## Day 18–19 success check

Read `MAIL-016`, investigate CASE-007, and submit both report fields. On the
next work day, read `MAIL-017`.

The Personnel Record must show:

```text
COMPONENT 2 OF 3 SATISFIED
MNEMONIC RESPONSE CORRESPONDENCE
IDENTITY MATCH: NOT ESTABLISHED
```

The third component must remain sealed at Level IV.


## Colleagues success check

Open `Colleagues` in Office 3-B. Available contacts depend on story progress.
Choose one professional check-in. Trust should increase once, and the same
colleague should not allow another check-in until the next World Day.


## Automated verification

Run:

```bash
node tests/run-all.js
```

The final line must be:

```text
ALL THE HIDDEN FILES TESTS PASSED.
```
