/** @format */

import React, { Fragment, useEffect, useState } from "react";
import styles from "./VolumeControl.module.css";
import { Volume2, Volume1, VolumeOff } from "lucide-react";

const VolumeControl = ({ volumeController, defaultValue = null }) => {
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    volumeController(volume);
  }, [volume]);

  const onVolumeIconClick = (volume) => {
    setVolume((prevState) => volume);
  };

  useEffect(() => {
    console.log("componenet m");
    if (defaultValue !== null) {
      console.log("Enterd here");
      setVolume((prevState) => defaultValue);
    }
  }, []);

  const VolumeIconRender = () => {
    if (volume == 0) {
      return <VolumeOff onClick={() => onVolumeIconClick(1)} />;
    } else if (volume < 4) {
      return <Volume1 onClick={() => onVolumeIconClick(0)} />;
    }
    return <Volume2 onClick={() => onVolumeIconClick(0)} />;
  };
  return (
    <Fragment>
      <div className={`${styles.container}`}>
        <div className={`${styles.volume_slider_overlay_wrapper}`}>
          <div className={`${styles.volume_slider_container}`}>
            <input
              type="range"
              className={`${styles.volume_slider}`}
              max={10}
              min={0}
              value={volume}
              onChange={(event) => {
                setVolume((prevState) => event.target.value);
                console.log(volume, event.target.value);
              }}
            />
          </div>
        </div>
        <div className={`${styles.volume_container}`}>{VolumeIconRender()}</div>
      </div>
    </Fragment>
  );
};

export default VolumeControl;
