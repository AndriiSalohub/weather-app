import { Weather, WeatherData } from "./types";

const apiKey = "5c5fc4bb391bf0a314053ba9c7aa8cd3";

const currentWeather = document.querySelector(".weather__current");
const hourlyWeather = document.querySelector(".weather__interval-forecast");

const searchInput = document.querySelector(".header__search-input");
const searchBtn = document.querySelector(".header__search-btn");
let searchTerm: string = "";

const displayCurrentWeather = (data: Weather, city: string) => {
    const { temp, temp_max, temp_min } = data.main;
    const weather = data.weather[0].main;

    if (currentWeather) {
        currentWeather.innerHTML = `<h2 class="weather__current-city">${city}</h2>
        <h3 class="weather__current-weather">${weather}</h3>
        <p class="weather__current-temperature">${(temp - 273).toFixed(0)}°</p>
        <p class="weather__current-max-min-temperature">
            H:${(temp_max - 273).toFixed(0)}° L:${(temp_min - 273).toFixed(0)}°
        </p>`;
    }
};

const displayHourlyForecast = (data: WeatherData) => {
    if (hourlyWeather) {
        hourlyWeather.innerHTML = "";
    }

    for (let i = 0; i <= 8; i++) {
        const time = data.list[i].dt_txt.split(" ")[1].slice(0, 5);
        const { temp, humidity } = data.list[i].main;
        const { icon } = data.list[i].weather[0];

        const li = document.createElement("li");
        li.innerHTML = `
            <h3 class="weather__interval-forecast-title ${
                i === 0 ? "weather__interval-forecast-title_now" : ""
            }">${time}</h3>
            <p class="weather__interval-forecast-humidity">${humidity}%</p>
            <img
                src="https://openweathermap.org/img/wn/${icon}@4x.png"
                alt="weather  image"
                class="weather__interval-forecast-image"
            />
            <p class="weather__interval-forecast-temperature">${(
                temp - 273
            ).toFixed(0)}°</p>
        `;

        hourlyWeather?.append(li);
    }
};

const fetchData = (city: string, apiKey: string) => {
    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
    )
        .then((res) => res.json())
        .then((data) => {
            displayCurrentWeather(data.list[0], city);
            displayHourlyForecast(data);

            if (searchInput instanceof HTMLInputElement) {
                searchInput.value = "";
            }
        });
};

fetchData("Kharkiv", apiKey);

searchInput?.addEventListener("input", (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
        searchTerm = e.target.value;
    }
});

searchInput?.addEventListener("keydown", (e) => {
    if ((e as KeyboardEvent).key === "Enter") {
        e.preventDefault();
        fetchData(searchTerm, apiKey);
    }
});

searchBtn?.addEventListener("click", (e: Event) => {
    e.preventDefault();
    fetchData(searchTerm, apiKey);
});
