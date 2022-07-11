var metricTemp = [];
var res = null;

function dateConvert(date) {
  var outstring = "";
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  outstring = days[date.getDay()] + " ";
  if (date.getHours() < 10) {
    outstring += "0" + date.getHours() + ":";
  } else {
    outstring += date.getHours() + ":";
  }
  if (date.getMinutes() < 10) {
    outstring += "0" + date.getMinutes();
  } else {
    outstring += date.getMinutes();
  }
  return outstring;
}

function dateConvert2(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function handlePosition(position) {
  function showFRow(response) {
    var futureElement = "";
    var data = response.data.daily;
    data.forEach(function (cast, index) {
      if (index > 0 && index < 6) {
        futureElement += `<div class="col">
          <div class="date">${dateConvert2(new Date(cast.dt * 1000))}</div>
        <img src="http://openweathermap.org/img/wn/${
          cast.weather[0].icon
        }@2x.png" width="40"/>
        <div >
          <span class="tempmax"><span class="tt">${Math.round(
            cast.temp.max
          )}</span>°</span>
          <span class="tempmin"><span class="tt">${Math.round(
            cast.temp.min
          )}</span>°</span>
        </div>
      </div>`;
      }
    });
    let future = document.querySelector("#furute");
    future.innerHTML = futureElement;
  }
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
    "&units=metric" +
    "&cnt=1";
  res = fetch(url)
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
      document.querySelectorAll(".hide").forEach((element) => {
        element.classList.remove("hide");
      });
      document.querySelector("#C").classList.add("lightoff");
      return data;
    });
  url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&cnt=5&appid=${key}&units=metric`;
  axios.get(url).then(showFRow);
}

function showCurrentTemp() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function showData(event) {
  event.preventDefault();
  const key = "2b6fdad0cbd018949c50c70f72250726";

  var url = "https://api.openweathermap.org/data/2.5/forecast?cnt=1&q=";
  var search = document.querySelector("#searchinput");
  if (search.value) {
    url = url + search.value + "&units=metric&appid=" + key;
    res = fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
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
        document.querySelectorAll(".hide").forEach((element) => {
          element.classList.remove("hide");
        });
        document.querySelector("#C").classList.add("lightoff");
        return data;
      });
    res.then(function (value) {
      var lon = value.city.coord.lon;
      var lat = value.city.coord.lat;
      function showFRow(response) {
        var futureElement = "";
        var data = response.data.daily;
        data.forEach(function (cast, index) {
          if (index > 0 && index < 6) {
            futureElement += `<div class="col">
          <div class="date">${dateConvert2(new Date(cast.dt * 1000))}</div>
        <img src="http://openweathermap.org/img/wn/${
          cast.weather[0].icon
        }@2x.png" width="40"/>
        <div>
          <span class="tempmax"><span class="tt">${Math.round(
            cast.temp.max
          )}</span>°</span>
          <span class="tempmin"><span class="tt">${Math.round(
            cast.temp.min
          )}</span>°</span>
        </div>
      </div>`;
          }
        });
        let future = document.querySelector("#furute");
        future.innerHTML = futureElement;
      }
      url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&cnt=5&appid=${key}&units=metric`;
      axios.get(url).then(showFRow);
    });
  }
}

function tswitchC(event) {
  event.preventDefault();
  document.querySelector("#C").classList.add("lightoff");
  document.querySelector("#F").classList.remove("lightoff");
  let list_of_temp = document.querySelectorAll(".tt");
  list_of_temp.forEach(function (element, i) {
    var temp = element.innerHTML;
    element.innerHTML = metricTemp[i];
  });
}
function tswitchF(event) {
  event.preventDefault();
  document.querySelector("#C").classList.remove("lightoff");
  document.querySelector("#F").classList.add("lightoff");
  let list_of_temp = document.querySelectorAll(".tt");
  list_of_temp.forEach(function (element, i) {
    var temp = element.innerHTML;
    metricTemp[i] = element.innerHTML;
    element.innerHTML = Math.round(temp * 1.8 + 32);
  });
}

document.querySelector("#crrntbtn").addEventListener("click", showCurrentTemp);
document.querySelector(".search-form").addEventListener("submit", showData);
document.querySelector("#C").addEventListener("click", tswitchC);
document.querySelector("#F").addEventListener("click", tswitchF);
