/** @format */

import { act, Fragment, useCallback, useEffect, useRef, useState } from "react";
import style from "../styles/Music.module.css";
import MusicCard from "@/Component/MusicCard/MusicCard";
import AudioComponent from "@/Component/UI/AudioComponent/AudioComponent";
import RootLayout from "@/Component/RootLayout/RootLayout";

export async function getServerSideProps() {
  //Fetch data from API
  let response = await fetch(`${process.env.ENV_VARIABLE}/api/musics`);
  let data = await response.json();
  console.log(data);
  return { props: { data } };
}

const Music = (props) => {
  const [track, setTrackToPlay] = useState({});
  const audioRef = useRef();
  let musicRecords = props.data;

  const audioSrcLoader = (songId) => {
    try {
      audioRef.current.src = `/music/${songId}.mp3`;
      audioRef.current.load();
    } catch (error) {
      console.log("error");
    }
  };

  const onClickPlayListener = useCallback((event, trackDetails, trackIndex) => {
    event.preventDefault();

    setTrackToPlay((prevState) => ({
      trackDetails: { ...trackDetails },
      trackId: trackIndex,
    }));
  }, []);

  //Render componenet when track renderes...
  useEffect(() => {
    audioSrcLoader(track.trackDetails?.songId);
  }, [track]);

  //Audio Componenet control Listener
  const controlListenerHanlder = (action) => {
    switch (action.type) {
      case "play":
        audioRef.current.play();
        break;
      case "pause":
        audioRef.current.pause();

        break;
      case "forward":
        let nextTrackId = track.trackId + 1;
        let nextSong = musicRecords[nextTrackId];
        setTrackToPlay((prevState) => ({
          trackDetails: { ...nextSong },
          trackId: nextTrackId,
        }));

        break;
      case "backward":
        let prevTrackId = track.trackId - 1;
        let prevSong = musicRecords[prevTrackId];
        if (prevTrackId >= 0) {
          setTrackToPlay((prevState) => ({
            trackDetails: { ...prevSong },
            trackId: prevTrackId,
          }));
        }
        break;
      case "seek":
        audioRef.current.currentTime = action.payload;
        break;
      case "close":
        audioRef.current.pause();
        break;
      case "playBackRate":
        audioRef.current.playbackRate = action.payload;
        break;
      case "ended":
        let endPlayNextTrackId = track.trackId + 1;
        let endPlayNextSong = musicRecords[endPlayNextTrackId];
        setTrackToPlay((prevState) => ({
          trackDetails: { ...endPlayNextSong },
          trackId: endPlayNextTrackId,
        }));
        break;
      case "volume":
        audioRef.current.volume = action.volume / 10;
        break;
      default:
        //no-opt
        break;
    }
  };

  return (
    <Fragment>
      <RootLayout>
        <div>
          <div className={`${style.music_container}`}>
            {musicRecords ? (
              musicRecords.map((musicRecord, index) => {
                return (
                  <div className={`${style.music_item_wrapper}`}>
                    <MusicCard
                      onClickPlay={onClickPlayListener}
                      key={musicRecord.songId}
                      trackDetails={musicRecord}
                      trackIndex={index}
                    />
                  </div>
                );
              })
            ) : (
              <p>Loading</p>
            )}
          </div>

          <AudioComponent
            ref={audioRef}
            controlListener={controlListenerHanlder}
            trackDetails={track.trackDetails}
          />
        </div>
      </RootLayout>
    </Fragment>
  );
};

export default Music;
