let userForm = $('.form-control');


function loadSaves() {
    let savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
    let searchedCities = JSON.parse(localStorage.getItem("searchedCities"))

    for (let i = 0; i < searchedCities.length; i++) {
        savedCities.push(searchedCities[i]);

        for (let i = 0; i < savedCities.length; i++) {
            $('.searchResults').append("<li>" + savedCities[i] + "<li>")
        }
    }
}

function searchCity() {

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

let date =document.getElementsByClassName('item-1');
let icon =document.getElementsByClassName('item-2');
let temp =document.getElementsByClassName('item-3');
let wind =document.getElementsByClassName('item-4');
let humidity =document.getElementsByClassName('item-5');

$('form').submit(function (event) {
    event.preventDefault();
    let currentCity = userForm.val();

    var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&units=imperial&appid=99ada079775ccf12a3014f095b1d2b79";

    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(data => {
            console.log(data);
            // Extract specific information using destructuring assignment
            const specificData = data.list.main[1, 9, 17, 25, 33]
            
            const { dt_txt, icon, temp, wind, humidity } = specificData;
        
            // Now you can use these variables as needed
            console.log("Date:", dt_txt);
            console.log("Icon:", icon);
            console.log("Temperature:", temp);
            console.log("Wind:", wind.speed);
            console.log("Humidity:", humidity);
          }) 
        }
)
//           {{           let date = data.list[1].

            


//             1, 9, 17, 25, 33

//         })
//     localStorage.setItem("searchedCities", currentCity);
// })
