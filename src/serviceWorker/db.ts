import * as idb from "idb";
import { BookT } from "~/types/book";
import { DB_NAME, DB_VERSION } from "../constants";
import { PubliteDB } from "./schema";

/**
 * Opens IndexedDB for interactions
 */
export const openDB = () =>
  idb.openDB<PubliteDB>(DB_NAME, DB_VERSION, {
    upgrade: (db, oldVersion, _, tsx) => {
      if (oldVersion < 1) db.createObjectStore("Books", { keyPath: "hash" });
    },
  });

/**
 * Saves IBook object in IndexedDB
 */
export const saveBook = async (book: BookT) =>
  (await openDB()).add("Books", book);
