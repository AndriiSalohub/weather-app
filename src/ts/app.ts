import { Weather, WeatherData } from "./types";

const apiKey: string = "5c5fc4bb391bf0a314053ba9c7aa8cd3";
let currentTemperatureScale: "celsius" | "fahrenheit" = "celsius";
let searchTerm: string = localStorage.getItem("city") || "Kharkiv";

const currentWeather = document.querySelector(".weather__current");
const intervalWeather = document.querySelector(".weather__interval-forecast");
const searchInput = document.querySelector(".header__search-input");
const searchBtn = document.querySelector(".header__search-btn");
const celsiusScale = document.querySelector("#celsius");
const fahrenheitScale = document.querySelector("#fahrenheit");
const loader = document.querySelector(".loader") as HTMLDivElement;
const todayForecastDescription = document.querySelector(
    ".weather__description"
) as HTMLParagraphElement;
const humidityInfo = document.querySelector(
    "#humidity"
) as HTMLParagraphElement;
const windSpeedInfo = document.querySelector(
    "#wind-speed"
) as HTMLParagraphElement;
const pressureInfo = document.querySelector(
    "#pressure"
) as HTMLParagraphElement;
const windGustInfo = document.querySelector(
    "#wind-gust"
) as HTMLParagraphElement;
const seaLvlInfo = document.querySelector("#sea-lvl") as HTMLParagraphElement;
const feelsLikeInfo = document.querySelector(
    "#feels-like"
) as HTMLParagraphElement;

console.log();

const displayCurrentWeather = (data: Weather, city: string) => {
    console.log(data);
    const { temp, temp_max, temp_min } = data.main;
    const weather = data.weather[0].main;

    let temperatureInCurrentScale: number = temp - 273;
    let maxTemperatureScale: number = temp_max - 273;
    let minTemperatureScale: number = temp_min - 273;

    if (currentTemperatureScale === "fahrenheit") {
        temperatureInCurrentScale = (temperatureInCurrentScale * 9) / 5 + 32;
        maxTemperatureScale = (maxTemperatureScale * 9) / 5 + 32;
        minTemperatureScale = (minTemperatureScale * 9) / 5 + 32;
    }

    if (currentWeather) {
        currentWeather.innerHTML = `<h1 class="weather__current-city">${city}</h1>
        <h3 class="weather__current-weather">${weather}</h3>
        <p class="weather__current-temperature">${temperatureInCurrentScale.toFixed(
            0
        )}°</p>
        <p class="weather__current-max-min-temperature">
            H:${maxTemperatureScale.toFixed(
                0
            )}° L:${minTemperatureScale.toFixed(0)}°
        </p>`;
    }

    todayForecastDescription.textContent = `Today: ${weather?.toLowerCase()}. The high will be ${maxTemperatureScale.toFixed(
        0
    )}°. The low tonight will be ${minTemperatureScale.toFixed(0)}°.`;
};

const displayHourlyForecast = (data: WeatherData) => {
    if (intervalWeather) {
        intervalWeather.innerHTML = "";
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
            <p class="weather__interval-forecast-temperature">${
                currentTemperatureScale === "celsius"
                    ? (temp - 273).toFixed(0)
                    : (((temp - 273) * 9) / 5 + 32).toFixed(0)
            }°</p>
        `;

        intervalWeather?.append(li);
    }
};

const displayWeatherInfo = (data: Weather) => {
    console.log(data.wind);
    const { pressure, humidity, sea_level, feels_like } = data.main;
    const { gust, speed } = data.wind;
    humidityInfo.textContent = `${humidity}%`;
    windSpeedInfo.textContent = `${speed} km/h`;
    pressureInfo.textContent = `${pressure} hPa`;
    windGustInfo.textContent = `${gust} mph`;
    feelsLikeInfo.textContent = `${
        currentTemperatureScale === "celsius"
            ? (feels_like - 273).toFixed(0) + "°C"
            : (((feels_like - 273) * 9) / 5 + 32).toFixed(0) + "°F"
    }`;
    seaLvlInfo.textContent = `${sea_level} m`;
};

const fetchData = (city: string, apiKey: string) => {
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
    if (currentTemperatureScale !== "celsius") {
        currentTemperatureScale = "celsius";
        fahrenheitScale?.classList.remove("header__temperature-scale_current");
        celsiusScale.classList.add("header__temperature-scale_current");
        updateWeatherDisplay();
    }
});

fahrenheitScale?.addEventListener("click", () => {
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

fetchData(searchTerm, apiKey);
