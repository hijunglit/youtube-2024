import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
const startBtn = document.getElementById("startBtn");
const preview = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = async () => {
  const files = {
    input: "recorder.webm",
    output: "myrecorder.mp4",
    thumbnail: "thumbnail.jpg",
  };
  /******************************ffmpeg********************************/
  const ffmpeg = new FFmpeg();
  const message = null;

  const baseUrl = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";

  ffmpeg.on("log", ({ message }) => {
    console.log(message);
  });

  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseUrl}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${baseUrl}/ffmpeg-core.wasm`, "application/wasm"),
  });

  await ffmpeg.writeFile("recorder.webm", await fetchFile(videoFile));
  await ffmpeg.exec(["-i", "recorder.webm", "output.mp4"]);
  await ffmpeg.exec([
    "-i",
    "recorder.webm",
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    "thumbnail.jpg",
  ]);
  const videoData = await ffmpeg.readFile("output.mp4");
  const thumbData = await ffmpeg.readFile("thumbnail.jpg");
  console.log(videoData);
  console.log(videoData.buffer);
  console.log("thumb data => ", thumbData);

  const videoUrl = URL.createObjectURL(
    new Blob([videoData.buffer], { type: "video/mp4" })
  );
  const thumbUrl = URL.createObjectURL(
    new Blob([thumbData.buffer], { type: "image/jpg" })
  );
  /******************************ffmpeg********************************/

  const a = document.createElement("a");
  document.body.appendChild(a);
  a.href = videoUrl;
  a.download = "myrecorder.mp4";
  a.click();

  const thumbA = document.createElement("a");
  document.body.appendChild(thumbA);
  thumbA.href = thumbUrl;
  thumbA.download = "thumbnail.jpg";
  thumbA.click();
};

const handleStop = () => {
  startBtn.innerText = "Download record";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  startBtn.innerText = "Stop record";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    preview.srcObject = null;
    preview.src = videoFile;
    preview.loop = true;
    preview.play();
  };
  recorder.start();
};
const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  preview.srcObject = stream;
  preview.play();
};

init();

startBtn.addEventListener("click", handleStart);
