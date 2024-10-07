// Function to calculate the total numbers, minimum, maximum, and average of an array
function minMaxAverage(numbers) {
    // Get the total count of numbers in the array
    const total = numbers.length;
    
    // Find the minimum value in the array using Math.min and spread syntax
    const min = Math.min(...numbers);
    
    // Find the maximum value in the array using Math.max and spread syntax
    const max = Math.max(...numbers);
    
    // Calculate the average by summing all numbers using reduce, then dividing by the total count
    const avg = (numbers.reduce((a, b) => a + b, 0) / total).toFixed(2); // Fix to 2 decimal places
    
    // Log the output in the required format
    console.log(`Total Numbers: ${total}, Min Value: ${min}, Max Value: ${max}, Average: ${avg}`);
}

// Invoke the function with the test case provided
minMaxAverage([2, 5, 23, 6, 9, 4, 30, 1]);  // Example array from assignment

// Additional test case for validation
minMaxAverage([10, 20, 30, 40, 50]);  // Another test array

// Additional test case 2 for validation
minMaxAverage([3, 12, 45, 7, 18]);  // Another test array
