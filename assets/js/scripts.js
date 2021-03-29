// DOM Variables
let cityInputEl = $("#city-input");
let searchHistoryEl = $("#search-history");
let today = moment();



// JS Variables
let url = "http://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&appid=6606e9501ff48568589dcb47972390e6";
const units = "&units=imperial"
let cityKey;
let searchHistory;


// Function Definitions
function lookupUvi(lat, lon) {

    let uviRequestUrl = ("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + apiKey);

    fetch(uviRequestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            $('#uv-index-indicator').text(data.current.uvi);

            if (data.current.uvi < 3) {
                $('#uv-index-indicator').css("background-color", "green");
            } else if (data.current.uvi >= 3 && data.current.uvi < 6) {
                $('#uv-index-indicator').css("background-color", "yellow");
                $('#uv-index-indicator').css("color", "black");
                // $('#uv-index-indicator').attr("style", "color: black");
            } else if (data.current.uvi >= 6 && data.current.uvi < 8) {
                $('#uv-index-indicator').css("background-color", "orange");
            } else if (data.current.uvi >= 8 && data.current.uvi < 11) {
                $('#uv-index-indicator').css("background-color", "red");
            } else if (data.current.uvi >= 11) {
                $('#uv-index-indicator').css("background-color", "purple");
            }
        });
}


function lookupWeather() {

    let requestUrl = (url + cityKey + units + apiKey);

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let icon = ("http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
            $('#city-name').text(data.name + " (" + today.format("l") + ") ");
            $('#weather-indicator').attr("src", icon);
            $('#daily-temp').text(data.main.temp);
            $('#daily-humidity').text(data.main.humidity);
            $('#wind-speed-indicator').text(data.wind.speed);

            let lat = data.coord.lat;
            let lon = data.coord.lon;

            lookupUvi(lat, lon);
        });
}


// Event listeners
$("#input").submit(function (event) {
    cityKey = cityInputEl.val().toLowerCase();
    // cityKey = ("?q=" + cityInput);
    event.preventDefault();

    // Get local storage
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory'));

    // Append an li item to the search history list
    let liEl = $('<li>').text(cityKey);
    liEl.addClass("list-group-item");
    searchHistoryEl.append(liEl);

    // Push into it
    searchHistory.push(cityKey);

    // Stringify and set to local storage
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

    // $('cityInputEl').val() = '';


    lookupWeather();
})

function init() {
    // Get local storage
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory'));

    if (searchHistory == null) {
        searchHistory = [];
    } else {
        for (let i = 0; i < searchHistory.length; i++) {
            let liEl = $('<li>').text(searchHistory[i]);
            liEl.addClass("list-group-item");
            searchHistoryEl.append(liEl);
        }
    }

    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

}

// Function Calls
init();