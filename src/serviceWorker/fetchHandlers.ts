import { getBook, getBooks, saveBook } from "./db";

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

/**
 * Converts book to html with publiteBackend server.
 *
 * First fetch handler with network request
 */
export const handleBookUpload = async (request: Request) => {
  try {
    const res = await fetch(request);
    if (res.ok) {
      const book = await res.json();
      await saveBook(book);
      return new Response(book);
    } else throw new Error(res.status.toString() + res.statusText);
  } catch (err) {
    return new Response(JSON.stringify(err));
  }
};

/**
 * Gets all books from database
 */
export const handleBooks = async () => {
  const list = await getBooks();

  return new Response(JSON.stringify(list));
};

/**
 * Gets book from database
 */
export const handleBook = async (request: Request, hash: string) => {
  const book = await getBook(hash);
  if (book) return new Response(JSON.stringify(book));

  return new Response("No such book :(");
};
