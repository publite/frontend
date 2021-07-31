import { precache } from "./cache";
import { openDB as createDB } from "./db";

declare const self: ServiceWorkerGlobalScope;

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(precache());
});

self.addEventListener("activate", (event) => event.waitUntil(createDB()));
