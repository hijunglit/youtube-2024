const media = document.querySelector("video");
const playBtn = document.querySelector("#play");
const muteBtn = document.querySelector("#mute");
const runTime = document.querySelector("#runTime");
const volume = document.querySelector("#volume");
console.log(media, playBtn, muteBtn, runTime, volume);

const handlePlayClick = () => {
  if (media.paused) {
    media.play();
  } else {
    media.pause();
  }
};

const handlePause = () => (playBtn.innerText = "Play");
const handlePlay = () => (playBtn.innerText = "Pause");

const handleMute = () => {
  if (media.muted) {
    media.muted = false;
  } else {
    media.muted = true;
  }
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
video.addEventListener("pause", handlePause);
video.addEventListener("play", handlePlay);
