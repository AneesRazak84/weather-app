const API_KEY = "84674b82ba66ef10c72996e0eb4ee152";
let isCelsius = true;
let currentTemp = 0;

async function getWeather() {
  const cityInput = document.getElementById("cityInput");
  const city = cityInput.value.trim();

  if (!city) return;

  showLoading();

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError();
  } finally {
    hideLoading();
  }
}

function displayWeather(data) {
  document.getElementById("error").style.display = "none";
  const weatherInfo = document.getElementById("weatherInfo");
  weatherInfo.style.display = "block";

  // Add visible class after a small delay for animation
  setTimeout(() => {
    weatherInfo.classList.add("visible");
  }, 10);

  currentTemp = data.main.temp;
  document.getElementById("temp").textContent = Math.round(currentTemp);
  document.getElementById("cityName").textContent = data.name;
  document.getElementById("description").textContent =
    data.weather[0].description.charAt(0).toUpperCase() +
    data.weather[0].description.slice(1);
  document.getElementById("humidity").textContent = `${data.main.humidity}%`;
  document.getElementById("windSpeed").textContent = `${Math.round(
    data.wind.speed * 3.6
  )} km/h`;

  const iconCode = data.weather[0].icon;
  document.getElementById(
    "weatherIcon"
  ).src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  updateBackground(data.weather[0].description);
}

function toggleUnits() {
  isCelsius = !isCelsius;
  const tempElement = document.getElementById("temp");
  const unitsElement = document.getElementById("units");

  if (isCelsius) {
    tempElement.textContent = Math.round(currentTemp);
    unitsElement.textContent = "°C";
  } else {
    tempElement.textContent = Math.round((currentTemp * 9) / 5 + 32);
    unitsElement.textContent = "°F";
  }
}

function showError() {
  document.getElementById("error").style.display = "block";
  document.getElementById("weatherInfo").style.display = "none";
  document.getElementById("weatherInfo").classList.remove("visible");
}

function showLoading() {
  document.getElementById("loading").style.display = "block";
  document.getElementById("error").style.display = "none";
  document.getElementById("weatherInfo").style.display = "none";
}

function hideLoading() {
  document.getElementById("loading").style.display = "none";
}

function updateBackground(weatherDescription) {
  const body = document.body;
  if (weatherDescription.includes("cloud")) {
    body.style.background =
      "linear-gradient(135deg, #757F9A 0%, #D7DDE8 50%, #9EA3AC 100%)";
  } else if (weatherDescription.includes("rain")) {
    body.style.background =
      "linear-gradient(135deg, #29323c 0%, #485563 50%, #2B5876 100%)";
  } else if (weatherDescription.includes("clear")) {
    body.style.background =
      "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7F7FD5 100%)";
  } else if (weatherDescription.includes("snow")) {
    body.style.background =
      "linear-gradient(135deg, #E3E3E3 0%, #5D6874 50%, #2C3E50 100%)";
  } else if (weatherDescription.includes("thunder")) {
    body.style.background =
      "linear-gradient(135deg, #141E30 0%, #243B55 50%, #141E30 100%)";
  }
}

// Add event listener for Enter key
document.getElementById("cityInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getWeather();
  }
});
