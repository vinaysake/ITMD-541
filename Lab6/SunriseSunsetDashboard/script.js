// Utility: Show error message
const showError = (message) => alert(`Error: ${message}`);

// Global variables
let latitude;
let longitude;

// DOM Elements
const menuButton = document.getElementById("menuBtn");
const hambargeButton = document.getElementById("hambargBtn");
const cancelButton = document.getElementById("cancelBtn");
const navMenuMobile = document.getElementById("navMenuMobile");
const findMyLocationBtn = document.getElementById("findMyLocationBtn");
const searchField = document.getElementById("searchField");
const searchButton = document.getElementById("searchButton");
const largeFindMyLocationLink = document.getElementById("largeFindMyLocation");
const mobileFindMyLocationLink = document.getElementById("mobileFindMyLocation");
const contentContainer = document.getElementById("contentContainer");

// Toggle navigation menu
menuButton.addEventListener("click", () => {
  hambargeButton.classList.toggle("hambar-btn");
  cancelButton.classList.toggle("cancel-btn");
  navMenuMobile.classList.toggle("nav-menu-mobile");
});

// Fetch sunrise/sunset data based on date
const fetchSunData = async (date) => {
  try {
    const formattedDate = date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=${formattedDate}&timezone=IST`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch data from Sunrise API");
    const data = await response.json();
    return data.results;
  } catch (error) {
    showError(error.message);
    return null;
  }
};

// Add results to the DOM
const addResultsContainer = (todaysData, tomorrowsData) => {
  if (!todaysData || !tomorrowsData) {
    showError("Unable to display sunrise/sunset data");
    return;
  }
  const options = { weekday: "long", month: "long", day: "numeric", year: "numeric" };
  const todayFormatted = new Date().toLocaleDateString("en-US", options);
  const tomorrowFormatted = new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString("en-US", options);

  const html = `
    <div class="explore-container">
      <h3 class="sunrise-sunset-heading">
        Sunrise and Sunset in <span>${searchField.value}</span>
      </h3>
      <div>
        <button id="sunriseButton" class="btn sunrise-btn">Sunrise</button>
        <button id="sunsetButton" class="btn sunset-btn">Sunset</button>
      </div>
      <div id="sunriseContainer" class="sunrise-main-container">
        ${createSunDataBlock("Today", todayFormatted, todaysData, "sunrise")}
        ${createSunDataBlock("Tomorrow", tomorrowFormatted, tomorrowsData, "sunrise")}
      </div>
      <div id="sunsetContainer" class="sunset-main-container hidden">
        ${createSunDataBlock("Today", todayFormatted, todaysData, "sunset")}
        ${createSunDataBlock("Tomorrow", tomorrowFormatted, tomorrowsData, "sunset")}
      </div>
    </div>
  `;
  contentContainer.innerHTML = html;

  // Add event listeners to toggle visibility
  document.getElementById("sunriseButton").addEventListener("click", () => {
    document.getElementById("sunriseContainer").classList.remove("hidden");
    document.getElementById("sunsetContainer").classList.add("hidden");
  });
  document.getElementById("sunsetButton").addEventListener("click", () => {
    document.getElementById("sunriseContainer").classList.add("hidden");
    document.getElementById("sunsetContainer").classList.remove("hidden");
  });
};

// Helper to create sunrise/sunset block
const createSunDataBlock = (day, date, data, type) => {
  const time = type === "sunrise" ? data.sunrise : data.sunset;
  const extraInfo = type === "sunrise" ? `Dawn: ${data.dawn}` : `Dusk: ${data.dusk}`;
  return `
    <div class="${type}-container">
      <h4>${day}</h4>
      <p>${date}</p>
      <p>${type.toUpperCase()}: ${time}</p>
      <p>${extraInfo}</p>
    </div>
  `;
};

// Fetch geolocation for city
const fetchCityCoordinates = async () => {
  try {
    const cityName = searchField.value;
    const url = `https://geocode.maps.co/search?q=${cityName}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch city coordinates");
    const data = await response.json();
    if (data.length === 0) throw new Error("City not found");
    latitude = data[0].lat;
    longitude = data[0].lon;
    const todaysData = await fetchSunData(new Date());
    const tomorrowsData = await fetchSunData(new Date(Date.now() + 24 * 60 * 60 * 1000));
    addResultsContainer(todaysData, tomorrowsData);
  } catch (error) {
    showError(error.message);
  }
};

// Get current location
const getGeoLocation = () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      const todaysData = await fetchSunData(new Date());
      const tomorrowsData = await fetchSunData(new Date(Date.now() + 24 * 60 * 60 * 1000));
      addResultsContainer(todaysData, tomorrowsData);
    },
    () => showError("Unable to access your location")
  );
};

// Event listeners
searchButton.addEventListener("click", () => {
  if (!searchField.value) {
    showError("Please enter a city name");
  } else {
    fetchCityCoordinates();
  }
});
searchField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") fetchCityCoordinates();
});
findMyLocationBtn.addEventListener("click", getGeoLocation);
largeFindMyLocationLink.addEventListener("click", getGeoLocation);
mobileFindMyLocationLink.addEventListener("click", getGeoLocation);
