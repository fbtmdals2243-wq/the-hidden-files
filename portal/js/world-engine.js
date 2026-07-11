const World = {

  getDay(){

    return Number(
      localStorage.getItem("worldDay")
    ) || 1;

  },

  nextDay(){

    const next =
      this.getDay() + 1;

    localStorage.setItem(
      "worldDay",
      next
    );

  },

  getDate(){

    return "Day " + this.getDay();

  }

};