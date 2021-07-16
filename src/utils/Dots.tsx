import React, { useEffect, useState } from "react";

export const Dots = () => {
  const [n, setN] = useState(3);

  useEffect(() => {
    const timeout = setTimeout(() => setN((n + 1) % 4), 500);

    return () => clearTimeout(timeout);
  }, [n]);

  return <span>{".".repeat(n)}</span>;
};
