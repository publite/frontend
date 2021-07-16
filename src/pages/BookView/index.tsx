import React, { useContext, useEffect, useRef } from "react";
import { Redirect, useRoute } from "wouter";

import styles from "./BookView.module.css";

import { BookListContext } from "~/context";
import { usePagination } from "~/hooks/usePagination";
import { IPageProps } from "~/types/page";

export const BookView = ({ setLoading, loading }: IPageProps) => {
  useEffect(() => setLoading(true), []);

  const [_, params] = useRoute("/:hash");
  const [books] = useContext(BookListContext);

  const contentRef = useRef<HTMLDivElement>(null);
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const [ready, goToPage, currentPage] = usePagination(
    contentRef,
    pageContainerRef,
    pageRef,
    params?.hash && books && loading ? books[params.hash]?.content : undefined
  );

  const currentPageRef = useRef(currentPage);

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  useEffect(() => {
    if (ready) {
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
  }, [ready]);

  if (books) {
    if (params?.hash && params.hash in books)
      return (
        <>
          <div className={styles.content} ref={contentRef} />
          <div className={styles.pageContainer} ref={pageContainerRef}>
            <div ref={pageRef} />
          </div>
        </>
      );
    return <Redirect to="/" />;
  } else return <></>;
};
