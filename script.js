const apiKey = "fab39888b96f4a45d86973e4ac6b8d8f";

const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    console.log("City input:", city); // Check if the city name is getting captured
    if(city !== ""){
        fetchWeather(city);
    }
});

// Convert Unix time to human-readable time
function convertUnixToTime(unixTime) {
    const date = new Date(unixTime * 1000); // Multiply by 1000 to convert seconds to milliseconds
    return date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true }); // Adjust locale and format
}

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if (data.cod === 200) {
            document.getElementById("city-name").textContent = data.name;
            document.getElementById("temperature").textContent = `${data.main.temp} °C`;
            document.getElementById("temp-max").textContent = `${data.main.temp_max} °C`;
            document.getElementById("temp-min").textContent = `${data.main.temp_min} °C`;

            document.getElementById("sun-rise").textContent = `Sunrise: ${convertUnixToTime(data.sys.sunrise)}`;
            document.getElementById("sun-set").textContent = `Sunset: ${convertUnixToTime(data.sys.sunset)}`;

            document.getElementById("weather-description").textContent = `Condition: ${data.weather[0].description}`;
            document.getElementById("pressure").textContent = `${data.main.pressure} hPa`;
            document.getElementById("humidity").textContent = `${data.main.humidity}%`;

            document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

            document.getElementById("speed").textContent = `Wind speed: ${data.wind.speed} meter/sec`;
            document.getElementById("deg").textContent = `Wind direction: ${data.wind.deg}`;
            document.getElementById("gust").textContent = `Wind gust: ${data.wind.gust} meter/sec`;

            document.getElementById("clouds").textContent = `${data.clouds.all} %`;


            weatherInfo.classList.remove("hidden");
        } else {
            alert(`Error: ${data.message}`); // Displays the API's error message (e.g., "city not found")
        }
    } catch (error) {
        alert("Failed to fetch weather data. Please check your internet connection and try again.");
        console.error("Error fetching weather data:", error);
    }
}

// Add this function to display the current date
function displayCurrentDate() {
    const dateElement = document.querySelector(".current-date");
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const today = new Date().toLocaleDateString("en-US", options); // Adjust locale if needed
    dateElement.textContent = today;
}

// Call this function to show the date on page load
displayCurrentDate();
