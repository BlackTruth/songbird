import React, { createRef } from 'react';
import { Media, Player, controls } from 'react-media-player';

import styles from './audioCard.module.scss';

import defaultBird from '../../assets/images/defaultBird.jpg';

const {
  PlayPause, MuteUnmute, Duration, SeekBar, Volume, CurrentTime,
} = controls;

interface IAudioCard {
  className: string,
  image?: string,
  audioUrl?: string,
  name?: string,
  latin?: string,
  description?: string,
  isFull?: boolean,
  isAnswered?: boolean,
  isCorrect?: boolean,
}

interface IAudioPlayer {
  url: string,
}

const MediaPlayer: React.FC < IAudioPlayer > = ({ url }:IAudioPlayer) => {
  const playRef = createRef<HTMLDivElement>();
  const playerRef = createRef<HTMLElement>();
  const togglePlay = () => {
    const elems: HTMLElement | null = playRef.current;
    const play = elems?.querySelector('button');
    if (play?.classList.contains(styles.playing)) {
      play?.classList.remove(styles.playing);
    } else {
      play?.classList.add(styles.playing);
    }
  };
  return (
    <Media>
      <div>
        <div>
          <Player src={url} onPlay={togglePlay} onPause={togglePlay} />
        </div>
        <div className={styles.audioCardMainRightAudioControls} ref={playRef}>
          <PlayPause ref={playerRef} />
          <SeekBar className={styles.seekBar} />
          <div className={styles.audioCardMainRightAudioControlsSound}>
            <MuteUnmute />
            <Volume className={styles.volume} />
            <div className={styles.audioCardMainRightAudioControlsTime}>
              <CurrentTime />
              <div>/</div>
              <Duration />
            </div>
          </div>
        </div>
      </div>
    </Media>
  );
};

const AudioCard: React.FC< IAudioCard > = ({
  className, image, audioUrl, name, latin, description, isFull, isAnswered, isCorrect,
}: IAudioCard) => {
  let data = null;
  if (isFull && !isAnswered) {
    data = (<div>Прослушайте аудио и выберите название птицы, чей голос прозвучал.</div>);
  } else {
    data = (
      <div className={styles.audioCardMain}>
        <img src={!isFull && !isCorrect ? defaultBird : image} alt="bird" className={styles.audioCardMainImage} />
        <div className={styles.audioCardMainRight}>
          <span className={styles.audioCardMainRightName}>{!isFull && !isCorrect ? '*****' : name}</span>
          {isFull ? (<span className={styles.audioCardMainRightLatin}>{latin}</span>) : null}
          <div className={styles.audioCardMainRightAudio}>
            <MediaPlayer url={audioUrl || ''} />
          </div>
        </div>
      </div>
    );
    if (isFull) {
      data = (
        <>
          {data}
          <span className={styles.audioCardDescription}>{description}</span>
        </>
      );
    }
  }
  return (
    <div className={`${styles.audioCard} ${className}`}>
      {data}
    </div>

  );
};

AudioCard.defaultProps = {
  image: defaultBird,
  audioUrl: '',
  name: 'not found',
  latin: undefined,
  description: undefined,
  isFull: false,
  isAnswered: false,
  isCorrect: false,
};

export default AudioCard;
