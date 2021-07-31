export interface PathHandler {
  /** Path start for handler */
  path: string;
  /** Function returning Response object */
  getResponse: () => Response | Promise<Response>;
}

/**
 * Routes fetch request path to specified handler
 */
export const handle = (requestPath: string, table: PathHandler[]) => {
  for (const { path, getResponse: response } of table)
    if (requestPath.startsWith(path)) return response();

  return new Response();
};
