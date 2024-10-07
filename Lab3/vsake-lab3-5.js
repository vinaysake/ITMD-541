// Function to sort an array of people objects by age and return formatted introductions
function sortPeopleByAge(people) {
    // Sort people by age in ascending order using slice() to avoid mutating the original array
    const sortedPeople = people.slice().sort((a, b) => a.age - b.age);
    
    // Map over the sorted array to create introduction strings in the format "name is age and from city"
    const introductions = sortedPeople.map(person => `${person.name} is ${person.age} and from ${person.city}`);
    
    // Return the array of formatted introductions
    return introductions;
}

// Test the function with two arrays of people objects

// Test array 1: Updated array of people objects with at least 5 entries
const people1 = [
    {name: 'Suprreth', age: 30, city: 'New York'},
    {name: 'Vinay', age: 25, city: 'Chicago'},
    {name: 'Shaheed', age: 35, city: 'San Francisco'},
    {name: 'Raghav', age: 28, city: 'Seattle'},
    {name: 'Naidu', age: 22, city: 'Boston'}
];

// Test array 2: Another array of people objects with at least 5 entries (Hollywood actors)
const people2 = [
    {name: 'Leonardo DiCaprio', age: 45, city: 'Los Angeles'},
    {name: 'Jennifer Lawrence', age: 40, city: 'Los Angeles'},
    {name: 'Tom Hanks', age: 55, city: 'Los Angeles'},
    {name: 'Brad Pitt', age: 32, city: 'Los Angeles'},
    {name: 'Angelina Jolie', age: 29, city: 'Los Angeles'}
];

// Output the sorted introductions to the console for both test arrays
console.log("Testing 1st Array:");
console.log();
console.log(sortPeopleByAge(people1).join('\n'));  // Print sorted introductions for people1 without extra spacing between lines
console.log();  // Add a blank line between the two test outputs
console.log("Testing 2nd Array:");
console.log();
console.log(sortPeopleByAge(people2).join('\n'));  // Print sorted introductions for people2 without extra spacing between lines
