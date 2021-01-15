let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let h1 = document.querySelector("h1");
h1.innerHTML = `${day} ${hour}:${minutes}`;

function showWeather(response) {
  console.log(response.data);
  console.log(response.data.weather[0].main);
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-conditions").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#current-pressure").innerHTML =
    response.data.main.pressure;
  document.querySelector("#current-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#current-wind").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
}
function searchCities(city) {
  let apiKey = "bdcd22b83edd4d35012716b6cb110cc7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function submitCities(event) {
  event.preventDefault();
  let city = document.querySelector("#cities-input").value;
  searchCities(city);
}

function showPosition(position) {
  let apiKey = "bdcd22b83edd4d35012716b6cb110cc7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let form = document.querySelector("#cities-form");
form.addEventListener("submit", submitCities);

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

searchCities("Taipei");
