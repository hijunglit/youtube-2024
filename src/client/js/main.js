import "../scss/styles.scss";

const menuIcon = document.querySelector(".menu-bar__icon");
const menuBar = document.querySelector(".menu-bar");
const spreadBar = document.querySelector(".spread-bar");

function handleSideMenu() {
  menuBar.classList.toggle("close");
  spreadBar.classList.toggle("close");
}
menuIcon.addEventListener("click", handleSideMenu);
