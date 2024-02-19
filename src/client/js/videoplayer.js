const media = document.getElementById("video");
const playBtn = document.querySelector("#play");
const muteBtn = document.querySelector("#mute");
const volumeRange = document.querySelector("#volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
media.volume = volumeValue;

const handlePlayClick = () => {
  if (media.paused) {
    media.play();
  } else {
    media.pause();
  }
  playBtn.innerHTML = media.paused
    ? `<i class="fas fa-play">`
    : `<i class="fas fa-pause">`;
};

const handleMuteClick = () => {
  if (media.muted) {
    media.muted = false;
  } else {
    media.muted = true;
  }
  muteBtn.innerHTML = media.muted
    ? `<i class="fas fa-volume-mute fa-lg">`
    : `<i class="fas fa-volume-off fa-lg">`;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  console.log(value);
  if (value === 0) {
    console.log("value is zero!");
    muteBtn.innerHTML = `<i class="fas fa-volume-mute fa-lg">`;
  }
  if (media.muted) {
    media.muted = false;
    muteBtn.innerHTML = `<i class="fas fa-volume-off fa-lg">`;
  }
  volumeValue = value;
  media.volume = value;
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substring(11, 19);

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(media.duration));
  timeline.max = Math.floor(media.duration);
};

if (media.readyState >= 2) {
  totalTime.innerText = formatTime(Math.floor(media.duration));
  timeline.max = Math.floor(media.duration);
} else {
  media.addEventListener("loadedmetadata", handleLoadedMetadata);
}

const handleTimeUpdate = () => {
  currenTime.innerText = formatTime(Math.floor(media.currentTime));
  timeline.value = Math.floor(media.currentTime);
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  media.currentTime = value;
};

const handleFullscreen = () => {
  const fullScreen = document.fullscreenElement;
  if (fullScreen) {
    document.exitFullscreen();
    fullScreenBtn.innerHTML = `<i class="fas fa-expand">`;
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerHTML = `<i class="fas fa-compress">`;
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

const handleEnded = async () => {
  const { id } = videoContainer.dataset;
  await fetch(`/api/video/${id}/view`, {
    method: "POST",
  });
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
media.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);
media.addEventListener("mousemove", handleMouseMove);
media.addEventListener("mouseleave", handleMouseLeave);
media.addEventListener("ended", handleEnded);
