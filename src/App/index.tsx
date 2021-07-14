import React from "react";
import Bookshelf from "../Bookshelf";
import styles from "./App.module.css";

export const App = () => (
  <div className={styles.container}>
    <Bookshelf />
  </div>
);

export default App;
