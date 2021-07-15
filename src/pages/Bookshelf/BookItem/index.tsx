import React from "react";

import styles from "./BookItem.module.css";

import { IBook } from "~/types/book";

interface IBookItemProps extends IBook {}

export const BookItem = ({ author, title, cover }: IBookItemProps) => {
  return (
    <div className={styles.bookCard}>
      <div className={styles.cardHeading}>
        <h1>{title}</h1>
        <h2>{author}</h2>
      </div>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={cover}
          alt={title + " cover picture"}
        />
      </div>
    </div>
  );
};
