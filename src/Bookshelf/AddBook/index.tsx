import React from "react";

import plusIcon from "./plus.svg";
import styles from "./AddBook.module.css";

export const AddBook = () => {
  return (
    <button className={styles.container}>
      <img src={plusIcon} className={styles.plus} />
      <h1 className={styles.caption}>Add book</h1>
    </button>
  );
};
