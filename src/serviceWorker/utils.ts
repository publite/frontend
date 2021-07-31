/**
 * Gets hash string from book path
 */
export const getHash = (path: string) => {
  let hashLength = path.length - "/book/".length;
  if (path.endsWith("/")) hashLength--;

  return path.substr("/book/".length, hashLength);
};
