// ─────────────────────────────────────────────────────────────────────────────
//  lib/appwrite.js — Appwrite SDK bootstrap
//
//  This file must be loaded AFTER the Appwrite CDN <script> tag in index.html
//  so that `window.Appwrite` is already available.
//
//  It mirrors the canonical ESM initialisation shown in the Appwrite docs:
//
//    import { Client, Account, Databases } from "appwrite";
//    const client = new Client()
//        .setEndpoint("https://sgp.cloud.appwrite.io/v1")
//        .setProject("69b67ac60019d400836a");
//    const account   = new Account(client);
//    const databases = new Databases(client);
//    export { client, account, databases };
//
//  Because this project uses the browser IIFE build (window.Appwrite),
//  we expose the same three objects as globals instead of ES module exports.
//
//  client.ping() is called automatically on page load to verify the
//  Appwrite backend is reachable.
// ─────────────────────────────────────────────────────────────────────────────

(function () {
  var _sdk = window.Appwrite;
  if (!_sdk) {
    console.error('lib/appwrite.js: window.Appwrite is not defined — make sure the CDN script loads before this file.');
    return;
  }

  // ── Client ────────────────────────────────────────────────────────────────
  var client = new _sdk.Client()
    .setEndpoint('https://sgp.cloud.appwrite.io/v1')
    .setProject('69b67ac60019d400836a');

  // ── Account & Databases ───────────────────────────────────────────────────
  var account   = new _sdk.Account(client);
  var databases = new _sdk.Databases(client);

  // ── Export as globals (equivalent to ES module exports) ───────────────────
  window.appwriteClient    = client;
  window.appwriteAccount   = account;
  window.appwriteDatabases = databases;

  // ── Ping — automatically verify the backend connection on page load ────────
  // client.ping() was added in Appwrite JS SDK v16+ and returns a promise.
  // A successful ping logs a confirmation; a failure logs a warning so the
  // rest of the page continues to work even if the backend is temporarily down.
  if (typeof client.ping === 'function') {
    client.ping()
      .then(function () {
        console.log('[Appwrite] ✅ Ping successful — backend is reachable.');
      })
      .catch(function (err) {
        console.warn('[Appwrite] ⚠️ Ping failed — check endpoint / project ID.', err);
      });
  } else {
    console.warn('[Appwrite] client.ping() is not available in this SDK version.');
  }
})();
