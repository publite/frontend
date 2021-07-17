import React from "react";
import { useLocation } from "wouter";

import PlusIcon from "~/assets/plus.svg";
import styles from "./AddBook.module.css";

export const AddBook = () => {
  const [_, setLocation] = useLocation();

  return (
    <button
      onClick={() => {
        setLocation("/upload");
      }}
      className={styles.container}
    >
      <PlusIcon className={styles.plus} />
      <h1 className={styles.caption}>Add book</h1>
    </button>
  );
};
