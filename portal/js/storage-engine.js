const MinistryStorage = {

  schemaVersion:
    1,

  schemaKey:
    "ministrySaveSchemaVersion",

  remoteAdapter:
    null,

  maxSnapshotCharacters:
    2000000,


  gameKeyPrefixes: [
    "ministry",
    "player",
    "worldDay",
    "caseStatus_",
    "caseCompleted_",
    "report_",
    "mailRead_",
    "newsRead_",
    "noticeRead_",
    "interview_",
    "dailyDuty",
    "training",
    "orientation",
    "promotion",
    "continuity",
    "secondStoryArc",
    "sealedCompatibility",
    "case006SubmittedDay",
    "firstStoryArcCompleted",
    "lastCompletedWorldDay",
    "day6PersonnelRecordViewed"
  ],


  initialize(){

    const savedVersion =
      Number(
        localStorage.getItem(
          this.schemaKey
        ) || 0
      );


    if(savedVersion > this.schemaVersion){

      console.warn(
        "Save data uses a newer schema version:",
        savedVersion
      );

      return false;
    }


    if(savedVersion < this.schemaVersion){

      const migrated =
        this.runMigrations(
          savedVersion,
          this.schemaVersion
        );


      if(!migrated){
        return false;
      }
    }


    localStorage.setItem(
      this.schemaKey,
      String(this.schemaVersion)
    );

    return true;
  },


  runMigrations(
    fromVersion,
    toVersion
  ){

    /*
      Version 1 adopts every existing localStorage key
      without renaming or deleting player data.

      Future migrations must be added here in order and
      must preserve older employee records.
    */

    if(
      fromVersion <= 0 &&
      toVersion >= 1
    ){

      return true;
    }


    return (
      fromVersion ===
      toVersion
    );
  },


  getItem(
    key,
    fallback = null
  ){

    const value =
      localStorage.getItem(key);

    return value === null
      ? fallback
      : value;
  },


  setItem(key, value){

    if(
      typeof key !== "string" ||
      !key
    ){

      return false;
    }


    localStorage.setItem(
      key,
      String(value)
    );

    return true;
  },


  removeItem(key){

    localStorage.removeItem(key);

    return true;
  },


  getBoolean(
    key,
    fallback = false
  ){

    const value =
      this.getItem(key);

    if(value === null){
      return fallback;
    }

    return value === "true";
  },


  getNumber(
    key,
    fallback = 0
  ){

    const value =
      Number(
        this.getItem(
          key,
          fallback
        )
      );

    return Number.isFinite(value)
      ? value
      : fallback;
  },


  getJSON(
    key,
    fallback = null
  ){

    const value =
      this.getItem(key);


    if(value === null){
      return fallback;
    }


    try{
      return JSON.parse(value);
    }
    catch(error){

      console.error(
        "Invalid stored JSON for key:",
        key,
        error
      );

      return fallback;
    }
  },


  setJSON(key, value){

    try{

      return this.setItem(
        key,
        JSON.stringify(value)
      );
    }
    catch(error){

      console.error(
        "Unable to store JSON for key:",
        key,
        error
      );

      return false;
    }
  },


  isGameKey(key){

    if(key === this.schemaKey){
      return true;
    }


    return this.gameKeyPrefixes.some(
      prefix =>
        key.startsWith(prefix)
    );
  },


  getGameKeys(){

    const keys = [];


    for(
      let index = 0;
      index < localStorage.length;
      index += 1
    ){

      const key =
        localStorage.key(index);


      if(
        key &&
        this.isGameKey(key)
      ){

        keys.push(key);
      }
    }


    return keys.sort(
      (a, b) =>
        a.localeCompare(b)
    );
  },


  calculateChecksum(data){

    const serialized =
      JSON.stringify(data);

    let hash =
      2166136261;


    for(
      let index = 0;
      index < serialized.length;
      index += 1
    ){

      hash ^=
        serialized.charCodeAt(index);

      hash =
        Math.imul(
          hash,
          16777619
        );
    }


    return (
      hash >>> 0
    ).toString(16)
      .padStart(8, "0");
  },


  createSnapshot(){

    const data = {};


    this.getGameKeys()
      .forEach(
        key => {

          data[key] =
            localStorage.getItem(key);
        }
      );


    return {
      schemaVersion:
        this.schemaVersion,
      createdAt:
        new Date().toISOString(),
      employeeId:
        data.ministryEmployeeId ||
        null,
      checksum:
        this.calculateChecksum(data),
      data
    };
  },


  validateSnapshot(snapshot){

    if(
      !snapshot ||
      typeof snapshot !== "object" ||
      !snapshot.data ||
      typeof snapshot.data !== "object" ||
      Array.isArray(snapshot.data)
    ){

      return {
        valid:
          false,
        reason:
          "invalid-format"
      };
    }


    const snapshotVersion =
      Number(
        snapshot.schemaVersion || 0
      );


    if(
      !Number.isInteger(snapshotVersion) ||
      snapshotVersion < 1 ||
      snapshotVersion > this.schemaVersion
    ){

      return {
        valid:
          false,
        reason:
          "unsupported-schema"
      };
    }


    const keys =
      Object.keys(
        snapshot.data
      );


    if(
      JSON.stringify(
        snapshot.data
      ).length >
      this.maxSnapshotCharacters
    ){

      return {
        valid:
          false,
        reason:
          "snapshot-too-large"
      };
    }


    if(
      keys.some(
        key =>
          !this.isGameKey(key)
      )
    ){

      return {
        valid:
          false,
        reason:
          "unknown-key"
      };
    }


    if(
      keys.some(
        key =>
          typeof snapshot.data[key] !==
            "string" &&
          snapshot.data[key] !==
            null
      )
    ){

      return {
        valid:
          false,
        reason:
          "invalid-value"
      };
    }


    const employeeId =
      snapshot.data.ministryEmployeeId ||
      null;


    if(
      (snapshot.employeeId || null) !==
      employeeId
    ){

      return {
        valid:
          false,
        reason:
          "employee-id-mismatch"
      };
    }


    if(
      typeof snapshot.checksum !==
        "string" ||
      !/^[0-9a-f]{8}$/i.test(
        snapshot.checksum
      )
    ){

      return {
        valid:
          false,
        reason:
          "invalid-checksum"
      };
    }


    const expectedChecksum =
      this.calculateChecksum(
        snapshot.data
      );


    if(
      snapshot.checksum !==
      expectedChecksum
    ){

      return {
        valid:
          false,
        reason:
          "checksum-mismatch"
      };
    }


    return {
      valid:
        true,
      reason:
        null
    };
  },


  restoreSnapshot(
    snapshot,
    options = {}
  ){

    const validation =
      this.validateSnapshot(
        snapshot
      );


    if(!validation.valid){

      return {
        success:
          false,
        reason:
          validation.reason
      };
    }


    const replace =
      options.replace === true;


    if(replace){

      this.getGameKeys()
        .forEach(
          key =>
            localStorage.removeItem(key)
        );
    }


    Object.entries(
      snapshot.data
    ).forEach(
      ([key, value]) => {

        if(value === null){

          localStorage.removeItem(key);
        }
        else{

          localStorage.setItem(
            key,
            String(value)
          );
        }
      }
    );


    localStorage.setItem(
      this.schemaKey,
      String(this.schemaVersion)
    );


    return {
      success:
        true,
      reason:
        null,
      restoredKeys:
        Object.keys(
          snapshot.data
        ).length
    };
  },


  configureRemoteAdapter(adapter){

    if(
      !adapter ||
      typeof adapter.saveSnapshot !== "function" ||
      typeof adapter.loadSnapshot !== "function"
    ){

      return false;
    }


    this.remoteAdapter =
      adapter;

    return true;
  },


  clearRemoteAdapter(adapter = null){

    if(
      adapter &&
      this.remoteAdapter !==
        adapter
    ){

      return false;
    }


    this.remoteAdapter =
      null;

    return true;
  },


  async pushToRemote(){

    if(!this.remoteAdapter){

      return {
        success:
          false,
        reason:
          "remote-not-configured"
      };
    }


    try{

      const snapshot =
        this.createSnapshot();

      await this.remoteAdapter
        .saveSnapshot(snapshot);

      return {
        success:
          true,
        reason:
          null,
        snapshot
      };
    }
    catch(error){

      console.error(
        "Remote save failed:",
        error
      );

      return {
        success:
          false,
        reason:
          "remote-save-failed"
      };
    }
  },


  async pullFromRemote(
    options = {}
  ){

    if(!this.remoteAdapter){

      return {
        success:
          false,
        reason:
          "remote-not-configured"
      };
    }


    try{

      const snapshot =
        await this.remoteAdapter
          .loadSnapshot();

      return this.restoreSnapshot(
        snapshot,
        options
      );
    }
    catch(error){

      console.error(
        "Remote load failed:",
        error
      );

      return {
        success:
          false,
        reason:
          "remote-load-failed"
      };
    }
  }

};


MinistryStorage.initialize();
