// Get elements from the DOM
const locationSelect = document.getElementById("location");
const currentLocationBtn = document.getElementById("current-location-btn");
const results = document.getElementById("results");

// List of locations with their coordinates
const locations = {
    "New York, USA": { lat: 40.7128, lon: -74.0060 },
    "London, UK": { lat: 51.5074, lon: -0.1278 },
    "Tokyo, Japan": { lat: 35.6762, lon: 139.6503 },
    "Sydney, Australia": { lat: -33.8688, lon: 151.2093 },
    "Paris, France": { lat: 48.8566, lon: 2.3522 },
    "Berlin, Germany": { lat: 52.5200, lon: 13.4050 },
    "Rio de Janeiro, Brazil": { lat: -22.9068, lon: -43.1729 },
    "Cape Town, South Africa": { lat: -33.9249, lon: 18.4241 },
    "Dubai, UAE": { lat: 25.276987, lon: 55.296249 },
    "Moscow, Russia": { lat: 55.7558, lon: 37.6173 }
};

// Function to fetch sunrise and sunset data from the API
async function fetchSunriseSunset(lat, lon) {
    const apiUrl = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lon}&formatted=0`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === "OK") {
            updateDashboard(data.results);
        } else {
            throw new Error("Failed to fetch data");
        }
    } catch (error) {
        results.innerHTML = "<p>Error fetching data. Please try again later.</p>";
        console.error("Error:", error);
    }
}

// Function to update the UI with the fetched data
function updateDashboard(data) {
    const { sunrise, sunset, dawn, dusk, day_length, solar_noon, timezone } = data;

    results.innerHTML = `
        <p><strong>Sunrise:</strong> ${formatTime(sunrise)}</p>
        <p><strong>Sunset:</strong> ${formatTime(sunset)}</p>
        <p><strong>Dawn (Civil Twilight Begin):</strong> ${dawn ? formatTime(dawn) : 'N/A'}</p>
        <p><strong>Dusk (Civil Twilight End):</strong> ${dusk ? formatTime(dusk) : 'N/A'}</p>
        <p><strong>Day Length:</strong> ${formatTime(day_length)}</p>
        <p><strong>Solar Noon:</strong> ${formatTime(solar_noon)}</p>
        <p><strong>Time Zone:</strong> ${timezone}</p>
    `;
}

// Function to format time to a readable format (12-hour format with AM/PM)
function formatTime(time) {
    const date = new Date(time);
    const options = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true };
    return date.toLocaleTimeString([], options);
}

// Event listener for when a location is selected from the dropdown
locationSelect.addEventListener("change", (event) => {
    const selectedLocation = event.target.value;
    const { lat, lon } = locations[selectedLocation];
    fetchSunriseSunset(lat, lon);
});

// Event listener for when the user clicks on the "Use Current Location" button
currentLocationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchSunriseSunset(latitude, longitude);
            },
            (error) => {
                handleLocationError(error);
            },
            {
                timeout: 10000, // Timeout after 10 seconds if location is not retrieved
                enableHighAccuracy: true // Request high accuracy if possible
            }
        );
    } else {
        results.innerHTML = "<p>Geolocation is not supported by this browser.</p>";
    }
});

// Function to handle geolocation errors
function handleLocationError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            results.innerHTML = "<p>Permission denied. Please allow location access in your browser settings.</p>";
            break;
        case error.POSITION_UNAVAILABLE:
            results.innerHTML = "<p>Location information is unavailable. Please try again.</p>";
            break;
        case error.TIMEOUT:
            results.innerHTML = "<p>The request to get user location timed out.</p>";
            break;
        case error.UNKNOWN_ERROR:
            results.innerHTML = "<p>An unknown error occurred.</p>";
            break;
        default:
            results.innerHTML = "<p>Unable to retrieve your location. Please try again later.</p>";
    }
}

// Initialize the dashboard with default location data (e.g., New York)
document.addEventListener("DOMContentLoaded", () => {
    const defaultLocation = "New York, USA";
    locationSelect.value = defaultLocation;
    const { lat, lon } = locations[defaultLocation];
    fetchSunriseSunset(lat, lon);
});
