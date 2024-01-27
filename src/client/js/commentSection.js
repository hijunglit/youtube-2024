const videoContainer = document.getElementById("videoContainer");
const form = document.querySelector("form");
const textarea = form.querySelector("textarea");
const button = form.querySelector("button");

const handleAddComment = (event) => {
  event.preventDefault();
  const text = textarea.value;
  const video = videoContainer.dataset.id;
  console.log(video);
  console.log(textarea.value);
};
form.addEventListener("submit", handleAddComment);
