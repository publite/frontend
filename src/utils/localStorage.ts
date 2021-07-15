import { IBook } from "~/types/book";
import { isArrOfStr } from "~/types/utils";
import { validateResponse } from "~/api";
import { BookItem } from "~/pages/Bookshelf/BookItem";

const readBookList = <T>(
  cb: (bookList: string[]) => T,
  defaultValue: T extends void ? undefined : T
) => {
  const bookListStr = localStorage.getItem("list") || "[]";
  const bookList: unknown = JSON.parse(bookListStr);

  if (isArrOfStr(bookList)) return cb(bookList);
  return defaultValue;
};

export const saveBook = (bookObj: IBook, key: string) =>
  readBookList((bookList) => {
    if (!bookList.includes(key)) {
      const newBookList = [key, ...bookList];

      localStorage.setItem("list", JSON.stringify(newBookList));
      localStorage.setItem(key, JSON.stringify(bookObj));
    }
  }, undefined);

export const readBooks = (): IBook[] =>
  readBookList(
    (bookList) =>
      bookList
        .map((hash) => JSON.parse(localStorage.getItem(hash) || "{}"))
        .filter((e) => {
          try {
            return validateResponse(e);
          } catch (err) {
            return false;
          }
        }),
    []
  );
