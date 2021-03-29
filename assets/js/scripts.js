// DOM Variables
let cityInputEl = $("#city-input");
let searchHistoryEl = $("#search-history");
let today = moment();



// JS Variables
let url = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&appid=6606e9501ff48568589dcb47972390e6";
const units = "&units=imperial"
let cityKey;
let searchHistory;


// Function Definitions
function lookupUvi(lat, lon) {

    let uviRequestUrl = ("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + units + "&exclude=hourly,minutely,alerts" + apiKey);

    fetch(uviRequestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log(data);

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

            for (let i = 0; i < 5; i++) {

                let img = ("http://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png");

                // Create a div
                let div = $('<div>').addClass("day-div");

                // Create a headline with the date
                let date = $('<h2>').text(moment().add((i + 1), 'days').format("l"));

                // Create the weather icon and add the current icon to it
                let icon = $('<img>').attr("src", img);

                // Create a paragraph for the temp and add the current temp to it
                let temp = $('<p>').text("Temp: " + data.daily[i].temp.day + "°F");

                // Create a paragraph for the humidity add the current temp to it
                let humidity = $('<p>').text("Humidity: " + data.daily[i].humidity + "%");

                // Append the div to "day-divs"
                $('#day-divs').append(div);

                // Append the h1 to the div
                div.append(date);

                // Append the weather icon to the div
                div.append(icon);

                // Append the temp paragraph to the div
                div.append(temp);

                // Append the humidity paragraph to the div
                div.append(humidity);
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
            let icon = ("https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
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

function getInput() {

    $('#weather-section').toggleClass("hidden");

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

    cityInputEl.val("");



    lookupWeather();
}

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

// Event listeners
$("#input").submit(getInput);

$('.list-group-item').on("click", function (event) {
    alert("Event listener is working");
})


// Function Calls
init();