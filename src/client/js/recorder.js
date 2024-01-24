const startBtn = document.getElementById("startBtn");
const preview = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = () => {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = videoFile;
    a.download = "myrecorder.webm";
    a.click();
}

const handleStop = () => {
    startBtn.innerText = "Download record";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleDownload);
    recorder.stop();
}

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
    }
    recorder.start();
};
const init = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
    });
    preview.srcObject=stream;
    preview.play();
};

init();

startBtn.addEventListener("click", handleStart);
