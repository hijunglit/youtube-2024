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
const handleLoadedMetadata = () => {
  totalTime.innerText = Math.floor(video.duration);
};
const handleTimeUpdate = () => {
  currenTime.innerText = Math.floor(video.currentTime);
};

// if (media.readyState >= 2) {
//   console.log(media.readyState);
//   totalTime.innerText = Math.floor(media.duration);
// } else {
//   media.addEventListener("loadedmetadata", handleLoadedMetadata);
// }
totalTime.innerText =
  media.readyState >= 2
    ? Math.floor(media.duration)
    : media.addEventListener("loadedmetadata", handleLoadedMetadata);

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
media.addEventListener("timeupdate", handleTimeUpdate);
