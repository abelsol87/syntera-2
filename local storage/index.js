// const addItems = document.querySelector('.add-items');
// const itemsList = document.querySelector('.plates');
// const inputField = document.querySelector('input')
// const items = [];

// console.log(inputField)

// addItems.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const text = document.querySelector('[name=item]').value
//     console.log(text)

//     const li = document.createElement('li');
//     li.textContent = text;
//     itemsList.appendChild(li)
//     console.log(li);
// });

// On page load, check if item are stored in local storage and show on page
// listen for form  submit events
// get the typed value from input field
// save the input field value in local storage
// show  the input field value as check box in html


// const addItems = document.querySelector('.add-items');
// const itemsList = document.querySelector('.plates');
// const items = JSON.parse(localStorage.getItem('items')) || [];

// const addItemsForm = document.querySelector(".add-items-form");

// // runs when the page loads
// console.log("1. LOADING");
// console.log("2. CHECKING FOR EXISTING ITEMS");
// const items = JSON.parse(localStorage.getItem("items")) || [];

// function functionThatExecutesOnSubmit(eventData) {
//     console.log("3. FORM IS SUBMITTED");
//     eventData.preventDefault();
//     //1. Get the value from input field
//     const value = addItemsForm.querySelector("#itemInput").value;
//     //2. Store value of input field in localstorage
//     console.log("4. STORING ITEMS IN LOCALSTORAGE");
//     items.push({ text: value, checked: false });
//     localStorage.setItem("items", JSON.stringify(items));
//     //3. Show values on the page
//     displayItems();
// }


// function displayItems() {
//     console.log("SHOWING ITEMS ON PAGE");
//     //1. Get items parent container
//     const itemsList = document.querySelector(".plates");
//     //2. Loop through items and display on page
//     itemsList.innerHTML = items
//         .map(
//             (item, i) => `
//         <li>
//           <input type="checkbox" data-index=${i} id="item${i}" ${item.checked ? "checked" : ""} />
//           <label for="item${i}">${item.text}</label>
//         </li>`
//         )
//         .join("");
// }

// displayItems();

// addItemsForm.addEventListener("submit", functionThatExecutesOnSubmit);

// console.log('The app is Loading')

// const addItemForm = document.querySelector(".add-items-form")
// const itemList = document.querySelector('.plates')
// const items = []

// // console.log(addItemForm)
// // console.log(itemList)
// // console.log(items)

// function handelSubmit(e) {
//     console.log('FORM IS SUBMITTED')
//     e.preventDefault()

//     const input = addItemForm.querySelector('#itemInput')
//     const value = input.value.trim();
//     console.log(`Input value ${value}`)

//     // items.push({ text: value, checked: false })
//     // console.log(`items after push ${items}`)

//     input.value = ''

//     displayItems()
// }

// function displayItems() {
//     console.log('SHOWING ITEMS ON PAGE')
//     const itemList = document.querySelector('.plates')
//     itemList.innerHTML = items.map((item) => {
//        return `<li>
//             <input type="checkbox" data-index=${i} id="item${i}" ${item.checked ? "checked" : ""} />
//             <label for="item${i}">${item.text}</label>
//         </li>`

//     }).join("")

//     itemList
// }

// displayItems()

// addItemForm.addEventListener('submit', handelSubmit)

const addItemForm = document.querySelector(".add-items-form")

// Runs when the page loads
console.log('1.LOADING')
console.log('2.CHECKING FOR EXISTING ITEMS')
// JSON.parse to convert string back to array
const items = JSON.parse(localStorage.getItem('items')) || []

console.log(items)

function functionThatExecutesOnSubmit(eventData) {
    console.log('3.FORM IS SUBMITTED')
    eventData.preventDefault()

    // 1.Get the value from input field
    const value = addItemForm.querySelector('#itemInput').value
    console.log(`Input value: ${value}`)

    // 2.Store value of input field in localstorage
    console.log("4. STORING ITEMS IN LOCALSTORAGE")
    items.push({ text: value, checked: false })
    localStorage.setItem("items", JSON.stringify(items))
    // 3.Show values on the page
    displayItems()
}

function displayItems() {
    console.log("SHOWING ITEMS ON PAGE")
    //1. Get items parent container
    const itemsList = document.querySelector('.plates')
    // 2.Loop through  items and display on page
    itemsList.innerHTML = items
        .map(
            (item, i) => `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${item.checked ? "checked" : ""} />
          <label for="item${i}">${item.text}</label>
        </li>`
        )
        .join("")
}

displayItems()

addItemForm.addEventListener("submit", functionThatExecutesOnSubmit);