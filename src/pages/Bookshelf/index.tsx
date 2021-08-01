import React, { useEffect, useState } from "react";

import styles from "./Bookshelf.module.css";

import { BookItem } from "./BookItem";
import { AddBook } from "./AddBook";
import { IPageProps } from "~/types/page";
import { API_URL } from "~/constants";
import { BookT } from "~/types/book";
import { connected as swConnected } from "~/utils/serviceFetch";

export const Bookshelf = ({ setLoading }: IPageProps) => {
  useEffect(() => setLoading(true), []);

  const [books, setBooks] = useState<BookT[]>([]);

  useEffect(() => {
    swConnected.then(async () => {
      try {
        const res = await fetch(API_URL + "/list");
        setBooks(await res.json());
      } catch (err) {
        if (process.env.NODE_ENV === "development") console.error(err);
      }
    });
  }, []);

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
