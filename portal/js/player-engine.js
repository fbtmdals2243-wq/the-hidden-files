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


  getCaseIds(){

    if(
      typeof MinistryCases === "undefined" ||
      !MinistryCases ||
      typeof MinistryCases !== "object"
    ){

      return [];
    }


    return Object.keys(
      MinistryCases
    )
      .filter(
        caseId =>
          caseId.startsWith("CASE-")
      )
      .sort(
        (a, b) =>
          a.localeCompare(
            b,
            undefined,
            {
              numeric: true
            }
          )
      );

  },


  getCompletedCaseIds(){

    return this.getCaseIds()
      .filter(
        caseId =>
          this.getCaseStatus(caseId) ===
          "Solved"
      );

  },


  getCompletedCases(){

    return this
      .getCompletedCaseIds()
      .length;

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


    if(
      currentLevel === undefined ||
      required === undefined
    ){

      return false;
    }


    return currentLevel >= required;

  }

};
