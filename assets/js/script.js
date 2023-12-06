
// global variables
var apiKey = "dd2805d75b3cf217071362e5f5560240";
var searchButton = document.querySelector("#search-button");
var currentWeatherCard = document.getElementById("current-weather");
var prevSearchesEl = document.getElementById("prev-searches");
var forecastDaysEl = document.getElementById("5-day-forecast");
var fiveDaysContainer = document.getElementById("5-day-container");

// function retreiveWeather() {
// Make a variable for your div container that is holding our previous searches
//We need to make an event listenr for the container
//if the event target matches the btn being clicked
//Call getGeoCode(and in the paranetheses we will pass the btn.textcontent to the function so it runs trhough the function with the past city)



function getGeoCode() {
    // sets the previous searches element's inner HTML to a str
    prevSearchesEl.innerHTML = "";
    // grabs the city name that is input by page user
    var city = document.getElementById("city-entry").value;
    console.log(city)
    // sets value of var to local storage item
    var cities = localStorage.getItem("cityQ");
    // sets value of var to an array of cities from above/empty array
    var parsedCities = JSON.parse(cities) || [];
    // pushes the city name input by user into the array
    parsedCities.push(city);
    // converts the array data to a string
    var citiesStringified = JSON.stringify(parsedCities);
    // sets local storage to above string with a key of cityQ
    localStorage.setItem("cityQ", citiesStringified);

    genCityHistBtns();

    function genCityHistBtns() {
        // for loop iterates through the array of cities and creates a button for each and gives it button class
        for (i = 0; i < parsedCities.length; i++) {
            var cityHistBtnEl = document.createElement("button");
            prevSearchesEl.appendChild(cityHistBtnEl);
            cityHistBtnEl.innerHTML = parsedCities[i];
            cityHistBtnEl.classList.add("btn", "btn-primary", "btn-block");

            var cityLinkEl = document.createElement("a");
            cityHistBtnEl.appendChild(cityLinkEl);
            // TODO: buttons need to link to previously searched cities weather data entry
        }
    }

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
            getCurrentWeatherForecast(lat, lon);
            getWeatherForecast(lat, lon);
        })
};

// takes the lat and lon from the geoCode function and uses it to retrieve the current forecast information for the correlating city
function getCurrentWeatherForecast(lat, lon) {
    // requests the forecast for city
    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    var forecastUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
    // grabs forecast data from request
    fetch(forecastUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var loc = data.name;
            var date = dayjs().format("MM-DD-YYYY");
            var icon = data.weather[0].icon;
            // url created will grab the weather icon for the day
            var iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            // unicode for degrees symbol \u00B0
            var temp = data.main.temp + "\u00B0F";
            var wind = data.wind.speed + " MPH";
            var hum = data.main.humidity + " %";

            // card appended to webpage w/ content inside
            var weatherCardBodyEl = document.createElement("div");
            currentWeatherCard.appendChild(weatherCardBodyEl);
            weatherCardBodyEl.classList.add("card-body");

            var cardTitle = document.createElement("h5");
            weatherCardBodyEl.appendChild(cardTitle);
            cardTitle.classList.add("card-title");
            // used Day.js to properly display date without extra text and in correct format
            var currentDate = date;
            // takes location name and adds space between it and the date
            cardTitle.innerHTML = loc.toString() + " " + currentDate;

            var currentIcon = document.createElement("img");
            weatherCardBodyEl.appendChild(currentIcon);
            currentIcon.classList.add("card-img");
            currentIcon.setAttribute("src", iconUrl);
            document.querySelector(".card-img").style.width = "5%";

            var currentTemp = document.createElement("p");
            weatherCardBodyEl.appendChild(currentTemp);
            currentTemp.classList.add("card-text");
            currentTemp.innerHTML = "Temp: " + temp.toString();

            var currentWind = document.createElement("p");
            weatherCardBodyEl.appendChild(currentWind);
            currentWind.classList.add("card-text");
            currentWind.innerHTML = "Wind: " + wind.toString();

            var currentHum = document.createElement("p");
            weatherCardBodyEl.appendChild(currentHum);
            currentHum.classList.add("card-text");
            currentHum.innerHTML = "Humidity: " + hum.toString();
        }
        )
};

function getWeatherForecast(lat, lon) {
    // requests the 5-day forecast for city
    var forecastDaysUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
    // grabs forecast data from request
    fetch(forecastDaysUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // appends the 5-Day Forecast title to the webpage
            var forecastTitleEl = document.createElement("h3");
            fiveDaysContainer.appendChild(forecastTitleEl);
            forecastTitleEl.innerHTML = "5-Day Forecast";
            // for of loop will navigate to the array within list that holds the data needed for webpage; console logs selected data for each array
            for (var i = 0; i < 40; i += 8) {
                var fiveDates = data.list[i].dt_txt;
                // need var for weather icons
                // console.log(data.list[i].main.temp);
                // console.log(data.list[i].main.humidity);
                // console.log(data.list[i].wind.speed);

                // creates cards to hold forecast info
                var dailyForecastCards = document.createElement("div");
                forecastDaysEl.appendChild(dailyForecastCards);
                dailyForecastCards.classList.add("card", "col", "text-center");
                
                var editedDates = fiveDates.substring(5, 10);
                datesEl = document.createElement("p");
                dailyForecastCards.appendChild(datesEl);
                datesEl.innerHTML = editedDates.toString();

                // var icon = data.list[0].weather[0].icon;
                // // URL is https://openweathermap.org/img/wn/10d@2x.png
                // // url created will grab the weather icon for the day
                // var iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
                // var temp = data.list[0].main.temp;
                // var humidity = data.list[0].main.humidity;
                // var wind = data.list[0].wind.speed;

                // var weatherCardBodyEl = document.createElement("div");
                // currentWeatherCard.appendChild(weatherCardBodyEl);
                // weatherCardBodyEl.classList.add("card-body");

                // var cardTitle = document.createElement("h5");
                // weatherCardBodyEl.appendChild(cardTitle);
                // cardTitle.classList.add("card-title");
                // // used Day.js to properly display date without extra text and in correct format
                // var currentDate = dayjs(date).format("MM/DD/YY");
                // // takes location name and adds space between it and the date
                // cardTitle.innerHTML = loc.toString() + " " + currentDate;

                // var currentIcon = document.createElement("img");
                // weatherCardBodyEl.appendChild(currentIcon);
                // currentIcon.classList.add("card-img");
                // currentIcon.setAttribute("src", iconUrl);
                // document.querySelector(".card-img").style.width = "5%";
            }
        })

};

searchButton.addEventListener("click", getGeoCode);
