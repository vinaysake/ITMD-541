document.addEventListener('DOMContentLoaded', () => {
    const locationSelect = document.getElementById('location-select');
    const currentLocationBtn = document.getElementById('current-location-btn');
    const resultsContainer = document.getElementById('results');
    const errorModal = document.getElementById('error-modal');
    const errorMessage = document.getElementById('error-message');
    const closeError = document.querySelector('.close');
    const loadingOverlay = document.getElementById('loading');

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
        '47.6062,-122.3321': 'seattle',
        '25.7617,-80.1918': 'miami',
        '39.9526,-75.1652': 'philadelphia'
    };

    function showLoading() {
        loadingOverlay.style.display = 'flex';
    }

    function hideLoading() {
        loadingOverlay.style.display = 'none';
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorModal.style.display = 'block';
    }

    closeError.onclick = () => {
        errorModal.style.display = 'none';
    }

    async function fetchSunriseSunsetData(latitude, longitude) {
        const today = new Date().toISOString().split('T')[0];
        const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        try {
            showLoading();
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
        } finally {
            hideLoading();
        }
    }

    function displayResults(todayResults, tomorrowResults, lat, lng) {
        // Reset background - use classList.remove to be more specific
        document.body.classList.remove(...document.body.classList);

        // Set location-specific background
        const locationKey = `${lat},${lng}`;
        const locationClass = locationMap[locationKey];

        if (locationClass) {
            document.body.classList.add(locationClass);
        } else {
            // If no specific class, add a default background
            document.body.classList.add('default-background');
        }

        resultsContainer.innerHTML = `
            <div class="result-card">
                <h3><i class="fas fa-sunrise"></i> Today's Sunrise</h3>
                <p>${todayResults.sunrise}</p>
            </div>
            <div class="result-card">
                <h3><i class="fas fa-sunset"></i> Today's Sunset</h3>
                <p>${todayResults.sunset}</p>
            </div>
            <div class="result-card">
                <h3><i class="fas fa-moon"></i> Today's Dawn</h3>
                <p>${todayResults.dawn}</p>
            </div>
            <div class="result-card">
                <h3><i class="fas fa-cloud-sun"></i> Today's Dusk</h3>
                <p>${todayResults.dusk}</p>
            </div>
            <div class="result-card">
                <h3><i class="fas fa-clock"></i> Today's Day Length</h3>
                <p>${todayResults.day_length}</p>
            </div>
            <div class="result-card">
                <h3><i class="fas fa-sun"></i> Today's Solar Noon</h3>
                <p>${todayResults.solar_noon}</p>
            </div>
            <div class="result-card">
                <h3><i class="fas fa-map-marker-alt"></i> Location</h3>
                <p>Latitude: ${lat}<br>Longitude: ${lng}<br>Timezone: UTC</p>
            </div>
        `;
    }

    locationSelect.addEventListener('change', (e) => {
        if (e.target.value) {
            const [latitude, longitude] = e.target.value.split(',');
            fetchSunriseSunsetData(latitude, longitude);
        }
    });

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
