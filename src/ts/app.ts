import { initializeEventHandlers } from "./modules/eventHandlers";
import { fetchData } from "./modules/fetchData";

const apiKey: string = "5c5fc4bb391bf0a314053ba9c7aa8cd3";
let searchTerm: string = localStorage.getItem("city") || "Kharkiv";

const searchInput = document.querySelector(
  ".header__search-input"
) as HTMLInputElement;
const searchBtn = document.querySelector(".header__search-btn");
const celsiusScale = document.querySelector("#celsius");
const fahrenheitScale = document.querySelector("#fahrenheit");

fetchData(searchTerm, apiKey);
initializeEventHandlers(
  searchInput,
  searchBtn as HTMLElement,
  celsiusScale as HTMLElement,
  fahrenheitScale as HTMLElement,
  searchTerm,
  apiKey
);
