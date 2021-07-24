export const requiredBookProps = ["title", "author", "content"] as const;
export const optionalBookProps = ["cover", "hash"] as const;

export type BookT = {
  [key in typeof requiredBookProps[number]]: string;
} &
  {
    [key in typeof optionalBookProps[number]]: string | undefined;
  };

export type BookState = {
  currentPage: number;
};
