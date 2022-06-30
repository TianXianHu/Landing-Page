var metricTemp = null;

function dateConvert(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()] + " " + date.getHours() + ":" + date.getMinutes();
}

function handlePosition(position) {
  var lon = position.coords.latitude;
  var lat = position.coords.longitude;
  const key = "2b6fdad0cbd018949c50c70f72250726";
  var url =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    key +
    "&units=metric";
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var temp = Math.round(data.list[0].main.temp);
      document.querySelector("h1").innerHTML = "Current place";
      document.querySelector(".temperature").innerHTML = temp;
      document.querySelector("#todate").innerHTML = dateConvert(
        (dt = new Date(data.list[0].dt * 1000))
      );
      document.querySelector(".wording").innerHTML =
        data.list[0].weather[0].description;
      document.querySelector(".press").innerHTML = data.list[0].main.pressure;
      document.querySelector(".hum").innerHTML = data.list[0].main.humidity;
      document.querySelector(".wind").innerHTML = data.list[0].wind.speed;
      var icon = document.querySelector("#icon");
      icon.src =
        "http://openweathermap.org/img/w/" +
        data.list[0].weather[0].icon +
        ".png";
      icon.classList.add("weather-icon");
    });
}

function showCurrentTemp() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function showData(event) {
  event.preventDefault();
  const key = "2b6fdad0cbd018949c50c70f72250726";
  var url = "https://api.openweathermap.org/data/2.5/forecast?q=";
  var search = document.querySelector("#searchinput");
  if (search.value) {
    url = url + search.value + "&units=metric&appid=" + key;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        var temp = data.list[0].main.temp;
        document.querySelector("h1").innerHTML = data.city.name;
        document.querySelector(".temperature").innerHTML = Math.round(temp);
        document.querySelector("#todate").innerHTML = dateConvert(
          (dt = new Date(data.list[0].dt * 1000))
        );
        document.querySelector(".wording").innerHTML =
          data.list[0].weather[0].description;
        document.querySelector(".press").innerHTML = data.list[0].main.pressure;
        document.querySelector(".hum").innerHTML = data.list[0].main.humidity;
        document.querySelector(".wind").innerHTML = data.list[0].wind.speed;
        var icon = document.querySelector("#icon");
        icon.src =
          "http://openweathermap.org/img/w/" +
          data.list[0].weather[0].icon +
          ".png";
        icon.classList.add("weather-icon");
      });
  }
}

function tswitchC(event) {
  event.preventDefault();
  if (!metricTemp) {
    metricTemp = document.querySelector(".temperature").innerText;
  }
  document.querySelector("#C").classList.add("lightoff");
  document.querySelector("#F").classList.remove("lightoff");
  document.querySelector(".temperature").innerHTML = metricTemp;
}
function tswitchF(event) {
  event.preventDefault();
  if (!metricTemp) {
    metricTemp = document.querySelector(".temperature").innerText;
  }
  document.querySelector("#C").classList.remove("lightoff");
  document.querySelector("#F").classList.add("lightoff");
  document.querySelector(".temperature").innerHTML = Math.round(
    (metricTemp * 5) / 9 + 32
  );
}

document.querySelector("#crrntbtn").addEventListener("click", showCurrentTemp);
document.querySelector(".search-form").addEventListener("submit", showData);
document.querySelector("#C").addEventListener("click", tswitchC);
document.querySelector("#F").addEventListener("click", tswitchF);
