async function fetchSunriseSunset(lat, lng) {
    const url = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}&date=today`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.status === "OK") {
            updateDashboard(data);
        } else {
            showError("No valid data received from the API.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        showError("Failed to fetch data. Please try again.");
    }
}

function updateDashboard(data) {
    const results = document.getElementById("results");
    const { sunrise, sunset, civil_twilight_begin, civil_twilight_end, day_length, solar_noon } = data.results;

    results.innerHTML = `
        <h2>Sunrise & Sunset Data</h2>
        <p><strong>Sunrise:</strong> ${sunrise}</p>
        <p><strong>Sunset:</strong> ${sunset}</p>
        <p><strong>Dawn (Civil Twilight Begin):</strong> ${civil_twilight_begin}</p>
        <p><strong>Dusk (Civil Twilight End):</strong> ${civil_twilight_end}</p>
        <p><strong>Day Length:</strong> ${day_length}</p>
        <p><strong>Solar Noon:</strong> ${solar_noon}</p>
    `;
}

function showError(message) {
    const results = document.getElementById("results");
    results.innerHTML = `<p class="error">${message}</p>`;
}

document.getElementById("location-select").addEventListener("change", (event) => {
    const [lat, lng] = event.target.value.split(",");
    fetchSunriseSunset(lat, lng);
});

document.getElementById("current-location").addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            fetchSunriseSunset(latitude, longitude);
        }, () => {
            showError("Unable to retrieve your location.");
        });
    } else {
        showError("Geolocation is not supported by your browser.");
    }
});
