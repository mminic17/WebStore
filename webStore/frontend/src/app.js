import { parseUrl } from "./parseUrl.js";
import Error404Screen from "./screens/Error404Screen.js";
import HomeScreen from "./screens/HomeScreen.js";
import ProductDetailsScreen from "./screens/ProductDetailsScreen.js";
import ShoppingCartScreen from "./screens/ShoppingCartScreen.js";

const routes = {
  "/": HomeScreen,
  "/product/:id": ProductDetailsScreen,
  "/cart/:id": ShoppingCartScreen,
  "/cart": ShoppingCartScreen,
};

const router = async () => {
  const request = parseUrl();
  const parseReqUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? `/:id` : "") +
    (request.action ? `/${request.action}` : "");

  const screen = routes[parseReqUrl] ? routes[parseReqUrl] : Error404Screen.js;

  const main = document.getElementById("main-container");
  main.innerHTML = await screen.render();
  if (screen.after_render) await screen.after_render();
};

const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".nav-menu");

menu.addEventListener("click", () => {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
});

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
