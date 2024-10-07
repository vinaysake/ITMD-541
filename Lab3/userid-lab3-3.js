function sortNumbers(numbers) {
    return numbers.slice().sort((a, b) => a - b);
  }
  
  // Test arrays
  const test1 = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
  const test2 = [10, 2, 8, 4, 6];
  const test3 = [-5, 0, 5, -10, 10];
  
  console.log(`Original Array: ${test1}\nSorted Array: ${sortNumbers(test1)}`);
  console.log(`Original Array: ${test2}\nSorted Array: ${sortNumbers(test2)}`);
  console.log(`Original Array: ${test3}\nSorted Array: ${sortNumbers(test3)}`);