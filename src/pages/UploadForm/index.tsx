import React, { useState } from "react";
import { useLocation } from "wouter";

import PlusIcon from "~/assets/plus.svg";
import styles from "./UploadForm.module.css";
import { submitFile, validateResponse, validState } from "~/utils/api";
import { IPageProps } from "~/types/page";

export const UploadForm = ({ setLoading }: IPageProps) => {
  const [error, setError] = useState("");
  const [_, setLocation] = useLocation();

  const processFile = async (file: File | undefined) => {
    try {
      if (validState(file)) {
        setError("");

        setLoading(true);
        const res = await submitFile(file);
        setLoading(false);

        if (validateResponse(res)) setLocation("/");
      }
    } catch (err) {
      setLoading(false);
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
        <PlusIcon className={styles.plus} />
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
