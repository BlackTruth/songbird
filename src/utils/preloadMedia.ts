const preloadImage = (url: string): string => {
  const img: HTMLImageElement = new Image();
  img.src = url;
  return url;
};

// const loadSound = (src: string) => {
//   let sound: HTMLAudioElement = document.createElement('audio');
//   if ('src' in sound) {
//     sound.autoplay = false;
//   } else {
//     sound = document.createElement('bgsound');
//     sound.volume = -10000;
//     sound.play = () => {
//       this.src = src;
//       this.volume = 0;
//     };
//   }
//   sound.src = src;
//   document.body.appendChild(sound);
//   return sound;
// };
//
// export { loadSound };
export default preloadImage;
