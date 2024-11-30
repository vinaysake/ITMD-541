document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements for better performance
    const locationSelect = document.getElementById('locationSelect');
    const getCurrentLocationBtn = document.getElementById('getCurrentLocation');
    const errorMessage = document.getElementById('errorMessage');

    // Initialize and update date/time display
    function updateDateTime() {
        const now = new Date();
        
        // Update date with full format
        const dateOptions = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', dateOptions);
        
        // Update time with seconds
        const timeOptions = { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit', 
            hour12: true 
        };
        document.getElementById('currentTime').textContent = now.toLocaleTimeString('en-US', timeOptions);
    }

    // Start the clock
    updateDateTime();
    setInterval(updateDateTime, 1000);

    async function fetchSunriseSunsetData(latitude, longitude) {
        try {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            // Fetch today's data from the API
            const todayResponse = await fetch(
                `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=${formatDate(today)}`
            );
            const todayData = await todayResponse.json();

            // Fetch tomorrow's data from the API
            const tomorrowResponse = await fetch(
                `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=${formatDate(tomorrow)}`
            );
            const tomorrowData = await tomorrowResponse.json();

            // Update UI if both API calls are successful
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
        
        ['today', 'tomorrow'].forEach(day => {
            ['Sunrise', 'Sunset', 'Dawn', 'Dusk', 'DayLength', 'SolarNoon'].forEach(field => {
                const element = document.getElementById(`${day}${field}`);
                element.textContent = '--:--';
                element.parentElement.classList.add('reset-state');
                setTimeout(() => {
                    element.parentElement.classList.remove('reset-state');
                }, 300);
            });
        });
        document.getElementById('timezone').textContent = '--';

        setTimeout(() => {
            errorMessage.style.opacity = '0';
            setTimeout(() => {
                errorMessage.style.display = 'none';
                errorMessage.style.opacity = '1';
            }, 500);
        }, 5000);
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