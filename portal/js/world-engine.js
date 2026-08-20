const World = {

  getDay(){

    const savedDay =
      MinistryStorage.getNumber(
        "worldDay",
        1
      );

    if(
      Number.isInteger(savedDay) &&
      savedDay >= 1
    ){
      return savedDay;
    }

    return 1;
  },


  setDay(day){

    const newDay =
      Number(day);

    if(
      !Number.isInteger(newDay) ||
      newDay < 1
    ){

      console.error(
        "Invalid world day:",
        day
      );

      return false;
    }


    MinistryStorage.setItem(
      "worldDay",
      String(newDay)
    );

    return true;
  },


  nextDay(){

    const next =
      this.getDay() + 1;

    this.setDay(next);

    return next;
  },


  getDate(){

    return (
      "Day " +
      this.getDay()
    );
  }

};
