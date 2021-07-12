(function weatherApp() {

    const btn = document.getElementById("search-btn");
    const cityName = document.getElementById("cityName");
    const countries = document.getElementById("countries");
    const section = document.getElementById("weather-box");
    const loader = document.createElement("div");

    btn.addEventListener("click",validateData);
    window.addEventListener("onload",getData("Nashik","India","metric"));
    window.addEventListener("keyup", function(event){
        if (event.keyCode == 13){
            return validateData();
        }
    });

    function validateData(){
        if(cityName.value === "" || countries.value === "") return alert("Choose a city and a country");

        getData(cityName.value, countries.value,"metric");
    }

    function displayDom(weatherObject) {
        const icon = document.getElementById("icon");
        const status = document.getElementById("status")
        const temperature = document.getElementById("temperature");
        const city = document.getElementById("city");
        const country = document.getElementById("country");
        const humidity = document.getElementById("humidity");
        const wind = document.getElementById("wind");

        // The URL of the icon https://openweathermap.org/weather-conditions
        icon.src = `https://openweathermap.org/img/wn/${weatherObject.weather[0].icon}@2x.png`;
        status.textContent = weatherObject.weather[0].main;
        temperature.textContent = weatherObject.main.temp + "°C";
        city.textContent = weatherObject.name;
        country.textContent = weatherObject.sys.country;
        humidity.textContent = "Humidity: " + weatherObject.main.humidity + "%";
        wind.textContent = "Wind: " + weatherObject.wind.speed + "km/h";
        setTimeout(function(){section.removeChild(section.lastChild);},1000)
        
    }

    async function getData(cityName,country,units = "metric"){
        loader.classList.add("lds-dual-ring");
        section.appendChild(loader);
        
        const weatherKey = "eba76c028165f528d7c558cbb325f4d0";

        const response = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${cityName},${country}&units=${units}&appid=${weatherKey}`);
        
        // status validation, if the status is not 200 OK, there is going to be a alert for the user and the function is going to stop execution
        if(response.status !== 200) return alert("Ooops, something went wrong, try again")
        
        // If the response is 200, we are going to fetch the weather data
        const weatherData = await response.json();

        // Validate that there is at least one city with the provided name in the country
        if (weatherData.count === 0) return alert("There is no such city in that country :p");

        const weatherObject = weatherData.list[0];

        return displayDom(weatherObject);
    }
})();