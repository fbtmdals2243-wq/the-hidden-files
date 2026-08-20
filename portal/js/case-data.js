const MinistryCases = {

  /* =====================================================
     CASE-000
  ===================================================== */

  "CASE-000": {

    id:
      "CASE-000",

    title:
      "The Missing Owl",

    classification:
      "Level I",

    status:
      "Active",

    department:
      "Archive Division",

    summary:
`A Ministry owl returned to Office 3-B
without its assigned message.

The internal registry indicates
the message has already been delivered.

Initial investigation has been assigned
to a newly appointed officer.`,


    evidence: [

      {
        id:
          "E-001",

        title:
          "Owl Delivery Log",

        type:
          "Registry Record",

        body:
`08:10 - Owl departed from Ministry Mail Room.
08:27 - Owl returned to Office 3-B.
08:28 - Registry marked message as delivered.

No recipient confirmation found.`
      },

      {
        id:
          "E-002",

        title:
          "Empty Message Capsule",

        type:
          "Physical Evidence",

        body:
`A standard Ministry message capsule was recovered from the owl's leg.

The capsule was empty.

No burn marks, tearing, or forced magical opening detected.`
      },

      {
        id:
          "E-003",

        title:
          "Owl Mail Registry",

        type:
          "System Record",

        body:
`Delivery Status: Completed
Recipient: Unknown
Confirmation Signature: Missing
Registry Entry: Automatically generated`
      }

    ],


    witnesses: [

      {
        id:
          "W-001",

        name:
          "Eleanor Whitmore",

        role:
          "Senior Archivist",

        statement:
`The owl returned earlier than expected.

There was no visible injury, no panic response, and no magical disturbance in the room.

What concerns me is not the missing message.

It is the registry marking it delivered before anyone here received it.`
      },

      {
        id:
          "W-002",

        name:
          "Bernard Pike",

        role:
          "Mail Room Clerk",

        statement:
`The owl was cleared for standard internal delivery at 08:10.

I personally sealed the message capsule.

If the capsule returned empty, then either the message was removed in transit...

or it was never inside when the owl left.`
      }

    ],


    timeline: [

      "08:10 Owl departed.",

      "08:27 Owl returned.",

      "08:28 Registry marked message delivered."

    ],


    notes: [

      "No magical residue detected.",

      "Delivery destination remains unknown."

    ]

  },


  /* =====================================================
     CASE-001
     MEMORY FRACTURE
  ===================================================== */

  "CASE-001": {

    id:
      "CASE-001",

    title:
      "Memory Fracture",

    classification:
      "Level II",

    status:
      "Active",

    department:
      "Archive Division",

    summary:
`A sealed Ministry memory vial has developed
multiple internal fractures while remaining
physically intact.

The vial was stored inside Restricted Cabinet 7
and has not officially been accessed in seventeen years.

Archive records show that its security seal
was refreshed at 02:13 this morning.

The employee identification attached to that action
belongs to an officer who does not exist
in the current Ministry personnel registry.`,


    evidence: [

      {
        id:
          "E-101",

        title:
          "Fractured Memory Vial",

        type:
          "Magical Evidence",

        body:
`Object:
Standard Ministry memory vial.

Physical Condition:
Glass exterior intact.

Internal Condition:
Memory substance divided into three independent strands.

No external impact marks detected.

The fracture appears to exist within the memory itself rather than within the container.

Containment charms remain active.`
      },

      {
        id:
          "E-102",

        title:
          "Restricted Cabinet Access Ledger",

        type:
          "Security Record",

        body:
`CABINET:
Restricted Cabinet 7

LAST AUTHORIZED ACCESS:
17 years ago

SECURITY EVENT:
02:13 - Seal Refresh

EMPLOYEE ID:
MOM-000117

PERSONNEL MATCH:
NONE

DOOR STATUS:
Closed

PHYSICAL ENTRY:
Not recorded`
      },

      {
        id:
          "E-103",

        title:
          "Memory Segment Transcript",

        type:
          "Pensieve Transcript",

        body:
`Recovered Fragment A:

A Ministry corridor is visible.

An unidentified employee stands beside a sealed archive door.

The individual repeatedly states:

"I remember this room before it existed."

The memory ends approximately four seconds later.

Identity verification failed.`
      },

      {
        id:
          "E-104",

        title:
          "Spell Residue Analysis",

        type:
          "Forensic Report",

        body:
`External magical interference:
NONE DETECTED

Memory Charm residue:
POSITIVE

Estimated age of residue:
UNKNOWN

Important observation:

The magical residue appears to originate
from inside the stored memory.

This suggests the memory may have been altered
before it entered Ministry storage.`
      }

    ],


    witnesses: [

      {
        id:
          "W-101",

        name:
          "Dr. Miriam Vale",

        role:
          "Memory Archive Specialist",

        statement:
`The container is not broken.

That distinction matters.

If somebody had attacked the vial,
I would expect damage to the containment spell.

Instead, the memory appears to be separating itself.

I have never seen a stored memory behave this way.

And I have worked here for twenty-three years.`
      },

      {
        id:
          "W-102",

        name:
          "Elias Crowe",

        role:
          "Night Security Officer",

        statement:
`Nobody entered Restricted Cabinet 7 during my shift.

I checked the corridor myself.

At 02:13 the security panel registered a seal refresh.

The cabinet never opened.

I assumed it was an automated maintenance event.

Then I saw the employee number.

MOM-000117.

I checked the staff directory.

There is no officer with that number.`
      }

    ],


    timeline: [

      "17 years ago - Memory vial sealed in Restricted Cabinet 7.",

      "02:13 - Security seal refreshed by employee MOM-000117.",

      "02:13 - No physical cabinet entry recorded.",

      "08:40 - Archive staff discovered internal memory fracture.",

      "09:05 - CASE-001 assigned Level II classification."

    ],


    notes: [

      "Memory vial exterior remains undamaged.",

      "MOM-000117 has no match in the active personnel registry.",

      "Security system accepted MOM-000117 as valid credentials.",

      "Origin of the stored memory remains sealed.",

      "Possible connection to historical Archive records requires higher authorization."

    ]

  },


  /* =====================================================
     CASE-002
     THE OFFICER WHO NEVER EXISTED
  ===================================================== */

  "CASE-002": {

    id:
      "CASE-002",

    title:
      "The Officer Who Never Existed",

    classification:
      "Level II",

    status:
      "Active",

    department:
      "Archive Division",

    summary:
`Following the investigation of CASE-001,
the Ministry has authorized a limited inquiry
into employee identification MOM-000117.

The identification does not appear
in the current personnel registry.

However, multiple legacy Ministry systems
continue to recognize the credential as valid.

The Office of the Undersecretary has ordered
an immediate investigation into the identity,
history, and continued authorization
of the unknown officer.`,


    evidence: [

      {
        id:
          "E-201",

        title:
          "Legacy Credential Authentication Log",

        type:
          "Security Record",

        body:
`EMPLOYEE IDENTIFICATION:
MOM-000117

CURRENT PERSONNEL MATCH:
NONE

LEGACY AUTHENTICATION:
VALID

SECURITY CLASS:
ACTIVE

LAST VERIFIED SYSTEM ACCESS:
02:13

ARCHIVE CABINET:
7

IMPORTANT:

Credential MOM-000117 is recognized by
three Ministry security systems despite
having no corresponding personnel file.`
      },

      {
        id:
          "E-202",

        title:
          "Damaged Personnel Card",

        type:
          "Recovered Document",

        body:
`A damaged Ministry employee card was recovered
from Historical Personnel Storage.

EMPLOYEE ID:
MOM-000117

NAME:
ILLEGIBLE

DEPARTMENT:
ARCHIVE DIVISION

RANK:
UNKNOWN

ISSUE DATE:
31 YEARS AGO

STATUS:
ACTIVE

The employee portrait has been removed.

Magical examination indicates that
the image was not physically damaged.

The portrait appears to have been
removed from the document's memory.`
      },

      {
        id:
          "E-203",

        title:
          "Historical Corridor Access Record",

        type:
          "Archive Record",

        body:
`Recovered access records contain
multiple entries linked to MOM-000117.

LOCATIONS:

Restricted Archive Corridor
Personnel Records Office
Sub-Level 4
Cabinet 7
Sealed Records Chamber

Final historical entry:

TIME: 23:48
LOCATION: SUB-LEVEL 4

STATUS:
AUTHORIZED

No exit record exists.`
      },

      {
        id:
          "E-204",

        title:
          "Personnel Deletion Order",

        type:
          "Restricted Document",

        body:
`MINISTRY PERSONNEL ADMINISTRATION

SUBJECT:
MOM-000117

ACTION:
REMOVE FROM ACTIVE PERSONNEL INDEX

REASON:
CLASSIFIED

AUTHORIZATION:
OFFICE OF THE UNDERSECRETARY

NOTICE:

Credential must remain active
within legacy security infrastructure.

Personnel identity must not appear
in standard employee searches.

DATE:
30 YEARS AGO`
      }

    ],


    witnesses: [

      {
        id:
          "W-201",

        name:
          "Judith Mercer",

        role:
          "Personnel Registry Supervisor",

        statement:
`There should not be an active employee number
without a personnel record.

The systems are designed specifically
to prevent that.

But MOM-000117 is different.

I searched the current registry.
Nothing.

I searched the historical registry.
Almost nothing.

Then I found a deletion instruction.

Someone did not simply remove this officer.

Someone ordered the Ministry
to remember the number
and forget the person.`
      },

      {
        id:
          "W-202",

        name:
          "Tobias Reed",

        role:
          "Legacy Security Technician",

        statement:
`Old Ministry systems are stubborn.

They keep records modern systems no longer understand.

MOM-000117 still authenticates because
somebody deliberately prevented the credential
from being revoked.

That is not an accident.

If the number can still open restricted systems,
then somewhere inside the Ministry...

that officer is technically still employed.`
      }

    ],


    timeline: [

      "31 years ago - MOM-000117 employee credential issued.",

      "30 years ago - Personnel identity removed from active registry.",

      "30 years ago - Credential ordered to remain active.",

      "17 years ago - CASE-001 memory stored in Restricted Cabinet 7.",

      "Day 2 · 02:13 - MOM-000117 authenticated against Cabinet 7.",

      "Day 3 - Office of the Undersecretary authorizes investigation."

    ],


    notes: [

      "MOM-000117 was once a legitimate Ministry employee number.",

      "The employee identity was intentionally deleted.",

      "The credential was intentionally preserved.",

      "Historical access includes Sub-Level 4.",

      "No exit record exists for the officer's final recorded access.",

      "Deletion order originated from the Office of the Undersecretary."

    ]

  },


  /* =====================================================
     CASE-003
     SUB-LEVEL 4
  ===================================================== */

  "CASE-003": {

    id:
      "CASE-003",

    title:
      "Sub-Level 4",

    classification:
      "Level II · Temporary Authorization",

    status:
      "Active",

    department:
      "Archive Division",

    summary:
`Following the discovery of historical access records
connected to MOM-000117, the Office of the Undersecretary
has authorized a restricted inspection of Sub-Level 4.

Official Ministry floor plans describe Sub-Level 4
as a storage corridor containing six sealed archive rooms.

Historical records, however, reference a seventh room.

No Room 4-7 appears on current architectural plans.

MOM-000117's final recorded Ministry access occurred
inside Sub-Level 4 thirty years ago.

No exit was ever recorded.`,


    evidence: [

      {
        id:
          "E-301",

        title:
          "Current Sub-Level 4 Floor Plan",

        type:
          "Architectural Record",

        body:
`BRITISH MINISTRY OF MAGIC
FACILITIES DIVISION

SUB-LEVEL 4

AUTHORIZED ROOMS:

4-1  Historical Storage
4-2  Sealed Correspondence
4-3  Personnel Overflow
4-4  Artifact Records
4-5  Restricted Documents
4-6  Maintenance Archive

END OF CORRIDOR

TOTAL REGISTERED ROOMS:
6

No Room 4-7 exists in the current architectural registry.`
      },


      {
        id:
          "E-302",

        title:
          "Original Construction Diagram",

        type:
          "Historical Blueprint",

        body:
`Recovered Ministry construction diagram.

DATE:
47 years ago

SUB-LEVEL 4

ROOMS SHOWN:

4-1
4-2
4-3
4-4
4-5
4-6
4-7

ROOM 4-7:

Designation:
SPECIAL RECORDS CHAMBER

ACCESS:
DIRECTOR AUTHORIZATION REQUIRED

A later Ministry revision stamp covers
the eastern end of the corridor.

Revision date:

30 years ago.`
      },


      {
        id:
          "E-303",

        title:
          "Corridor Security Scan",

        type:
          "Magical Survey",

        body:
`SUB-LEVEL 4 MAGICAL SURVEY

Physical corridor length:
41.2 metres

Registered architectural length:
34.8 metres

UNACCOUNTED SPACE:
6.4 metres

Location:
Beyond Room 4-6

Visible doorway:
NONE

Magical obstruction:
PRESENT

Ward signature:
LEGACY MINISTRY SECURITY

Credential association detected:

MOM-000117`
      },


      {
        id:
          "E-304",

        title:
          "Emergency Closure Record",

        type:
          "Restricted Ministry Record",

        body:
`MINISTRY SECURITY EVENT

DATE:
30 YEARS AGO

TIME:
23:51

LOCATION:
SUB-LEVEL 4

EVENT:
EMERGENCY CORRIDOR SEAL

AUTHORIZED BY:
UNDERSECRETARY OFFICE

PERSONNEL PRESENT:

1 EMPLOYEE

EMPLOYEE IDENTIFICATION:

MOM-000117

EVACUATION STATUS:

NOT CONFIRMED

FOLLOW-UP ORDER:

REMOVE CHAMBER FROM STANDARD FLOOR PLANS.

DO NOT REVOKE CREDENTIAL.

DO NOT ATTEMPT RECOVERY WITHOUT DIRECT AUTHORIZATION.`
      },


      {
        id:
          "E-305",

        title:
          "Wall Resonance Recording",

        type:
          "Magical Audio Record",

        body:
`A Resonance Charm was cast against
the eastern wall beyond Room 4-6.

Initial result:
Solid structural barrier.

Second reading:
Hollow space detected.

Third reading:
Human vocal pattern detected.

Recovered phrase:

"...still employed..."

Signal duration:
1.8 seconds

Source:
Unknown.

No living person was detected
by standard Ministry presence charms.`
      }

    ],


    witnesses: [

      {
        id:
          "W-301",

        name:
          "Arthur Bell",

        role:
          "Ministry Facilities Officer",

        statement:
`I've worked maintenance routes
through Sub-Level 4 for sixteen years.

There are six rooms.

At least, that's what the plans say.

But the corridor has always bothered me.

Walk from the lift to Room 4-6
and count the distance.

Then look at the plans.

Something is missing.

We were told never to question it.`
      },


      {
        id:
          "W-302",

        name:
          "Helena March",

        role:
          "Former Archive Security Clerk",

        statement:
`I was a junior clerk when they sealed that floor.

I remember the alarms.

I remember senior officials arriving after midnight.

The next morning we received new floor plans.

Room 4-7 was gone.

Not locked.

Gone.

When I asked what happened,
my supervisor told me there had never been a Room 4-7.

But I had delivered documents there myself.`
      },


      {
        id:
          "W-303",

        name:
          "Tobias Reed",

        role:
          "Legacy Security Technician",

        statement:
`The wall is not the real security mechanism.

The Ministry system still believes
a room exists behind it.

And according to that system,
the room is occupied.

The registered occupant is MOM-000117.

Technically...

the system has been waiting thirty years
for that officer to leave.`
      }

    ],


    timeline: [

      "47 years ago - Room 4-7 appears on original Sub-Level 4 plans.",

      "31 years ago - MOM-000117 receives Ministry credentials.",

      "30 years ago · 23:48 - MOM-000117 enters Sub-Level 4.",

      "30 years ago · 23:51 - Emergency corridor seal activated.",

      "30 years ago - Room 4-7 removed from official floor plans.",

      "30 years ago - Recovery attempts prohibited.",

      "Day 4 - Temporary investigation authorization issued.",

      "Day 4 - Magical scan detects 6.4 metres of unregistered space."

    ],


    notes: [

      "Current plans show six rooms; original plans show seven.",

      "Room 4-7 was deliberately removed from Ministry architectural records.",

      "Legacy security still recognizes Room 4-7.",

      "MOM-000117 is registered as the room's occupant.",

      "No confirmed evacuation record exists.",

      "A human vocal pattern was detected beyond the sealed wall.",

      "Standard presence charms detected no living person.",

      "The phrase 'still employed' was recovered from behind the barrier."

    ]

  },


  /* =====================================================
     CASE-004
     THE SECOND SIGNATURE
  ===================================================== */

  "CASE-004": {

    id:
      "CASE-004",

    title:
      "The Second Signature",

    classification:
      "Level II · Personnel Integrity Review",

    status:
      "Active",

    department:
      "Personnel Registry · Archive Division",

    summary:
`A Day 6 personnel integrity audit has detected
a restricted continuity authorization signature
inside the investigating officer's active employee record.

The signature is an exact match for the authorization
record preserved under MOM-000117.

Standard identity fields do not match.

The current employee number is active, recently issued,
and remains attached to the officer's own verified identity.

The Ministry must determine when the second signature
entered the record, why it remained dormant, and whether
Room 4-7 is actively authorizing a current employee.`,


    evidence: [

      {
        id:
          "E-401",

        title:
          "Active Personnel Integrity Extract",

        type:
          "Restricted Personnel Record",

        body:
`MINISTRY PERSONNEL REGISTRY
INTEGRITY REVIEW DESK

RECORD TYPE:
ACTIVE EMPLOYEE

EMPLOYEE STATUS:
ACTIVE

IDENTITY VERIFICATION:
PASSED

STANDARD RECORD OWNER:
CURRENT INVESTIGATING OFFICER

UNEXPECTED FIELD DETECTED:
LEGACY CONTINUITY AUTHORIZATION

AUTHORIZATION SIGNATURE:
PC-117-CONTINUITY

HISTORICAL MATCH:
MOM-000117

IDENTITY MATCH:
NOT ESTABLISHED

The active record and the historical record
share no visible name, wand, department,
education, address, or biometric identity fields.

Only the authorization signature is identical.`
      },


      {
        id:
          "E-402",

        title:
          "Credential Issuance Audit",

        type:
          "Recruitment System Log",

        body:
`BRITISH MINISTRY OF MAGIC
RECRUITMENT CREDENTIAL LOG

DAY 1 · 09:12:04

New employee identifier generated.

DAY 1 · 09:12:09

Applicant identity attached.

DAY 1 · 09:12:13

Department recommendation attached.

DAY 1 · 09:12:17

Credential finalized.

DAY 1 · 09:12:17

UNREQUESTED LEGACY RESPONSE RECEIVED.

SOURCE:
PERSONNEL CONTINUITY ROUTING

ACTION:
AUTHORIZATION SIGNATURE APPENDED

The Recruitment Office did not request
a continuity verification.

No Ministry employee is recorded as
having added the signature.`
      },


      {
        id:
          "E-403",

        title:
          "Day 6 Authentication Route",

        type:
          "Live Security Trace",

        body:
`MINISTRY SECURITY TRACE

DAY 6 · 08:41:00

LOCATION:
OFFICE 3-B

EVENT:
MORNING EMPLOYEE AUTHENTICATION

ACTIVE CLEARANCE:
LEVEL II

08:41:01
Standard identity verification passed.

08:41:02
Level II authorization verification requested.

08:41:02
Request redirected without instruction.

DESTINATION:
SUB-LEVEL 4 / ROOM 4-7

08:41:03
Legacy security response received.

RESPONSE:
AUTHORIZED

CONTINUITY STATUS:
OCCUPANT AUTHORIZATION CONFIRMED

The response arrived from a chamber
that is not connected to the active
Ministry personnel network.`
      },


      {
        id:
          "E-404",

        title:
          "Continuity Signature Comparison",

        type:
          "Magical Seal Analysis",

        body:
`PERSONNEL CONTINUITY SYSTEM
SIGNATURE COMPARISON

HISTORICAL RECORD:
MOM-000117

ACTIVE RECORD:
CURRENT INVESTIGATING OFFICER

SIGNATURE SIMILARITY:
100.000%

RESULT:
EXACT AUTHORIZATION MATCH

Continuity signatures are designed
to remain unique to one authorization record.

They cannot be inherited.

They cannot be copied through standard magic.

They cannot be reassigned by the Personnel Registry.

Both signatures carry the same original
Undersecretary master seal from thirty years ago.

The active signature also carries
a current Day 6 verification timestamp.`
      },


      {
        id:
          "E-405",

        title:
          "Personnel Record Difference Report",

        type:
          "Identity Comparison",

        body:
`MINISTRY PERSONNEL REGISTRY
IDENTITY DIFFERENCE REPORT

COMPARISON:
CURRENT OFFICER / MOM-000117

EMPLOYEE NUMBER:
DIFFERENT

NAME:
NO MATCH

DEPARTMENT:
NO MATCH

WAND REGISTRATION:
NO MATCH

EDUCATION RECORD:
NO MATCH

MAGICAL IDENTITY MARKERS:
NO MATCH

AUTHORIZATION SIGNATURE:
EXACT MATCH

CONCLUSION:

The available evidence does not support
a standard duplicate identity.

The current officer's identity remains intact.

The unexplained connection exists beneath
the identity layer, inside Ministry authorization.`
      }

    ],


    witnesses: [

      {
        id:
          "W-401",

        name:
          "Amara Finch",

        role:
          "Personnel Integrity Auditor",

        statement:
`I checked the record three times.

The officer's identity is not a copy.

The name, wand registration, magical markers,
and recruitment history all belong to the
current employee.

But authorization sits underneath identity.

That lower layer answered as MOM-000117.

I have never seen an active record
carry a continuity signature.

The Registry locked the file automatically
because it did not know which record
was authorizing which.`
      },


      {
        id:
          "W-402",

        name:
          "Tobias Reed",

        role:
          "Legacy Security Technician",

        statement:
`The signature was not copied into the record.

That would leave a transfer trace.

There is no transfer trace.

The active credential asked whether it
was authorized, and Room 4-7 answered yes.

That is worse.

It means the chamber is not merely storing
MOM-000117's old permission.

It is making a current decision.

What I cannot tell you is why it recognizes
this officer's credential as something
it is permitted to answer for.`
      },


      {
        id:
          "W-403",

        name:
          "Eleanor Whitmore",

        role:
          "Senior Archivist",

        statement:
`Your employee record looked normal
when you arrived in Office 3-B.

I saw the number, the rank,
and your Level I clearance.

Nothing mentioned continuity.

After your promotion, the authorization layer
became visible to deeper Ministry checks.

This morning the system told me
not to confiscate your credentials.

That instruction arrived before the Registry
sent its alert.

The sender field was blank.

The authorization mark on the instruction
was thirty years old.`
      }

    ],


    timeline: [

      "30 years ago - MOM-000117 is registered as a Continuity Subject.",

      "30 years ago - PC-117-CONTINUITY signature is sealed inside Room 4-7.",

      "Day 1 · 09:12:04 - Current employee identifier is generated.",

      "Day 1 · 09:12:17 - Unrequested continuity response reaches Recruitment.",

      "Day 1 · 09:12:17 - PC-117-CONTINUITY is appended beneath the active identity layer.",

      "Day 2 - Level II clearance is granted to the current officer.",

      "Day 6 · 08:41:02 - Level II morning verification reaches Room 4-7.",

      "Day 6 · 08:41:03 - Room 4-7 returns active authorization.",

      "Day 6 · 08:42 - Personnel Registry locks the integrity layer for review."

    ],


    notes: [

      "The current officer's standard identity fields remain intact and distinct from MOM-000117.",

      "The active record contains the exact PC-117-CONTINUITY authorization signature.",

      "No transfer, inheritance, or manual copy event exists.",

      "The signature entered the record during Day 1 credential finalization.",

      "The signature remained dormant until a Level II verification was requested.",

      "Room 4-7 responded to the current credential in real time on Day 6.",

      "The evidence does not establish that the current officer and MOM-000117 are the same identity.",

      "The reason Room 4-7 recognizes the current credential remains unknown."

    ]

  },


  /* =====================================================
     CASE-005
     THE POSITION THAT NEVER CLOSED
  ===================================================== */

  "CASE-005": {

    id:
      "CASE-005",

    title:
      "The Position That Never Closed",

    classification:
      "Level II · Recruitment Systems Audit",

    status:
      "Active",

    department:
      "Personnel Registry · Recruitment Oversight",

    summary:
`The prior authorization claim discovered in CASE-004
did not target a named applicant or an existing employee number.

It targeted an unresolved Ministry position:

VACANCY-AR-117

The position was created thirty-one years ago,
assigned to MOM-000117, and never formally closed.

On Day 1, the Recruitment system routed the current officer's
application into that position before generating a new credential.

The Ministry must determine why the vacancy remained eligible
for recruitment while its historical occupant was still recorded
as employed inside the Personnel Continuity System.`,


    evidence: [

      {
        id:
          "E-501",

        title:
          "Recruitment Queue Allocation",

        type:
          "Active Recruitment Log",

        body:
`BRITISH MINISTRY OF MAGIC
RECRUITMENT ALLOCATION SYSTEM

DAY 1 · 09:11:57

APPLICATION SESSION:
ACTIVE

APPLICANT IDENTITY:
NOT YET ATTACHED

DAY 1 · 09:11:58

VACANCY ROUTE REQUESTED:
VACANCY-AR-117

ROUTE SOURCE:
LEGACY PERSONNEL AUTHORIZATION

DAY 1 · 09:12:04

NEW EMPLOYEE NUMBER GENERATED

DAY 1 · 09:12:09

VERIFIED APPLICANT IDENTITY ATTACHED

The vacancy route was selected before
the active system knew the applicant's name,
employee number, wand, or department result.`
      },


      {
        id:
          "E-502",

        title:
          "Historical Vacancy Ledger",

        type:
          "Personnel Administration Record",

        body:
`VACANCY CODE:
VACANCY-AR-117

DEPARTMENT:
ARCHIVE DIVISION

POSITION:
CONTINUITY RECORDS LIAISON

CREATED:
31 YEARS AGO

ORIGINAL APPOINTEE:
MOM-000117

CURRENT OCCUPANCY:
OCCUPIED

RECRUITMENT STATUS:
ELIGIBLE

CLOSURE STATUS:
WITHHELD BY UNDERSECRETARY ORDER

The ledger records the position as both occupied
and available for recruitment.

Standard Personnel rules do not permit
both states to exist at the same time.`
      },


      {
        id:
          "E-503",

        title:
          "Identity Engine Route Trace",

        type:
          "Recruitment Systems Analysis",

        body:
`IDENTITY ENGINE SESSION:
CURRENT OFFICER

STANDARD ASSESSMENT:
COMPLETED

VISIBLE RESULTS:
VALID

UNDECLARED ROUTE CHECK:
CONTINUITY COMPATIBILITY

RESULT:
SATISFIED

CHECK REQUESTED BY:
VACANCY-AR-117

COMPATIBILITY RULE:
SEALED

The Identity Engine did not assign
the historical employee's identity.

It confirmed only that the applicant met
an unknown condition attached to the vacancy.

The condition itself is absent from
the current Recruitment system.`
      },


      {
        id:
          "E-504",

        title:
          "Room 4-7 Authorization Exchange",

        type:
          "Recovered Legacy Transmission",

        body:
`SOURCE:
RECRUITMENT ALLOCATION SYSTEM

DESTINATION:
PERSONNEL CONTINUITY CHAMBER / ROOM 4-7

REQUEST:
VACANCY-AR-117 CANDIDATE DETECTED

ROOM 4-7 RESPONSE:
RETAIN AUTHORIZATION

REQUEST:
CURRENT OCCUPANT STATUS

ROOM 4-7 RESPONSE:
STILL EMPLOYED

REQUEST:
PERMIT NEW APPOINTMENT

ROOM 4-7 RESPONSE:
AUTHORIZED

The chamber simultaneously confirmed
the historical occupant and authorized
a new employee for the same position.`
      },


      {
        id:
          "E-505",

        title:
          "Appointment Conflict Report",

        type:
          "Personnel Integrity Finding",

        body:
`POSITION:
VACANCY-AR-117

HISTORICAL EMPLOYEE:
MOM-000117

CURRENT EMPLOYEE:
CURRENT INVESTIGATING OFFICER

EMPLOYEE NUMBER MATCH:
NO

IDENTITY MATCH:
NOT ESTABLISHED

POSITION AUTHORIZATION MATCH:
EXACT

ACTIVE RECORDS:
2

AUTHORIZED POSITIONS:
1

PRELIMINARY FINDING:

The continuity signature is attached
to the appointment layer rather than
to the current officer's identity layer.

Why the vacancy selected this applicant
remains classified and unresolved.`
      }

    ],


    witnesses: [

      {
        id:
          "W-501",

        name:
          "Beatrice Rowle",

        role:
          "Senior Recruitment Registrar",

        statement:
`Vacancies are supposed to be empty.

That sounds obvious, but the distinction
is enforced by every hiring charm we use.

AR-117 was not empty.

The old system said somebody still held it.

Then the same system placed a new applicant
into it and approved the appointment.

No registrar selected that route.

By the time your name appeared on screen,
the position had already accepted you.`
      },


      {
        id:
          "W-502",

        name:
          "Noah Selwyn",

        role:
          "Identity Engine Auditor",

        statement:
`The Identity Engine did not confuse you
with MOM-000117.

I want that stated clearly.

Your results belong to you.

But a sealed compatibility check ran
underneath the visible assessment.

The question came from a vacancy
that should not have existed.

We can prove the answer was yes.

We cannot recover the question.`
      },


      {
        id:
          "W-503",

        name:
          "Eleanor Whitmore",

        role:
          "Senior Archivist",

        statement:
`Office 3-B has carried an unused personnel slot
for longer than I have worked here.

It never appeared on our staffing requests.

The desk was simply listed as unavailable.

On your first morning, that restriction vanished.

I assumed Recruitment had finally corrected
an old administrative error.

Now I understand that the desk was not released.

It recognized an appointment.`
      }

    ],


    timeline: [

      "31 years ago - VACANCY-AR-117 is created for Continuity Records Liaison.",

      "31 years ago - MOM-000117 is appointed to the position.",

      "30 years ago - The employee identity is removed, but the position is not closed.",

      "30 years ago - Undersecretary order leaves the vacancy eligible for recruitment.",

      "Day 1 · 09:11:58 - The current application is routed to VACANCY-AR-117.",

      "Day 1 · 09:12:04 - The current employee number is generated.",

      "Day 1 · 09:12:09 - The current identity is attached to the appointment.",

      "Day 6 · 08:41 - Room 4-7 actively confirms the shared authorization.",

      "Day 8 - Recruitment Oversight opens CASE-005."

    ],


    notes: [

      "VACANCY-AR-117 is recorded as occupied and recruitment-eligible.",

      "The vacancy belonged to MOM-000117's historical appointment.",

      "The current officer was routed into the vacancy before identity attachment.",

      "The Identity Engine ran a sealed compatibility check.",

      "The compatibility condition cannot be recovered from active systems.",

      "Room 4-7 authorized a new appointment while retaining the historical occupant.",

      "The shared signature appears to bind the position, not the two identities.",

      "The reason this applicant satisfied the sealed condition remains unknown."

    ]

  },


  /* =====================================================
     CASE-006
     THE DECISION BEFORE IT WAS MADE
  ===================================================== */

  "CASE-006": {

    id:
      "CASE-006",

    title:
      "The Decision Before It Was Made",

    classification:
      "Level II · Personnel Continuity",

    status:
      "Active",

    department:
      "Personnel Continuity Oversight",

    summary:
`A sealed copy of the officer's Day 13
Personnel Cross-Reference decision was discovered
inside a legacy continuity record.

The copy was authenticated at 02:13,
before the current decision was filed.

Its historical author is listed as MOM-000117.

The Personnel Continuity System classifies the match
as the first satisfied component of an undisclosed
three-part compatibility condition.`,


    evidence: [

      {
        id:
          "E-601",

        title:
          "Duplicate Duty Receipt",

        type:
          "Personnel Service Record",

        body:
`CURRENT RECORD:
Day 13 Personnel Cross-Reference Review

CURRENT AUTHOR:
Continuity Liaison · Office 3-B

SEALED RECORD:
Legacy Continuity Receipt 117-C

HISTORICAL AUTHOR:
MOM-000117

AUTHENTICATION TIME:
02:13 · Before current action

COMPARISON RESULT:
Selected action, procedural evaluation,
and final disposition are identical.

The sealed record contains the current decision
despite being authenticated before that decision
was entered into the Ministry service ledger.`
      },

      {
        id:
          "E-602",

        title:
          "Compatibility Condition Extract",

        type:
          "Restricted System Output",

        body:
`APPOINTMENT:
VACANCY-AR-117

HISTORICAL SUBJECT:
MOM-000117

CURRENT SUBJECT:
CURRENT CONTINUITY LIAISON

IDENTITY MATCH:
NOT REQUIRED

CONDITION SET:
THREE SEALED COMPONENTS

COMPONENT 1:
PROCEDURAL RESPONSE CORRESPONDENCE

STATUS:
SATISFIED

COMPONENTS 2-3:
SEALED · LEVEL IV AUTHORIZATION REQUIRED

The system does not explain whether the historical
record predicted the decision or was rewritten
after the decision occurred.`
      },

      {
        id:
          "E-603",

        title:
          "Form Revision History",

        type:
          "Administrative Audit",

        body:
`FORM:
Personnel Cross-Reference Review PR-22

CURRENT VERSION CREATED:
6 years ago

LEGACY RECEIPT DATE:
31 years ago

TEXTUAL MATCH:
100 percent

SERIAL MATCH:
Current Day 13 transaction

AUDIT FINDING:
The historical receipt cannot have been produced
using the current form version.

No revision event, copying charm,
or manual insertion appears in the audit trail.`
      },

      {
        id:
          "E-604",

        title:
          "Room 4-7 Security Echo",

        type:
          "Legacy Security Event",

        body:
`LOCATION:
Personnel Continuity Chamber · Room 4-7

TIME:
02:13

EVENT:
Compatibility Verification

AUTHORIZATION:
MOM-000117

CURRENT CREDENTIAL RESPONSE:
ACCEPTED

SYSTEM MESSAGE:
"ONE CONDITION REMAINS TRUE."

PHYSICAL ENTRY:
NONE

EXIT RECORD:
NONE`
      }

    ],


    witnesses: [

      {
        id:
          "W-601",

        name:
          "Eleanor Whitmore",

        role:
          "Senior Archivist",

        statement:
`I reviewed your Day 13 decision after it was filed.

The archived copy was already waiting for us.

It did not merely recommend the same action.
It carried the same disposition code and the same
service evaluation that the Ministry assigned to you.

You are not being accused of copying MOM-000117.

The question is how a sealed record copied you
before you made the decision.`
      },

      {
        id:
          "W-602",

        name:
          "Dr. Miriam Vale",

        role:
          "Memory Archive Specialist",

        statement:
`A memory can be altered after an event.
A ledger can be forged before one.

This record behaves like neither.

Its seal proves the contents existed at 02:13,
but the contents describe a later decision exactly.

Do not call it prophecy yet.

Personnel Continuity records were built to preserve
authorization, not to predict human behavior.`
      },

      {
        id:
          "W-603",

        name:
          "Gideon March",

        role:
          "Continuity Systems Examiner",

        statement:
`The phrase compatibility condition appears only once
in the surviving technical index.

It refers to three tests attached to VACANCY-AR-117.

The first does not compare identity.
It compares procedural response under Ministry duty.

I cannot access the other two conditions.

But I can confirm this:
the system was waiting for your answer.`
      }

    ],


    timeline: [

      "31 years ago - Legacy Continuity Receipt 117-C is sealed under MOM-000117.",

      "6 years ago - The current Personnel Cross-Reference form is created.",

      "Day 13 · 02:13 - Room 4-7 authenticates Receipt 117-C.",

      "Day 13 - The current officer receives a routine Personnel Cross-Reference duty.",

      "Day 13 - The current officer files an official action.",

      "Day 13 - The sealed receipt is found to contain the same action and evaluation.",

      "Day 14 - Personnel Continuity Oversight opens CASE-006."

    ],


    notes: [

      "The sealed receipt was authenticated before the current decision.",

      "The historical and current records match beyond ordinary form language.",

      "Identity equality is explicitly excluded from the first compatibility component.",

      "The first of three compatibility components is now marked satisfied.",

      "Two compatibility components remain sealed at Level IV.",

      "No evidence yet proves prediction, time alteration, or record rewriting.",

      "MOM-000117 remains the historical authorization attached to the receipt."

    ]

  },


  /* =====================================================
     CASE-007
     THE MEMORY THAT RECOGNIZED YOU
  ===================================================== */

  "CASE-007": {

    id:
      "CASE-007",

    title:
      "The Memory That Recognized You",

    classification:
      "Level III · Mnemonic Continuity",

    status:
      "Active",

    department:
      "Memory Archive · Personnel Continuity",

    summary:
`A memory vial sealed under MOM-000117
has remained silent for thirty-one years.

Seconds after the current Continuity Liaison received
Level III clearance, the vial produced a new response.

It did not identify the current officer as MOM-000117.

It recognized the officer as the authorized successor
to VACANCY-AR-117 and issued an instruction that appears
to have been prepared before the current employee existed.`,


    evidence: [

      {
        id:
          "E-701",

        title:
          "Dormant Memory Vial 117-M",

        type:
          "Sealed Mnemonic Record",

        body:
`ARCHIVE ITEM:
117-M

SEALED AUTHOR:
MOM-000117

DATE SEALED:
31 YEARS AGO

PRIOR PLAYBACKS:
NO AUDIBLE CONTENT

DAY 18 PLAYBACK:
ACTIVATED WITHOUT PHYSICAL CONTACT

RECORDED MESSAGE:
"Record the officer as recognized.
Do not record the officer as returned."

The phrase distinguishes recognition of the current officer
from the return of the historical employee.`
      },

      {
        id:
          "E-702",

        title:
          "Level III Issuance Trace",

        type:
          "Credential Security Log",

        body:
`PERSONNEL ADVANCEMENT BOARD
LEVEL III ISSUANCE TRACE

09:00:00
Career review approved.

09:00:01
Level III credential written to active employee record.

09:00:02
Legacy mnemonic channel requested authentication.

SOURCE:
MEMORY VIAL 117-M

09:00:03
Current credential accepted.

09:00:03
Vial playback begins.

No employee, spell, or archive reader opened the vial.`
      },

      {
        id:
          "E-703",

        title:
          "Mnemonic Layer Examination",

        type:
          "Memory Archive Analysis",

        body:
`VISIBLE MEMORY LAYER:
EMPTY

SEALED INSTRUCTION LAYER:
AUTHENTIC · 31 YEARS OLD

TRIGGER CONDITION:
LEVEL III APPOINTMENT AUTHORIZATION

IDENTITY DATA REQUIRED:
NONE

APPOINTMENT DATA REQUIRED:
VACANCY-AR-117

The spoken words were not added on Day 18.

The instruction was sealed with the original memory,
but remained inaudible until an eligible appointment holder
presented a Level III authorization response.`
      },

      {
        id:
          "E-704",

        title:
          "Compatibility Register Update",

        type:
          "Personnel Continuity Output",

        body:
`APPOINTMENT:
VACANCY-AR-117

HISTORICAL SUBJECT:
MOM-000117

CURRENT SUBJECT:
CURRENT CONTINUITY LIAISON

COMPONENT 1:
PROCEDURAL RESPONSE CORRESPONDENCE · SATISFIED

COMPONENT 2:
MNEMONIC RESPONSE CORRESPONDENCE · PENDING REVIEW

COMPONENT 3:
SEALED · LEVEL IV

IDENTITY MATCH:
NOT ESTABLISHED

SYSTEM NOTE:
Recognition of an appointment holder does not establish
the return or continuation of a historical identity.`
      }

    ],


    witnesses: [

      {
        id:
          "W-701",

        name:
          "Dr. Miriam Vale",

        role:
          "Memory Archive Specialist",

        statement:
`The vial did not learn those words today.

They were placed beneath the visible memory
when MOM-000117 sealed it.

What changed was not the memory.
What changed was your clearance.

It recognized an authorization condition,
not your face, name, wand, or employee number.

The distinction in its own message matters:
recognized, but not returned.`
      },

      {
        id:
          "W-702",

        name:
          "Gideon March",

        role:
          "Continuity Systems Examiner",

        statement:
`The second component compares how a sealed memory
responds to successive appointment holders.

MOM-000117 prepared the response.
Your authorization made it audible.

That creates a deliberate connection across thirty-one years,
but it does not make the two holders one person.

Someone expected the position to be filled again.`
      },

      {
        id:
          "W-703",

        name:
          "Eleanor Whitmore",

        role:
          "Senior Archivist",

        statement:
`The Memory Archive asked me whether you had returned.

I told them the personnel record says you arrived on Day 1.

That answer remains correct.

But MOM-000117 left an instruction for the officer
who would someday hold your appointment and clearance.

For the first time, we know the connection was anticipated.`
      }

    ],


    timeline: [

      "31 years ago - MOM-000117 seals Memory Vial 117-M.",

      "31 years ago - A hidden Level III appointment trigger is embedded beneath the visible memory layer.",

      "Day 1 - The current officer is appointed to VACANCY-AR-117.",

      "Day 15 - Compatibility Component 1 is confirmed.",

      "Day 17 - The current officer passes the Level III Career Readiness Review.",

      "Day 18 · 09:00:03 - Memory Vial 117-M authenticates the current appointment and speaks.",

      "Day 18 - CASE-007 is opened for Level III investigation."

    ],


    notes: [

      "The memory instruction is thirty-one years old and was not written on Day 18.",

      "The current Level III appointment authorization triggered playback.",

      "No current identity field was required by the vial.",

      "The message distinguishes recognized from returned.",

      "MOM-000117 anticipated a future holder of VACANCY-AR-117.",

      "The evidence does not establish a shared identity.",

      "Compatibility Component 3 remains sealed at Level IV."

    ]

  },


  /* =====================================================
     CASE-008
     THE NAME BENEATH THE NUMBER
  ===================================================== */

  "CASE-008": {

    id:
      "CASE-008",

    title:
      "The Name Beneath the Number",

    classification:
      "Level III · Final Compatibility Review",

    status:
      "Active",

    department:
      "Archive Division · Personnel Continuity",

    summary:
`The third compatibility component has reacted to the
current officer's accumulated Ministry service record.

Room 4-7 has produced a sealed deletion order bearing
MOM-000117's authorization and a current audit comparison.

The historical and current officers are still recorded as
two separate people. The inquiry must determine what choice,
rather than what identity, links the two appointment holders.`,

    evidence: [

      {
        id: "E-801",
        title: "Personnel Deletion Order PC-0",
        type: "Historical Executive Order",
        body:
`SUBJECT:
MOM-000117

ACTION:
DELETE NAME, PORTRAIT, AND PERSONNEL AUDIT TRAIL

EXCEPTION:
RETAIN APPOINTMENT AUTHORIZATION INSIDE ROOM 4-7

RESPONSE RECORDED BY SUBJECT:
ORDER SUSPENDED · EVIDENCE PRESERVED · REVIEW REQUESTED

The signature belongs to MOM-000117.
The name field beneath the number remains sealed.`
      },

      {
        id: "E-802",
        title: "Current Officer Protection Ledger",
        type: "Service Record Comparison",
        body:
`The current officer's completed cases and routine duties
contain repeated decisions to preserve contradictory records,
protect affected employees, and escalate destructive orders.

No identity, ancestry, wand, portrait, or memory match was used.

COMPARISON RESULT:
PROTECTIVE INTENT CORRESPONDENCE · CANDIDATE MATCH`
      },

      {
        id: "E-803",
        title: "Compatibility Register · Component Three",
        type: "Personnel Continuity Output",
        body:
`APPOINTMENT:
VACANCY-AR-117

COMPONENT 1:
PROCEDURAL RESPONSE CORRESPONDENCE · SATISFIED

COMPONENT 2:
MNEMONIC RESPONSE CORRESPONDENCE · SATISFIED

COMPONENT 3:
PROTECTIVE INTENT CORRESPONDENCE · REVIEW REQUIRED

IDENTITY MATCH:
NOT REQUESTED · NOT REQUIRED`
      },

      {
        id: "E-804",
        title: "Room 4-7 Restoration Index",
        type: "Sealed Archive Index",
        body:
`A hidden index lists one recoverable record.

RECORD:
CASE-ZERO

DESCRIPTION:
FIRST PERSONNEL DELETION

ACCESS:
ONE-RECORD CONTINUITY WARRANT REQUIRED

RESTORABLE FIELD:
ORIGINAL NAME OF MOM-000117`
      }

    ],

    witnesses: [

      {
        id: "W-801",
        name: "Eleanor Whitmore",
        role: "Senior Archivist",
        statement:
`Your record does not resemble MOM-000117 because you are
the same person. It resembles the historical record because,
when erasure would have been convenient, both officers chose
to protect the person and preserve the evidence.`
      },

      {
        id: "W-802",
        name: "Gideon March",
        role: "Continuity Systems Examiner",
        statement:
`The third component has no identity inputs. It compares the
purpose behind authenticated decisions across the same office.
If the Board confirms it, all three conditions will be complete.`
      },

      {
        id: "W-803",
        name: "Dr. Miriam Vale",
        role: "Memory Archive Specialist",
        statement:
`Memory recognition told us a successor was expected. This
record tells us why: the appointment was kept open for someone
who would refuse to make a person disappear merely because an
order called the disappearance lawful.`
      }

    ],

    timeline: [
      "31 years ago - MOM-000117 receives Personnel Deletion Order PC-0.",
      "31 years ago - The officer suspends erasure, preserves the order, and requests review.",
      "Day 1 onward - The current officer repeatedly preserves people and authenticated evidence.",
      "Day 19 - Compatibility Component 2 is confirmed.",
      "Day 20 - Room 4-7 compares the two appointment records without using identity data.",
      "Day 20 - CASE-008 opens for final compatibility review."
    ],

    notes: [
      "MOM-000117 and the current officer remain separate people.",
      "The third component compares protective intent, not identity.",
      "CASE-ZERO contains the sealed name beneath MOM-000117.",
      "General Level V access is neither requested nor granted."
    ]

  },


  /* =====================================================
     CASE-ZERO
     THE FIRST DELETION
  ===================================================== */

  "CASE-ZERO": {

    id:
      "CASE-ZERO",

    title:
      "The First Deletion",

    classification:
      "LEVEL Ω · ONE-RECORD CONTINUITY WARRANT",

    status:
      "Active",

    department:
      "Room 4-7 · Archive Division",

    summary:
`CASE-ZERO is the origin record beneath the official archive.

It documents the first identity removed by the Personnel
Continuity program, the officer who preserved the hidden index,
and the reason VACANCY-AR-117 was never allowed to close.

The Ω warrant authorizes this record only.`,

    evidence: [

      {
        id: "ZERO-01",
        title: "Original Appointment Register",
        type: "Restored Personnel Record",
        body:
`NAME:
ROWAN MERCER

EMPLOYEE ID:
MOM-000117

POSITION:
FIRST CONTINUITY RECORDS LIAISON

APPOINTMENT:
VACANCY-AR-117

STATUS:
IDENTITY DELETED · APPOINTMENT PRESERVED`
      },

      {
        id: "ZERO-02",
        title: "The First Deletion Audit",
        type: "Restored Audit Trail",
        body:
`Rowan Mercer refused an order to erase employees whose records
contradicted an authorized Ministry index.

The order was redirected against Rowan.

The Ministry deleted Rowan's name, portrait, and searchable
personnel history while requiring the credential to remain
active inside legacy systems.

This was the first deletion recorded by Room 4-7.`
      },

      {
        id: "ZERO-03",
        title: "Room 4-7 Preservation Charter",
        type: "Founding Memorandum",
        body:
`If an official archive is ordered to forget a person,
Room 4-7 shall retain proof that the person existed.

Lethe remembers what the Ministry forgets.

The Continuity appointment shall remain open until a future
officer independently demonstrates the same duty of care.`
      },

      {
        id: "ZERO-04",
        title: "Message to the Next Appointee",
        type: "Sealed Personal Memorandum",
        body:
`To the officer who opens this record:

You are not me, and you were never required to become me.

The position waited for someone who would keep a record from
becoming a sentence against the person named inside it.

Restore what can be restored. Then return to your own work.

— Rowan Mercer`
      }

    ],

    witnesses: [

      {
        id: "ZERO-W1",
        name: "Personnel Continuity Final Board",
        role: "Collective Finding",
        statement:
`MOM-000117 is restored to the historical register as Rowan
Mercer. The current officer is the second appointee to the same
Continuity post and has no identity claim to Rowan's record.`
      }

    ],

    timeline: [
      "31 years ago - Rowan Mercer becomes the first Continuity Records Liaison.",
      "31 years ago - Rowan refuses the mass personnel deletion order.",
      "31 years ago - Rowan's own identity becomes the first deletion.",
      "31 years ago - Room 4-7 and the hidden index are removed from official maps.",
      "Day 1 - The current officer becomes the second lawful appointee.",
      "Day 20 - All three compatibility components are satisfied.",
      "Level IV review - A one-record Ω warrant is issued for CASE-ZERO."
    ],

    notes: [
      "MOM-000117 was Rowan Mercer.",
      "The player is not Rowan Mercer.",
      "The two officers share a protected appointment, not an identity.",
      "Room 4-7 exists to retain proof of people the official archive was ordered to forget.",
      "The Ω warrant expires when the final determination is recorded."
    ]

  },


  /* =====================================================
     CASE-OMEGA
     FUTURE ARCHIVE ECHO
  ===================================================== */

  "CASE-OMEGA": {

    id:
      "CASE-OMEGA",

    title:
      "The Archive Was Investigating You",

    classification:
      "LEVEL Ω · FUTURE ARCHIVE ECHO",

    status:
      "Active",

    department:
      "Archive OS · Year 2048",

    summary:
`A future archive echo answers the restoration of CASE-ZERO.

The record is dated 2048. It does not alter the current officer's
identity or end their Ministry career.

It confirms that the hidden archive survives because successive
officers continue choosing what must not be forgotten.`,

    evidence: [],

    witnesses: [],

    timeline: [
      "Present day - CASE-ZERO restores the first deleted identity.",
      "Present day - The current officer returns to ordinary Ministry service.",
      "2048 - Archive OS records that the archive was also evaluating its investigators."
    ],

    notes: [
      "The Archive remembers what the Ministry forgets.",
      "The future record is an epilogue, not an identity replacement.",
      "Daily Ministry work continues after the narrative conclusion."
    ]

  }

};
