import { IBook } from "~/types/book";
import { isArrOfStr } from "~/types/utils";
import { validateResponse } from "~/utils/api";

export const getHashList = () => {
  const hashListStr = localStorage.getItem("list") || "[]";
  const hashList: unknown = JSON.parse(hashListStr);

  if (isArrOfStr(hashList)) return hashList;
  else {
    localStorage.setItem("list", "[]");
    return [];
  }
};

export const getBookHT = (hashList: string[]) => {
  const bookHT: Record<string, IBook> = {};

  hashList.forEach((hash) => {
    const obj: unknown = JSON.parse(localStorage.getItem(hash) || "{}");
    if (validateResponse(obj)) bookHT[hash] = obj;
  });

  return bookHT;
};

export const saveBook = (key: string, book: IBook) =>
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
    const obj: unknown = JSON.parse(str);

    if (validatePages(obj)) {
      cb(obj);
      return true;
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
