const videoContainer = document.getElementById("videoContainer");
const form = document.querySelector("form");
const deleteBtn = document.querySelectorAll(".deleteBtn");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = id;
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  const span2 = document.createElement("span");
  span2.className = "deleteBtn";
  span.innerText = text;
  span2.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
  span2.addEventListener("click", handleDelete);
};
const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if(text === "") {
    return;
  }
  const response = await fetch(`/api/video/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleDelete = async (event) => {
  const comment = event.target.parentElement;
  const { id } = comment.dataset;
  const response = await fetch(`/api/comments/${id}/delete`, {
    method:"DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
  if(response.status === 200) {
    comment.remove();
  }
}

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if(deleteBtn) {
  deleteBtn.forEach((item) => {
    item.addEventListener("click", handleDelete);
  })
}
