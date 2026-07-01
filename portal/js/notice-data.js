function getMinistryNotices(){

    const caseStatus =
        localStorage.getItem("caseStatus_CASE-000");

    const notices = [

        {
            id:"NOTICE-001",

            title:"Archive Division Security Reminder",

            category:"Security",

            status:"Active",

            body:`Employees are reminded that
Level I Archive clearance does not permit
access to sealed Ministry records.

Unauthorized access attempts
will be investigated.`
        }

    ];

    if(caseStatus === "Under Review"){

        notices.unshift({

            id:"NOTICE-002",

            title:"CASE-000 Status Updated",

            category:"Investigation",

            status:"New",

            body:`CASE-000 has officially entered
the UNDER REVIEW stage.

Review Committee members have been notified.

Further instructions will be delivered
through Owl Mail.`

        });

    }

    return notices;

}