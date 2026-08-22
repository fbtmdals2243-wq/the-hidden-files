const CACHE_NAMESPACE =
  "hidden-files-portal-";

const CACHE_NAME =
  `${CACHE_NAMESPACE}2026-08-step-29`;

const APP_SHELL = [
  "./",
  "./index.html",
  "./offline.html",
  "./privacy.html",
  "./manifest.webmanifest",
  "./css/portal.css",
  "./icons/ministry-seal-192.png",
  "./icons/ministry-seal-512.png",
  "./js/app-shell.js",
  "./js/storage-engine.js",
  "./js/cloud-config.js",
  "./js/cloud-engine.js",
  "./js/identity-engine.js",
  "./js/questions.js",
  "./js/interview.js",
  "./js/npc-data.js",
  "./js/document-engine.js",
  "./js/case-data.js",
  "./js/news-data.js",
  "./js/notice-data.js",
  "./js/dialogue.js",
  "./js/orientation.js",
  "./js/case-engine.js",
  "./js/prophet.js",
  "./js/owl-mail.js",
  "./js/notice-board.js",
  "./js/player-engine.js",
  "./js/world-engine.js",
  "./js/daily-work.js",
  "./js/training.js",
  "./js/career-review.js",
  "./js/final-review.js",
  "./js/relationship.js",
  "./js/personnel.js",
  "./js/cloud-portal.js",
  "./js/promotion.js",
  "./js/dashboard.js",
  "./js/whitmore.js",
  "./js/portal.js"
];

const CACHEABLE_DESTINATIONS =
  new Set([
    "document",
    "font",
    "image",
    "manifest",
    "script",
    "style"
  ]);


self.addEventListener(
  "install",
  event => {

    event.waitUntil(
      caches
        .open(CACHE_NAME)
        .then(cache => cache.addAll(APP_SHELL))
    );
  }
);


self.addEventListener(
  "activate",
  event => {

    event.waitUntil(
      caches
        .keys()
        .then(names => Promise.all(
          names
            .filter(name => (
              name.startsWith(CACHE_NAMESPACE) &&
              name !== CACHE_NAME
            ))
            .map(name => caches.delete(name))
        ))
        .then(() => self.clients.claim())
    );
  }
);


function canHandleRequest(request){

  if(request.method !== "GET"){
    return false;
  }

  const url =
    new URL(request.url);

  if(url.origin !== self.location.origin){
    return false;
  }

  if(request.headers.has("range")){
    return false;
  }

  return (
    request.mode === "navigate" ||
    CACHEABLE_DESTINATIONS.has(request.destination)
  );
}


async function cacheSuccessfulResponse(cache, request, response){

  if(
    response &&
    response.ok &&
    response.type === "basic"
  ){

    await cache.put(
      request,
      response.clone()
    );
  }

  return response;
}


async function handleNavigation(request){

  const cache =
    await caches.open(CACHE_NAME);

  try{

    const response =
      await fetch(request);

    return await cacheSuccessfulResponse(
      cache,
      request,
      response
    );

  }catch(error){

    return (
      await cache.match(request) ||
      await cache.match("./index.html") ||
      await cache.match("./offline.html")
    );
  }
}


async function handleStaticAsset(event){

  const request =
    event.request;

  const cache =
    await caches.open(CACHE_NAME);

  const cached =
    await cache.match(request);

  const networkResponse =
    fetch(request)
      .then(response => (
        cacheSuccessfulResponse(
          cache,
          request,
          response
        )
      ));

  if(cached){

    event.waitUntil(
      networkResponse.catch(() => undefined)
    );

    return cached;
  }

  return networkResponse;
}


self.addEventListener(
  "fetch",
  event => {

    const request =
      event.request;

    if(!canHandleRequest(request)){
      return;
    }

    if(request.mode === "navigate"){

      event.respondWith(
        handleNavigation(request)
      );

      return;
    }

    event.respondWith(
      handleStaticAsset(event)
    );
  }
);
