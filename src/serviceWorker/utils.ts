/**
 * Gets hash string from book path
 */
export const getHash = (path: string) => {
  let hashLength = path.length - "/book/".length;
  if (path.endsWith("/")) hashLength--;

  return path.substr("/book/".length, hashLength);
};

export const composeResponseStatus = (err: Error): ResponseInit => {
  if (err.name === "NetowrkError")
    return { status: 503, statusText: err.message };
  else return { status: 500, statusText: "Something bad happened (IDK)" };
};
