/** @format */

import React, { useState, forwardRef } from "react";
import styles from "./AudioComponent.module.css";
import { Play, Pause, SkipForward, SkipBack, X } from "lucide-react";
import VolumeControl from "../VolumeControl/VolumeControl";

const AudioComponent = forwardRef(({ controlListener, trackDetails }, ref) => {
  const [playerState, setState] = useState({
    play: false,
    trackDuration: 0,
    trackDurationPlayed: 0,
    playbackRate: 1,
    playerClosed: false,
  });

  const convertSecToMinutes = (time) => {
    let minutes = Math.floor(time / 60);
    let extraSeconds = Math.round(time % 60);
    extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
    return `${minutes}:${extraSeconds}`;
  };

  const stateHandler = (key, value) => {
    setState((prevState) => {
      prevState[key] = value;
      return { ...prevState };
    });
  };

  return (
    <React.Fragment>
      <div>
        <audio
          ref={ref}
          autoPlay
          preload="metadata"
          style={{ display: "none" }}
          onPlay={() => {
            stateHandler("play", true);
            if (!playerState["playerClosed"]) {
              stateHandler("playerClosed", !playerState["playerClosed"]);
            }
            controlListener({
              type: "play",
            });
          }}
          onPause={() => {
            stateHandler("play", false);
            controlListener({
              type: "durationPlayed",
              payload: ref.current.currentTime,
            });
          }}
          onTimeUpdate={() => {
            stateHandler("trackDurationPlayed", ref.current.currentTime);
          }}
          onEnded={() => {
            stateHandler("play", false);
            controlListener({ type: "ended" });
          }}
          onLoadedMetadata={(value) => {
            stateHandler("trackDuration", ref.current.duration);
            controlListener({ type: "loadedMetaData" });
          }}
        ></audio>
        {playerState["playerClosed"] && (
          <div className={`${styles.container}`}>
            <div>
              <input
                type="range"
                className={`${styles.slider}`}
                onChange={(e) => {
                  controlListener({ type: "seek", payload: e.target.value });
                  stateHandler("trackDurationPlayed", e.target.value);
                }}
                value={playerState["trackDurationPlayed"]}
                min={0}
                max={playerState["trackDuration"]}
              />
            </div>
            {/** Track Details */}
            <div className={`${styles.track_container}`}>
              <div className={`${styles.image_container}`}>
                <img
                  src={`/images/${trackDetails.songId}.jpeg`}
                  alt={`${trackDetails.songId}.jpeg`}
                />
              </div>
              <div className={`${styles.track_details}`}>
                <span>{trackDetails.songName}</span>
                <span>{trackDetails.artists}</span>
              </div>
            </div>
            {/** Control Panel */}
            <div className={`${styles.controls}`}>
              <div onClick={(e) => controlListener({ type: "backward" })}>
                <SkipBack className={`${styles.control_icons}`} />
              </div>
              <div>
                {playerState["play"] ? (
                  <Pause
                    className={`${styles.control_icons}`}
                    onClick={(e) => {
                      controlListener({ type: "pause" });
                    }}
                  />
                ) : (
                  <Play
                    className={`${styles.control_icons}`}
                    onClick={(e) => {
                      controlListener({ type: "play" });
                    }}
                  />
                )}
              </div>
              <div onClick={(e) => controlListener({ type: "forward" })}>
                <SkipForward className={`${styles.control_icons}`} />
              </div>

              <VolumeControl
                volumeController={(volume) =>
                  controlListener({ type: "volume", volume: volume })
                }
              />
            </div>
            <div className={`${styles.trackDuration}`}>
              <span>
                {convertSecToMinutes(playerState["trackDurationPlayed"])}
              </span>
              /<span>{convertSecToMinutes(playerState["trackDuration"])}</span>
              <div className={`${styles.close_icon_container}`}>
                <X
                  size={18}
                  strokeWidth={2}
                  color="#212529"
                  onClick={(e) => {
                    stateHandler("playerClosed", !playerState["playerClosed"]);
                    controlListener({ type: "close" });
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
});

export default AudioComponent;
