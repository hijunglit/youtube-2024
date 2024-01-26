import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
const actionBtn = document.getElementById("actionBtn");
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
  function downloadFile(fileUrl, fileName) {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = fileUrl;
    a.download = fileName;
    a.click();
  }
  actionBtn.removeEventListener("click", handleDownload);
  actionBtn.disabled = true;
  actionBtn.innerText = "Recording...";
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

  await ffmpeg.writeFile(files.input, await fetchFile(videoFile));
  await ffmpeg.exec(["-i", files.input, files.output]);
  await ffmpeg.exec([
    "-i",
    files.input,
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    files.thumbnail,
  ]);
  const videoData = await ffmpeg.readFile(files.output);
  const thumbData = await ffmpeg.readFile(files.thumbnail);
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
  downloadFile(videoUrl, "myrecorder.mp4");
  downloadFile(thumbUrl, "thumbnail.jpg");

  actionBtn.disabled = false;
  actionBtn.addEventListener("click", handleDownload);
  actionBtn.innerText = "Download again";
};

const handleStart = () => {
  actionBtn.innerText = "Recording";
  actionBtn.disabled = true;
  actionBtn.removeEventListener("click", handleStart);
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    preview.srcObject = null;
    preview.src = videoFile;
    preview.loop = true;
    preview.play();
    actionBtn.innerText = "Download";
    actionBtn.disabled = false;
    actionBtn.addEventListener("click", handleDownload);
  };
  recorder.start();
  setTimeout(() => {
    recorder.stop();
  }, 5000);
};
const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width:1024,
      height: 576,
    },
  });
  preview.srcObject = stream;
  preview.play();
};

init();

actionBtn.addEventListener("click", handleStart);
