document.addEventListener('DOMContentLoaded', () => {
    const locationSelect = document.getElementById('locationSelect');
    const getCurrentLocationBtn = document.getElementById('getCurrentLocation');
    const errorMessage = document.getElementById('errorMessage');

    async function fetchSunriseSunsetData(latitude, longitude) {
        try {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            const todayResponse = await fetch(`https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=${formatDate(today)}`);
            const todayData = await todayResponse.json();

            const tomorrowResponse = await fetch(`https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=${formatDate(tomorrow)}`);
            const tomorrowData = await tomorrowResponse.json();

            if (todayData.status === 'OK' && tomorrowData.status === 'OK') {
                updateDashboard('today', todayData.results);
                updateDashboard('tomorrow', tomorrowData.results);
                document.getElementById('timezone').textContent = todayData.results.timezone;
                errorMessage.style.display = 'none';
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            showError('Failed to fetch sunrise/sunset data. Please try again.');
        }
    }

    function updateDashboard(day, data) {
        const prefix = day;
        document.getElementById(`${prefix}Sunrise`).textContent = data.sunrise;
        document.getElementById(`${prefix}Sunset`).textContent = data.sunset;
        document.getElementById(`${prefix}Dawn`).textContent = data.dawn;
        document.getElementById(`${prefix}Dusk`).textContent = data.dusk;
        document.getElementById(`${prefix}DayLength`).textContent = data.day_length;
        document.getElementById(`${prefix}SolarNoon`).textContent = data.solar_noon;
    }

    function formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    locationSelect.addEventListener('change', (e) => {
        const [lat, lng] = e.target.value.split(',');
        fetchSunriseSunsetData(lat, lng);
    });

    getCurrentLocationBtn.addEventListener('click', () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchSunriseSunsetData(
                        position.coords.latitude,
                        position.coords.longitude
                    );
                },
                () => {
                    showError('Unable to retrieve your location. Please select from the dropdown instead.');
                }
            );
        } else {
            showError('Geolocation is not supported by your browser. Please select from the dropdown instead.');
        }
    });
});