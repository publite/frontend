import React, { useState } from "react";
import { Route, Switch } from "wouter";

import { Bookshelf } from "~/pages/Bookshelf";
import { BookView } from "~/pages/BookView";
import { UploadForm } from "~/pages/UploadForm";
import { Dots } from "~/utils/Dots";

import styles from "./App.module.css";
import { Navbar } from "./Navbar";

export const App = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.loadingIndicator}>
          <h1>
            Loading
            <Dots />
          </h1>
        </div>
      )}
      <Navbar />
      <Switch>
        <Route path="/upload">
          <UploadForm setLoading={setLoading} loading={loading} />
        </Route>
        <Route path="/">
          <Bookshelf setLoading={setLoading} loading={loading} />
        </Route>
        <Route path="/:hash">
          <BookView setLoading={setLoading} loading={loading} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
