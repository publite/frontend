import React from "react";
import { useLibrary, UseLibraryReturnTuple } from "./hooks/useLibrary";
import { IBook } from "./types/book";

export const BookListContext = React.createContext<UseLibraryReturnTuple>([
  [],
  (book: IBook) => {},
]);

export const BookListContextProvider: React.FC = ({ children }) => {
  const library = useLibrary();

  return (
    <BookListContext.Provider value={library}>
      {children}
    </BookListContext.Provider>
  );
};
