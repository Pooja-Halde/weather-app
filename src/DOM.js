import { getWeather, getTempHours, getTempDays } from './weather'
import { getUnitType } from './utils'

export default class DOM {
    static weatherData;

    static loadPage() {
        this.addEventListeners();
        this.displayWeather();
    }

    static displayWeather() {
        let location = document.getElementById('search-input').value;
        let errMsg = document.getElementById('error-message');
        let units = getUnitType(document.getElementById('unit').innerHTML);
        if (location === '') location = 'Nashik'

        getWeather(location, units)
        .then(weatherData => { 
            this.displayTempToday(weatherData);
            this.displayTempHours(weatherData);
            this.displayTempDays(weatherData);
            this.updateBackgroundImg(weatherData);
            errMsg.classList.add('hidden')
        })
        .catch(() => errMsg.classList.remove('hidden'));
    }
    
    static updateBackgroundImg(weatherData) {    
        console.log('check');   
        let weather = weatherData.current.weather[0].main;

        let weatherMap = {
            'Clouds' : 'clouds',
            'Thunderstorm' : 'storm',
            'Drizzle' : 'rain', 
            'Rain' : 'rain',
            'Snow' : 'snow',
            'Mist' : 'clouds',
            'Smoke' : 'clouds',
            'Haze' : 'clouds',
            'Dust' : 'clouds',
            'Fog' : 'clouds',
            'Sand' : 'sun',
            'Ash' : 'storm',
            'Squall' : 'storm',
            'Tornado' : 'storm',
            'Clear' : 'sun'
        }
         document.body.style.backgroundImage = `url(img/${weatherMap[weather]}.jpg)`;

        // if (weather === 'Rain' || weather === 'Drizzle') {
        //      document.body.style.color = 'black';
        //     document.getElementById('unit').style.color = 'black';
        // } else { 
        //      document.getElementById('unit').style.color = 'black';
        //     document.body.style.color = 'black';
        // }
    }

    static addEventListeners() {
        const searchButton = document.getElementById('search-button');
        const unitButton = document.getElementById('unit');
        const inputBox = document.getElementById('search-input');

        searchButton.addEventListener('click', e => this.displayWeather());
        unitButton.addEventListener('click', e => this.toggleUnits())
        inputBox.onkeydown = e => {if (e.key === 'Enter') this.displayWeather()};
    }

    static toggleUnits() {
        const unitButton = document.getElementById('unit');
        const units = unitButton.innerText;

        if (units === 'Farenheit') {
            unitButton.innerText = 'Celsius'
        } else {
            unitButton.innerText = 'Farenheit'
        }

        this.displayWeather();

    }

    static getLocation() {
        let input = document.getElementById('search-input').value;
        if (input === '') input = 'Nashik'; 

        return input; 
    }

    static unit = () => (document.getElementById('unit').innerHTML === 'Farenheit') ? '&#8457;' : '&#8451;';

    static displayTempToday(weatherData) {
        const city = document.getElementById('city'); 
        const climate = document.getElementById('climate'); 
        const temp = document.getElementById('temp'); 
        const high = document.getElementById('high'); 
        const low = document.getElementById('low'); 
        const feelsLike = document.getElementById('feels-like'); 
        const humidity = document.getElementById('humidity');
        const pop = document.getElementById('pop');
        const icon = document.getElementById('current-weather-img');

        city.textContent = this.getLocation();
        console.log(weatherData);
        climate.textContent = weatherData.current.weather[0].description;
        temp.innerHTML = `${Math.round(weatherData.current.temp)}${this.unit()}`;
        high.innerHTML = `High ${Math.round(weatherData.daily[0].temp.max)}${this.unit()}`;
        low.innerHTML = `Low ${Math.round(weatherData.daily[0].temp.min)}${this.unit()}`;
        feelsLike.innerHTML = `Feels like ${Math.round(weatherData.current.feels_like)}${this.unit()}`;
        humidity.innerHTML = weatherData.current.humidity + "% humidity";
        pop.innerHTML = `${Math.round((weatherData.daily[0].pop * 100))}% chance of rain`;

        icon.src = `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`;

    }

    static displayTempHours(weatherData) {
        let tempHours = getTempHours(weatherData); 
        let container = document.getElementById('weather-hours-container');

        container.innerHTML = '';

        tempHours.forEach(e => {
        container.innerHTML += `<div class='temp-hours-element'>
            ${e.time}<br>
            ${Math.round(e.temp)}${this.unit()}<br>
            <img src='http://openweathermap.org/img/w/${e.icon}.png'><br>
        </div>`

        });
    }

    static displayTempDays(weatherData) {
        let tempDays = getTempDays(weatherData); 
        let container = document.getElementById('weather-days-container');

        container.innerHTML = '';

        tempDays.forEach(e => {
            container.innerHTML += `<div class='temp-hours-element'>
            ${e.date}<br>
            ${Math.round(e.temp)}${this.unit()}<br>
            <img src='http://openweathermap.org/img/w/${e.icon}.png'><br>
        </div>`
        });
    }
}