let searchedTown = document.querySelector('#searchedTown');
let currentTemperature = document.querySelector('#currentTemperature');
let currentStatusLogo = document.querySelector('#currentStatusLogo');
let currentStatus = document.querySelector('#currentStatus');
let windDirection = document.querySelector('#windDirection');
let windKiloPerHour = document.querySelector('#windKiloPerHour');
let rianProp = document.querySelector('#rianProp');
let tomorrowMinTemperature = document.querySelector('#tomorrowMinTemperature');
let tomorrowMaxTemperature = document.querySelector('#tomorrowMaxTemperature');
let tomorrowStatusLogo = document.querySelector('#tomorrowStatusLogo');
let tomorrowStatus = document.querySelector('#tomorrowStatus');
let aftertomorrowMinTemperature = document.querySelector('#aftertomorrowMinTemperature');
let aftertomorrowMaxTemperature = document.querySelector('#aftertomorrowMaxTemperature');
let aftertomorrowStatusLogo = document.querySelector('#aftertomorrowStatusLogo');
let aftertomorrowStatus = document.querySelector('#aftertomorrowStatus');
let searchBar = document.querySelector('#searchBar')
let currentCity = 'london' ;

async function getWeather()
{
    var response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=313bcc9c6c52446a93183937221206&q=${currentCity}&days=3&aqi=no&alerts=no`) ;
    var finalResult = await response.json();
    todayWeather(finalResult);
    tomorrowWeather(finalResult);
    aftertomorrowWeather(finalResult)
    searchBar.addEventListener("input", async function() {
        currentCity = searchBar.value
        var response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=313bcc9c6c52446a93183937221206&q=${currentCity}&days=3&aqi=no&alerts=no`) ;
        var finalResult = await response.json();
        todayWeather(finalResult);
        tomorrowWeather(finalResult);
        aftertomorrowWeather(finalResult)
    });

}
(async function (){
    await getWeather() ;
})();

//////////////////////////////////////////////today/////////////////////////////////////////////////
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const today = new Date();
document.getElementById('todayDay').innerHTML = weekday[today.getDay()];
document.getElementById('todayDate').innerHTML = + today.getDate() + " " +months[today.getMonth()]  ;
//////////////////////////////////////////////tomorrow//////////////////////////////////////////////
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
document.getElementById('tomorrowDay').innerHTML = weekday[tomorrow.getDay()];
document.getElementById('tomorrowDate').innerHTML = + tomorrow.getDate() + " " +months[tomorrow.getMonth()]  ;
//////////////////////////////////////////////tomorrow//////////////////////////////////////////////
const afterTomorrow = new Date();
afterTomorrow.setDate(afterTomorrow.getDate() + 2);
document.getElementById('afterTomorrowDay').innerHTML = weekday[afterTomorrow.getDay()];
document.getElementById('afterTomorrowDate').innerHTML = + afterTomorrow.getDate() + " " +months[afterTomorrow.getMonth()]  ;
////////////////////////////////////////////////////////////////////////////////////////////////////

function todayWeather(finalResult){
    searchedTown.innerHTML = finalResult.location.region ;
    currentTemperature.innerHTML = finalResult.current.temp_c ;
    currentStatusLogo.setAttribute("src", `https:${finalResult.current.condition.icon}`);
    currentTemperature.innerHTML = `${finalResult.current.temp_c}'c` ;
    currentStatus.innerHTML = finalResult.current.condition.text ;
    windDirection.innerHTML = finalResult.current.wind_dir;
    windKiloPerHour.innerHTML = finalResult.current.wind_kph;
    rianProp.innerHTML = `${finalResult.current.uv}%`;
}
function tomorrowWeather(finalResult){
    tomorrowMinTemperature.innerHTML = finalResult.forecast.forecastday[1].day.mintemp_c ;
    tomorrowMaxTemperature.innerHTML = finalResult.forecast.forecastday[1].day.maxtemp_c ;
    tomorrowStatus.innerHTML = finalResult.forecast.forecastday[1].day.condition.text ;
    tomorrowStatusLogo.setAttribute("src", `https:${finalResult.forecast.forecastday[1].day.condition.icon}`);
}

function aftertomorrowWeather(finalResult){
    aftertomorrowMinTemperature.innerHTML = finalResult.forecast.forecastday[2].day.mintemp_c ;
    aftertomorrowMaxTemperature.innerHTML = finalResult.forecast.forecastday[2].day.maxtemp_c ;
    aftertomorrowStatus.innerHTML = finalResult.forecast.forecastday[2].day.condition.text ;
    aftertomorrowStatusLogo.setAttribute("src", `https:${finalResult.forecast.forecastday[2].day.condition.icon}`);
}
////////////////////////////////////////////////////////////////////////////////////////////////////
