function formatDayTime(date) {
  let dateNow = new Date();
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let day = days[dateNow.getDay()];
  let hours = dateNow.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = dateNow.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function formatDate(date) {
  let dateNow = new Date();
  let monthes = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let month = monthes[dateNow.getMonth()];
  let dates = dateNow.getDate();
  if (dates < 10) {
    dates = `0${dates}`;
  }
  let year = dateNow.getFullYear();
  return `${dates}.${month}.${year}`;
}
function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#temp");
  currentTemperature.innerHTML = temp;

  let weather = response.data.weather[0].main;
  let currentWeather = document.querySelector("#current-weather");
  currentWeather.innerHTML = weather;

  let wind = Math.round(response.data.wind.speed * 3.6);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = wind;

  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = humidity;

  let city = response.data.name;
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = city;
}
function search(city) {
  let apiKey = "f127cb208f2bd0106804f1fe6bc22525";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();

  let curentCityElement = document.querySelector("#city-input");
  let city = curentCityElement.value;
  search(city);
}
let currentTime = new Date();
let dayTimeElement = document.querySelector("#dayTime");
dayTimeElement.innerHTML = formatDayTime(currentTime);
let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(currentTime);
let searchForm = document.querySelector("#enter-city");
searchForm.addEventListener("submit", handleSubmit);

function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "f127cb208f2bd0106804f1fe6bc22525";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
search("Dnipro");