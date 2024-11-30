const API_BASE_URL = 'https://api.sunrisesunset.io/json';
const locationDropdown = document.getElementById('location-dropdown');
const currentLocationBtn = document.getElementById('current-location-btn');
const errorSection = document.getElementById('error-section');
const errorMessage = document.getElementById('error-message');

// Helper function to update result elements
function updateResultElements(prefix, data) {
    document.getElementById(`${prefix}-sunrise`).textContent = data.sunrise || '--:--';
    document.getElementById(`${prefix}-sunset`).textContent = data.sunset || '--:--';
    document.getElementById(`${prefix}-dawn`).textContent = data.dawn || '--:--';
    document.getElementById(`${prefix}-dusk`).textContent = data.dusk || '--:--';
    document.getElementById(`${prefix}-day-length`).textContent = data.day_length || '--:--';
    document.getElementById(`${prefix}-solar-noon`).textContent = data.solar_noon || '--:--';
}

// Function to display error
function displayError(message) {
    errorSection.style.display = 'block';
    errorMessage.textContent = message;
    document.getElementById('today-results').style.display = 'none';
    document.getElementById('tomorrow-results').style.display = 'none';
    document.getElementById('timezone-info').style.display = 'none';
}

// Function to fetch sunrise/sunset data
async function fetchSunriseSunsetData(lat, lng) {
    try {
        const today = new Date().toISOString().split('T')[0];
        const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

        const todayResponse = await fetch(`${API_BASE_URL}?lat=${lat}&lng=${lng}&date=${today}`);
        const tomorrowResponse = await fetch(`${API_BASE_URL}?lat=${lat}&lng=${lng}&date=${tomorrow}`);

        const todayData = await todayResponse.json();
        const tomorrowData = await tomorrowResponse.json();

        if (todayData.status !== 'OK' || tomorrowData.status !== 'OK') {
            throw new Error('Unable to fetch data');
        }

        // Reset error display
        errorSection.style.display = 'none';
        document.getElementById('today-results').style.display = 'block';
        document.getElementById('tomorrow-results').style.display = 'block';
        document.getElementById('timezone-info').style.display = 'block';

        // Update results
        updateResultElements('today', todayData.results);
        updateResultElements('tomorrow', tomorrowData.results);

        // Update timezone
        document.getElementById('timezone-display').textContent = todayData.results.timezone;
    } catch (error) {
        displayError('Error fetching sunrise/sunset data. Please try again.');
        console.error('Error:', error);
    }
}

// Event listener for location dropdown
locationDropdown.addEventListener('change', (e) => {
    const [lat, lng] = e.target.value.split(',');
    if (lat && lng) {
        fetchSunriseSunsetData(lat, lng);
    }
});

// Event listener for current location
currentLocationBtn.addEventListener('click', () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchSunriseSunsetData(latitude, longitude);
            },
            (error) => {
                displayError('Unable to retrieve your location. Please select a location from the dropdown.');
                console.error('Geolocation error:', error);
            }
        );
    } else {
        displayError('Geolocation is not supported by your browser.');
    }
});