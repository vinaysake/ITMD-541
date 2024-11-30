// Helper function to update the dashboard
function updateDashboard(data) {
    const results = document.getElementById("results");
    const { sunrise, sunset, civil_twilight_begin, civil_twilight_end, day_length, solar_noon } = data.results;

    results.innerHTML = `
        <h2>Sunrise & Sunset Data</h2>
        <p><strong>Sunrise:</strong> ${sunrise}</p>
        <p><strong>Sunset:</strong> ${sunset}</p>
        <p><strong>Dawn (Civil Twilight Begin):</strong> ${civil_twilight_begin || 'Not available'}</p>
        <p><strong>Dusk (Civil Twilight End):</strong> ${civil_twilight_end || 'Not available'}</p>
        <p><strong>Day Length:</strong> ${day_length}</p>
        <p><strong>Solar Noon:</strong> ${solar_noon}</p>
    `;
}

// Fetch API data
async function fetchSunriseSunset(lat, lng) {
    const apiUrl = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}&formatted=0`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("API error occurred.");
        const data = await response.json();
        updateDashboard(data);
    } catch (error) {
        const results = document.getElementById("results");
        results.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    }
}

// Event listeners for controls
document.getElementById("locations").addEventListener("change", (e) => {
    const [lat, lng] = e.target.value.split(",");
    fetchSunriseSunset(lat, lng);
});

// Enhanced error handling for current location button
document.getElementById("current-location-btn").addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log("Current Location:", latitude, longitude); // Debugging output
                fetchSunriseSunset(latitude, longitude);
            },
            (error) => {
                const results = document.getElementById("results");
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        results.innerHTML = "<p>Permission denied. Please allow location access.</p>";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        results.innerHTML = "<p>Location information is unavailable.</p>";
                        break;
                    case error.TIMEOUT:
                        results.innerHTML = "<p>The request to get user location timed out.</p>";
                        break;
                    case error.UNKNOWN_ERROR:
                        results.innerHTML = "<p>An unknown error occurred.</p>";
                        break;
                    default:
                        results.innerHTML = "<p>Unable to retrieve your location.</p>";
                }
            }
        );
    } else {
        const results = document.getElementById("results");
        results.innerHTML = "<p>Geolocation is not supported by this browser.</p>";
    }
});
