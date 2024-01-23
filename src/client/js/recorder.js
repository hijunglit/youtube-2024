const recorderBtn = document.getElementById("recorderBtn");
const preview = document.getElementById("preview");
console.log(preview);

const handleRecorder = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
    });
    console.log(stream);
    preview.srcObject=stream;
    preview.play();
}

recorderBtn.addEventListener("click", handleRecorder);
