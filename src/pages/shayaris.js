/** @format */

import PoetCard from "@/Component/PoetCard/PoetCard";
import style from "../styles/Shayaris.module.css";
import React, { Fragment, useState, useRef, useEffect } from "react";
import VolumeControl from "@/Component/UI/VolumeControl/VolumeControl";
import AudioComponent from "@/Component/UI/AudioComponent/AudioComponent";
import RootLayout from "@/Component/RootLayout/RootLayout";

export async function getServerSideProps() {
  //Fetch data from API
  let response = await fetch("http://localhost:3000/api/poems");
  let data = await response.json();
  return { props: { data } };
}

const Shayaris = (props) => {
  const { data } = props;
  const [track, setTrackToPlay] = useState({});
  const audioRef = useRef();

  const audioSrcLoader = (songId) => {
    try {
      audioRef.current.src = `/music/${songId}.mp3`;
      audioRef.current.load();
      console.log("playing music");
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    setTrackToPlay((prevState) => ({
      songName: "Sanson Ki Mala Violin Cover",
      artists: "Amanda Delara, Kaifi Khalil, Karpe",
      language: "hindi",
      origin: "local",
      feelings: 5,
      img: "images/piya_calling.jpg",
      songId: "p01",
    }));

    // audioRef.current.volume = 0;
  }, []);
  useEffect(() => {
    console.log(audioRef.current);
    setTimeout(() => {
      audioSrcLoader(track.songId);
      if (audioRef.current) {
        audioRef.current.volume = 0;
      }
    }, 1000);

    // audioRef.current.volume = 0;
  }, [track]);

  //Audio Componenet control Listener
  const controlListenerHanlder = (action) => {
    switch (action.type) {
      case "play":
        console.log("Shariya play music");
        audioRef.current.play();
        break;
      case "pause":
        audioRef.current.pause();

        break;

      case "ended":
        audioSrcLoader(track.songId);
        break;
      case "volume":
        audioRef.current.volume = action.volume / 10;
        if (action.volume != 0) return audioRef.current.play();
        return audioRef.current.pause();

      default:
        //no-opt
        break;
    }
  };

  return (
    <Fragment>
      <RootLayout>
        <div>
          {data ? (
            data?.map((poem, _) => {
              return (
                <PoetCard
                  key={poem.id}
                  poetry={poem.poetry}
                  meaning={poem.meaning}
                />
              );
            })
          ) : (
            <p>Loading ...</p>
          )}
        </div>
        <div className={`${style.volume_controller}`}>
          <VolumeControl
            defaultValue={0}
            volumeController={(volume) =>
              controlListenerHanlder({ type: "volume", volume: volume })
            }
          />
        </div>
        <div className={`${style.audio_player_hidden}`}>
          <AudioComponent
            ref={audioRef}
            controlListener={controlListenerHanlder}
            trackDetails={track}
          />
        </div>
      </RootLayout>
    </Fragment>
  );
};

export default Shayaris;
