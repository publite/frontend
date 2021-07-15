import { useEffect, useState } from "react";
import { IBook } from "~/types/book";
import {
  getBookList,
  getTitleList,
  setBook,
  updateTitleList,
} from "~/utils/localStorage";

export type AddBookFT = (book: IBook) => void;

export type UseLibraryReturnTuple = [IBook[], AddBookFT];

export const useLibrary = (): UseLibraryReturnTuple => {
  const [bookList, setBookList] = useState<IBook[]>([]);
  const [titleList, setTitleList] = useState<string[]>([]);

  const addBook: AddBookFT = (book) => {
    const key = book.hash || Date.now().toString();
    if (key && !titleList.includes(key)) {
      setTitleList([key, ...titleList]);
      setBookList([book, ...bookList]);

      setBook(key, book);
    }
  };

  useEffect(() => {
    const receivedTitleList = getTitleList();

    setTitleList(receivedTitleList);
    setBookList(getBookList(receivedTitleList));
  }, []);

  useEffect(() => updateTitleList(titleList), [titleList]);

  return [bookList, addBook];
};
