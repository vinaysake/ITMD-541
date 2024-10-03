function sortAndIntroducePeople(people) {
    return people
        .sort((a, b) => a.age - b.age)
        .map(person => `${person.name} is ${person.age} and from ${person.city}`);
}

// Test input 1
const people1 = [
    {name: 'Alice', age: 30, city: 'New York'},
    {name: 'Bob', age: 25, city: 'Chicago'},
    {name: 'Charlie', age: 35, city: 'Los Angeles'},
    {name: 'David', age: 28, city: 'Houston'},
    {name: 'Eve', age: 22, city: 'Miami'}
];

console.log("Test 1 Output:");
console.log(sortAndIntroducePeople(people1));

// Test input 2
const people2 = [
    {name: 'Frank', age: 40, city: 'Seattle'},
    {name: 'Grace', age: 33, city: 'Boston'},
    {name: 'Henry', age: 45, city: 'Denver'},
    {name: 'Ivy', age: 27, city: 'Portland'},
    {name: 'Jack', age: 31, city: 'Austin'}
];

console.log("\nTest 2 Output:");
console.log(sortAndIntroducePeople(people2));