export const isArrOfStr = (obj: unknown): obj is string[] => {
  if (Array.isArray(obj)) {
    for (const el of obj) if (typeof el !== "string") return false;
    return true;
  }
  return false;
};
