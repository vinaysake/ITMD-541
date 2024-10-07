// Function to sort an array of numbers in ascending order
function sortNumbers(numbers) {
  // Make a copy of the array using slice() to avoid mutating the original array
  const sortedArray = numbers.slice().sort((a, b) => a - b);
  
  // Log the original array before sorting
  console.log(`Original Array: [${numbers}]`);
  
  // Log the sorted array after sorting
  console.log(`Sorted Array: [${sortedArray}]\n`);  // Add a newline for spacing
}

// Test the function with three different arrays

// Example 1: Sorting [5, 2, 9, 1, 7, 4]
sortNumbers([5, 2, 9, 1, 7, 4]);

// Example 2: Sorting [15, 10, 25, 20, 5]
sortNumbers([15, 10, 25, 20, 5]);

// Example 3: Sorting [42, 32, 23, 12, 7]
sortNumbers([42, 32, 23, 12, 7]);
