// var city =$("#searchItem").val();
// // Save API key 
 var apiKey = "c18058442237a091008225c9b4803f9c";

const searchForm = document.querySelector('.inputGroup')
var searchItem = document.querySelector('#searchItem')

searchForm.addEventListener('submit', function (e) {
    e.preventDefault()
    console.log(searchItem.value)

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchItem.value}&appid=${apiKey}`).then(function (response) {
        return response.json()
    }).then(function(data){
        console.log(data)
        getWeather(data.coord.lat, data.coord.lon)
        //call the second api and hand it (data)
    }).catch()
})

function getWeather(latitude, longitude){
    console.log(latitude, longitude)

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`).then(function(response){
        return response.json()
    }) .then(function(data){
        console.log(data)

    })
    // fetch()
}


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
