import React from "react";
import { useRoute } from "wouter";

export const BookView = () => {
  const [match, params] = useRoute("/:hash");

  return <div></div>;
};
