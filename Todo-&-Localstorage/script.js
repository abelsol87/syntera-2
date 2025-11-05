// 1) Grab DOM elements
const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');
console.log('STEP 1: DOM elements selected', { form, input, list });

// 2) Load existing todos from localStorage (or start empty)
let todos = JSON.parse(localStorage.getItem('todos')) || [];
console.log('STEP 2: Loaded todos from localStorage', todos);

// 3) Render function: draw the list on the page
function render() {
    console.log('STEP 3: Rendering list. Count =', todos.length);
    list.innerHTML = '';

    todos.forEach((todo) => {
        console.log(' - Building <li> for:', todo);

        const li = document.createElement('li');

        const check = document.createElement('input');
        check.type = 'checkbox';
        check.checked = todo.done; // IMPORTANT: boolean, not string
        check.dataset.id = todo.id;

        const span = document.createElement('span');
        span.textContent = todo.text;

        const del = document.createElement('button');
        del.textContent = '␡';
        del.setAttribute('aria-label', 'Delete');
        del.dataset.id = todo.id;

        li.appendChild(check);
        li.appendChild(span);
        li.appendChild(del);

        list.appendChild(li);
    });
}

// 4) Save helper
function save() {
    console.log('STEP 4: Saving to localStorage', todos);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// 5) Handle form submit: add a new todo
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('STEP 5: Form submitted');

    const text = input.value.trim();
    console.log(' - Input value =', text);

    if (!text) {
        console.log(' - Empty input. Stop.');
        return;
    }

    const newTodo = { id: Date.now().toString(), text, done: false };
    console.log(' - New todo object:', newTodo);

    todos.push(newTodo);
    console.log(' - Todos after push:', todos);

    input.value = '';
    save();
    render();
});

// 6) Event delegation for toggle + delete
list.addEventListener('click', (e) => {
    console.log('STEP 6: List clicked', e.target.tagName);

    // Toggle checkbox
    if (e.target.matches('input[type="checkbox"]')) {
        const id = e.target.dataset.id;
        console.log(' - Toggling todo with id:', id);

        todos = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
        save();
        render();
        return;
    }

    // Delete button
    if (e.target.matches('button')) {
        const id = e.target.dataset.id;
        console.log(' - Deleting todo with id:', id);

        todos = todos.filter((t) => t.id !== id);
        save();
        render();
    }
});

// 7) First paint
console.log('STEP 7: Initial render');
render();
