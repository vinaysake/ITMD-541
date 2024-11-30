// Utility: Show error message
const showError = (message) => alert(`Error: ${message}`);

// Global variables for latitude and longitude
let latitude;
let longitude;

// DOM Elements
const menuButton = document.getElementById("menuBtn");
const searchButton = document.getElementById("searchButton");
const searchField = document.getElementById("searchField");
const findMyLocationBtn = document.getElementById("findMyLocationBtn");
const contentContainer = document.getElementById("contentContainer");

// Function to fetch sunrise and sunset times using latitude and longitude
const fetchSunriseSunset = (lat, lon) => {
  const apiUrl = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`;

  // Fetching sunrise and sunset times
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const sunrise = new Date(data.results.sunrise);
      const sunset = new Date(data.results.sunset);

      // Format the times to a readable format
      const sunriseTime = sunrise.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const sunsetTime = sunset.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      // Display the times on the page
      contentContainer.innerHTML = `
        <h2>Sunrise: ${sunriseTime}</h2>
        <h2>Sunset: ${sunsetTime}</h2>
      `;
    })
    .catch((error) => {
      console.error("Error fetching sunrise and sunset data:", error);
      contentContainer.innerHTML = "<p>Unable to retrieve data. Please try again later.</p>";
    });
};

// Function to get user's current location
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Extract latitude and longitude from the position object
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        // Fetch sunrise and sunset times using the user's location
        fetchSunriseSunset(latitude, longitude);
      },
      (error) => {
        showError("Unable to get your location. Please enable location services.");
        contentContainer.innerHTML = "<p>Unable to get your location.</p>";
      }
    );
  } else {
    showError("Geolocation is not supported by this browser.");
    contentContainer.innerHTML = "<p>Geolocation is not supported by this browser.</p>";
  }
};

// Event listener for "Find My Location" button
findMyLocationBtn.addEventListener("click", getLocation);

// Event listener for "Search" button (optional if you want to add city-based search)
searchButton.addEventListener("click", () => {
  const cityName = searchField.value.trim();
  if (cityName) {
    // You can implement a city geocoding API here to get lat/lon for the city
    showError("City search functionality is not yet implemented.");
  } else {
    showError("Please enter a city name.");
  }
});
