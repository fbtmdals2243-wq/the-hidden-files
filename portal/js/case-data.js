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

  }

};