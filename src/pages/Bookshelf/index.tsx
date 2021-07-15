import React, { useContext, useEffect, useState } from "react";

import styles from "./Bookshelf.module.css";

import { BookItem } from "./BookItem";
import { AddBook } from "./AddBook";
import { BookListContext } from "~/context";

export const Bookshelf = () => {
  const [books] = useContext(BookListContext);

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
