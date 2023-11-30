// will use local storage to store persistent data
// populate data = make a container, populate the container w/ selected data!
// want to be able to use JS to make cities searched persist under submit button

// to append data to a webpage:
// declare global variables = containers and/or button - use ids = .getElementById("elName");
// can declare variable with url to use in function
// set up a for loop to iterate thru data after .then functions
// use the two .then functions first, create variables for elements to be appended (ex. "h1", "p"), use .textContent property to to set text, use data[i].dataname to select data being retrieved, and finally use .append to append elements with text to the webpage (referencing the variables created inside the function for the elements)
// outside the function, call it with .addEventListener("click", function name)
// !! when do this, place variables w/ their text content & append methods in a group together

// setup below!!!

// global variables
var apiKey = "dd2805d75b3cf217071362e5f5560240";
var searchButton = document.querySelector("#search-button");
var currentWeatherCard = document.getElementById("current-weather");
// var date = dayjs(MMMM / DD / YYYY);
var day1 = document.getElementById("day-1");
var day2 = document.getElementById("day-2");
var day3 = document.getElementById("day-3");
var day4 = document.getElementById("day-4");
var day5 = document.getElementById("day-5");

// when user searches a city name, want this function to run to grab city lat & long and input into the functions below

// function retreiveWeather() {

function getGeoCode() {
    var city = document.getElementById("city-entry").value;
    // created a url variable that concatenates query parameter to request city input and parameter for specific api key 
    var geoCodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;

    fetch(geoCodeUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // iterate through returned data and grab data: latitude and longitude 
            for (var i = 0; i < data.length; i++) {
                var lat = data[i].lat;
                var lon = data[i].lon;
            }
            // passes lat & lon values above into function call & runs the function = takes latitude and longitude and uses it to retrieve the appropriate city
            getWeatherForecast(lat, lon);
        })
};

// 
function getWeatherForecast(lat, lon) {
    var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;

    fetch(forecastUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // use query params to make requests more specific
            // for weather data = icon, temp, wind, humidity
            // 5 seperate cards, one per day
            console.log(data);
            // iterate through returned data and grab: icon, temp, wind, humidity + append them to webpage w/in containing el
            // for (var i = 0; i < data.length; i++) {
                var date = data.list[0].dt_txt;
                var temp = data.list[0].main.temp;
                var humidity = data.list[0].main.humidity;
                var wind = data.list[0].wind.speed;
                console.log(wind);
            // }
        })

    // var temp = ;
    // var wind = ;
    // var humid = ;
};


searchButton.addEventListener("click", getGeoCode);

/*
// API Call - 5 day/ 3 hr forecast data
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
var weatherForecast = getWeatherForecast();

function getWeatherForecast() {
    var forecastUrl = "url";

    fetch(forecastUrl)
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
        var icon = ;
        var temp = ;
        var wind = ;
        var humid = ;
    }
}

// when the user clicks search the weather data for that city will append to the webpage
 //, getCurrentWeather, getWeatherForecast); */