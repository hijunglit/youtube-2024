const videoContainer = document.getElementById("videoContainer");
const form = document.querySelector("form");

const handleAddComment = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  await fetch(`/api/video/${videoId}/comment`, {
    method: "POST",
    body: {
      text,
    },
  });
};

if (form) {
  form.addEventListener("submit", handleAddComment);
}
