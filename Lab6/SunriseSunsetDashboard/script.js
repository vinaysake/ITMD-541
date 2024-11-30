document.addEventListener('DOMContentLoaded', () => {
    const locationSelect = document.getElementById('location-select');
    const currentLocationBtn = document.getElementById('current-location-btn');
    const resultsContainer = document.getElementById('results');
    const errorModal = document.getElementById('error-modal');
    const errorMessage = document.getElementById('error-message');
    const closeError = document.querySelector('.close');

    // Location mapping for background and class names
    const locationMap = {
        '40.7128,-74.0060': 'new-york',
        '34.0522,-118.2437': 'los-angeles',
        '41.8781,-87.6298': 'chicago',
        '29.7604,-95.3698': 'houston',
        '33.4484,-112.0740': 'phoenix',
        '29.4241,-98.4936': 'san-antonio',
        '32.7767,-96.7970': 'dallas',
        '37.7749,-122.4194': 'san-francisco',
        '39.1031,-84.5120': 'cincinnati',
        '42.3601,-71.0589': 'boston',
        '47.6062,-122.3321': 'seattle'
    };

    // Error handling function
    function showError(message) {
        errorMessage.textContent = message;
        errorModal.style.display = 'block';
    }

    // Close error modal
    closeError.onclick = () => {
        errorModal.style.display = 'none';
    }

    // Function to fetch sunrise/sunset data
    async function fetchSunriseSunsetData(latitude, longitude) {
        const today = new Date().toISOString().split('T')[0];
        const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        try {
            const todayResponse = await fetch(`https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=${today}&timezone=UTC`);
            const tomorrowResponse = await fetch(`https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=${tomorrow}&timezone=UTC`);

            const todayData = await todayResponse.json();
            const tomorrowData = await tomorrowResponse.json();

            if (todayData.status !== 'OK' || tomorrowData.status !== 'OK') {
                throw new Error('Failed to retrieve data');
            }

            displayResults(todayData.results, tomorrowData.results, latitude, longitude);
        } catch (error) {
            showError('Error fetching sunrise/sunset data: ' + error.message);
        }
    }

    // Display results
    function displayResults(todayResults, tomorrowResults, lat, lng) {
        // Reset background
        document.body.className = '';

        // Set location-specific background
        const locationClass = locationMap[`${lat},${lng}`] || '';
        document.body.classList.add(locationClass);

        resultsContainer.innerHTML = `
            <div class="result-card">
                <h3>Today's Details</h3>
                <p><strong>Sunrise:</strong> ${todayResults.sunrise}</p>
                <p><strong>Sunset:</strong> ${todayResults.sunset}</p>
                <p><strong>Dawn:</strong> ${todayResults.dawn}</p>
                <p><strong>Dusk:</strong> ${todayResults.dusk}</p>
                <p><strong>Day Length:</strong> ${todayResults.day_length}</p>
                <p><strong>Solar Noon:</strong> ${todayResults.solar_noon}</p>
            </div>
            <div class="result-card">
                <h3>Tomorrow's Details</h3>
                <p><strong>Sunrise:</strong> ${tomorrowResults.sunrise}</p>
                <p><strong>Sunset:</strong> ${tomorrowResults.sunset}</p>
                <p><strong>Dawn:</strong> ${tomorrowResults.dawn}</p>
                <p><strong>Dusk:</strong> ${tomorrowResults.dusk}</p>
                <p><strong>Day Length:</strong> ${tomorrowResults.day_length}</p>
                <p><strong>Solar Noon:</strong> ${tomorrowResults.solar_noon}</p>
            </div>
            <div class="result-card">
                <h3>Location Information</h3>
                <p><strong>Latitude:</strong> ${lat}</p>
                <p><strong>Longitude:</strong> ${lng}</p>
                <p><strong>Time Zone:</strong> UTC</p>
            </div>
        `;
    }

    // Location select event
    locationSelect.addEventListener('change', (e) => {
        if (e.target.value) {
            const [latitude, longitude] = e.target.value.split(',');
            fetchSunriseSunsetData(latitude, longitude);
        }
    });

    // Current location button
    currentLocationBtn.addEventListener('click', () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                fetchSunriseSunsetData(latitude, longitude);
            }, (error) => {
                showError('Error getting current location: ' + error.message);
            });
        } else {
            showError('Geolocation is not supported by this browser.');
        }
    });
});