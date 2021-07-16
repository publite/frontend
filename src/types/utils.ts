export const isArrOfStr = (obj: unknown): obj is string[] => {
  if (Array.isArray(obj)) {
    for (const el of obj) if (typeof el !== "string") return false;
    return true;
  }
  return false;
};

export const isObject = (obj: unknown): obj is Record<string, unknown> => {
  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    for (const key of Object.keys(obj))
      if (typeof key !== "string") return false;
    return true;
  }

  return false;
};
