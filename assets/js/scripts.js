// DOM Variables
let cityInput = $("#city-input");



// JS Variables
let url = "http://api.openweathermap.org/data/2.5/weather";
const apiKey = "&appid=6606e9501ff48568589dcb47972390e6";
let cityKey;


// Function Definitions
function lookupWeather() {

    let requestUrl = (url + cityKey + apiKey);

    console.log(requestUrl);

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
}


// Event listeners
$("#input").submit(function (event) {
    cityKey = ("?q=" + cityInput.val().toLowerCase());
    event.preventDefault();
    console.log(cityKey);

    lookupWeather();
})

// Function Calls