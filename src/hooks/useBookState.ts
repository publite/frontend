import React, { useEffect, useState } from "react";
import { BookState } from "~/types/book";
import { loadBookState, saveBookState } from "~/utils/localStorage";

export const useBookState = (
  pagesReady: boolean,
  hash: string | undefined,
  goToPage: (pageNum: number) => void,
  currentPage: React.RefObject<number>
): [boolean, BookState | undefined] => {
  const [state, setState] = useState<BookState>();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (hash)
      loadBookState(
        hash,
        (obj) => setState(obj),
        () => setState({ currentPage: 0 })
      );
  }, [hash]);

  useEffect(() => {
    if (!ready && state?.currentPage && pagesReady) {
      goToPage(state.currentPage);
      setReady(true);
    } else if (hash && !ready && pagesReady && typeof state === "object") {
      saveBookState(hash, { currentPage: 0 });
      setReady(true);
    }
  }, [ready, state, goToPage]);

  useEffect(
    () => () => {
      if (hash) {
        if (ready && state) saveBookState(hash, state);
        else saveBookState(hash, { currentPage: currentPage.current || 0 });
      }
    },
    []
  );

  return [ready, state];
};
