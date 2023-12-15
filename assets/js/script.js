
// global variables
var apiKey = "dd2805d75b3cf217071362e5f5560240";
var searchButton = document.querySelector("#search-button");
var currentWeatherCard = document.getElementById("current-weather");
var prevSearchesEl = document.getElementById("prev-searches");
var fiveDaysContainer = document.getElementById("5-day-container");


function getGeoCode(pastCity) {
    // sets the previous searches element's inner HTML to a str
    fiveDaysContainer.innerHTML = "";
    currentWeatherCard.innerHTML = "";
    // grabs the city name that is input by page user
    var city = document.getElementById("city-entry").value;
    // to get rid of pointer event issue; assign city var to innerHTML str
    if (typeof pastCity === "string") {
        city = pastCity;
    }
    // sets value of var to local storage item
    var cities = localStorage.getItem("cityQ");
    // sets value of var to an array of cities from above/empty array
    var parsedCities = JSON.parse(cities) || [];
    // pushes the city name input by user into the array
    parsedCities.push(city);
    // converts the array data to a string
    var citiesStringified = JSON.stringify(parsedCities);

    if (typeof pastCity !== "string") {
        // sets local storage to above string with a key of cityQ
        // specifies difference btw searched city and if prev city search btn is being pressed
        localStorage.setItem("cityQ", citiesStringified);
        genCityHistBtns();
    }

    function genCityHistBtns() {
        // for loop iterates through the array of cities and creates a button for each and gives it button class
        for (i = 0; i < parsedCities.length; i++) {
            var cityHistBtnEl = document.createElement("button");
            prevSearchesEl.appendChild(cityHistBtnEl);
            cityHistBtnEl.innerHTML = parsedCities[i];
            cityHistBtnEl.classList.add("btn", "btn-primary", "btn-block");
        }
    }

    // created a url variable that concatenates query parameter to request city input and parameter for specific api key 
    var geoCodeUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;

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

// when click btn, get innerHTML and call geoCode and assign to pastCity
prevSearchesEl.addEventListener("click", function (event) {
    event.stopPropagation();
    if (event.target.matches("button")) {
        // console.log(event.target.innerHTML);
        getGeoCode(event.target.innerHTML);
    }
});

// takes the lat and lon from the geoCode function and uses it to retrieve the current forecast information for the correlating city
function getCurrentWeatherForecast(lat, lon) {
    // requests the forecast for city
    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    var forecastUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
    // grabs forecast data from request
    fetch(forecastUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // card appended to webpage w/ content inside
            var weatherCardBodyEl = document.createElement("div");
            currentWeatherCard.appendChild(weatherCardBodyEl);
            weatherCardBodyEl.classList.add("card-body");

            var cardTitle = document.createElement("h5");
            weatherCardBodyEl.appendChild(cardTitle);
            cardTitle.classList.add("card-title");

            // used Day.js to properly display date without extra text and in correct format
            var date = dayjs().format("MM-DD-YYYY");
            var currentDate = date;
            var loc = data.name;
            // takes location name and adds space between it and the date
            cardTitle.textContent = loc + " " + currentDate;

            var icon = data.weather[0].icon;
            // url created will grab the weather icon for the day
            var iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            var currentIcon = document.createElement("img");
            weatherCardBodyEl.appendChild(currentIcon);
            currentIcon.classList.add("card-img");
            currentIcon.setAttribute("src", iconUrl);
            document.querySelector(".card-img").style.width = "18%";

            // unicode for degrees symbol \u00B0
            var temp = data.main.temp + "\u00B0F";
            var currentTemp = document.createElement("p");
            weatherCardBodyEl.appendChild(currentTemp);
            currentTemp.classList.add("card-text");
            currentTemp.textContent = "Temp: " + temp;

            var wind = data.wind.speed + " MPH";
            var currentWind = document.createElement("p");
            weatherCardBodyEl.appendChild(currentWind);
            currentWind.classList.add("card-text");
            currentWind.textContent = "Wind: " + wind;

            var hum = data.main.humidity + " %";
            var currentHum = document.createElement("p");
            weatherCardBodyEl.appendChild(currentHum);
            currentHum.classList.add("card-text");
            currentHum.textContent = "Humidity: " + hum;
        }
        )
};

function getWeatherForecast(lat, lon) {
    // requests the 5-day forecast for city
    var forecastDaysUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
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
                // creates cards to hold forecast info
                var dailyForecastCards = document.createElement("div");
                fiveDaysContainer.appendChild(dailyForecastCards);
                dailyForecastCards.classList.add("card", "col", "text-center");

                var fiveDates = data.list[i].dt_txt;
                var editedDates = fiveDates.substring(5, 10);
                datesEl = document.createElement("p");
                dailyForecastCards.appendChild(datesEl);
                datesEl.innerHTML = editedDates.toString();

                var fiveIcons = data.list[0].weather[0].icon;
                var iconsUrl = "https://openweathermap.org/img/wn/" + fiveIcons + "@2x.png";
                var iconsEl = document.createElement("img");
                dailyForecastCards.appendChild(iconsEl);
                iconsEl.setAttribute("src", iconsUrl);

                var fiveTemps = data.list[i].main.temp + "\u00B0F";
                var tempsEl = document.createElement("p");
                dailyForecastCards.appendChild(tempsEl);
                tempsEl.textContent = fiveTemps;

                var fiveHums = data.list[i].main.humidity + " %";
                var humsEl = document.createElement("p");
                dailyForecastCards.appendChild(humsEl);
                humsEl.textContent = fiveHums;

                var fiveWinds = data.list[i].wind.speed + " MPH";
                var windsEl = document.createElement("p");
                dailyForecastCards.appendChild(windsEl);
                windsEl.textContent = fiveWinds;
            }
        })
};

searchButton.addEventListener("click", getGeoCode);
