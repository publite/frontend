import React from "react";
import Bookshelf from "../Bookshelf";
import { UploadForm } from "../UploadForm";
import styles from "./App.module.css";

export const App = () => (
  <div className={styles.container}>
    <UploadForm />
  </div>
);

export default App;
