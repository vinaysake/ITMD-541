function celsiusToFahrenheit(celsius) {
    const fahrenheit = (celsius * 9/5) + 32;
    console.log(`${celsius.toFixed(1)} Celsius = ${fahrenheit.toFixed(1)} Fahrenheit`);
  }
  
  // Test values
  celsiusToFahrenheit(0);
  celsiusToFahrenheit(25);
  celsiusToFahrenheit(37.5);