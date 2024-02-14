import {
    displayCurrentWeather,
    displayHourlyForecast,
    displayWeatherInfo,
} from "./weatherDisplay";

const searchInput = document.querySelector(".header__search-input");
const loader = document.querySelector(".loader") as HTMLDivElement;

export const fetchData = (city: string, apiKey: string) => {
    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
    )
        .then((res) => res.json())
        .then((data) => {
            displayCurrentWeather(data.list[0], city);
            displayHourlyForecast(data);
            displayWeatherInfo(data.list[0]);

            loader.style.display = "none";

            if (searchInput instanceof HTMLInputElement) {
                searchInput.value = "";
            }
        });
};