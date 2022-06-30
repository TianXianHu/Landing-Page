function cToF(celsius) {
  var cTemp = celsius;
  return (cTemp * 9) / 5 + 32;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let now = new Date();

let today = document.querySelector("#todate");
today.innerHTML =
  days[now.getDay()] + " " + now.getHours() + ":" + now.getMinutes();

/*
function chHeader(event) {
  event.preventDefault();
  var header = document.querySelector("h1");
  var search = document.querySelector("#searchinput");
  if (search.value) {
    header.innerHTML = search.value;
  }
}

document.querySelector("#C").addEventListener("click", tswitchC);
document.querySelector("#F").addEventListener("click", tswitchF); */

function handlePosition(position) {
  var lon = position.coords.latitude;
  console.log(lon);
  var lat = position.coords.longitude;
  console.log(lat);
  const key = "2b6fdad0cbd018949c50c70f72250726";
  var url =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    key;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var temp = Math.round(data.list[0].main.temp - 273.15);
      document.querySelector("h1").innerHTML =
        "It is " + temp + " degrees in current place";
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
        document.querySelector("h1").innerHTML =
          "It is " + temp + " degrees in " + data.city.name;
        document.querySelector(".temperature").innerHTML = temp;
      });
  }
}

let crrntbtn = document.querySelector("#crrntbtn");
crrntbtn.addEventListener("click", showCurrentTemp);

let form = document.querySelector(".search-form");
form.addEventListener("submit", showData);
