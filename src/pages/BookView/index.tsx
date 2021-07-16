import React, { useContext, useEffect, useRef, useState } from "react";
import { Redirect, useRoute } from "wouter";

import styles from "./BookView.module.css";

import { BookListContext } from "~/context";
import { usePagination } from "~/hooks/usePagination";

export const BookView = () => {
  const [match, params] = useRoute("/:hash");
  const [books] = useContext(BookListContext);

  const contentRef = useRef<HTMLDivElement>(null);
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const [ready, goToPage, currentPage] = usePagination(
    contentRef,
    pageContainerRef,
    pageRef,
    params?.hash ? books[params.hash]?.content : undefined
  );

  if (params?.hash && params.hash in books)
    return (
      <>
        {!ready && (
          <div className={styles.loadingIndicator}>
            <h1>Loading</h1>
          </div>
        )}
        <div className={styles.content} ref={contentRef} />
        <div
          style={{ visibility: "visible", height: "100%" }}
          className={styles.pageContainer}
          ref={pageContainerRef}
        >
          <div onClick={() => goToPage(currentPage + 1)} ref={pageRef} />
        </div>
      </>
    );
  return <Redirect to="/" />;
};
