import { API_URL } from "~/constants";
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

self.addEventListener("install", (event) => event.waitUntil(precache()));

self.addEventListener("activate", (event) => {
  self.clients.claim();
  event.waitUntil(createDB());
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const path = new URL(request.url).pathname;

  let handlers: PathHandler[];

  if (request.url.startsWith(API_URL)) {
    handlers = [
      { path: "/list", getResponse: () => handleBooks() },
      { path: "/book/", getResponse: () => handleBook(request, getHash(path)) },
      { path: "/uploadfile", getResponse: () => handleBookUpload(request) },
    ];
  } else {
    handlers = [{ path: "", getResponse: () => fromCache(request) }];
  }

  event.respondWith(handle(path, handlers));
});
