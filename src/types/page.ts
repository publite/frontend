import React from "react";

export interface IPageProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}
