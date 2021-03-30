// DOM Variables
let cityInputEl = $("#city-input");
let searchHistoryEl = $("#search-history");
let today = moment();

let dayDivsEl = $('<div>');
dayDivsEl.attr('id', 'day-divs');

// let fiveDayHeadline;
// $('#city-5-day').append(fiveDayHeadline);



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

            let dailyUvTitle = $('<p>').text("UV Index: ");
            dailyUvTitle.attr('id', 'last-p');

            let dailyUv = $('<span>').text(data.current.uvi);
            dailyUv.attr('id', '#uv-index-indicator');
            dailyUv.attr('style', "padding: 4px", "border-radius: 5px");

            $('#city-detail').append(dailyUvTitle);
            dailyUvTitle.append(dailyUv);


            if (data.current.uvi < 3) {
                dailyUv.css("background-color", "green");
                dailyUv.css("color", "white");
            } else if (data.current.uvi >= 3 && data.current.uvi < 6) {
                dailyUv.css("background-color", "yellow");
                dailyUv.css("color", "black");
                // $('#uv-index-indicator').attr("style", "color: black");
            } else if (data.current.uvi >= 6 && data.current.uvi < 8) {
                dailyUv.css("background-color", "orange");
            } else if (data.current.uvi >= 8 && data.current.uvi < 11) {
                dailyUv.css("background-color", "red");
            } else if (data.current.uvi >= 11) {
                dailyUv.css("background-color", "purple");
            }

            // let dayDivsEl = $('<div>');
            // dayDivsEl.attr('id', 'day-divs');

            $('#city-5-day').append(dayDivsEl);

            // fiveDayHeadline = $('<h2>').text("5-Day Forecast");
            // $('#city-5-day').append(fiveDayHeadline);



            for (let i = 0; i < 5; i++) {

                let img = ("https://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png");

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
                dayDivsEl.append(div);

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

    dayDivsEl.empty();
    // fiveDayHeadline.empty();
    $('#city-detail').empty();
    // $('city-5-day').empty();


    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {


            if (data.cod !== 200) {
                let erHeadlineEl = $('<div>');
                let dailyTitle = $('<h1>').text("No City Found. Please Try Again.");
                $('#city-detail').append(erHeadlineEl);
                erHeadlineEl.append(dailyTitle);
                if (($('#week-h2').hasClass("hidden")) === false) {
                    $('#week-h2').toggleClass("hidden");
                };
                return;
            }

            if ($('#week-h2').hasClass("hidden")) {
                $('#week-h2').toggleClass("hidden");
            };

            let headlineEl = $('<div>');
            headlineEl.attr('id', 'headline');

            let icon = ("https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
            // Create h1 with city name & date format.
            dailyTitle = $('<h1>').text(data.name + " (" + today.format("l") + ") ");
            dailyTitle.addClass('#cityName');

            // Create img with weather indicator icon
            let dailyIcon = $('<img>').attr("src", icon);
            dailyIcon.addClass('#weather-indicator');

            // Create p tags for daily temp, humidity, and windspeed.
            let dailyTemp = $('<p>').text("Temperature: " + data.main.temp + "°F");
            dailyTemp.addClass('#daily-temp');

            let dailyHumidity = $('<p>').text("Humidity: " + data.main.humidity + "%");
            dailyHumidity.addClass('#daily-humidity');

            let dailyWind = $('<p>').text("Wind Speed: " + data.wind.speed + "MPH");
            dailyWind.addClass('#daily-wind-speed');


            // Append all to the city-detail section
            $('#city-detail').append(headlineEl);
            headlineEl.append(dailyTitle);
            headlineEl.append(dailyIcon);

            $('#city-detail').append(dailyTemp);
            $('#city-detail').append(dailyHumidity);
            $('#city-detail').append(dailyWind);

            let lat = data.coord.lat;
            let lon = data.coord.lon;

            lookupUvi(lat, lon);
        });
}

function getInput() {

    if ($('#weather-section').hasClass("hidden")) {
        $('#weather-section').toggleClass("hidden");
    };

    cityKey = cityInputEl.val();
    // cityKey = ("?q=" + cityInput);
    event.preventDefault();

    // Get local storage
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory'));

    // Append an li item to the search history list
    let liEl = $('<li>').text(cityKey);
    liEl.addClass("list-group-item");
    liEl.attr("value", cityKey);
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

$('#search-history').on("click", ".list-group-item", function (event) {

    if ($('#weather-section').hasClass("hidden")) {
        $('#weather-section').toggleClass("hidden");
    };

    cityKey = event.target.innerHTML;

    lookupWeather();
})


// Function Calls
init();