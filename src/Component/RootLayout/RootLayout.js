/** @format */

import React, { Children, Fragment } from "react";
import styles from "./RootLayout.module.css";
import { Poppins } from "next/font/google";
import Navigation from "../Navigation/Navigation";

const poppins = Poppins({
  weight: ["100", "400", "600", "700"],
  subsets: ["latin"],
});

const RootLayout = ({ children }) => {
  return (
    <Fragment>
      <div className={`${poppins.className} ${styles.container}`}>
        <Navigation />
        <div className={`${styles.child_container}`}>{children}</div>
      </div>
    </Fragment>
  );
};

export default RootLayout;
