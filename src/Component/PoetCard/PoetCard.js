/** @format */

import React, { Fragment } from "react";
import styles from "./PoetCard.module.css";

const PoetCard = ({ poetry, meaning }) => {
  return (
    <Fragment>
      <div className={`${styles.container}`}>
        <p className={`${styles.poet}`}>{poetry}</p>
        <p className={`${styles.meaning}`}>{meaning}</p>
      </div>
    </Fragment>
  );
};

export default PoetCard;
