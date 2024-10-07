/** @format */

import React, { Fragment } from "react";
import styles from "./Navigation.module.css";
import { APP_NAME } from "@/Utils/Config";
import { Dot } from "lucide-react";
import Link from "next/link";

const Navigation = (props) => {
  return (
    <Fragment>
      <div className={`${styles.container}`}>
        <div className={`${styles.logo}`}>
          <p>{APP_NAME}</p>
          <Dot strokeWidth={4} className={`${styles.icon}`} />
        </div>
        <div className={`${styles.nav_wrapper_container}`}>
          <nav className={`${styles.nav_container}`}>
            <Link href={"/"}>home</Link>
            <Link href={"/shayaris"}>shayaris</Link>
            <Link href={"/music"}>music</Link>
            <Link href={"/about"}>about</Link>
          </nav>
        </div>
      </div>
    </Fragment>
  );
};

export default Navigation;
