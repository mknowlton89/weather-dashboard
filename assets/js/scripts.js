// DOM Variables
let cityInputEl = $("#city-input");
let searchHistoryEl = $("#search-history");



// JS Variables
let url = "http://api.openweathermap.org/data/2.5/weather";
const apiKey = "&appid=6606e9501ff48568589dcb47972390e6";
let cityKey;
let searchHistory;


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
    cityInput = cityInputEl.val().toLowerCase();
    cityKey = ("?q=" + cityInput);
    event.preventDefault();
    console.log(cityKey);

    // Get local storage
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory'));

    // Append an li item to the search history list
    let liEl = $('<li>').text(cityInput);
    liEl.addClass("list-group-item");
    searchHistoryEl.append(liEl);

    // Push into it
    searchHistory.push(cityInput);

    // Stringify and set to local storage
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

    // $('cityInputEl').val() = '';


    lookupWeather();
})

function init() {
    // Get local storage
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory'));

    console.log(searchHistory);

    if (searchHistory == null) {
        searchHistory = [];
    } else {
        for (let i = 0; i < searchHistory.length; i++) {
            let liEl = $('<li>').text(searchHistory[i]);
            searchHistoryEl.append(liEl);
        }
    }

    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));



    //  calEvents = JSON.parse(localStorage.getItem('calEvents'));

    // if (calEvents == null) {
    //     calEvents = ['', '', '', '', '', '', '', '', ''];
    // }

    // calEvents[index] = entry;

    // localStorage.setItem('calEvents', JSON.stringify(calEvents));

    // If null, set it to an empty array

    // Else iterate through searchHistory to populate searchHistoryEl

}

// Function Calls
init();