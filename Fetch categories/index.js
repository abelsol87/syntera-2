const getCategories = async () => {
    const response = await fetch("https://api.chucknorris.io/jokes/categories");
    const data = await response.json();
    console.log(data)
    return data;
};

const displayCategories = async () => {
    const categories = await getCategories();
    console.log(categories)
    categories.forEach((category) => {
        console.log(category)
        const categoryButton = document.createElement("button");
        categoryButton.value = category;
        categoryButton.textContent = category;
        categoryButton.addEventListener("click", () => {
            displayJoke(category);
        });
        document.querySelector(".button-container").appendChild(categoryButton);
    });
};
//  Fetch a random joke from a specific category 
const getRandomJoke = async (category) => {
    const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`);
    const data = await response.json();
    return data;
};
// Display the joke in the DOM
const displayJoke = async (category) => {
    const existingJoke = document.getElementById("joke");
    if (existingJoke) {
        existingJoke.remove();
    }
    const joke = await getRandomJoke(category);
    console.log(joke)
    const jokeElement = document.createElement("p");
    jokeElement.id = "joke";
    jokeElement.textContent = joke.value;
    document.querySelector(".joke-container").appendChild(jokeElement);
};

displayCategories();