import { currentTemperatureScale } from "./eventHandlers";
import { Weather, WeatherData } from "./types";

const currentWeather = document.querySelector(".weather__current");
const intervalWeather = document.querySelector(".weather__interval-forecast");
const weekWeather = document.querySelector(".weather__week-forecast-list");

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

export const displayCurrentWeather = (data: Weather, city: string) => {
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

export const displayHourlyForecast = (data: WeatherData) => {
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

export const displayWeatherInfo = (data: Weather) => {
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

export const displayWeekWeather = (data: WeatherData) => {
    console.log(data);
    if (weekWeather) {
        weekWeather.innerHTML = "";
    }
    for (let i = 0; i < data.list.length; i++) {
        if (i === 0) {
            const li = document.createElement("li");
            li.classList.add(`weather__week-forecast-list-item`);
            li.classList.add(`weather__week-forecast-list-item_titles`);
            li.innerHTML = `
                <h4 class="weather__week-forecast-day-title">Day</h4>
                <h4 class="weather__week-forecast-pressure-title">
                    Pressure
                </h4>
                <h4 class="weather__week-forecast-humidity-title">
                    Humidity
                </h4>
                <h4 class="weather__week-forecast-temperature-title">
                    Temperature
                </h4>
            `;

            weekWeather?.append(li);
        } else {
            if (i % 7 === 0) {
                const li = document.createElement("li");
                li.classList.add(`weather__week-forecast-list-item`);
                const { pressure, humidity } = data.list[i].main;
                const { temp, temp_max, temp_min } = data.list[i].main;
                const { icon } = data.list[i].weather[0];
                const dt = data.list[i].dt;

                let date = new Date(dt * 1000);
                let daysOfWeek = [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                ];

                let temperatureInCurrentScale: number = temp - 273;
                let maxTemperatureScale: number = temp_max - 273;
                let minTemperatureScale: number = temp_min - 273;

                if (currentTemperatureScale === "fahrenheit") {
                    temperatureInCurrentScale =
                        (temperatureInCurrentScale * 9) / 5 + 32;
                    maxTemperatureScale = (maxTemperatureScale * 9) / 5 + 32;
                    minTemperatureScale = (minTemperatureScale * 9) / 5 + 32;
                }

                li.innerHTML = `
                    <div class="weather__week-forecast-day-info">
                        <p class="weather__week-forecast-day">${
                            daysOfWeek[date.getDay()]
                        }</p>
                        <img
                            src="https://openweathermap.org/img/wn/${icon}@4x.png"
                            alt="weather image"
                            class="weather__week-forecast-image"
                        />
                    </div>
                    <p class="weather__week-forecast-humidity">${humidity}%</p>
                    <p class="weather__week-forecast-pressure">${pressure} hPa</p>
                    <p class="weather__week-forecast-temperature">${maxTemperatureScale.toFixed(
                        0
                    )}° ${minTemperatureScale.toFixed(0)}°</p>
                `;

                weekWeather?.append(li);
            }
        }
    }
};
