import React from "react";

import styles from "./BookItem.module.css";

import { BookT } from "~/types/book";
import { Link } from "wouter";

interface IBookItemProps extends BookT {}

export const BookItem = ({ author, title, cover, hash }: IBookItemProps) => {
  return (
    <Link href={hash!}>
      <a className={styles.bookCard}>
        <div className={styles.cardHeading}>
          <h1>{title}</h1>
          <h2>{author}</h2>
        </div>
        {cover && (
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={cover}
              alt={title + " cover picture"}
            />
          </div>
        )}
      </a>
    </Link>
  );
};
