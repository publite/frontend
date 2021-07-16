import { useEffect, useState } from "react";
import { IBook } from "~/types/book";
import {
  getBookHT,
  getHashList,
  saveBook,
  updateHashList,
} from "~/utils/localStorage";

export type AddBookFT = (book: IBook) => void;

export type UseLibraryReturnTuple = [
  Record<string, IBook> | null,
  AddBookFT,
  string[]
];

export const useLibrary = (): UseLibraryReturnTuple => {
  const [library, setLibrary] = useState<Record<string, IBook> | null>(null);
  const [hashList, setHashList] = useState<string[]>([]);

  const addBook: AddBookFT = (book) => {
    const key = book.hash || Date.now().toString();
    if (key && !hashList.includes(key)) {
      setHashList([key, ...hashList]);
      setLibrary((prev) => ({ [key]: book, ...prev }));

      saveBook(key, book);
    }
  };

  useEffect(() => {
    const receivedHashList = getHashList();

    setHashList(receivedHashList);
    setLibrary(getBookHT(receivedHashList));
  }, []);

  useEffect(() => updateHashList(hashList), [hashList]);

  return [library, addBook, hashList];
};
