import { ICurrentWeather } from "./types";

const apiKey = "5c5fc4bb391bf0a314053ba9c7aa8cd3";
const currentWeather = document.querySelector(".weather__current");

const displayCurrentWeather = (data: ICurrentWeather) => {
    const { name } = data;
    const { temp, temp_max, temp_min } = data.main;
    const weather = data.weather[0].main;

    if (currentWeather) {
        currentWeather.innerHTML = `<h2 class="weather__current-city">${name}</h2>
        <h3 class="weather__current-weather">${weather}</h3>
        <p class="weather__current-temperature">${(temp - 273).toFixed(0)}°</p>
        <p class="weather__current-max-min-temperature">
            H:${(temp_max - 273).toFixed(0)}° L:${(temp_min - 273).toFixed(0)}°
        </p>`;
    }
};

const fetchData = (city: string, apiKey: string) => {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    )
        .then((res) => res.json())
        .then((data) => displayCurrentWeather(data));
};

fetchData("Kharkiv", apiKey);
