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

    },
    getRank(){

    return localStorage.getItem(
        "playerRank"
    ) || "Junior Archive Officer";

},

setRank(rank){

    localStorage.setItem(
        "playerRank",
        rank
    );

},
getClearance(){

    return localStorage.getItem(
        "playerClearance"
    ) || "Level I";

},

setClearance(level){

    localStorage.setItem(
        "playerClearance",
        level
    );

},
hasClearance(requiredLevel){
  const levels = {
    "Level I": 1,
    "Level II": 2,
    "Level III": 3
  };

  const currentLevel =
    levels[this.getClearance()] || 1;

  const required =
    levels[requiredLevel] || 1;

  return currentLevel >= required;
},
};