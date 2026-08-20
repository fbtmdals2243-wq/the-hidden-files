const MinistryCloud = {

  tableName:
    "ministry_player_saves",

  client:
    null,

  session:
    null,

  config:
    null,

  initialized:
    false,

  initialization:
    null,

  status:
    "local",

  lastError:
    null,

  lastSyncAt:
    null,

  authSubscription:
    null,

  storageAdapter:
    null,

  sdkPromise:
    null,


  getConfiguration(){

    const source =
      typeof window !== "undefined" &&
      window.MINISTRY_CLOUD_CONFIG
        ? window.MINISTRY_CLOUD_CONFIG
        : {};


    return {
      enabled:
        source.enabled === true,
      url:
        typeof source.url === "string"
          ? source.url.trim()
          : "",
      publishableKey:
        typeof source.publishableKey === "string"
          ? source.publishableKey.trim()
          : "",
      sdkUrl:
        typeof source.sdkUrl === "string" &&
        source.sdkUrl.trim()
          ? source.sdkUrl.trim()
          : "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
    };
  },


  isConfigurationValid(config = this.getConfiguration()){

    return Boolean(
      config.enabled &&
      /^https:\/\/[a-z0-9.-]+$/i.test(
        config.url
      ) &&
      config.publishableKey.length >= 20
    );
  },


  isConfigured(){

    return this.isConfigurationValid(
      this.config ||
      this.getConfiguration()
    );
  },


  isAuthenticated(){

    return Boolean(
      this.session &&
      this.session.user &&
      this.session.user.id
    );
  },


  getStatus(){

    return {
      mode:
        this.status,
      configured:
        this.isConfigured(),
      authenticated:
        this.isAuthenticated(),
      email:
        this.isAuthenticated()
          ? this.session.user.email ||
            null
          : null,
      lastSyncAt:
        this.lastSyncAt,
      error:
        this.lastError
    };
  },


  async loadSdk(){

    if(
      typeof supabase !== "undefined" &&
      supabase &&
      typeof supabase.createClient ===
        "function"
    ){

      return supabase;
    }


    if(this.sdkPromise){
      return this.sdkPromise;
    }


    if(
      typeof document === "undefined" ||
      !document.head
    ){

      throw new Error(
        "cloud-sdk-unavailable"
      );
    }


    this.sdkPromise =
      new Promise(
        (resolve, reject) => {

          const existing =
            document.getElementById(
              "ministrySupabaseSdk"
            );


          const handleLoad = () => {

            if(
              typeof supabase !== "undefined" &&
              supabase &&
              typeof supabase.createClient ===
                "function"
            ){

              resolve(supabase);
            }
            else{

              reject(
                new Error(
                  "cloud-sdk-invalid"
                )
              );
            }
          };


          if(existing){

            existing.addEventListener(
              "load",
              handleLoad,
              {
                once:
                  true
              }
            );

            existing.addEventListener(
              "error",
              () => reject(
                new Error(
                  "cloud-sdk-load-failed"
                )
              ),
              {
                once:
                  true
              }
            );

            return;
          }


          const script =
            document.createElement(
              "script"
            );

          script.id =
            "ministrySupabaseSdk";

          script.src =
            this.config.sdkUrl;

          script.async =
            true;

          script.crossOrigin =
            "anonymous";

          script.addEventListener(
            "load",
            handleLoad,
            {
              once:
                true
            }
          );

          script.addEventListener(
            "error",
            () => reject(
              new Error(
                "cloud-sdk-load-failed"
              )
            ),
            {
              once:
                true
            }
          );

          document.head.appendChild(
            script
          );
        }
      );


    return this.sdkPromise;
  },


  async initialize(options = {}){

    if(
      this.initialized &&
      !options.client &&
      !options.config
    ){

      return this.getStatus();
    }


    if(
      this.initialization &&
      !options.client &&
      !options.config
    ){

      return this.initialization;
    }


    this.initialization =
      this.performInitialization(
        options
      );


    return this.initialization;
  },


  async performInitialization(options){

    this.config =
      options.config ||
      this.getConfiguration();


    if(
      !options.client &&
      !this.isConfigurationValid(
        this.config
      )
    ){

      this.status =
        "local";

      this.initialized =
        true;

      this.initialization =
        null;

      return this.getStatus();
    }


    this.status =
      "connecting";

    this.lastError =
      null;


    try{

      if(options.client){

        this.client =
          options.client;
      }
      else{

        const sdk =
          await this.loadSdk();

        this.client =
          sdk.createClient(
            this.config.url,
            this.config.publishableKey,
            {
              auth: {
                persistSession:
                  true,
                autoRefreshToken:
                  true,
                detectSessionInUrl:
                  true
              }
            }
          );
      }


      const sessionResult =
        await this.client.auth
          .getSession();


      if(sessionResult.error){
        throw sessionResult.error;
      }


      this.applySession(
        sessionResult.data
          ? sessionResult.data.session
          : null
      );


      this.listenForAuthChanges();

      this.initialized =
        true;

      this.initialization =
        null;

      return this.getStatus();
    }
    catch(error){

      this.status =
        "error";

      this.lastError =
        error && error.message
          ? error.message
          : "cloud-initialization-failed";

      this.initialized =
        true;

      this.initialization =
        null;

      this.applySession(null);

      console.error(
        "Ministry cloud initialization failed:",
        error
      );

      return this.getStatus();
    }
  },


  listenForAuthChanges(){

    if(
      !this.client ||
      !this.client.auth ||
      typeof this.client.auth
        .onAuthStateChange !==
        "function" ||
      this.authSubscription
    ){

      return;
    }


    const result =
      this.client.auth
        .onAuthStateChange(
          (event, session) => {

            this.applySession(
              session
            );
          }
        );


    this.authSubscription =
      result && result.data
        ? result.data.subscription ||
          null
        : null;
  },


  applySession(session){

    this.session =
      session ||
      null;


    if(this.isAuthenticated()){

      this.status =
        "authenticated";

      MinistryStorage
        .configureRemoteAdapter(
          this.getStorageAdapter()
        );
    }
    else{

      if(this.status !== "error"){

        this.status =
          this.isConfigured()
            ? "ready"
            : "local";
      }


      if(this.storageAdapter){

        MinistryStorage
          .clearRemoteAdapter(
            this.storageAdapter
          );
      }
    }
  },


  getStorageAdapter(){

    if(!this.storageAdapter){

      this.storageAdapter = {
        saveSnapshot:
          snapshot =>
            this.saveSnapshot(
              snapshot
            ),
        loadSnapshot:
          () =>
            this.loadSnapshot()
      };
    }


    return this.storageAdapter;
  },


  validateCredentials(
    email,
    password
  ){

    const normalizedEmail =
      typeof email === "string"
        ? email.trim().toLowerCase()
        : "";


    if(
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        normalizedEmail
      )
    ){

      return {
        valid:
          false,
        reason:
          "invalid-email"
      };
    }


    if(
      typeof password !== "string" ||
      password.length < 10 ||
      password.length > 128
    ){

      return {
        valid:
          false,
        reason:
          "invalid-password"
      };
    }


    return {
      valid:
        true,
      reason:
        null,
      email:
        normalizedEmail,
      password
    };
  },


  async signUp(email, password){

    const credentials =
      this.validateCredentials(
        email,
        password
      );


    if(!credentials.valid){

      return {
        success:
          false,
        reason:
          credentials.reason
      };
    }


    if(
      !this.client ||
      !this.isConfigured()
    ){

      return {
        success:
          false,
        reason:
          "cloud-not-configured"
      };
    }


    const result =
      await this.client.auth
        .signUp({
          email:
            credentials.email,
          password:
            credentials.password
        });


    if(result.error){

      return {
        success:
          false,
        reason:
          "authentication-failed"
      };
    }


    this.applySession(
      result.data
        ? result.data.session
        : null
    );


    return {
      success:
        true,
      reason:
        null,
      requiresEmailConfirmation:
        !this.isAuthenticated()
    };
  },


  async signIn(email, password){

    const credentials =
      this.validateCredentials(
        email,
        password
      );


    if(!credentials.valid){

      return {
        success:
          false,
        reason:
          credentials.reason
      };
    }


    if(
      !this.client ||
      !this.isConfigured()
    ){

      return {
        success:
          false,
        reason:
          "cloud-not-configured"
      };
    }


    const result =
      await this.client.auth
        .signInWithPassword({
          email:
            credentials.email,
          password:
            credentials.password
        });


    if(result.error){

      return {
        success:
          false,
        reason:
          "authentication-failed"
      };
    }


    this.applySession(
      result.data
        ? result.data.session
        : null
    );


    return {
      success:
        this.isAuthenticated(),
      reason:
        this.isAuthenticated()
          ? null
          : "session-missing"
    };
  },


  async signOut(){

    if(!this.client){

      return {
        success:
          false,
        reason:
          "cloud-not-configured"
      };
    }


    const result =
      await this.client.auth
        .signOut({
          scope:
            "local"
        });


    if(result.error){

      return {
        success:
          false,
        reason:
          "sign-out-failed"
      };
    }


    this.applySession(null);

    return {
      success:
        true,
      reason:
        null
    };
  },


  getUserId(){

    return this.isAuthenticated()
      ? this.session.user.id
      : null;
  },


  async saveSnapshot(snapshot){

    const userId =
      this.getUserId();


    if(!userId){
      throw new Error(
        "authentication-required"
      );
    }


    const validation =
      MinistryStorage
        .validateSnapshot(
          snapshot
        );


    if(!validation.valid){
      throw new Error(
        validation.reason
      );
    }


    if(!snapshot.employeeId){
      throw new Error(
        "employee-record-required"
      );
    }


    const updatedAt =
      new Date().toISOString();

    const result =
      await this.client
        .from(this.tableName)
        .upsert(
          {
            user_id:
              userId,
            employee_id:
              snapshot.employeeId,
            schema_version:
              snapshot.schemaVersion,
            checksum:
              snapshot.checksum,
            snapshot,
            updated_at:
              updatedAt
          },
          {
            onConflict:
              "user_id"
          }
        );


    if(result.error){
      throw result.error;
    }


    this.lastSyncAt =
      updatedAt;

    return {
      success:
        true,
      updatedAt
    };
  },


  async loadSnapshot(){

    const userId =
      this.getUserId();


    if(!userId){
      throw new Error(
        "authentication-required"
      );
    }


    const result =
      await this.client
        .from(this.tableName)
        .select(
          "snapshot, updated_at"
        )
        .eq(
          "user_id",
          userId
        )
        .maybeSingle();


    if(result.error){
      throw result.error;
    }


    if(
      !result.data ||
      !result.data.snapshot
    ){

      throw new Error(
        "cloud-save-not-found"
      );
    }


    const validation =
      MinistryStorage
        .validateSnapshot(
          result.data.snapshot
        );


    if(!validation.valid){
      throw new Error(
        validation.reason
      );
    }


    this.lastSyncAt =
      result.data.updated_at ||
      null;

    return result.data.snapshot;
  },


  resetForTesting(){

    if(
      this.authSubscription &&
      typeof this.authSubscription
        .unsubscribe === "function"
    ){

      this.authSubscription
        .unsubscribe();
    }


    if(this.storageAdapter){

      MinistryStorage
        .clearRemoteAdapter(
          this.storageAdapter
        );
    }


    this.client =
      null;

    this.session =
      null;

    this.config =
      null;

    this.initialized =
      false;

    this.initialization =
      null;

    this.status =
      "local";

    this.lastError =
      null;

    this.lastSyncAt =
      null;

    this.authSubscription =
      null;

    this.storageAdapter =
      null;

    this.sdkPromise =
      null;
  }

};


MinistryCloud.initialize();
