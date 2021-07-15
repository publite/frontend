import React, { useState } from "react";

import plusIcon from "@assets/plus.svg";
import styles from "./UploadForm.module.css";
import { submitFile, validateResponse, validState } from "../api";

export const UploadForm = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const processFile = async (file: File | undefined) => {
    try {
      if (validState(file)) {
        setError("");

        setLoading(true);
        const res = await submitFile(file);
        setLoading(false);

        if (validateResponse(res)) {
          // TODO: save book to localstorage
          // TODO: redirect to main menu
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    processFile(e.currentTarget.files?.[0]);

  const handleFileDrop = (e: React.DragEvent<HTMLFormElement>) =>
    processFile(e.dataTransfer.files[0]);

  const handleDragOver = (e: React.DragEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <form
      className={styles.container}
      onDrop={handleFileDrop}
      onDragOver={handleDragOver}
    >
      <label className={styles.label} htmlFor="file">
        <img className={styles.plus} src={plusIcon} />
        <span>
          Choose book file or drag and drop it
          <br />
          <span className={styles.error}>{error}</span>
        </span>
      </label>
      <input
        className={styles.fileInput}
        onChange={handleFileChange}
        type="file"
        name="file"
        id="file"
      />
    </form>
  );
};
