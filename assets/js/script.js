// will use local storage to store persistent data
// populate data = make a container, populate the container w/ selected data!
// want to be able to use JS to make cities searched persist under submit button

// appid = e3762bdf720c3dc3229b0039e02fa026

// fetch - pass the url
// fetch ("url")
// take response and convert to JSON
//    .then(function(response) {
//     return response.json();
//    }) 
//    .then(function(data) {
//     console.log()
//     console.log(data);
// DO SOMETHING WITH THE DATA
//    });

// Data can be passed to for loop to select certain info - use for geocoder api to select lat and long???
// for (var i = 0; i < data.length; i++) {
// console.log(data[i].name);
// }

// to append data to a webpage:
// declare global variables = containers and/or button - use ids = .getElementById("elName");
// can declare variable with url to use in function
// set up a for loop to iterate thru data after .then functions
// use the two .then functions first, create variables for elements to be appended (ex. "h1", "p"), use .textContent property to to set text, use data[i].dataname to select data being retrieved, and finally use .append to append elements with text to the webpage (referencing the variables created inside the function for the elements)
// outside the function, call it with .addEventListener("click", function name)
// !! when do this, place variables w/ their text content & append methods in a group together

// setup below!!!

// API Call for geocoding - allows user to type name in and get api response
// http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit={limit}&appid={API key}
// limit = 1
// http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=1&appid=e3762bdf720c3dc3229b0039e02fa026
var cityGeoCode = getGeoCode();

// when user searches a city name, want this function to run to grab city lat & long and input into the functions below
function getGeoCode() {
    var geoCodeReq = "url";

    fetch(geoCodeReq)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
    // iterate through returned data and grab: icon, temp, wind, humidity + append them to webpage w/in containing el
    for (var i = 0; i < data.length; i++) {
        console.log(data[i].name);
    }

}

// API Call - Current Weather Data
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
var currentWeather = getCurrentWeather();

function getCurrentWeather() {
    var currentWeatherReq = "url";

    fetch(currentWeatherReq)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // use query params to make requests more specific
            // for weather data = icon, temp, wind, humidity
            console.log(data);
        })
    // iterate through returned data and grab: icon, temp, wind, humidity + append them to webpage w/in containing el
    for (var i = 0; i < data.length; i++) {
        console.log(data[i].name);
    }
}

// API Call - 5 day/ 3 hr forecast data
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
var weatherForecast = getWeatherForecast();

function getWeatherForecast() {
    var forecastReq = "url";

    fetch(forecastReq)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // use query params to make requests more specific
            // for weather data = icon, temp, wind, humidity
            // 5 seperate cards, one per day
            console.log(data);
        })
    // iterate through returned data and grab: icon, temp, wind, humidity + append them to webpage w/in containing el
    for (var i = 0; i < data.length; i++) {
        console.log(data[i].name);
    }
}

// when the user clicks search the weather data for that city will append to the webpage
searchButton.addEventListener("click", getGeoCode, getCurrentWeather, getWeatherForecast);