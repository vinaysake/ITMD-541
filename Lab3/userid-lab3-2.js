function countVowels(str) {
    const vowels = 'aeiou';
    return str.toLowerCase().split('').filter(char => vowels.includes(char)).length;
  }
  
  // Test words
  console.log(`hello: ${countVowels('hello')} vowels`);
  console.log(`javascript: ${countVowels('javascript')} vowels`);
  console.log(`anthropic: ${countVowels('anthropic')} vowels`);
  