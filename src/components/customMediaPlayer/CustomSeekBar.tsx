import React from 'react';
import { withMediaProps } from 'react-media-player';

interface IMedia {
  play: () => void,
  pause: () => void,
  playPause: () => void,
  stop: () => void,
  seekTo: (currentTIme: number) => void,
  skipTime: (amount: number) => void,
  mute: (isMuted: boolean) => void
  muteUnmute: () => void,
  setVolume: (amount: number) => void,
  addVolume: (amount: number) => void,
  fullscreen: () => void,
  currentTime: number,
  progress: number,
  duration: number,
  volume: number,
  isLoading: boolean,
  isPlaying: boolean,
  isMuted: boolean,
  isFullscreen: boolean,
}

interface ISeekBar {
  media: IMedia,
  style: React.CSSProperties | undefined,
  className: string | undefined
}

const CustomSeekBar: React.FC<ISeekBar> = ({ media, style, className }: ISeekBar) => {
  let isPlayingOnMouseDown = false;
  let onChangeUsed = false;
  const isChanging = true;
  const { duration, currentTime } = media;

  const handleMouseDown = () => {
    isPlayingOnMouseDown = media.isPlaying;
    media.pause();
  };

  const handleMouseUp = ({ target }: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const elem: HTMLInputElement = target as HTMLInputElement;
    const { value } = elem;
    if (!onChangeUsed) {
      media.seekTo(+value);
    }

    if (isPlayingOnMouseDown) {
      media.play();
    }
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const elem: HTMLInputElement = target as HTMLInputElement;
    const { value } = elem;
    media.seekTo(+value);
    onChangeUsed = true;
  };

  const styles: React.CSSProperties = {
    // backgroundSize: `${(currentTime * 100) / duration}% 100%`,
    background: `linear-gradient(to right, #cc181e 0%, #cc181e ${currentTime}%, #777 ${currentTime}%)`,
    ...style,
  };

  return (
    <input
      type="range"
      step="any"
      max={duration.toFixed(4)}
      value={currentTime}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onChange={handleChange}
      className={className}
      style={styles}
    />
  );
};

export default withMediaProps(CustomSeekBar);
