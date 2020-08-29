import React, { useState, useEffect } from 'react';

const preloadImage = (url: string): string => {
  const img: HTMLImageElement = new Image();
  img.src = url;
  return url;
};

const useAudio = (url: string): [boolean, () => void] => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    if (playing) {
      audio.play();
    } else { audio.pause(); }
  },
  [playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

export default preloadImage;

export { useAudio };
