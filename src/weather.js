import { fromUnixTime, format } from 'date-fns'
import { nth } from './utils';

async function getWeather(location, units='metric') {
    const locationResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=4f38c591e88bdeeb84cf6cf7d72803f9&units=${units}`, {mode:'cors'})
    const locationData = await locationResponse.json();

    return getWeatherFromCoords(locationData.coord.lat, locationData.coord.lon, units);
}

async function getWeatherFromCoords(lat, lon, units) {
    const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&&appid=4f38c591e88bdeeb84cf6cf7d72803f9&units=${units}`, {mode:'cors'});
    const weatherData = await response.json();

    return weatherData; 
}

function getTempHours(weatherData) {
    let tempHours = [];

    for(let x = 0; x <= 7; x ++) { 
        let time = format(fromUnixTime(weatherData.hourly[x].dt),"h aaaaa'm'");
        let temp = weatherData.hourly[x].temp;
        let icon = weatherData.hourly[x].weather[0].icon;

        tempHours.push({
            "time": time,
            "temp": temp,
            "icon": icon,
        });
    }

    return tempHours; 
}

function getTempDays(weatherData) {
    let tempDays = [];
    for(let x = 0; x <= 7; x ++) { 
        let tempDay = format(fromUnixTime(weatherData.daily[x].dt),'dd');
        tempDay += nth(tempDay);

        let temp = weatherData.daily[x].temp.max;
        let icon = weatherData.daily[x].weather[0].icon;

        tempDays.push({
            "date": tempDay,
            "temp": temp,
            "icon": icon,
        });
    }

    return tempDays;
}

export { getWeather, getTempHours, getTempDays }