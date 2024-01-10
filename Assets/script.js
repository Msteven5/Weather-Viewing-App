let userForm = $('.form-control');

let date =document.getElementsByClassName('item-1');
let icon =document.getElementsByClassName('item-2');
let temp =document.getElementsByClassName('item-3');
let wind =document.getElementsByClassName('item-4');
let humidity =document.getElementsByClassName('item-5');

dateArray =Array.from(date);
iconArray =Array.from(icon);
tempArray =Array.from(temp);
windArray =Array.from(wind);
humidArray =Array.from(humidity);

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

    let currentCity = userForm.val();
    
    var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&units=imperial&appid=99ada079775ccf12a3014f095b1d2b79";
    
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(data => {
            console.log(data);
    
            const dataArraysNeeded = [0, 8, 16, 24, 32, 39]
            const specificData = dataArraysNeeded.map(index => data.list[index]);
    
                
                for(let i = 0; i < specificData.length; i++) {
                    const { dt_txt, weather, main, wind} = specificData[i]
                    dateArray[i].textContent = "Date: " + dt_txt
                    iconArray[i].textContent = weather[0].icon
                    tempArray[i].textContent = "Temperature: " + main.temp
                    windArray[i].textContent = "Wind speed: " + wind.speed
                    humidArray[i].textContent = "Humidity: " + main.humidity
    
                }
    
            })
        }



$('form').submit(function (event) {
    event.preventDefault();
    searchCity();
          }) 
        

//           {{           let date = data.list[1].

            


//             1, 9, 17, 25, 33

//         })
//     localStorage.setItem("searchedCities", currentCity);
// })
