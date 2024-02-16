import {
    displayCurrentWeather,
    displayHourlyForecast,
    displayWeatherInfo,
    displayWeekWeather,
} from "./weatherDisplay";

const searchInput = document.querySelector(".header__search-input");
const loader = document.querySelector(".loader") as HTMLDivElement;
const weather = document.querySelector(".weather") as HTMLDivElement;

export const fetchData = (city: string, apiKey: string) => {
    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
    )
        .then((res) => res.json())
        .then((data) => {
            console.log(data.list[0]);
            displayCurrentWeather(data.list[0], city);
            displayHourlyForecast(data);
            displayWeatherInfo(data.list[0]);
            displayWeekWeather(data);

            loader.style.display = "none";
            weather.style.display = "block";

            if (searchInput instanceof HTMLInputElement) {
                searchInput.value = "";
            }
        });
};
