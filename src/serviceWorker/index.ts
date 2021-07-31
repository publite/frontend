import { precache } from "./cache";

declare const self: ServiceWorkerGlobalScope;

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(precache());
});

export type {};
