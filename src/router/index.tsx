import React from "react";

import { BASE_URL } from "~/constants";
import { Route } from "~/types/router";
import { Err404 } from "./404";
import { goTo } from "./goTo";

interface IRouterProps {
  routes: Route[];
  startPath?: string;
  DefaultComponent?: React.FC;
}

export const Router = ({
  routes,
  startPath,
  DefaultComponent,
}: IRouterProps) => {
  const currPath = window.location.pathname;
  if (startPath && currPath === "/") goTo(BASE_URL + startPath);

  for (const route of routes) {
    if (currPath === route.path || currPath === route.path + "/")
      return <route.Component />;
  }

  if (DefaultComponent) return <DefaultComponent />;

  return <Err404 />;
};
