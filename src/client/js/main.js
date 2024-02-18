import "../scss/styles.scss";

const menuIcon = document.querySelector(".menu-bar__icon");
const menuBar = document.querySelector(".menu-bar");
const spreadBar = document.querySelector(".spread-bar");

const userMenuIcon = document.querySelector(".user__menu");
const userPopup = document.querySelector(".user__popup-container");

function handleSideMenu() {
  menuBar.classList.toggle("close");
  spreadBar.classList.toggle("close");
}
function handleUserPopup() {
  userPopup.classList.toggle("off");
}
menuIcon.addEventListener("click", handleSideMenu);
if (userMenuIcon) {
  userMenuIcon.addEventListener("click", handleUserPopup);
}
