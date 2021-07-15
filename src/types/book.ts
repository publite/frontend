export const requiredBookProps = ["title", "author", "content"] as const;
export const optionalBookProps = ["cover", "hash"] as const;

export type IBook = {
  [key in typeof requiredBookProps[number]]: string;
} &
  {
    [key in typeof optionalBookProps[number]]: string | undefined;
  };
