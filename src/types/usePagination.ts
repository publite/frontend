export type TextNode = Text & { nodeValue: string };
export type PositionElement = [number, TextNode];
export type IdPositions = Record<string, number>;
export type UsePaginationReturnTuple = [
  ready: boolean,
  goToPage: (pageNum: number) => void,
  currentPage: number,
  pageNumber: number
];
