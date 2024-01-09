
l
 $('.form-control')

function loadSaves () {
    for(let i = 0; i < savedCities.length; i++) {
    const savedList = "<li>" + savedCities[i] + "<li>";
    $('.searchResults').append(savedList);
}
}

function searchCity() {
    const cityName = JSON.parse(localStorage.getItem("cityName"))
    var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=99ada079775ccf12a3014f095b1d2b79";
    
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log("Temperature first day is:" + data.list[4].main.temp)
            console.log(data.list[1].weather[0].icon)
            // ...... 4, 12, 20, 28, 36

            // Next task: Fill in the temperatures for the 5 day cards

            // debugger; // frozen sandbox
            console.log(data)
        })
}

$('form').submit(function (event) {
    event.preventDefault;
    searchCity();
    let submitInput = JSON.stringify(userInput.val())
    console.log(submitInput)
    localStorage.setItem("cityName", submitInput)
    savedCities.push(cityName);
    JSON.stringify(localStorage.setItem("savedCities", savedCities));
})
console.log(savedCities);
// var url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=99ada079775ccf12a3014f095b1d2b79` // template literal







// // create a variable to city input
// // create a variable to search button

// // add click event listener to search button, so that when they click the search button
// // city input's value gets sent to fetch's url (in other words, you call function searchCity)

// /**
//  *
//  * citName is what's passed after user clicks search and we get the value of city input
//  */

// // searchCity("San Antonio") // searchCity(cityInput.value)