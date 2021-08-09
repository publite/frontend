import { DBSchema } from "idb";
import { BookT } from "../types/book";

export interface PubliteDB extends DBSchema {
  Books: {
    key: string;
    value: BookT;
  };
}
