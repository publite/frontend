import React, { useContext, useEffect, useState } from "react";

import styles from "./Bookshelf.module.css";

import { BookItem } from "./BookItem";
import { AddBook } from "./AddBook";
import { BookListContext } from "~/context";
import { IPageProps } from "~/types/page";

export const Bookshelf = ({ setLoading }: IPageProps) => {
  useEffect(() => setLoading(true), []);

  const [books] = useContext(BookListContext);

  useEffect(() => {
    if (books) setLoading(false);
  }, [books]);

  if (books)
    return (
      <div className={styles.container}>
        <div className={styles.scrollContainer}>
          <AddBook />
          {Object.values(books).map((book, index) => (
            <BookItem key={book.hash} {...book} />
          ))}
        </div>
      </div>
    );
  else return <></>;
};
