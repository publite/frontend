import React from "react";
import { Route, Switch } from "wouter";
import { BookListContextProvider } from "~/context";

import { Bookshelf } from "~/pages/Bookshelf";
import { BookView } from "~/pages/BookView";
import { UploadForm } from "~/pages/UploadForm";

import styles from "./App.module.css";

export const App = () => (
  <div className={styles.container}>
    <BookListContextProvider>
      <Switch>
        <Route path="/upload" component={UploadForm} />
        <Route path="/" component={Bookshelf} />
        <Route path="/:hash" component={BookView} />
      </Switch>
    </BookListContextProvider>
  </div>
);

export default App;
