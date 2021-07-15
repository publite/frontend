import { IBook, optionalBookProps, requiredBookProps } from "@type/book";

import { API_URL } from "./constants";

export const validState = (file: File | undefined): file is File => {
  if (!file) throw new Error("Book file is required. Please, attach one");

  if (!file.name.match(/\.(fb2|epub)/))
    throw new Error(
      "Wrong file type. Only FB2 and Epub files are supported. \
      If you are trying to upload fb2.zip, please, uncopress it first."
    );

  if (file.size > 100 * 1024 * 1024)
    throw new Error(
      "File size is too big. Sorry, but parser is served on a rather cheap hosting, \
      so application can't handle such big files."
    );

  return true;
};

export const submitFile = async (
  file: File
): Promise<{ [key: string]: string }> => {
  const body = new FormData();
  body.append("file", file);

  try {
    const res = await fetch(API_URL + "/uploadfile/", {
      method: "POST",
      body,
    });

    return await res.json();
  } catch (err) {
    console.log("Network error:", err.message);
    throw err;
  }
};

export const validateResponse = (
  content: Record<string, unknown>
): content is IBook => {
  for (const key of requiredBookProps)
    if (!(key in content))
      throw new Error(`${key} is not specified in server response`);

  return true;
};
