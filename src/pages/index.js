/** @format */

import localFont from "next/font/local";
import styles from "../styles/Home.module.css";
import { Fragment } from "react";
import { Music, BookOpen } from "lucide-react";
import RootLayout from "@/Component/RootLayout/RootLayout";
import Link from "next/link";
import { APP_NAME } from "@/Utils/Config";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <Fragment>
      <RootLayout>
        <div className={`${styles.container}`}>
          <h1 className={`${styles.title}`}>{APP_NAME}</h1>
          <p className={`${styles.description}`}>
            Leنور , Le legend ,Le Myth <br />
            Le Rolls -Royce of all the human beings.
          </p>
          <div className={`${styles.CTA_container}`}>
            <Link href={"/shayaris"}>
              <button className={`${styles.action_button}`}>
                <Music size={14} strokeWidth={3} />
                <p>music</p>
              </button>
            </Link>
            <Link href={"/music"}>
              <button className={`${styles.action_button}`}>
                <BookOpen size={14} strokeWidth={3} />
                <p>poems</p>
              </button>
            </Link>
          </div>
        </div>
      </RootLayout>
    </Fragment>
  );
}
