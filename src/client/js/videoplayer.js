const media = document.querySelector("video");
const playBtn = document.querySelector("#play");
const muteBtn = document.querySelector("#mute");
const runTime = document.querySelector("#runTime");
const volumeRange = document.querySelector("#volume");

let volumeValue = 0.5;
volumeRange.value = volumeValue;
const handlePlayClick = () => {
  if (media.paused) {
    media.play();
  } else {
    media.pause();
  }
};

const handleMuteClick = () => {
  if (media.muted) {
    media.muted = false;
  } else {
    media.muted = true;
  }
  muteBtn.innerText = media.muted ? "Unmute" : "Mute";
  volumeRange.value = media.muted ? 0 : volumeValue;
};
const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (media.muted) {
    media.muted = false;
    muteBtn.innerText = Mute;
  }
  volumeValue = value;
  media.volume = value;
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
