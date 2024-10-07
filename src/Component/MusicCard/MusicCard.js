/** @format */

import { Fragment, memo } from "react";
import style from "./MusicCard.module.css";
import { Play } from "lucide-react";

const MusicCard = ({ onClickPlay, songId, trackDetails, trackIndex }) => {
  console.log("render", trackDetails);
  return (
    <Fragment>
      <div className={`${style.container}`}>
        <div className={`${style.image_container}`}>
          <img
            src={`images/${trackDetails.songId}.jpeg`}
            alt="default_img.jpeg"
          />
          <div className={`${style.overlay}`}></div>
          <div className={`${style.play_icon_container}`}>
            <Play
              size={18}
              className={`${style.icon}`}
              onClick={(event) => onClickPlay(event, trackDetails, trackIndex)}
            />
          </div>
        </div>
        <div className={`${style.footer}`}>
          <span>{trackDetails.songName}</span>
          <span>{trackDetails.artists}</span>
        </div>
      </div>
    </Fragment>
  );
};

export default memo(MusicCard);
