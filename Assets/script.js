// Save API key
var apiKey = "c18058442237a091008225c9b4803f9c";

var searchForm = document.querySelector(".inputGroup");
var searchItem = document.querySelector("#searchItem");
var currentWeatherEl = document.querySelector(".current");

var lsSearches = [];
// Event Listener
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(searchItem.value);

  lsSearches.push(searchItem.value);
  localStorage.setItem("Recent Searches", JSON.stringify(lsSearches));

  // Write Fetch Call to API
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchItem.value}&appid=${apiKey}`
  )
    // Check out  data reurned from API
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("FIRST RESPONSE", data);
      getWeather(data.coord.lat, data.coord.lon, data.name, data);
      //call the second api and hand it (data)
    })
    .catch();
});

// Requires City name, returns Lat.Lon
function getWeather(latitude, longitude, cityName, currentWeatherData) {
  console.log(latitude, longitude);
  // Write Fetch Call to API
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (forecastWeather) {
      renderCurrentWeather(cityName, forecastWeather, currentWeatherData);
    });
}

function renderCurrentWeather(cityName, forecastWeather, currentWeatherData) {
  // Todays Date
  var todayDate = dayjs().format("MM/DD/YYYY");
  console.log("current: ", currentWeatherData);

  console.log("forecast: ", forecastWeather.list);
  var tempKtoF = Math.floor(
    (currentWeatherData.main.temp - 273.15) * (9 / 5) + 32
  );
  // Programatically display that data to the page
  currentWeatherEl.innerHTML = `
        <h3>${cityName}</h3>
                <div>
                    <h4>${todayDate}</h4>
                    <p>icon</p>
                </div>

                <p>Temperature: ${tempKtoF} °F</p>
                <p>Wind Speed: ${currentWeatherData.wind.speed} MPH</p>
                <p>Humidity: ${currentWeatherData.main.humidity}%</p>
    `;

  renderForecastWeather(forecastWeather);
}
// Create function for forecastWeather
function renderForecastWeather(forecastWeather) {
  var elements = document.getElementsByClassName("card");
  // for Loop for the forecast
  for (var i = 0; i < elements.length; i++) {
    x = i * 8;
    let date = dayjs()
      .add(i + 1, "day")
      .format("MM/DD/YYYY");

    // Programatically display that data to the page
    elements[i].innerHTML = `
              <h3>${date}</h3>
              <p>Icon</p>
              <p>Temperature: ${forecastWeather.list[x].main.temp} °F</p>
              <p>Wind Speed: ${forecastWeather.list[x].wind.speed} MPH</p>
              <p>Humidity: ${forecastWeather.list[x].main.humidity}%</p>
              `;
  }
}


