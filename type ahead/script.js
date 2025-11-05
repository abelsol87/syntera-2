console.log('START')

const form = document.querySelector('.search-form')
const input = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')

console.log({ form, input, suggestions })


input.addEventListener('input', () => {
    console.log('user typing');
    const text = input.value.trim();
    console.log('user typed text =', text);

    // If data not loaded yet
    if (cities.length === 0) {
        console.log('Data not ready yet…');
        suggestions.innerHTML = `<li>Loading data…</li>`;
        return;
    }

    // 1) get matches
    const matches = findMatches(text, cities);
    console.log('Matches length =', matches.length);

    // 2) render them
    renderMatches(matches, text);
});


form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('from submit prevented')
})


const endpoint =
    'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];


async function loadCities() {
    const response = await fetch(endpoint)
    console.log('LOAD: HTTP status =', response.status);
    const data = await response.json()

    console.log('Parsed Data Json length =', data.length)

    cities.push(...data)
    console.log(cities[0].city);
    console.log(cities[0].state);
    console.log(cities[0].population);

    // console.log('LOAD: cities filled, length =', cities.length);
    // console.log('LOAD: first item =', cities[0]);
    // console.log('LOAD: sample keys =', Object.keys(cities[0]));

    return data
}

function renderMatches(matches, query) {
    console.log('--- renderMatches running ---');
    console.log('query =', query, 'matches =', matches.length);

    if (!query) {
        suggestions.innerHTML = `
      <li>Filter for a city</li>
      <li>or a state</li>
    `;
        console.log('Rendered default helper text');
        return;
    }

    const q = query.toLowerCase();

    const html = matches.map((place) => {
        // highlight without regex
        const city = place.city;
        const state = place.state;

        const cityLower = city.toLowerCase();
        const stateLower = state.toLowerCase();

        // find index of query inside strings
        const ci = cityLower.indexOf(q);
        const si = stateLower.indexOf(q);

        const highlight = (text, i) => {
            if (i === -1) return text; // nothing to highlight
            const start = text.slice(0, i);
            const mid = text.slice(i, i + q.length);
            const end = text.slice(i + q.length);
            return `${start}<span class="hl">${mid}</span>${end}`;
        };

        const cityName = highlight(city, ci);
        const stateName = highlight(state, si);

        const population = Number(place.population).toLocaleString();

        return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${population}</span>
      </li>
    `;
    }).join('');

    suggestions.innerHTML = html || `<li>No matches…</li>`;
    console.log('Rendered matches to DOM');
}

console.log('Data loaded. You can type to search now.');


loadCities()

// async function initial() {
//     const data = await loadCities()
//     cities.push(...data)

//     console.log(cities.length)
// }
// initial()