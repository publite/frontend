import React from "react";

import plusIcon from "@assets/plus.svg";
import styles from "./AddBook.module.css";
import { BASE_URL } from "../../constants";
import { goTo } from "../../router/goTo";

export const AddBook = () => {
  return (
    <button
      onClick={() => {
        goTo(BASE_URL + "/upload");
      }}
      className={styles.container}
    >
      <img src={plusIcon} className={styles.plus} />
      <h1 className={styles.caption}>Add book</h1>
    </button>
  );
};
