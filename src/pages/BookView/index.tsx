import React, { MouseEventHandler, useState, useEffect, useRef } from "react";
import { Redirect, useRoute } from "wouter";

import styles from "./BookView.module.css";

import { usePagination } from "~/hooks/usePagination";
import { IPageProps } from "~/types/page";
import { useBookState } from "~/hooks/useBookState";
import { BookT } from "~/types/book";
import { API_URL } from "~/constants";
import { validateResponse } from "~/utils/api";

export const BookView = ({ setLoading, loading }: IPageProps) => {
  useEffect(() => setLoading(true), []);

  const [hasErr, setHasErr] = useState(false);
  const [book, setBook] = useState<BookT>();

  const [_, params] = useRoute("/:hash");

  const contentRef = useRef<HTMLDivElement>(null);
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (params?.hash) {
      (async () => {
        try {
          const res = await fetch(API_URL + "/book/" + params.hash);
          if (!res.ok) throw new Error(res.status + " " + res.statusText);

          const book: unknown = await res.json();

          if (validateResponse(book)) setBook(book);
        } catch (err) {
          if (process.env.NODE_ENV === "development") console.error(err);
          setHasErr(true);
          setLoading(false);
        }
      })();
    }
  }, []);

  const [pagesReady, goToPage, currentPage, pagesNumber] = usePagination(
    contentRef,
    pageContainerRef,
    pageRef,
    book ? params?.hash : undefined,
    params?.hash ? book?.content : undefined
  );

  const currentPageRef = useRef(currentPage);

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  const [bookStateReady, bs] = useBookState(
    pagesReady,
    params?.hash,
    goToPage,
    currentPageRef
  );

  useEffect(() => {
    if (bookStateReady) {
      setLoading(false);

      const handleKey = ({ key }: KeyboardEvent) => {
        switch (key) {
          case "ArrowLeft":
            goToPage(currentPageRef.current - 1);
            break;
          case "ArrowRight":
            goToPage(currentPageRef.current + 1);
            break;
        }
      };

      window.addEventListener("keydown", handleKey);
    }
  }, [bookStateReady]);

  const goPrev = () => goToPage(currentPage - 1);
  const goNext = () => goToPage(currentPage + 1);
  const insertNumber: MouseEventHandler<HTMLSpanElement> = (e) => {
    const str = prompt("Page number");
    if (str) {
      const n = parseInt(str);
      if (!isNaN(n) && n > 0) goToPage(n - 1);
    }
  };

  if (hasErr) return <Redirect to="/" />;

  return (
    <>
      <div
        className={`${styles.border} ${styles.leftBorder}`}
        onClick={goPrev}
      />
      <div className={styles.content} ref={contentRef} />
      <div className={styles.pageContainer} ref={pageContainerRef}>
        <div className={styles.page} ref={pageRef} onClick={goNext} />
      </div>
      <div
        className={`${styles.border} ${styles.rightBorder}`}
        onClick={goNext}
      />
      <div className={styles.pageIndicator}>
        <button className={styles.pageSwitchArrow} onClick={goPrev}>
          {currentPage !== 0 && "←"}
        </button>
        <span className={styles.pageNumber} onClick={insertNumber}>
          {currentPage + 1} / {pagesNumber}
        </span>
        <button className={styles.pageSwitchArrow} onClick={goNext}>
          {currentPage !== pagesNumber - 1 && "→"}
        </button>
      </div>
    </>
  );
};
