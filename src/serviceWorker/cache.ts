import { CACHE } from "../constants";

const getCache = () => caches.open(CACHE);

/**
 * Caches static files for application
 */
export const precache = async () =>
  (await getCache()).addAll(["/", "/index.js", "/sw.js"]);

/**
 * Requests file from network or gets it from cache if offline
 */
export const fromCache = async (request: Request) => {
  try {
    const response = await fetch(request);
    (await getCache()).put(request, response);
    return response;
  } catch (err) {
    return (await getCache()).match(request);
  }
};
