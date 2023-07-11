var formSubmit = document.getElementById("submitCity");
const apiKey = "";
const searchBox = document.querySelector(".search input");

async function updateWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    let data = await response.json();

    if(response.status == 404) {
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
    }
    
    document.querySelector(".city").innerHTML=data.name ? data.name : data.message;
    document.querySelector(".temp").innerHTML= data.main.temp ? Math.round(data.main.temp) + "°c" : "N/A";
    document.querySelector(".humidity").innerHTML = data.main.humidity ? data.main.humidity + "%" : "N/A";
    document.querySelector(".wind").innerHTML = data.wind.speed ? data.wind.speed + "km/h" : "N/A";

    document.querySelector(".weather-icon").src=`images/${data.weather[0].main ? data.weather[0].main.toLowerCase() : "clear"}.png`;

    document.querySelector(".weather").style.display="block";
    document.querySelector(".error").style.display="none";

}

updateWeather();

formSubmit.addEventListener("submit", (event) => {
    event.preventDefault();
    updateWeather(searchBox.value);
});