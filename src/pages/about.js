/** @format */

import React, { Fragment } from "react";
import style from "../styles/About.module.css";
import { APP_NAME } from "@/Utils/Config";
import RootLayout from "@/Component/RootLayout/RootLayout";

const About = (props) => {
  return (
    <Fragment>
      <RootLayout>
        <div className={`${style.container}`}>
          <h1>{APP_NAME}</h1>
          <p className={`${style.description}`}>
            I knew right at first glance that you were so different, a magic in
            your way of carrying yourself-an effortless elegance that seems to
            draw the whole world around you into stillness. It's not just the
            fact that you are beautiful-that is just undeniable. Instead, it's
            this strength and warmth that emanates from you, how effortlessly
            easy it would be to make every place you enter brighter, every
            conversation more meaningful because you are a part of it. Every
            time you speak, with such thoughtful wisdom, so captivated. You do
            not just talk; you connect them and make people feel you are really
            listening and seeing them. And the way you laugh-it's like sunlight
            piercing those clouds, lifting the spirit of whoever is fortunate
            enough to hear it. You can make this simplest moment of life
            something extraordinary and unforgettable. But it's more than that;
            it's your heart, shining bright.
          </p>
        </div>
      </RootLayout>
    </Fragment>
  );
};

export default About;
