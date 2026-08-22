const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");


function pass(message){

  console.log(
    "PASS:",
    message
  );
}


function response(label){

  return {
    label,
    ok:
      true,
    type:
      "basic",
    clone(){
      return response(label);
    }
  };
}


function request(url, overrides = {}){

  return {
    method:
      "GET",
    url,
    mode:
      "cors",
    destination:
      "script",
    headers: {
      has(){
        return false;
      }
    },
    ...overrides
  };
}


async function run(){

  const listeners = {};
  const deletedCaches = [];
  const cachedValues = new Map();
  const cachePuts = [];
  let precachedPaths = [];
  let clientsClaimed = false;


  const cache = {

    async addAll(paths){
      precachedPaths = paths.slice();
    },

    async match(value){

      const key =
        typeof value === "string"
          ? value
          : value.url;

      return cachedValues.get(key);
    },

    async put(value, storedResponse){

      const key =
        typeof value === "string"
          ? value
          : value.url;

      cachePuts.push(key);
      cachedValues.set(
        key,
        storedResponse
      );
    }

  };


  const context = {
    URL,
    Set,
    Promise,
    console,
    fetch:
      async () => response("network"),
    caches: {
      async open(){
        return cache;
      },
      async keys(){

        return [
          "hidden-files-portal-old",
          "hidden-files-portal-2.0.0-public-alpha.1",
          "unrelated-site-cache"
        ];
      },
      async delete(name){

        deletedCaches.push(name);
        return true;
      }
    },
    self: {
      location: {
        origin:
          "https://ministry.test"
      },
      clients: {
        async claim(){
          clientsClaimed = true;
        }
      },
      addEventListener(type, listener){
        listeners[type] = listener;
      }
    }
  };


  vm.createContext(context);

  vm.runInContext(
    fs.readFileSync(
      path.resolve(
        __dirname,
        "../portal/service-worker.js"
      ),
      "utf8"
    ),
    context,
    {
      filename:
        "portal/service-worker.js"
    }
  );


  let installWork = null;

  listeners.install({
    waitUntil(work){
      installWork = work;
    }
  });

  await installWork;

  assert.ok(
    precachedPaths.length > 30
  );
  assert.ok(
    precachedPaths.includes(
      "./index.html"
    )
  );
  assert.ok(
    precachedPaths.includes(
      "./offline.html"
    )
  );
  pass("Service worker install pre-caches the complete portal shell");


  let activateWork = null;

  listeners.activate({
    waitUntil(work){
      activateWork = work;
    }
  });

  await activateWork;

  assert.deepEqual(
    deletedCaches,
    [
      "hidden-files-portal-old"
    ]
  );
  assert.equal(
    clientsClaimed,
    true
  );
  pass("Activation deletes only obsolete portal caches and preserves unrelated caches");


  const onlineNavigation =
    request(
      "https://ministry.test/portal/",
      {
        mode:
          "navigate",
        destination:
          "document"
      }
    );

  let onlineResult = null;

  listeners.fetch({
    request:
      onlineNavigation,
    respondWith(work){
      onlineResult = work;
    }
  });

  assert.equal(
    (await onlineResult).label,
    "network"
  );
  assert.ok(
    cachePuts.includes(
      onlineNavigation.url
    )
  );
  pass("Online navigation refreshes the cached portal document");


  cachedValues.set(
    "./index.html",
    response("cached-index")
  );

  context.fetch =
    async () => {
      throw new Error("offline");
    };

  const offlineNavigation =
    request(
      "https://ministry.test/portal/employee",
      {
        mode:
          "navigate",
        destination:
          "document"
      }
    );

  let offlineResult = null;

  listeners.fetch({
    request:
      offlineNavigation,
    respondWith(work){
      offlineResult = work;
    }
  });

  assert.equal(
    (await offlineResult).label,
    "cached-index"
  );
  pass("Offline navigation returns the cached portal without mutating employee data");


  let crossOriginIntercepted = false;

  listeners.fetch({
    request:
      request(
        "https://project.supabase.co/rest/v1/employee_saves"
      ),
    respondWith(){
      crossOriginIntercepted = true;
    }
  });

  assert.equal(
    crossOriginIntercepted,
    false
  );
  pass("Cross-origin cloud and account traffic bypasses the service worker");


  let postIntercepted = false;

  listeners.fetch({
    request:
      request(
        "https://ministry.test/portal/records",
        {
          method:
            "POST"
        }
      ),
    respondWith(){
      postIntercepted = true;
    }
  });

  assert.equal(
    postIntercepted,
    false
  );
  pass("Non-GET requests bypass the offline cache");


  cachedValues.set(
    "https://ministry.test/portal/js/portal.js",
    response("cached-script")
  );

  context.fetch =
    async () => response("fresh-script");

  let staticResult = null;
  let revalidation = null;

  listeners.fetch({
    request:
      request(
        "https://ministry.test/portal/js/portal.js"
      ),
    respondWith(work){
      staticResult = work;
    },
    waitUntil(work){
      revalidation = work;
    }
  });

  assert.equal(
    (await staticResult).label,
    "cached-script"
  );

  await revalidation;

  assert.equal(
    cachedValues
      .get(
        "https://ministry.test/portal/js/portal.js"
      )
      .label,
    "fresh-script"
  );
  pass("Cached static assets load immediately and revalidate in the background");


  console.log(
    "\nService worker runtime test completed successfully."
  );
}


run().catch(error => {

  console.error(error);
  process.exit(1);

});
