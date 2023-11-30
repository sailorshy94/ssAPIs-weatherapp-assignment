// will use local storage to store persistent data
// populate data = make a container, populate the container w/ selected data!

// to append data to a webpage:
// declare global variables = containers and/or button - use ids = .getElementById("elName");
// can declare variable with url to use in function
// set up a for loop to iterate thru data after .then functions
// use the two .then functions first, create variables for elements to be appended (ex. "h1", "p"), use .textContent property to to set text, use data[i].dataname to select data being retrieved, and finally use .append to append elements with text to the webpage (referencing the variables created inside the function for the elements)
// outside the function, call it with .addEventListener("click", function name)
// !! when do this, place variables w/ their text content & append methods in a group together

// global variables
var apiKey = "dd2805d75b3cf217071362e5f5560240";
var searchButton = document.querySelector("#search-button");
var currentWeatherCard = document.getElementById("current-weather");
var day1 = document.getElementById("day-1");
var day2 = document.getElementById("day-2");
var day3 = document.getElementById("day-3");
var day4 = document.getElementById("day-4");
var day5 = document.getElementById("day-5");

// function retreiveWeather() {

function getGeoCode() {
    var city = document.getElementById("city-entry").value;
    // TODO : add a function to retrieve this value and set to local storage to persist to webpage under search bar and contain previous searches!!!
    // localStorage.setItem(); localStorage.getItem();
    // created a url variable that concatenates query parameter to request city input and parameter for specific api key 
    var geoCodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;

    fetch(geoCodeUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // iterate through returned data array and grab specific data items: latitude and longitude 
            for (var i = 0; i < data.length; i++) {
                var lat = data[i].lat;
                var lon = data[i].lon;
            }
            // passes lat & lon values above into function call & runs the function = takes latitude and longitude and uses it to retrieve the appropriate city
            getWeatherForecast(lat, lon);
        })
};

// takes the lat and lon from the geoCode function and uses it to retrieve the 5-day forecast information for the correlating city
function getWeatherForecast(lat, lon) {
    // requests the forecast for city
    var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
    // grabs forecast data from request
    fetch(forecastUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // search through returned data and grab specific nodes for icon, temp, wind, humidity
            var date = data.list[0].dt_txt;
            var icon = data.list[0].weather[0].icon;
            var temp = data.list[0].main.temp;
            var humidity = data.list[0].main.humidity;
            var wind = data.list[0].wind.speed;
        }
        )
};

searchButton.addEventListener("click", getGeoCode);

// one large card at top of others for current day
// 5 separate cards, one per day
// day 1
// day 2
// day 3
// day 4
// day 5
a