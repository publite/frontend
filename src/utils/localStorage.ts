import { BookState, BookT } from "~/types/book";
import { isArrOfStr } from "~/types/utils";
import { validateResponse } from "~/utils/api";

export const getHashList = () => {
  const hashListStr = localStorage.getItem("list") || "[]";
  try {
    const hashList: unknown = JSON.parse(hashListStr);

    if (isArrOfStr(hashList)) return hashList;
    else throw new Error("ValidationError");
  } catch (e) {
    console.error(e);
    localStorage.setItem("list", "[]");
    return [];
  }
};

export const getBookHT = (hashList: string[]) => {
  const bookHT: Record<string, BookT> = {};

  hashList.forEach((hash) => {
    try {
      const obj: unknown = JSON.parse(localStorage.getItem(hash) || "{}");
      if (validateResponse(obj)) bookHT[hash] = obj;
    } catch (e) {
      console.error(e);
    }
  });

  return bookHT;
};

export const saveBook = (key: string, book: BookT) =>
  localStorage.setItem(key, JSON.stringify(book));

export const updateHashList = (hashList: string[]) =>
  localStorage.setItem("list", JSON.stringify(hashList));

const validatePages = (obj: unknown): obj is number[] => {
  if (obj && Array.isArray(obj)) {
    for (const el of obj) if (typeof el !== "number") return false;
    return true;
  }
  return false;
};

export const hashStr = (hash: string, height: number, width: number) =>
  `pages-${hash}-${height}-${width}`;

export const loadPages = (
  hash: string,
  height: number,
  width: number,
  cb: (pages: number[]) => void
) => {
  const str = localStorage.getItem(hashStr(hash, height, width));

  if (str) {
    try {
      const obj: unknown = JSON.parse(str);

      if (validatePages(obj)) {
        cb(obj);
        return true;
      }
    } catch (e) {
      console.error(e);
    }
  }

  return false;
};

export const savePages = (
  hash: string,
  height: number,
  width: number,
  pages: number[]
) => localStorage.setItem(hashStr(hash, height, width), JSON.stringify(pages));

export const validateBookState = (obj: unknown): obj is BookState =>
  Boolean(
    obj &&
      typeof obj === "object" &&
      !Array.isArray(obj) &&
      "currentPage" in obj
  );

export const loadBookState = (
  hash: string,
  cb: (bookState: BookState) => void,
  ecb: () => void
) => {
  const str = localStorage.getItem(hash + "-state");

  if (str) {
    try {
      const obj: unknown = JSON.parse(str);

      if (validateBookState(obj)) {
        cb(obj);
        return true;
      }
    } catch (e) {
      console.error(e);
    }
  }

  ecb();
};

export const saveBookState = (hash: string, state: BookState) =>
  localStorage.setItem(hash + "-state", JSON.stringify(state));
