// 0) Make sure DOM elements exist
const input = document.querySelector('#city')
const button = document.querySelector('#searchBtn')
const result = document.querySelector('#result')
console.log('2) DOM elements:', { input, button, result })

// 1) Keep the key as a string
const API_KEY = '5aee81e49d6d4bffa98c26d2f58d4ebd'

// user inputs city name and clicks button
button.addEventListener('click', async () => {
    const city = input.value
    console.log('typed city:', city)

    result.textContent = `you search for: ${city}`

    const url = `https://api.weatherbit.io/v2.0/geocode?city=${city}&key=${API_KEY}`
    console.log(url)

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    const lat = data.lat
    const lon = data.lon
    const goId = data.geo_id


    result.innerHTML = `
    <p><strong>${goId}</strong></p>
    <p>Latitude: ${lat}</p>
    <p>Longitude: ${lon}</p>`

})
















// function buildUrl() {
//     console.log('4) buildUrl() city =', city)
//     const url = `https://api.weatherbit.io/v2.0/geocode?city=${city}&key=${API_KEY}`
//     console.log('5) Built URL =', url)
//     return url
// }

// // 2) Fetch data from the API
// async function fetchData(url) {
//     const response = await fetch(url)
//     const data = await response.json()
//     return data
// }