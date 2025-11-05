const numbers = [1, 2, 3, 4, 5, 6];

const result = numbers.map(function (even) {
    return even % 2 === 0;
});

console.log(result);

const user = ["Tom", "Abel", "Solomon"]

const users = user.map((names) => {
    return 'Mr ' + names
});
console.log(users)


// const callback = function (cv) {

// } 

// const eben = numbers.filter(callback);


const arr1 = [1, 2, 3, 4, 5];
const arr2 = [5, 6, 7, 8, 9, 10];
// Solution 1
const arr3 = arr1.slice(0, 4).concat(arr2);

// Solution 2 using spread operator
const arr4 = [...arr1, ...arr2]
arr4.splice(4, 1);

console.log(arr4);

// Reversing array and adding to it
const arr = [1, 2, 3, 4, 5];

arr.reverse();
arr.push(0);
arr.unshift(6)

console.log(arr);

// 1 Using .map()
const temperaturesInCelsius = [0, 15, 25, 30];
const temperaturesInFahrenheit = temperaturesInCelsius.map(temp => (temp * 9 / 5) + 32);

console.log(temperaturesInFahrenheit);

// 2 Using .map()
const names = ["abebe", "chala", "kebede"];
const uppercaseNames = names.map(name => name.toUpperCase());

console.log(uppercaseNames);

// 1 Using .filet()
const numBers = [1, 2, 3, 4, 5, 6, 7, 8];
const evenNumbers = numBers.filter(number => number % 2 === 0);

console.log(evenNumbers);

// 2 Using .filter()
const employees = [{ name: "Abebe", salary: 45000 }, { name: "Chala", salary: 60000 }, { name: "Almaz", salary: 72000 }]

const highSalaryEmployees = employees.filter((employee) => {
    return employee.salary >= 50000;
});

console.log(highSalaryEmployees)

// 1 Using .find()
const scores = [20, 35, 60, 48, 75];
const over50 = scores.find(score => score >= 50)

console.log(over50);

// 2 Using .find()
const students = [{ name: "Abebe" }, { name: "Chala" }, { name: "Almaz" }, { name: "Almaz" }]

const studentName = students.find(student => student.name === 'Almaz');
console.log(studentName);




