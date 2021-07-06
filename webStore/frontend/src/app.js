import HomeScreen from "./screens/HomeScreen.js";

const router = async () => {
  const main = document.getElementById("main-container");
  main.innerHTML = await HomeScreen.render();
};

const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".nav-menu");

menu.addEventListener("click", () => {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
});

window.addEventListener("load", router);
