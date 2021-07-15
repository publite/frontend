import React, { useEffect, useState } from "react";
import { IBook } from "~/types/book";

import styles from "./Bookshelf.module.css";

import { BookItem } from "./BookItem";
import { AddBook } from "./AddBook";
import { readBooks } from "~/utils/localStorage";

export const Bookshelf = () => {
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    setBooks(readBooks());
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.scrollContainer}>
        <AddBook />
        {books.map((book, index) => (
          <BookItem key={book.hash} {...book} />
        ))}
      </div>
    </div>
  );
};
