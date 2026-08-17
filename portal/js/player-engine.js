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


  setCaseStatus(caseId, status){

    localStorage.setItem(
      "caseStatus_" + caseId,
      status
    );

  },


  getCompletedCases(){

    return this.getCaseStatus("CASE-000") === "Solved"
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

    const validLevels = [
      "Level I",
      "Level II",
      "Level III",
      "Level IV",
      "Level V"
    ];

    if(!validLevels.includes(level)){
      console.error(
        "Invalid clearance level:",
        level
      );

      return false;
    }

    localStorage.setItem(
      "playerClearance",
      level
    );

    return true;

  },


  hasClearance(requiredLevel){

    const levels = {
      "Level I": 1,
      "Level II": 2,
      "Level III": 3,
      "Level IV": 4,
      "Level V": 5
    };

    const currentLevel =
      levels[this.getClearance()];

    const required =
      levels[requiredLevel];


    /*
      알 수 없는 권한 단계가 들어오면
      접근을 허용하지 않는다.
    */
    if(
      currentLevel === undefined ||
      required === undefined
    ){
      return false;
    }


    return currentLevel >= required;

  }

};