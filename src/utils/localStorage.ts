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
