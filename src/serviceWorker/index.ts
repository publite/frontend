import { fromCache, precache } from "./cache";
import { openDB as createDB } from "./db";
import {
  handle,
  handleBook,
  handleBooks,
  handleBookUpload,
  PathHandler,
} from "./fetchHandlers";
import { getHash } from "./utils";

declare const self: ServiceWorkerGlobalScope;

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(precache());
});

self.addEventListener("activate", (event) => event.waitUntil(createDB()));

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const path = new URL(request.url).pathname;

  const handlers: PathHandler[] = [
    { path: "/list", getResponse: () => handleBooks() },
    { path: "/book/", getResponse: () => handleBook(request, getHash(path)) },
    { path: "/upload", getResponse: () => handleBookUpload(request) },
    { path: "", getResponse: () => fromCache(request) },
  ];

  event.respondWith(handle(path, handlers));
});
