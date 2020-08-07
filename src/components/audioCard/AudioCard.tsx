import React from 'react';
import { Media, Player, controls } from 'react-media-player';

import styles from './audioCard.module.scss';

const {
  PlayPause, MuteUnmute, Duration, SeekBar, Volume, CurrentTime,
} = controls;

interface IAudioCard {
  imageUrl: string,
  audioUrl: string,
  name: string,
  latin?: string,
  description?: string,
  isFull?: boolean
}

interface IAudioPlayer {
  url: string,
}

const MediaPlayer: React.FC < IAudioPlayer > = ({ url }:IAudioPlayer) => (
  <Media>
    <div>
      <div>
        <Player src={url} onPlay={() => { console.log(); }} />
      </div>
      <div className={styles.audioCardMainRightAudioControls}>
        <PlayPause />
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

const AudioCard: React.FC< IAudioCard > = ({
  imageUrl, audioUrl, name, latin, description, isFull,
}: IAudioCard) => (
  <div className={styles.audioCard}>
    <div className={styles.audioCardMain}>
      <img className={styles.audioCardMainImage} src={imageUrl} alt={name} />
      <div className={styles.audioCardMainRight}>
        <span className={styles.audioCardMainRightName}>{name}</span>
        {isFull ? (<span className={styles.audioCardMainRightLatin}>{latin}</span>) : null}
        <div className={styles.audioCardMainRightAudio}>
          <MediaPlayer url={audioUrl} />
        </div>
      </div>
    </div>
    {isFull ? (<span className={styles.audioCardDescription}>{description}</span>) : null}
  </div>

);

AudioCard.defaultProps = {
  latin: undefined,
  description: undefined,
  isFull: false,
};

export default AudioCard;
