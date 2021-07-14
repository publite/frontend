import React, { useState } from "react";
import { IBook } from "../types/book";

import styles from "./Bookshelf.module.css";

import list from "../assets/bookList.json";
import { BookItem } from "./BookItem";
import { AddBook } from "./AddBook";

export const Bookshelf = () => {
  const [books, setBooks] = useState<IBook[]>(list);

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

export default Bookshelf;
