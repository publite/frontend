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
export const fromCache = async (request: Request): Promise<Response> => {
  try {
    const response = await fetch(request);
    (await getCache()).put(request, response.clone());
    return response;
  } catch (err) {
    const response = await (await getCache()).match(request);
    return response || new Response();
  }
};
