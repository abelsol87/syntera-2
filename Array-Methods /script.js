const numbers = [3, 7, 12, 19, 200, 400, 21, 44, 55, 67, 88, 90];

const words = [
    "apple",
    "banana",
    "grape",
    "kiwi",
    "mango",
    "peach",
    "strawberry",
    "watermelon",
];

const users = [
    { id: 1, name: "Alice", age: 25, isAdmin: false, gender: "female" },
    { id: 2, name: "Bob", age: 32, isAdmin: true, gender: "male" },
    { id: 3, name: "Charlie", age: 28, isAdmin: false, gender: "male" },
    { id: 4, name: "Diana", age: 22, isAdmin: false, gender: "female" },
    { id: 5, name: "Eve", age: 24, isAdmin: true, gender: "female" },
];

// const object = users.reduce((acc, user) => {
//     if (acc[user.gender]) {
//         acc[user.gender] = acc[user.gender] + user.age
//     } else {
//         acc[user.gender] = user.age
//     }
//     return acc;
// }, {})

// console.log(object)

const admins2 = users.reduce((acc, user) => {
    if (user.isAdmin) {
        acc = acc[user.gender + "_admin"]
            ? acc
            : { ...acc, [user.gender + "_admin"]: 0 };
        acc[user.gender + "_admin"] = acc[user.gender + "_admin"] + 1;
    } else {
        acc = acc[user.gender + "_non_admin"]
            ? acc
            : { ...acc, [user.gender + "_non_admin"]: 0 };
        acc[user.gender + "_non_admin"] = acc[user.gender + "_non_admin"] + 1;
    }
    return acc;
}, {});

console.log(admins2)

const admin1 = users.reduce((acc, user) => {
    if (user.isAdmin) {
        acc = acc[user.gender + "_admin"]
            ? acc
            : { ...acc, [user.gender + "_admin"]: 0 };
        acc[user.gender + "_admin"] = acc[user.gender + "_admin"] + 1
    } else {
        acc = acc[user.gender + "_non_admin"]
            ? acc
            : { ...acc, [user.gender + "_non_admin"]: 0 };
        acc[user.gender + "_non_admin"] = acc[user.gender + "_non_admin"] + 1;
    }
    return acc;
})
//  {admin: {male: 1, female: 1}, non_admin:} {male: 1, female:2}}
const adminMap = users.reduce((acc, cv) => {
    const isAdmin = cv.isAdmin;
    const gender = cv.gender;

    if (isAdmin) {
        acc.admin[gender]++
    } else {
        acc.non_admin[gender]++
    }
    return acc;
}, { admin: { male: 0, female: 0 }, non_admin: { male: 0, female: 0 } });

const nested = [1, [2, 3], [4, [5, 6]], 7];



const allNamesString = users.map((user) => user.name).map((name) => name.split('')).flat()
const letterCounts = allNamesString.reduce((counts, char) => {
    if (char >= 'a' && char <= 'z') {
        counts[char] = (counts[char] || 0) + 1
    }
    return counts
}, {})


console.log(letterCounts)

// { olderThanOrEqual25: { a: 1, b: 1 }, youngerThan25:{a:1,b:1}}




// ----------------------------
// Introductory Examples
// ----------------------------

// map() – transform each element
// Example: double each number
const doubles = numbers.map(function (number) {
    return number * 2;
});

const doubled = numbers.map((n) => n * 2);

// filter() – keep only elements that match a condition
// Example: keep only odd numbers
const callback = function (cv) {
    return cv % 2 === 0;
};
const even = numbers.filter(callback);

const oddNumbers = numbers.filter((n) => n % 2 !== 0);

// reduce() – combine all elements into a single value
// Example: sum all numbers
const total = numbers.reduce((acc, n) => acc + n, 0);

const wordCount = words.reduce((acc, cv) => {
    if (acc[cv] === undefined) {
        acc[cv] = 0
    }
    acc[cv] = acc[cv] + 1
    return acc
}, {})

// some() – check if *any* element matches a condition
// Example: is there any number over 50?
const hasOver50 = numbers.some((n) => n > 50);

// every() – check if *all* elements match a condition
// Example: are all numbers greater than 0?
const allGreaterThanZero = numbers.every((n) => n > 0);

// find() – find the first element matching a condition
// Example: find the first number divisible by 3
const firstDivBy3 = numbers.find((n) => n % 3 === 0);

// findIndex() – get the index of the first element matching a condition
// Example: find the index of the first number greater than 40
const indexGreaterThan40 = numbers.findIndex((n) => n > 40);

// forEach() – run a function on each element (no return value)
// Example: log each number to the console
// numbers.forEach((n) => console.log("Number:", n));

// sort() – order the elements
// Example: sort numbers in ascending order
const ascSorted = [...numbers].sort((a, b) => a - b);

// flat() – flatten nested arrays
// Example: flatten one level
const flat1 = nested.flat();

// flatMap() – map, then flatten
// Example: split words into characters
const letters = words.flatMap((word) => word.split(""));

// includes() – check if array contains a value
// Example: check if "apple" is in words
const hasApple = words.includes("apple");

// concat() – merge arrays
// Example: add [100, 200] to numbers
const extendedNumbers = numbers.concat([100, 200]);

// slice() – get a portion of the array (non-destructive)
// Example: get the first 2 words
const firstTwoWords = words.slice(0, 2);

// splice() – change the array by removing/inserting
// Example: remove 1 element at index 1
const wordsCopy = [...words];
wordsCopy.splice(1, 1); // removes "banana"

// join() – join elements into a string
// Example: join words with "-"
const dashedWords = words.join("-");


// 1. Get the first even number in numbers.
const evenNum = numbers.find((num) => {
    return num % 2 === 0;
});

console.log(evenNum);

// 2. Sort the users by age from youngest to oldest.
const userAge = users.map(user => user.age);
userAge.sort()
console.log(userAge)

// 3. Count how many words are longer than 5 characters.
// const moreThan5Words = words.filter(word => word.length > 5);
// const count = moreThan5Words.length;
// console.log(count);

const countLongWords = words.reduce((acc, cv) => {
    if (cv.length > 5) {
        return acc + 1;
    }
    return acc;
})

// 4. Remove 2 elements starting from index 2 in numbers.
numbers.splice(2, 2);
console.log(numbers);

// 5. Are all numbers positive?
const allPositiveNum = numbers.every(number => number > 0);
console.log(allPositiveNum);

// 6. Join numbers with dashes in between.
const joinNumbers = numbers.join('_');
console.log(joinNumbers)

// 7. Find the index of the first number over 50.
const indexOver50 = numbers.findIndex(number => number > 50);
console.log(indexOver50)

// 8. Filter users who are admins AND under 30.
const admins = users.filter(user => user.isAdmin && user.age < 30)
console.log(admins)

// const adminUnder30 = admins.map(under30 => under30.age >= 30);
console.log(admins)

// 9. Log each word in uppercase.
const toUppercase = words.forEach(word => {
    console.log(word.toUpperCase())
})

// 10. Flatten the nested array fully (2 levels).
const nested1 = nested.flat(2)

console.log(nested1)

// 11. Map numbers to a boolean: true if even, false if odd.
const number = numbers.map((num) => num % 2 === 0);
console.log(number);

// 12. Concatenate all words into one string separated by commas.
words.join(',')
// 13. Does words include "kiwi"?
const includesKiwi = words.some((word) => word === "kiwi")

// 14. Find the maximum value in numbers.
const maxVal = numbers.reduce((acc, cv) => {
    return Math.max(acc, cv)
}, 0)
console.log(maxVal);

// 15. Get the last 3 words from the words array.
const lastWord = words

// 16. Get only even numbers.
words.slice(-3)

// 17. Add "Mr./Ms." prefix to each user’s name.
const prefix = users.map((user) => {
    user.name
})

// 18. Count how many users are admins.
const user = users.filter((admins) => admins.isAdmin).length
console.log(user)

const filtered = users.reduce((acc, cv) => {
    if (cv.isAdmin) return acc + 1
    return acc;
}, 0);

// 19. Any number greater than 80?
const gt80 = numbers.some((cv) => cv > 80)

// 20. Build an object mapping user id → name.
const userIdAndName = users.reduce((acc, cv) => {
    // check user id in acc 
    if (acc[cv.id] === undefined) {
        // if id not  exist Initialize id
        acc[cv.id] = ""
    }
    // if id exist add name acc 
    acc[cv.id] = cv.name
    return acc
}, {})

console.log(userIdAndName);

// 21. Get the length of each word.
const wordLength = words.map(word => word.length)
console.log(wordLength)

// 22. Merge numbers with [100, 200, 300].  
const mergeNum = numbers.concat([100, 200, 300])
console.log(mergeNum)

// 23. Check if any user is younger than 21.
const userYoungerThan21 = users.some(user => user.age < 21)
console.log(userYoungerThan21)

// 24. Get the first 3 numbers from numbers.
const first3 = numbers.slice(0, 3);
console.log(first3);

// 25. Uppercase all words. 
const upperWords = words.map(word => word.toLocaleUpperCase());
console.log(upperWords)

// 26. Find the minimum value in numbers.
const minNum = numbers.reduce((acc, cv) => {
    return Math.min(acc, cv)
}, Infinity);
console.log(minNum)

// 27. Sort numbers in descending order.
const descending1 = numbers.sort((a, b) => a - b)
console.log(descending1)

// 28. Are all words longer than 2 characters?
const longerThan2chart = words.every((word) => {
    return word.length > 2
})

console.log(longerThan2chart)

// 29. Filter words starting with "a" or "b".
const selectedWords = words.filter(word => word.startsWith('a') || word.startsWith('b'));
console.log(selectedWords)

// 30. Square each number in numbers.
const squareRoot = numbers.map(number => number * number)
console.log(squareRoot)

// 31. Split words into characters using flatMap.
const char = words.flatMap((word) => word.split(""));
console.log(char)

// 32. Average the age of all users.
const totalEge = users.reduce((acc, cv) => acc + cv.age, 0);
const userTotal = users.length;
const averageAge = totalEge / userTotal;
console.log(averageAge)

// 33. Filter numbers greater than 20.
const graterThan20 = numbers.filter((number) => number > 20);
console.log(graterThan20)

// 34. Get only users under 30.
const under30 = users.filter((user) => user.age < 30);
console.log(under30)

// 35. Find the first word longer than 6 characters.
const longWord = words.find((word) => word.length > 6)
console.log(longWord)

// 36. Sort words alphabetically.
const alphabetically = words.sort()
console.log(alphabetically)

// 37. Count total sum of numbers.
const sum = numbers.reduce((acc, cv) => acc + cv, 0)
console.log(sum)

// 38. Does numbers include 44?
const include44 = numbers.includes(44);
console.log(include44)

// 39. Log each user’s name with their age.
const nameAndEge = users.map((user) => `${user.name}  ${user.age}`);
console.log(nameAndEge);

// 40. Merge words with ["papaya", "melon"].
const mergeWords = words.concat("papaya", "melon")
console.log(mergeWords)

// 41. Group users by admin / non-admin.
const adminInGroups = users.reduce((acc, user) => {
    if (user.isAdmin) {
        acc.admins.push(user)
    } else {
        acc.nonAdmin.push(user)
    }
    return acc
}, { admins: [], nonAdmin: [] })
console.log(adminInGroups)

// 42. Insert number 999 at index 4 in numbers.
const insertNum999 = [...numbers]
insertNum999.splice(4, 0, 99)
console.log(insertNum999)

// 43. Product of all numbers.
const products = numbers.reduce((acc, cv) => acc * cv, 1)
console.log(products)

// 44. Log each number in numbers.
const eachNum = numbers.forEach((number) => console.log(number))

// 45. Sort numbers ascending.
const ascendingNum = numbers.sort((a, b) => a - b)
console.log(ascendingNum)

// 46. Filter words longer than 5 characters.
const filteredWords = words.filter((word) => word.length > 5)
console.log(filteredWords)

// 47. Chain map: square numbers, then double them.
const chainNum = numbers.map((number) => {
    return number * number
});
console.log(chainNum)
// 48. Get all user names.
const userName = users.map((user) => user.name)
console.log(userName)

// 49. Find the first admin user.
const firstUser = users.find((user) => user.isAdmin)
console.log(firstUser)

// 50. Are all users admins?
const allAdmins = users.every((user) => user.isAdmin)
console.log(allAdmins)

// 51. Join words with commas.
const joinWords = words.join()
console.log(joinWords)

// 52. Flatten the nested array 1 level.
const nestedArray = nested.flat(1)
console.log(nestedArray)

// 53. Filter only admin users.
const adminOnly = users.filter((user) => user.isAdmin)
console.log(adminOnly)

// 54. Any word starting with "z"?
const startWithZ = words.some((word) => word.startsWith('z'))
console.log(startWithZ)
// 55. Sort users by age from oldest to youngest.
const userAgeSorted = users.sort((a, b) => b.age - a.age)
console.log(userAgeSorted)