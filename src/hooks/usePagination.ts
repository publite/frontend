import React, { useEffect, useState } from "react";

type TextNode = Text & { nodeValue: string };
type PositionElement = [number, TextNode];
type IdPositions = Record<string, number>;
type UsePaginationReturnTuple = [
  ready: boolean,
  goToPage: (pageNum: number) => void,
  currentPage: number
];

const isTextNode = (el: Node): el is TextNode => el.nodeType === Node.TEXT_NODE;
const isElementNode = (el: Node): el is HTMLElement =>
  el.nodeType === Node.ELEMENT_NODE;

export const usePagination = (
  contentEl: React.RefObject<HTMLDivElement>,
  pageContainerEl: React.RefObject<HTMLDivElement>,
  pageEl: React.RefObject<HTMLDivElement>,
  bookContent?: string
): UsePaginationReturnTuple => {
  const [ready, setReady] = useState(false);
  const [positions, setPositions] = useState<PositionElement[]>([]);
  const [idPositions, setIdPositions] = useState<IdPositions>({});
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const computeStartPositionsOfElements = (root: HTMLDivElement) => {
    const positionToElement: PositionElement[] = [];
    const idPositions: IdPositions = {};

    const recursive = (currentPosition: number, element: Node): number => {
      if (isTextNode(element)) {
        positionToElement.push([currentPosition, element]);
        return currentPosition + element.nodeValue.length;
      } else if (isElementNode(element)) {
        if (element.id && element.id != null)
          idPositions[element.id] = currentPosition;

        const children = element.childNodes;

        const newCurrentPosition = Array.from(children).reduce(
          recursive,
          currentPosition
        );

        return newCurrentPosition;
      } else {
        return currentPosition;
      }
    };

    recursive(0, root);

    setPositions(positionToElement);
    setIdPositions(idPositions);
  };

  const findPages = (page: HTMLElement, pageContainer: HTMLElement) => {
    const pages = [];
    pages.push(0);
    let jump = 100;

    while (pages[pages.length - 1] < getMaxPosition()) {
      if (pages.length > 2)
        jump = pages[pages.length - 1] - pages[pages.length - 2];

      const endPosition = findPage(
        pages[pages.length - 1],
        jump,
        page,
        pageContainer
      );
      pages.push(endPosition);
    }

    clearPage(page);

    setPages(pages);
    setCurrentPage(0);
  };

  const findPage = (
    startPosition: number,
    initialJump: number,
    page: HTMLElement,
    pageContainer: HTMLElement
  ) => {
    let previousEndPosition = getMaxPosition();
    let endPosition = findNextSpaceForPosition(startPosition + initialJump);

    copyTextToPage(startPosition, endPosition, page);
    while (!scrollNecessary(pageContainer) && endPosition < getMaxPosition()) {
      previousEndPosition = endPosition;
      endPosition = findNextSpaceForPosition(endPosition + 1);
      copyTextToPage(startPosition, endPosition, page);
    }

    while (scrollNecessary(pageContainer) && endPosition > startPosition) {
      previousEndPosition = endPosition;
      endPosition = findPreviousSpaceForPosition(endPosition - 1);
      copyTextToPage(startPosition, endPosition, page);
    }

    if (endPosition === startPosition) return previousEndPosition;
    return endPosition;
  };

  const findNextSpaceForPosition = (startPosition: number) => {
    let i = 0;
    while (i < positions.length - 1 && positions[i + 1][0] < startPosition) i++;

    const el = positions[i][1];
    let d = startPosition - positions[i][0];
    const str = el.nodeValue || "";
    while (d < str.length && str.charAt(d) != " ") d++;

    if (d >= str.length) {
      if (i == positions.length - 1) return getMaxPosition();
      else return positions[i + 1][0];
    } else {
      return positions[i][0] + d;
    }
  };

  const findPreviousSpaceForPosition = (startPosition: number) => {
    let i = 0;
    while (i < positions.length - 1 && positions[i + 1][0] < startPosition) i++;

    const el = positions[i][1];
    let d = startPosition - positions[i][0];
    const str = el.nodeValue || "";
    while (d > 0 && str.charAt(d) != " ") d--;

    return positions[i][0] + d;
  };

  const scrollNecessary = (pageContainer: HTMLElement) =>
    pageContainer.scrollHeight > pageContainer.clientHeight ||
    pageContainer.scrollWidth > pageContainer.clientWidth;

  const copyTextToPage = (from: number, to: number, page: HTMLElement) => {
    const range = document.createRange();

    const startEl = getElementForPosition(from);
    const startElement = startEl[1];
    const locationInStartEl = from - startEl[0];
    range.setStart(startElement, locationInStartEl);

    const endEl = getElementForPosition(to);
    const endElement = endEl[1];
    const locationInEndEl = to - endEl[0];
    range.setEnd(endElement, locationInEndEl);

    page.innerHTML = "";
    page.appendChild(range.cloneContents());
  };

  const clearPage = (page: HTMLElement) => {
    page.innerHTML = "";
  };

  const getPageForId = (id: string) => getPageForPosition(getPositionForId(id));

  const getMaxPosition = () => {
    const [pos, el] = positions[positions.length - 1];
    return pos + el.nodeValue.length || 0;
  };

  const getPositionForId = (id: string) => {
    if (id in idPositions) return idPositions[id];
    return 0;
  };

  const getPageForPosition = (pos: number) => {
    for (const [pageNum, pagePos] of pages.entries())
      if (pagePos > pos) return pageNum - 1;

    return pages.length - 2;
  };

  const getElementForPosition = (pos: number) => {
    for (const [i, [currPos, _]] of positions.entries())
      if (currPos > pos) return positions[i - 1];

    return positions[positions.length - 1];
  };

  const jumpToLocation = (page: HTMLElement) => {
    const url = new URL(window.location.href);

    const positionStr = url.searchParams.get("position");

    if (url.href.lastIndexOf("#") > 0) {
      const id = url.href.substring(
        url.href.lastIndexOf("#") + 1,
        url.href.length
      );
      displayPage(getPageForId(id), page);
    } else if (positionStr) {
      const pos = parseInt(positionStr);
      displayPage(getPageForPosition(pos), page);
    } else {
      displayPage(0, page);
    }
  };

  const displayPage = (pageNum: number, page: HTMLElement) => {
    if (pageNum >= 0 && pageNum < pages.length - 1) {
      setCurrentPage(pageNum);
      const startPosition = pages[pageNum];
      copyTextToPage(startPosition, pages[pageNum + 1], page);
      setReady(true);
    }
  };

  useEffect(() => {
    if (contentEl.current && bookContent) {
      contentEl.current.innerHTML = bookContent;
      computeStartPositionsOfElements(contentEl.current);
    }
  }, [bookContent]);

  useEffect(() => {
    if (positions.length && pageEl.current && pageContainerEl.current)
      findPages(pageEl.current, pageContainerEl.current);
  }, [positions, idPositions]);

  useEffect(() => {
    if (pageEl.current && pages.length && !ready)
      jumpToLocation(pageEl.current);
  }, [pages]);

  const makeDisplayPage = (page: React.RefObject<HTMLDivElement>) => {
    if (page.current)
      return (pageNum: number) => displayPage(pageNum, page.current!);
    else return (pageNum: number) => {};
  };

  return [ready, makeDisplayPage(pageEl), currentPage];
};
