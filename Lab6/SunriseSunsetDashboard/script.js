// Wait for DOM to be fully loaded before executing
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

    // Start the clock and update every second
    updateDateTime();
    setInterval(updateDateTime, 1000);

    /**
     * Fetches sunrise and sunset data for a given location
     * Makes two API calls - one for today and one for tomorrow
     * @param {number} latitude - The latitude coordinate
     * @param {number} longitude - The longitude coordinate
     */
    async function fetchSunriseSunsetData(latitude, longitude) {
        try {
            // Get today's date and calculate tomorrow's date
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

    /**
     * Updates the dashboard with the retrieved data
     * @param {string} day - Either 'today' or 'tomorrow'
     * @param {Object} data - The API response data to display
     */
    function updateDashboard(day, data) {
        const prefix = day;
        // Update all time fields for the specified day
        document.getElementById(`${prefix}Sunrise`).textContent = data.sunrise;
        document.getElementById(`${prefix}Sunset`).textContent = data.sunset;
        document.getElementById(`${prefix}Dawn`).textContent = data.dawn;
        document.getElementById(`${prefix}Dusk`).textContent = data.dusk;
        document.getElementById(`${prefix}DayLength`).textContent = data.day_length;
        document.getElementById(`${prefix}SolarNoon`).textContent = data.solar_noon;
    }

    /**
     * Formats a date object into YYYY-MM-DD format for the API
     * @param {Date} date - The date to format
     * @returns {string} The formatted date string
     */
    function formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    /**
     * Displays an error message and resets the dashboard
     * @param {string} message - The error message to display
     */
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        
        // Reset all fields to placeholder values with visual feedback
        ['today', 'tomorrow'].forEach(day => {
            ['Sunrise', 'Sunset', 'Dawn', 'Dusk', 'DayLength', 'SolarNoon'].forEach(field => {
                const element = document.getElementById(`${day}${field}`);
                element.textContent = '--:--';
                // Add subtle visual feedback for reset fields
                element.parentElement.classList.add('reset-state');
                setTimeout(() => {
                    element.parentElement.classList.remove('reset-state');
                }, 300);
            });
        });
        document.getElementById('timezone').textContent = '--';

        // Automatically hide error after 5 seconds
        setTimeout(() => {
            errorMessage.style.opacity = '0';
            setTimeout(() => {
                errorMessage.style.display = 'none';
                errorMessage.style.opacity = '1';
            }, 500);
        }, 5000);
    }

    // Event listener for location dropdown changes
    locationSelect.addEventListener('change', (e) => {
        const [lat, lng] = e.target.value.split(',');
        fetchSunriseSunsetData(lat, lng);
    });

    // Event listener for geolocation button
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