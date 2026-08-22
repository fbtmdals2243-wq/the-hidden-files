(function initializeMinistryAppShell(){

  const app =
    document.getElementById("app");

  const networkStatus =
    document.getElementById("networkStatus");

  const installButton =
    document.getElementById("installAppButton");

  let installPrompt = null;
  let onlineMessageTimer = null;


  function announceConnection(message, persistent){

    if(!networkStatus){
      return;
    }

    clearTimeout(onlineMessageTimer);

    networkStatus.textContent = message;
    networkStatus.hidden = false;

    if(!persistent){

      onlineMessageTimer =
        setTimeout(() => {

          networkStatus.hidden = true;
          networkStatus.textContent = "";

        }, 4200);
    }
  }


  function updateConnectionStatus(announceOnline){

    const isOnline =
      navigator.onLine !== false;

    document.documentElement.dataset.network =
      isOnline ? "online" : "offline";

    if(!isOnline){

      announceConnection(
        "Offline mode · Cached Ministry records remain available on this device.",
        true
      );

      return;
    }

    if(announceOnline){

      announceConnection(
        "Connection restored · Ministry network resources are available.",
        false
      );

      return;
    }

    if(networkStatus){
      networkStatus.hidden = true;
    }
  }


  function focusRenderedView(){

    if(!app){
      return;
    }

    const heading =
      app.querySelector("h1");

    if(!heading){
      return;
    }

    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }


  if(app && "MutationObserver" in window){

    const viewObserver =
      new MutationObserver(() => {

        queueMicrotask(focusRenderedView);

      });

    viewObserver.observe(
      app,
      {
        childList: true
      }
    );

    queueMicrotask(focusRenderedView);
  }


  window.addEventListener(
    "offline",
    () => updateConnectionStatus(false)
  );

  window.addEventListener(
    "online",
    () => updateConnectionStatus(true)
  );

  updateConnectionStatus(false);


  window.addEventListener(
    "beforeinstallprompt",
    event => {

      event.preventDefault();
      installPrompt = event;

      if(installButton){
        installButton.hidden = false;
      }
    }
  );


  if(installButton){

    installButton.addEventListener(
      "click",
      async () => {

        if(!installPrompt){
          return;
        }

        const prompt = installPrompt;

        installPrompt = null;
        installButton.disabled = true;

        try{

          await prompt.prompt();
          await prompt.userChoice;

        }finally{

          installButton.hidden = true;
          installButton.disabled = false;
        }
      }
    );
  }


  window.addEventListener(
    "appinstalled",
    () => {

      installPrompt = null;

      if(installButton){
        installButton.hidden = true;
      }

      announceConnection(
        "Ministry Portal installed on this device.",
        false
      );
    }
  );


  function watchForUpdate(registration){

    if(registration.waiting){

      announceConnection(
        "A Ministry Portal update is ready and will activate after all portal tabs are closed.",
        false
      );
    }

    registration.addEventListener(
      "updatefound",
      () => {

        const worker =
          registration.installing;

        if(!worker){
          return;
        }

        worker.addEventListener(
          "statechange",
          () => {

            if(
              worker.state === "installed" &&
              navigator.serviceWorker.controller
            ){

              announceConnection(
                "A Ministry Portal update is ready and will activate after all portal tabs are closed.",
                false
              );
            }
          }
        );
      }
    );
  }


  if(
    "serviceWorker" in navigator &&
    window.location.protocol !== "file:"
  ){

    window.addEventListener(
      "load",
      async () => {

        try{

          const registration =
            await navigator.serviceWorker.register(
              "./service-worker.js",
              {
                scope: "./"
              }
            );

          watchForUpdate(registration);

        }catch(error){

          console.warn(
            "Ministry Portal offline registration failed.",
            error
          );
        }
      }
    );
  }

})();
