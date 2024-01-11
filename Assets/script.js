const userForm = $('.form-control');
const currentDate = dayjs().format('MM/DD/YYYY');

const nameOnScreen = document.getElementById("cityName");
const date = document.getElementsByClassName('item-1');
const icon = document.getElementsByClassName('item-2');
const temp = document.getElementsByClassName('item-3');
const wind = document.getElementsByClassName('item-4');
const humidity = document.getElementsByClassName('item-5');

dateArray = Array.from(date);
iconArray = Array.from(icon);
tempArray = Array.from(temp);
windArray = Array.from(wind);
humidArray = Array.from(humidity);


function loadSaves() {
    $('#searchResults').empty();
    const savedOnScreen = JSON.parse(localStorage.getItem("savedCities"));

    if (savedOnScreen) {
        for (let i = 0; i < savedOnScreen.length; i++) {
            const buttonOnScreen = $("<button>").text(savedOnScreen[i]).addClass("rounded-3 m-1 w-100 bg-light p-2 align-items-start text-dark bg-opacity-75 border-primary searchList");
            $('#searchResults').append(buttonOnScreen);
        }
    }
}

function showLast() {
    const savedOnScreen = JSON.parse(localStorage.getItem("savedCities"));

    if (savedOnScreen) {
        const lastSearched = savedOnScreen[savedOnScreen.length - 1];
        currentDisplay(lastSearched);
        searchCity(lastSearched);
    } else {
        const lastSearched = "Austin"
        currentDisplay(lastSearched);
        searchCity(lastSearched);
    }
}

function searchCity(currentCity) {
    let url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + currentCity + '&units=imperial&appid=99ada079775ccf12a3014f095b1d2b79';

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const dataArraysNeeded = [0, 8, 16, 24, 32];
            const specificData = dataArraysNeeded.map(index => data.list[index]);

            for (let i = 0; i < specificData.length; i++) {
                const { dt_txt, weather, main, wind } = specificData[i];

                const formattedDate = new Date(dt_txt).toLocaleDateString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric'
                });
                const iconCode = weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                const iconImage = document.createElement("img");
                iconImage.src = iconUrl;

                dateArray[i].textContent = 'Date: ' + formattedDate;
                iconArray[i].innerHTML = '';
                iconArray[i].appendChild(iconImage);
                tempArray[i].textContent = 'Temperature: ' + main.temp;
                windArray[i].textContent = 'Wind speed: ' + wind.speed;
                humidArray[i].textContent = 'Humidity: ' + main.humidity;
            }

            const savedCities = JSON.parse(localStorage.getItem('savedCities')) || [];
            const maxLength = 5;
            if (savedCities.length >= maxLength) {
                savedCities.shift();
            }
            if (!savedCities.includes(currentCity)) {
                savedCities.push(currentCity);
            }
            localStorage.setItem('savedCities', JSON.stringify(savedCities));
            loadSaves();
        })
        .catch(function (error) {
            const errorMessage = error;
            $('.modal').show();
            $('#errorMessage').text('This city has not been found: ' + errorMessage);
            $('.understand').on('click', function () {
                $('.modal').hide();
            });
        }
        )
};



function currentDisplay(currentCity) {

    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=imperial&appid=99ada079775ccf12a3014f095b1d2b79";

    fetch(url)
        .then(function (response) {
            return response.json()
        })

        .then(data => {
            $('.currentItem-2').empty();
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            const iconImage = document.createElement("img");
            iconImage.src = iconUrl;

            nameOnScreen.textContent = 'Currently: ' + data.name;
            $('.currentItem-1').text(currentDate);
            $('.currentItem-2').append(iconImage);
            $('.currentItem-3').text('Temperature: ' + data.main.temp)
            $('.currentItem-4').text('Wind speed: ' + data.wind.speed)
            $('.currentItem-5').text('Humidity: ' + data.main.humidity)
        })
}

$('document').ready(showLast(), loadSaves())

$('form').submit(function (event) {
    event.preventDefault();
    const userSearch = userForm.val();

    currentDisplay(userSearch);
    searchCity(userSearch);
    userForm.val('');
})

$('#searchResults').on("click", '.searchList', function () {

    const cityButton = $(this).text();
    currentDisplay(cityButton);
    searchCity(cityButton);
})