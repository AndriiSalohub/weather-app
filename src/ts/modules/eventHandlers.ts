import { fetchData } from "./fetchData";

export let currentTemperatureScale: "celsius" | "fahrenheit" =
    localStorage.getItem("currentTemperatureScale") === "celsius"
        ? "celsius"
        : localStorage.getItem("currentTemperatureScale") === "fahrenheit"
          ? "fahrenheit"
          : "celsius";

export const initializeEventHandlers = (
    searchInput: HTMLInputElement,
    searchBtn: HTMLElement,
    celsiusScale: HTMLElement,
    fahrenheitScale: HTMLElement,
    searchTerm: string,
    apiKey: string
) => {
    searchInput?.addEventListener("input", (e: Event) => {
        if (e.target instanceof HTMLInputElement) {
            searchTerm = e.target.value;
        }
    });

    searchInput?.addEventListener("keydown", (e) => {
        if ((e as KeyboardEvent).key === "Enter") {
            e.preventDefault();
            localStorage.setItem("city", searchTerm);
            fetchData(searchTerm, apiKey);
        }
    });

    searchBtn?.addEventListener("click", (e: Event) => {
        e.preventDefault();
        fetchData(searchTerm, apiKey);
    });

    celsiusScale?.addEventListener("click", () => {
        localStorage.setItem("currentTemperatureScale", "celsius");
        if (currentTemperatureScale !== "celsius") {
            currentTemperatureScale = "celsius";
            fahrenheitScale?.classList.remove(
                "header__temperature-scale_current"
            );
            celsiusScale.classList.add("header__temperature-scale_current");
            updateWeatherDisplay();
        }
    });

    fahrenheitScale?.addEventListener("click", () => {
        localStorage.setItem("currentTemperatureScale", "fahrenheit");
        if (currentTemperatureScale !== "fahrenheit") {
            currentTemperatureScale = "fahrenheit";
            celsiusScale?.classList.remove("header__temperature-scale_current");
            fahrenheitScale.classList.add("header__temperature-scale_current");
            updateWeatherDisplay();
        }
    });

    function updateWeatherDisplay() {
        fetchData(searchTerm, apiKey);
    }
};
