const jokeBtn = document.querySelector('#jokeBtn');
const jokeDiv = document.querySelector('#joke');
const categoryContainer = document.querySelector('#categoryContainer');

//  Get all categories */
async function getAllCategories() {

    const response = await fetch('https://api.chucknorris.io/jokes/categories');
    const categories = await response.json();
    console.log(categories)
    return categories;
}

//  Create a button for each category */
async function renderCategoryButtons() {

    const categories = await getAllCategories();
    console.log(categories)


    categories.forEach((category) => {

        const button = document.createElement('button');
        button.textContent = category;
        console.log(button)

        // When clicked → get a joke for that category
        button.addEventListener('click', () => {
            console.log(`3) Button clicked → ${category}`);
            getJokeByCategory(category);
        });

        categoryContainer.appendChild(button);
        console.log(categoryContainer)
    });


}

//  Fetch a joke by category */
async function getJokeByCategory(category) {
    try {
        jokeDiv.textContent = `Loading "${category}" joke...`;
        const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`);
        const data = await response.json();
        console.log(data)
        jokeDiv.textContent = data.value;
    } catch (err) {
        jokeDiv.textContent = 'Sorry, failed to load a joke.';
    }
}

//  Fetch a completely random joke */
async function getRandomJoke() {
    try {
        jokeDiv.textContent = 'Loading random joke...';
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        const data = await response.json();
        console.log('4) Random joke data:', data);
        jokeDiv.textContent = data.value;
    } catch (err) {
        console.log('4) Error fetching random joke:', err);
        jokeDiv.textContent = 'Sorry, failed to load a random joke.';
    }
}

//  Random joke button handler 
jokeBtn.addEventListener('click', async () => {
    console.log('5) Random Joke button clicked.');
    await getRandomJoke();
});

//  Run on page load 
renderCategoryButtons();
