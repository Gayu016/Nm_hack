const apiKey = "YOUR_OPENWEATHER_API_KEY"; // Replace with your API key

function getWeather() {
    let city = document.getElementById("cityInput").value;
    let weatherInfo = document.getElementById("weatherInfo");
    let errorMessage = document.getElementById("errorMessage");

    if (city === "") {
        errorMessage.innerText = "Please enter a city name.";
        weatherInfo.style.display = "none";
        return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                errorMessage.innerText = "City not found. Please try again.";
                weatherInfo.style.display = "none";
                return;
            }

            document.getElementById("cityName").innerText = `Weather in ${data.name}`;
            document.getElementById("temperature").innerText = `Temperature: ${data.main.temp}°C`;
            document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
            document.getElementById("weatherDescription").innerText = `Condition: ${data.weather[0].description}`;
            
            let iconCode = data.weather[0].icon;
            document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${iconCode}.png`;
            
            weatherInfo.style.display = "block";
            errorMessage.innerText = "";
        })
        .catch(error => {
            errorMessage.innerText = "Error fetching weather data.";
            weatherInfo.style.display = "none";
        });
}
