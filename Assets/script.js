// var city =$("#searchItem").val();
// // Save API key
var apiKey = "c18058442237a091008225c9b4803f9c";

const searchForm = document.querySelector(".inputGroup");
var searchItem = document.querySelector("#searchItem");
var currentWeatherEl = document.querySelector(".current");
var lsSearches = [];

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(searchItem.value);
  lsSearches += searchItem.value;
  localStorage.setItem("Recent Searches", JSON.stringify(lsSearches));

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchItem.value}&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log('FIRST RESPONSE', data);
      getWeather(data.coord.lat, data.coord.lon, data.name, data.weather);
      //call the second api and hand it (data)
    })
    .catch();
});

function getWeather(latitude, longitude, cityName, currentWeatherData) {
  console.log(latitude, longitude);

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (forecastWeather) {
      renderCurrentWeather(cityName, forecastWeather, currentWeatherData);
    });
  // fetch()
};

function renderCurrentWeather(cityName, forecastWeather, currentWeatherData) {
    console.log('current: ', currentWeatherData)
    console.log('forecast: ', forecastWeather)
    currentWeatherEl.innerHTML = `
        <h3>${cityName}</h3>
                <div>
                    <h4>${new Date().toLocaleDateString()}</h4>
                    <p>icon</p>
                </div>

                <p>${currentWeatherData.main}</p>
                <p>wind</p>
                <p>huminity</p>
    `;

    renderForecastWeather(forecastWeather);
};

function renderForecastWeather(forecastWeather) {
    /*var dayiteration = 0;
    document.querySelectorAll('.card').forEach(function () {
        dayiteration++
        
        var result = forecastWeather.list.find(item => item.dt_txt = dayjs().add(dayiteration, 'day').format('YYYY-MM-DD'));
        console.log(result);

        let date = dayjs().add(dayiteration, 'day').format('MM/DD/YYYY');
        console.log(date);
        $(this).innerHTML = `
            <h3>TEST</h3>
                    <div>
                        <h4>TEST</h4>
                        <p>icon</p>
                    </div>

                    <p>TEST</p>
                    <p>wind</p>
                    <p>huminity</p>
        `;        
    });*/

    var elements = document.getElementsByClassName('card')
    for (var i = 0; i <= elements.length; i++) {
        let date = dayjs().add(i, 'day').format('MM/DD/YYYY');
        var filterDate = dayjs().add(i, 'day').format('YYYY-MM-DD');
        filterDate = filterDate.concat(' 12:00:00');

        var result = forecastWeather.list.find(item => item.dt_txt == filterDate);
        console.log(result);
       
        /*elements[i].innerHTML = `
            <h3>${date}</h3>
            <p>Icon</p>
            <p>${result.main.temp} °F</p>
            <p>${result.wind.speed} MPH</p>
            <p>${result.main.humidity}</p>
            `;*/
    }
    
};

// Bring in DAYJS

// Check out  data reurned from API
// Requires Latitude and Long

// Requires City name, returns Lat.Lon

// Event Listener
// Search Button
// Each History Button

// Function!!
// Write Fetch Call to API
// Find the informaiton that we want to display from the API call response
// Todays Date
// 5 day forcast

// Render Function
// Programatically display that data to the page
// for Loop 2 times
// Create x Card
// Add x.header
// Add x.image
// Add x.temp
// Add x.wind
// Add x.humidity
// Append x Card to some Div

// Local Storage
// When the page loads, grab all of the cities in LocalStorage
// When a city name is input into the form and the search button in clicked, append the city to ecisting localStorage
