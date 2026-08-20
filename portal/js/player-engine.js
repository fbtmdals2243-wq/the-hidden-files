const Player = {

  getName(){

    return MinistryStorage.getItem(
      "ministryApplicantName",
      "Officer"
    );

  },


  getEmployeeId(){

    return MinistryStorage.getItem(
      "ministryEmployeeId",
      "MOM-000000"
    );

  },


  getIdentity(){

    return MinistryStorage.getJSON(
      "ministryIdentity",
      {}
    );

  },


  getRecommendedDepartment(){

    const identity =
      this.getIdentity();

    return (
      identity.department ||
      "Not recorded"
    );

  },


  getAssignedDepartment(){

    return MinistryStorage.getItem(
      "playerAssignedDepartment",
      "Archive Division"
    );

  },


  setAssignedDepartment(department){

    if(
      typeof department !== "string" ||
      !department.trim()
    ){

      return false;
    }

    MinistryStorage.setItem(
      "playerAssignedDepartment",
      department.trim()
    );

    return true;

  },


  getSpecialAssignment(){

    return MinistryStorage.getItem(
      "playerSpecialAssignment",
      "None"
    );

  },


  setSpecialAssignment(assignment){

    if(
      typeof assignment !== "string" ||
      !assignment.trim()
    ){

      return false;
    }

    MinistryStorage.setItem(
      "playerSpecialAssignment",
      assignment.trim()
    );

    return true;

  },


  getServicePoints(){

    return MinistryStorage.getNumber(
      "ministryServicePoints",
      0
    );

  },


  getCompletedDuties(){

    return MinistryStorage.getNumber(
      "dailyDutyCompletedCount",
      0
    );

  },


  getCaseStatus(caseId){

    return MinistryStorage.getItem(
      "caseStatus_" + caseId,
      "Active"
    );

  },


  setCaseStatus(caseId, status){

    MinistryStorage.setItem(
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

    return MinistryStorage.getItem(
      "playerRank",
      "Junior Archive Officer"
    );

  },


  setRank(rank){

    MinistryStorage.setItem(
      "playerRank",
      rank
    );

  },


  getClearance(){

    return MinistryStorage.getItem(
      "playerClearance",
      "Level I"
    );

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

    MinistryStorage.setItem(
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
