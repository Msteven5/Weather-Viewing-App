let userForm = $('.form-control');

let savedOnScreen = JSON.parse(localStorage.getItem("savedCities"));

let date = document.getElementsByClassName('item-1');
let icon = document.getElementsByClassName('item-2');
let temp = document.getElementsByClassName('item-3');
let wind = document.getElementsByClassName('item-4');
let humidity = document.getElementsByClassName('item-5');

dateArray = Array.from(date);
iconArray = Array.from(icon);
tempArray = Array.from(temp);
windArray = Array.from(wind);
humidArray = Array.from(humidity);

function loadSaves() {
    $('#searchResults').empty();
    
    for (let i = 0; i < savedOnScreen.length; i++) {
        let buttonOnScreen = $("<button>").text(savedOnScreen[i]).addClass("rounded-3 w-75 m-1 bg-light p-2 text-dark bg-opacity-50 border-primary searchList");
        $('#searchResults').append(buttonOnScreen);
    }
}

function showLast() {
    if (savedOnScreen) {
    let lastSearched = savedOnScreen[savedOnScreen.length - 1]
    searchCity(lastSearched);
} else {
    let lastSearched = "Austin"
    searchCity(lastSearched);
}
}

function searchCity(currentCity) {


    var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&units=imperial&appid=99ada079775ccf12a3014f095b1d2b79";

    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(data => {

            nameOnScreen = document.querySelector('.cityName')

            const dataArraysNeeded = [0, 8, 16, 24, 32, 39]
            const specificData = dataArraysNeeded.map(index => data.list[index]);


            for (let i = 0; i < specificData.length; i++) {
                const { dt_txt, weather, main, wind, city } = specificData[i]
                dateArray[i].textContent = "Date: " + dt_txt
                iconArray[i].textContent = weather[0].icon
                tempArray[i].textContent = "Temperature: " + main.temp
                windArray[i].textContent = "Wind speed: " + wind.speed
                humidArray[i].textContent = "Humidity: " + main.humidity
                nameOnScreen.textContent = "Currently: " + data.city.name;

            }
            let savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
            let maxLength = 5;
                if (!savedCities.includes(currentCity)) {
                savedCities.push(currentCity)
            }
                else if (savedCities.length >= maxLength) {
                savedCities.shift();
            }

            localStorage.setItem("savedCities", JSON.stringify(savedCities))
        })

        .catch(error => {
            if (error) {
                let errorMessage = error;
                $('.modal').show();
                $('#errorMessage').text("This city has not been found: " + errorMessage);
                $('.understand').on("click", function () {
                    $('.modal').hide();
                })
            }
        });
}

$('document').ready(showLast(), loadSaves())

$('form').submit(function (event) {
    event.preventDefault();
    let userSearch = userForm.val();
    
    searchCity(userSearch)
    .then(loadSaves());
})

$('#searchResults').on("click", '.searchList', function () {

    let cityButton = $(this).text();
    searchCity(cityButton);
})