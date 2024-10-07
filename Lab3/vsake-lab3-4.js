// Function to convert Celsius to Fahrenheit
function celsiusToFahrenheit(celsius) {
  // Convert Celsius to Fahrenheit using the formula
  const fahrenheit = (celsius * 9/5 + 32).toFixed(1);  // Fix to one decimal place
  
  // Log the result in the required format
  console.log(`${celsius.toFixed(1)} Celsius = ${fahrenheit} Fahrenheit\n`);
}

// Test the function with three different Celsius temperatures

// Example 1: Convert 0°C to Fahrenheit
celsiusToFahrenheit(0);

// Example 2: Convert 100°C to Fahrenheit
celsiusToFahrenheit(100);

// Example 3: Convert -40°C to Fahrenheit
celsiusToFahrenheit(-40);
