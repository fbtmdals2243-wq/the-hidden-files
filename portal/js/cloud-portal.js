function escapeMinistryText(value){

  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


function getMinistrySyncLabel(value){

  if(!value){
    return "Not yet synchronized";
  }


  const date =
    new Date(value);


  if(Number.isNaN(date.getTime())){
    return "Previously synchronized";
  }


  return date.toLocaleString();
}


function getArchiveFailureMessage(reason){

  const messages = {
    "invalid-format":
      "The selected file is not a Ministry employee archive.",
    "unsupported-schema":
      "This archive was created by an unsupported portal version.",
    "snapshot-too-large":
      "This archive is larger than the Ministry transfer limit.",
    "unknown-key":
      "This archive contains an unrecognized record category.",
    "invalid-value":
      "This archive contains an invalid record value.",
    "employee-id-mismatch":
      "The archive header does not match its employee record.",
    "invalid-checksum":
      "The archive security checksum is missing or invalid.",
    "checksum-mismatch":
      "The archive failed its security checksum inspection.",
    "remote-not-configured":
      "The Ministry Network is not connected.",
    "remote-save-failed":
      "The Ministry Network could not save this employee record.",
    "remote-load-failed":
      "No restorable employee record could be retrieved."
  };


  return messages[reason] ||
    "The requested records operation could not be completed.";
}


function renderNetworkMessage(message, kind = "notice"){

  if(!message){
    return "";
  }


  return `
    <div class="network-message ${kind}">
      ${escapeMinistryText(message)}
    </div>
  `;
}


function renderArchiveTransferActions(){

  return `
    <div class="network-actions">

      <button
        class="btn secondary"
        onclick="downloadMinistryArchive()">

        DOWNLOAD EMPLOYEE ARCHIVE

      </button>

      <button
        class="btn secondary"
        onclick="openMinistryArchivePicker()">

        RESTORE EMPLOYEE ARCHIVE

      </button>

      <input
        id="ministryArchiveFile"
        class="hidden-file"
        type="file"
        accept=".json,application/json"
        onchange="importMinistryArchive(this.files[0])"
      >

    </div>
  `;
}


async function showMinistryNetwork(
  message = "",
  messageKind = "notice"
){

  app.innerHTML = `
    <section class="panel">
      <div class="seal">MINISTRY SECURITY NETWORK</div>
      <h1>Checking Records...</h1>
      <div class="terminal">NETWORK STATUS: VERIFYING
LOCAL EMPLOYEE FILE: PROTECTED</div>
    </section>
  `;


  const status =
    await MinistryCloud.initialize();


  if(
    !status.configured ||
    status.mode === "local" ||
    status.mode === "error"
  ){

    const networkLine =
      status.mode === "error"
        ? "NETWORK STATUS: TEMPORARILY UNAVAILABLE"
        : "NETWORK STATUS: LOCAL ARCHIVE MODE";


    app.innerHTML = `
      <section class="panel network-panel">

        <div class="seal">
          MINISTRY RECORDS TRANSFER DESK
        </div>

        <h1>
          Employee Archive
        </h1>

        <h2>
          ${escapeMinistryText(Player.getEmployeeId())}
        </h2>

        ${renderNetworkMessage(
          message,
          messageKind
        )}

        <div class="notice">

          <p>
            Your employee record is currently stored
            in this browser and remains fully playable.
          </p>

          <p>
            Download an archive copy before moving to
            another device or clearing browser data.
          </p>

          <p class="muted">
            Online Ministry accounts will become available
            when the secure network is activated.
          </p>

        </div>

        <div class="terminal">${networkLine}
EMPLOYEE ID: ${escapeMinistryText(Player.getEmployeeId())}
WORLD DATE: ${escapeMinistryText(World.getDate())}
LOCAL RECORD: ACTIVE
CLOUD OVERWRITE: DISABLED</div>

        ${renderArchiveTransferActions()}

        <div class="center">

          <button
            class="btn"
            onclick="showDashboard()">

            RETURN TO OFFICE

          </button>

        </div>

      </section>
    `;

    return;
  }


  if(!status.authenticated){

    app.innerHTML = `
      <section class="panel network-panel">

        <div class="seal">
          MINISTRY SECURITY NETWORK
        </div>

        <h1>
          Employee Account
        </h1>

        <h2>
          Secure Cross-Device Access
        </h2>

        ${renderNetworkMessage(
          message,
          messageKind
        )}

        <div class="notice">

          <p>
            Sign in to preserve this employee record
            on the Ministry Network.
          </p>

          <p class="muted">
            Signing in never replaces the local record.
            Cloud restoration always requires confirmation.
          </p>

          <label for="ministryAccountEmail">
            Account Email
          </label>

          <input
            id="ministryAccountEmail"
            class="field"
            type="email"
            autocomplete="email"
            placeholder="officer@example.com"
          >

          <label for="ministryAccountPassword">
            Passphrase
          </label>

          <input
            id="ministryAccountPassword"
            class="field"
            type="password"
            minlength="10"
            maxlength="128"
            autocomplete="current-password"
            placeholder="10 characters or more"
          >

        </div>

        <div class="terminal">NETWORK STATUS: ONLINE
AUTHENTICATION: REQUIRED
EMPLOYEE RECORD: ${escapeMinistryText(Player.getEmployeeId())}
LOCAL RECORD: PROTECTED</div>

        <div class="network-actions">

          <button
            class="btn"
            onclick="signInMinistryAccount()">

            SIGN IN

          </button>

          <button
            class="btn secondary"
            onclick="registerMinistryAccount()">

            CREATE ACCOUNT

          </button>

        </div>

        ${renderArchiveTransferActions()}

        <div class="center">

          <button
            class="btn secondary"
            onclick="showDashboard()">

            RETURN TO OFFICE

          </button>

        </div>

      </section>
    `;

    return;
  }


  app.innerHTML = `
    <section class="panel network-panel">

      <div class="seal">
        MINISTRY SECURITY NETWORK
      </div>

      <h1>
        Network Account Active
      </h1>

      <h2>
        ${escapeMinistryText(Player.getEmployeeId())}
      </h2>

      ${renderNetworkMessage(
        message,
        messageKind
      )}

      <div class="network-grid">

        <div class="portal-card">
          <h3>Authenticated Officer</h3>
          <p>${escapeMinistryText(status.email)}</p>
        </div>

        <div class="portal-card">
          <h3>Last Network Sync</h3>
          <p>${escapeMinistryText(
            getMinistrySyncLabel(
              status.lastSyncAt
            )
          )}</p>
        </div>

      </div>

      <div class="terminal">NETWORK STATUS: AUTHENTICATED
EMPLOYEE ID: ${escapeMinistryText(Player.getEmployeeId())}
LOCAL RECORD: ACTIVE
REMOTE RECORD: AVAILABLE
AUTOMATIC OVERWRITE: DISABLED</div>

      <div class="network-actions">

        <button
          class="btn"
          onclick="syncMinistryRecord()">

          SAVE TO MINISTRY NETWORK

        </button>

        <button
          class="btn secondary"
          onclick="restoreMinistryRecord()">

          RESTORE FROM NETWORK

        </button>

      </div>

      ${renderArchiveTransferActions()}

      <div class="network-actions">

        <button
          class="btn secondary"
          onclick="showDashboard()">

          RETURN TO OFFICE

        </button>

        <button
          class="btn danger"
          onclick="signOutMinistryAccount()">

          SIGN OUT THIS DEVICE

        </button>

      </div>

    </section>
  `;
}


function getMinistryAccountCredentials(){

  const emailField =
    document.getElementById(
      "ministryAccountEmail"
    );

  const passwordField =
    document.getElementById(
      "ministryAccountPassword"
    );


  return {
    email:
      emailField
        ? emailField.value
        : "",
    password:
      passwordField
        ? passwordField.value
        : ""
  };
}


async function signInMinistryAccount(){

  const credentials =
    getMinistryAccountCredentials();

  const result =
    await MinistryCloud.signIn(
      credentials.email,
      credentials.password
    );


  if(!result.success){

    showMinistryNetwork(
      result.reason === "invalid-password"
        ? "Use a passphrase of at least 10 characters."
        : result.reason === "invalid-email"
          ? "Enter a valid account email."
          : "The account details could not be verified.",
      "error"
    );

    return;
  }


  showMinistryNetwork(
    "Employee account authenticated. Local progress remains unchanged.",
    "success"
  );
}


async function registerMinistryAccount(){

  const credentials =
    getMinistryAccountCredentials();

  const result =
    await MinistryCloud.signUp(
      credentials.email,
      credentials.password
    );


  if(!result.success){

    showMinistryNetwork(
      result.reason === "invalid-password"
        ? "Use a passphrase of at least 10 characters."
        : result.reason === "invalid-email"
          ? "Enter a valid account email."
          : "The Ministry account could not be created.",
      "error"
    );

    return;
  }


  showMinistryNetwork(
    result.requiresEmailConfirmation
      ? "Account request received. Check your email before signing in."
      : "Employee account created and authenticated.",
    "success"
  );
}


async function signOutMinistryAccount(){

  const result =
    await MinistryCloud.signOut();


  showMinistryNetwork(
    result.success
      ? "This device has been signed out. Local employee progress was preserved."
      : "The account could not be signed out.",
    result.success
      ? "success"
      : "error"
  );
}


async function syncMinistryRecord(){

  const result =
    await MinistryStorage
      .pushToRemote();


  showMinistryNetwork(
    result.success
      ? "Employee record saved to the Ministry Network."
      : getArchiveFailureMessage(
          result.reason
        ),
    result.success
      ? "success"
      : "error"
  );
}


async function restoreMinistryRecord(){

  const approved =
    confirm(
      "Restore the Ministry Network record on this device?\n\n" +
      "The current local employee record will be replaced."
    );


  if(!approved){
    return;
  }


  const result =
    await MinistryStorage
      .pullFromRemote({
        replace:
          true
      });


  showMinistryNetwork(
    result.success
      ? "Network employee record restored on this device."
      : getArchiveFailureMessage(
          result.reason
        ),
    result.success
      ? "success"
      : "error"
  );
}


function downloadMinistryArchive(){

  const snapshot =
    MinistryStorage
      .createSnapshot();

  const validation =
    MinistryStorage
      .validateSnapshot(
        snapshot
      );


  if(!validation.valid){

    showMinistryNetwork(
      getArchiveFailureMessage(
        validation.reason
      ),
      "error"
    );

    return null;
  }


  const contents =
    JSON.stringify(
      snapshot,
      null,
      2
    );

  const blob =
    new Blob(
      [contents],
      {
        type:
          "application/json"
      }
    );

  const url =
    URL.createObjectURL(
      blob
    );

  const link =
    document.createElement(
      "a"
    );

  const safeEmployeeId =
    String(
      snapshot.employeeId ||
      "MOM-EMPLOYEE"
    ).replace(
      /[^A-Z0-9-]/gi,
      "-"
    );

  link.href =
    url;

  link.download =
    safeEmployeeId +
    "-Day-" +
    World.getDay() +
    "-Ministry-Archive.json";

  link.click();

  URL.revokeObjectURL(
    url
  );


  showMinistryNetwork(
    "Employee archive downloaded. Keep the file in a safe place.",
    "success"
  );

  return snapshot;
}


function openMinistryArchivePicker(){

  const picker =
    document.getElementById(
      "ministryArchiveFile"
    );


  if(picker){
    picker.click();
  }
}


async function importMinistryArchive(file){

  if(!file){
    return;
  }


  try{

    const contents =
      await file.text();

    const snapshot =
      JSON.parse(contents);

    const validation =
      MinistryStorage
        .validateSnapshot(
          snapshot
        );


    if(!validation.valid){

      await showMinistryNetwork(
        getArchiveFailureMessage(
          validation.reason
        ),
        "error"
      );

      return;
    }


    const currentEmployeeId =
      Player.getEmployeeId();

    const differentEmployee =
      currentEmployeeId !==
      "MOM-000000" &&
      snapshot.employeeId !==
      currentEmployeeId;

    const warning =
      differentEmployee
        ? "This archive belongs to " +
          snapshot.employeeId +
          ", not " +
          currentEmployeeId +
          ".\n\n"
        : "";

    const approved =
      confirm(
        warning +
        "Restore this employee archive?\n\n" +
        "The current local record will be replaced."
      );


    if(!approved){
      return;
    }


    const result =
      MinistryStorage
        .restoreSnapshot(
          snapshot,
          {
            replace:
              true
          }
        );


    await showMinistryNetwork(
      result.success
        ? "Employee archive restored successfully."
        : getArchiveFailureMessage(
            result.reason
          ),
      result.success
        ? "success"
        : "error"
    );
  }
  catch(error){

    console.error(
      "Employee archive import failed:",
      error
    );

    await showMinistryNetwork(
      "The selected file could not be read as a Ministry archive.",
      "error"
    );
  }
}
