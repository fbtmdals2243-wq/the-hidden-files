const MinistryIdentityEngine = {
  traits: {
    duty: 0,
    empathy: 0,
    curiosity: 0,
    logic: 0,
    courage: 0,
    ambition: 0,
    discretion: 0,
    resilience: 0,
    independence: 0,
    loyalty: 0
  },

  reset(){
    Object.keys(this.traits).forEach(key=>{
      this.traits[key] = 0;
    });
  },

  applyAnswer(scores){
    Object.keys(scores).forEach(key=>{
      if(this.traits[key] !== undefined){
        this.traits[key] += scores[key];
      }
    });
  },

  getPrimaryHouse(){
    const t = this.traits;

    const scores = {
      Gryffindor: t.courage + t.duty + t.resilience,
      Ravenclaw: t.logic + t.curiosity + t.discretion,
      Hufflepuff: t.empathy + t.loyalty + t.duty,
      Slytherin: t.ambition + t.independence + t.discretion
    };

    return Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0];
  },

  getRecommendedDepartment(){
    const t = this.traits;

    const scores = {
      "Archive Division": t.logic + t.curiosity + t.discretion,
      "Auror Office": t.courage + t.duty + t.resilience,
      "Department of Mysteries": t.curiosity + t.independence + t.logic,
      "Internal Affairs": t.discretion + t.logic + t.duty,
      "Magical Creatures Division": t.empathy + t.resilience + t.loyalty
    };

    return Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0];
  },

  getPatronus(){
    const t = this.traits;

    if(t.empathy + t.loyalty >= 12) return "Snow Owl";
    if(t.courage + t.resilience >= 12) return "Stag";
    if(t.logic + t.curiosity >= 12) return "Raven";
    if(t.independence + t.discretion >= 12) return "Black Cat";
    if(t.ambition + t.resilience >= 12) return "Wolf";

    return "Silver Hare";
  },

  getWand(){
    const t = this.traits;

    if(t.logic + t.curiosity >= 12){
      return {
        wood: "Cherry",
        core: "Phoenix Feather",
        length: "12¼ inches",
        flexibility: "Slightly yielding"
      };
    }

    if(t.courage + t.duty >= 12){
      return {
        wood: "Oak",
        core: "Dragon Heartstring",
        length: "13 inches",
        flexibility: "Rigid"
      };
    }

    if(t.empathy + t.loyalty >= 12){
      return {
        wood: "Willow",
        core: "Unicorn Hair",
        length: "11¾ inches",
        flexibility: "Flexible"
      };
    }

    if(t.ambition + t.independence >= 12){
      return {
        wood: "Yew",
        core: "Dragon Heartstring",
        length: "12½ inches",
        flexibility: "Unyielding"
      };
    }

    return {
      wood: "Hawthorn",
      core: "Unicorn Hair",
      length: "12 inches",
      flexibility: "Balanced"
    };
  },

  generateIdentity(){
    return {
      house: this.getPrimaryHouse(),
      department: this.getRecommendedDepartment(),
      patronus: this.getPatronus(),
      wand: this.getWand(),
      traits: {...this.traits}
    };
  }
};