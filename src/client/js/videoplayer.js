const media = document.getElementById("video");
const playBtn = document.querySelector("#play");
const muteBtn = document.querySelector("#mute");
const volumeRange = document.querySelector("#volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");

let volumeValue = 0.5;
media.volume = volumeValue;

const handlePlayClick = () => {
  if (media.paused) {
    media.play();
  } else {
    media.pause();
  }
  playBtn.innerText = media.paused ? "Play" : "Pause";
};

const handleMuteClick = () => {
  if (media.muted) {
    media.muted = false;
  } else {
    media.muted = true;
  }
  muteBtn.innerText = media.muted ? "Unmute" : "Mute";
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (media.muted) {
    media.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value;
  media.volume = value;
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substring(11, 19);

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(media.duration));
};

totalTime.innerText =
  media.readyState >= 2
    ? formatTime(Math.floor(media.duration))
    : media.addEventListener("loadedmetadata", handleLoadedMetadata);

const handleTimeUpdate = () => {
  currenTime.innerText = formatTime(Math.floor(media.currentTime));
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
media.addEventListener("timeupdate", handleTimeUpdate);
