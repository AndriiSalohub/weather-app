const apiKey = "5c5fc4bb391bf0a314053ba9c7aa8cd3";
const wrapper = document.querySelector(".wrapper");
const weatherInformation = document.querySelector(".weather-information");
const searchInput = document.querySelector(".search__input");
const searchBtn = document.querySelector(".search__button");

const displayData = (data) => {
    if (data.cod !== "404") {
        const { name } = data;
        const { description, icon } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        weatherInformation.innerHTML = `
    <h2 class="weather-information__title">
        Weather in ${name}
    </h2>
    <h1 class="weather-information__temperature">${(temp - 273).toFixed(
        1
    )}&#176C</h1>
    <div class="weather-information__weather">
        <img src="http://openweathermap.org/img/w/${icon}.png" alt="icon of a weather" class="weather-information__weather-img" height="20px" width="20px">
        <p class="weather-information__weather-description">${description
            .split(" ")
            .map((word) => word[0].toUpperCase() + word.substring(1))
            .join(" ")}</p>
    </div>
    <p class="weather-information__humidity weather-info">Humidity: ${humidity}%</p>
    <p class="weather-information__wind-speed weather-info">Wind Speed: ${speed} km/h</p>
    `;
    } else {
        weatherInformation.innerHTML = `
            <p class="weather-information__warn">You entered a non-existent city</p>
        `;
    }
};

const fetchData = (city, apiKey) => {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    )
        .then((res) => res.json())
        .then((data) => displayData(data));
};

searchInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        fetchData(searchInput.value, apiKey);
        searchInput.value = "";
    }
});

searchBtn.addEventListener("click", () => {
    fetchData(searchInput.value, apiKey);
    searchInput.value = "";
});
