import { Route } from "~/types/router";
import React from "react";

import { Bookshelf } from "~/pages/Bookshelf";
import { UploadForm } from "~/pages/UploadForm";

import { Router } from "~/router";
import { Err404 } from "~/router/404";

import styles from "./App.module.css";

const routes: Route[] = [
  { Component: Bookshelf, path: "/list" },
  { Component: UploadForm, path: "/upload" },
];

export const App = () => (
  <div className={styles.container}>
    <Router routes={routes} startPath="/list" DefaultComponent={Err404} />
  </div>
);

export default App;
