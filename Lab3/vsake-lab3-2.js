// Function to count the number of vowels in a given string
function countVowels(str) {
  // Define an array of vowels to be checked
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  
  // Convert the string to lowercase to handle uppercase vowels
  const lowerCaseStr = str.toLowerCase();
  
  // Split the string into an array of characters, filter out vowels, and get the length of the filtered array
  const vowelCount = lowerCaseStr.split('').filter(char => vowels.includes(char)).length;
  
  // Log the result in the required format (word and vowel count)
  console.log(`Word: ${str}, Vowels: ${vowelCount}`);
}

// Test the function with three different words
countVowels('vinay');  // Expected output: Word: hello, Vowels: 2
countVowels('javascript');  // Expected output: Word: javascript, Vowels: 3
countVowels('python');  // Expected output: Word: python, Vowels: 1
