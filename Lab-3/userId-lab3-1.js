function minMaxAverage(numbers) {
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    const average = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
    
    console.log(`Total Numbers: ${numbers.length}, Min Value: ${min}, Max Value: ${max}, Average: ${average.toFixed(2)}`);
  }
  
  // Test with given array
  minMaxAverage([2, 5, 23, 6, 9, 4, 30, 1]);
  
  // Additional test
  minMaxAverage([10, 20, 30, 40, 50]);