import { IBook } from "~/types/book";
import { isArrOfStr } from "~/types/utils";
import { validateResponse } from "~/api";

export const getTitleList = () => {
  const titleListStr = localStorage.getItem("list") || "[]";
  const titleList: unknown = JSON.parse(titleListStr);

  if (isArrOfStr(titleList)) return titleList;
  else {
    localStorage.setItem("list", "[]");
    return [];
  }
};

export const getBookList = (titleList: string[]) =>
  titleList
    .map<unknown>((hash) => JSON.parse(localStorage.getItem(hash) || "{}"))
    .filter((obj): obj is IBook => {
      try {
        return validateResponse(obj);
      } catch (err) {
        if (import.meta.env.NODE_ENV === "development")
          console.log(err.message);
        return false;
      }
    });

export const setBook = (key: string, book: IBook) =>
  localStorage.setItem(key, JSON.stringify(book));

export const updateTitleList = (titleList: string[]) =>
  localStorage.setItem("list", JSON.stringify(titleList));
