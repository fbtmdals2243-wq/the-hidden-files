const MinistryCases = {

    "CASE-000":{

        id:"CASE-000",

        title:"The Missing Owl",

        classification:"Level I",

        status:"Active",

        department:"Archive Division",

        summary:
`A Ministry owl returned to Office 3-B
without its assigned message.

The internal registry indicates
the message has already been delivered.

Initial investigation has been assigned
to a newly appointed officer.`,

        evidence:[
  {
    id:"E-001",
    title:"Owl Delivery Log",
    type:"Registry Record",
    body:`08:10 - Owl departed from Ministry Mail Room.
08:27 - Owl returned to Office 3-B.
08:28 - Registry marked message as delivered.

No recipient confirmation found.`
  },
  {
    id:"E-002",
    title:"Empty Message Capsule",
    type:"Physical Evidence",
    body:`A standard Ministry message capsule was recovered from the owl's leg.

The capsule was empty.

No burn marks, tearing, or forced magical opening detected.`
  },
  {
    id:"E-003",
    title:"Owl Mail Registry",
    type:"System Record",
    body:`Delivery Status: Completed
Recipient: Unknown
Confirmation Signature: Missing
Registry Entry: Automatically generated`
  }
],
witnesses:[
  {
    id:"W-001",
    name:"Eleanor Whitmore",
    role:"Senior Archivist",
    statement:`The owl returned earlier than expected.

There was no visible injury, no panic response, and no magical disturbance in the room.

What concerns me is not the missing message.

It is the registry marking it delivered before anyone here received it.`
  },
  {
    id:"W-002",
    name:"Bernard Pike",
    role:"Mail Room Clerk",
    statement:`The owl was cleared for standard internal delivery at 08:10.

I personally sealed the message capsule.

If the capsule returned empty, then either the message was removed in transit...

or it was never inside when the owl left.`
  }
],

timeline:[
    "08:10 Owl departed.",
    "08:27 Owl returned.",
    "08:28 Registry marked message delivered."
],
        notes:[
            "No magical residue detected.",
            "Delivery destination remains unknown."
        ]

    }

};