const MinistryStorage = {

  schemaVersion:
    2,

  schemaKey:
    "ministrySaveSchemaVersion",

  recoveryKey:
    "ministryRecoveryCheckpoint",

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
    "careerReview",
    "finalReview",
    "finalStory",
    "orientation",
    "promotion",
    "continuity",
    "secondStoryArc",
    "thirdStoryArc",
    "sealedCompatibility",
    "case006SubmittedDay",
    "case007SubmittedDay",
    "case008SubmittedDay",
    "caseZeroSubmittedDay",
    "caseOmega",
    "continuityOmegaWarrant",
    "historicalAppointee",
    "firstDeletionRestored",
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

      Version 2 adds protected recovery checkpoints and
      record comparison without changing existing save keys.

      Future migrations must be added here in order and
      must preserve older employee records.
    */

    let migratedVersion =
      fromVersion;


    if(
      migratedVersion <= 0 &&
      toVersion >= 1
    ){

      migratedVersion =
        1;
    }


    if(
      migratedVersion === 1 &&
      toVersion >= 2
    ){

      migratedVersion =
        2;
    }


    return (
      migratedVersion ===
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

    if(key === this.recoveryKey){
      return false;
    }

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


  getSnapshotSummary(snapshot){

    const validation =
      this.validateSnapshot(
        snapshot
      );


    if(!validation.valid){

      return {
        valid:
          false,
        reason:
          validation.reason
      };
    }


    const data =
      snapshot.data;

    const completedCases =
      Object.keys(data)
        .filter(
          key =>
            key.startsWith(
              "caseCompleted_"
            ) &&
            data[key] === "true"
        ).length;

    const createdAt =
      typeof snapshot.createdAt ===
        "string" &&
      !Number.isNaN(
        new Date(
          snapshot.createdAt
        ).getTime()
      )
        ? snapshot.createdAt
        : null;

    const storedWorldDay =
      Number(
        data.worldDay || 1
      );


    return {
      valid:
        true,
      reason:
        null,
      schemaVersion:
        Number(
          snapshot.schemaVersion
        ),
      employeeId:
        snapshot.employeeId ||
        "MOM-000000",
      worldDay:
        Number.isFinite(
          storedWorldDay
        ) &&
        storedWorldDay >= 1
          ? storedWorldDay
          : 1,
      rank:
        data.playerRank ||
        "Unassigned",
      clearance:
        data.playerClearance ||
        "Unassigned",
      completedCases,
      keyCount:
        Object.keys(data).length,
      createdAt,
      checksum:
        snapshot.checksum
    };
  },


  compareSnapshots(
    localSnapshot,
    incomingSnapshot
  ){

    const local =
      this.getSnapshotSummary(
        localSnapshot
      );

    const incoming =
      this.getSnapshotSummary(
        incomingSnapshot
      );


    if(!local.valid){

      return {
        valid:
          false,
        reason:
          "invalid-local-snapshot"
      };
    }


    if(!incoming.valid){

      return {
        valid:
          false,
        reason:
          incoming.reason
      };
    }


    if(
      local.employeeId !==
      incoming.employeeId
    ){

      return {
        valid:
          true,
        relation:
          "different-employee",
        local,
        incoming
      };
    }


    if(
      local.checksum ===
      incoming.checksum
    ){

      return {
        valid:
          true,
        relation:
          "identical",
        local,
        incoming
      };
    }


    if(
      incoming.worldDay >
      local.worldDay
    ){

      return {
        valid:
          true,
        relation:
          "incoming-ahead",
        local,
        incoming
      };
    }


    if(
      incoming.worldDay <
      local.worldDay
    ){

      return {
        valid:
          true,
        relation:
          "local-ahead",
        local,
        incoming
      };
    }


    return {
      valid:
        true,
      relation:
        "diverged",
      local,
      incoming
    };
  },


  createRecoveryCheckpoint(
    reason = "before-restore"
  ){

    try{

      const snapshot =
        this.createSnapshot();

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


      const checkpoint = {
        version:
          1,
        createdAt:
          new Date().toISOString(),
        reason:
          String(reason || "before-restore")
            .slice(0, 80),
        snapshot
      };


      localStorage.setItem(
        this.recoveryKey,
        JSON.stringify(
          checkpoint
        )
      );


      return {
        success:
          true,
        reason:
          null,
        checkpoint
      };
    }
    catch(error){

      console.error(
        "Unable to create recovery checkpoint:",
        error
      );

      return {
        success:
          false,
        reason:
          "checkpoint-save-failed"
      };
    }
  },


  getRecoveryCheckpoint(){

    const value =
      localStorage.getItem(
        this.recoveryKey
      );


    if(!value){
      return null;
    }


    try{

      const checkpoint =
        JSON.parse(value);


      if(
        !checkpoint ||
        checkpoint.version !== 1 ||
        !checkpoint.snapshot
      ){

        return null;
      }


      const validation =
        this.validateSnapshot(
          checkpoint.snapshot
        );


      return validation.valid
        ? checkpoint
        : null;
    }
    catch(error){

      console.warn(
        "Invalid recovery checkpoint ignored:",
        error
      );

      return null;
    }
  },


  clearRecoveryCheckpoint(){

    localStorage.removeItem(
      this.recoveryKey
    );

    return true;
  },


  restoreRecoveryCheckpoint(){

    const checkpoint =
      this.getRecoveryCheckpoint();


    if(!checkpoint){

      return {
        success:
          false,
        reason:
          "recovery-not-found"
      };
    }


    const result =
      this.restoreSnapshot(
        checkpoint.snapshot,
        {
          replace:
            true
        }
      );


    if(result.success){
      this.clearRecoveryCheckpoint();
    }


    return {
      ...result,
      checkpoint:
        result.success
          ? checkpoint
          : null
    };
  },


  eraseLocalRecord(){

    const keys =
      this.getGameKeys();


    keys.forEach(
      key =>
        localStorage.removeItem(key)
    );

    this.clearRecoveryCheckpoint();
    this.initialize();


    return {
      success:
        true,
      removedKeys:
        keys.length
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

    let checkpointCreated =
      false;


    if(
      replace &&
      options.createCheckpoint === true
    ){

      const checkpoint =
        this.createRecoveryCheckpoint(
          options.checkpointReason ||
          "before-restore"
        );


      if(!checkpoint.success){

        return {
          success:
            false,
          reason:
            "checkpoint-save-failed"
        };
      }


      checkpointCreated =
        true;
    }


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
      checkpointCreated,
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

    const remote =
      await this.loadFromRemote();


    if(!remote.success){
      return remote;
    }


    return this.restoreSnapshot(
      remote.snapshot,
      options
    );
  },


  async loadFromRemote(){

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
