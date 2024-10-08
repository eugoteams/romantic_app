/** @format */

import React, { Fragment } from "react";
import styles from "./Spinner.module.css";

const Spinner = (props) => {
  return (
    <Fragment>
      <div className={`${styles.container}`}>
        <span className={`${styles.loader}`}></span>
        <p className={`${styles.spinner_message}`}>Loading ...</p>
      </div>
    </Fragment>
  );
};

export default Spinner;
