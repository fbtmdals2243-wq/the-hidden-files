const Player = {

    getName(){

        return localStorage.getItem(
            "ministryApplicantName"
        ) || "Officer";

    },

    getEmployeeId(){

        return localStorage.getItem(
            "ministryEmployeeId"
        ) || "MOM-000000";

    },

    getIdentity(){

        return JSON.parse(

            localStorage.getItem(
                "ministryIdentity"
            ) || "{}"

        );

    },

    getCaseStatus(caseId){

        return localStorage.getItem(
            "caseStatus_" + caseId
        ) || "Active";

    },

    setCaseStatus(caseId,status){

        localStorage.setItem(
            "caseStatus_" + caseId,
            status
        );

    },

    getCompletedCases(){

        return this.getCaseStatus("CASE-000")
            === "Solved"
            ? 1
            : 0;

    }

};