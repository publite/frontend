import React, { useState } from "react";

const validState = (input: HTMLInputElement) => {
  const file = input.files?.[0];

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

export const UploadForm = () => {
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const fileInput = e.currentTarget;

    try {
      validState(fileInput);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input">Book file</label>
        <input
          required
          onChange={handleFileChange}
          type="file"
          name="file"
          id="file"
        />
        <p>{error}</p>
        <input type="submit" value="test" disabled={error !== ""} />
      </form>
    </div>
  );
};
