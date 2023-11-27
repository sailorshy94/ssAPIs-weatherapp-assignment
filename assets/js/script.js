// will use local storage to store persistent data
// open weather API used to retrieve weather data - based on coordinates for cities
/* **Hint**: Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name. Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name? 
*/

// want to be able to use JS to make cities searched persist under submit button

// appid = e3762bdf720c3dc3229b0039e02fa026
// API Call for geocoding - allows user to type name in and get api response
// http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit={limit}&appid={API key}
// limit = 1
// http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=1&appid=e3762bdf720c3dc3229b0039e02fa026

// API Call - Current Weather Data
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

// API Call - 5 day/ 3 hr forecast data
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// fetch ("")
//    .then(function(response) {
//     return response.json();
//    }) 
//    .then(function(data) {
//     console.log()
//     console.log(data);
//    });

// function getGeoCoordApi() {
//     var requestUrl = "";

//     fetch(requestUrl)
// }
