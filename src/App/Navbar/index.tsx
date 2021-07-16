import React from "react";

import styles from "./Navbar.module.css";
import logoIcon from "~/assets/logo.svg";
import { useLocation, Link } from "wouter";

export const Navbar = () => {
  const [path] = useLocation();

  return (
    <div
      className={styles.container}
      style={path === "/" ? { height: "15vh" } : undefined}
    >
      <Link href="/">
        {path === "/" ? (
          <a>
            <img
              className={styles.logo}
              src={logoIcon}
              alt="Publite logotype"
              title="Publite"
            />
          </a>
        ) : (
          <a className={styles.title}>Publite</a>
        )}
      </Link>
    </div>
  );
};
