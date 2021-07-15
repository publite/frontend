import { IBook } from "@type/book";
import { isArrOfStr } from "@type/utils";

export const saveBook = (bookObj: IBook, key: string): void => {
  const bookListStr = localStorage.getItem("list") || "[]";
  const bookList: unknown = JSON.parse(bookListStr);

  if (isArrOfStr(bookList) && !bookList.includes(key)) {
    const newBookList = [key, ...bookList];

    localStorage.setItem("list", JSON.stringify(newBookList));
    localStorage.setItem(key, JSON.stringify(bookObj));
  }
};
