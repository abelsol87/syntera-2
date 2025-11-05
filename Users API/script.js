
// async function getUsers() {
//     const res = await fetch('https://jsonplaceholder.typicode.com/users');
//     const data = await res.json();
//     console.log(' Fetch users: parsed data', data);
//     return data;
// }
// //  Fetch posts for a specific user
// async function getUserPosts(userId) {
//     console.log(`Fetch posts for userId=${userId}: start`);
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
//     const data = await res.json();
//     console.log(`Fetch posts: parsed data for userId=${userId}`, data);
//     return data;
// }

// // Display users and handle button clicks to show posts
// async function displayUsers() {
//     console.log(' Display users: start');
//     const userContainer = document.querySelector('#user-container');
//     const postContainer = document.querySelector('#post-container');

//     userContainer.innerHTML = '';
//     postContainer.innerHTML = '<p>Select a user to see posts</p>';
//     console.log('Cleared containers');

//     const users = await getUsers();
//     users.forEach((user) => {
//         console.log(' Create button for:', user.name);
//         const postBtn = document.createElement('button');
//         postBtn.textContent = `Name: ${user.name}`;

//         const todoBtn = document.createElement('button')
//         todoBtn.textContent = `Todos - ${user.name}`

//         postBtn.addEventListener('click', async () => {
//             console.log('CLICK user:', user.id, user.name);
//             postContainer.innerHTML = `<h2>Posts by ${user.name} (loading...)</h2>`;

//             const posts = await getUserPosts(user.id);
//             console.log('Posts count:', posts.length);

//             postContainer.innerHTML = `<h2>Posts by ${user.name}:</h2>`;
//             posts.forEach((post) => {
//                 console.log('Render post id:', post.id);
//                 const div = document.createElement('div');
//                 div.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
//                 postContainer.appendChild(div);
//             });

//             todoBtn.addEventListener('click', async () => {
//                 const todoContainer = document.querySelector('#todo-container')
//                 todoContainer.innerHTML = `<h2>Todo's ${user.name} ()loading....</h2>`

//                 const todos = await getUserTodos(user.id)
//                 console.log('Todos count:', todos.length)

//                 todoContainer.innerHTML = `<h2>Todo's ${user.name}:</h2>`

//                 todos.forEach((todo) => {
//                     const div = document.createElement('div')
//                     div.innerHTML = `<p>${todo.title}</p>`
//                     todoContainer.appendChild(div)
//                     console.log(todoContainer)
//                 })
//             })
//             userContainer.appendChild(postBtn)
//             userContainer.appendChild(todoBtn)

//             console.log('Finished rendering posts for:', user.name);
//         });

//         userContainer.appendChild(postBtn);
//         console.log('Appended button for:', user.name);
//     });

//     console.log('Display users: done');
// }

// // fetch todos for each user
// async function getUserTodos(userId) {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
//     const data = await res.json()
//     console.log(`fetch todos userId=${userId}`, data)
//     return data
// }

// console.log('Initial call displayUsers()');
// displayUsers();


const userContainer = document.querySelector('#user-container');
const userPostContainer = document.querySelector('#post-container');
const todosContainer = document.querySelector('#todo-container');
const albumsContainer = document.querySelector('#album-container')


console.log('DOM:', userContainer, userPostContainer, todosContainer, albumsContainer)

//  fetch users from API
async function getUser() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await response.json()
    return data
}

// show users in buttons
async function showUsers() {
    const users = await getUser()

    // create a button for each user with there name shown in the button
    users.forEach(user => {
        // console.log(`Show users from users Api ${user.email}`)
        const userBox = document.createElement('div')

        const userButton = document.createElement('button')
        userButton.textContent = user.name;

        const albumsButton = document.createElement('button')
        albumsButton.textContent = 'Albums'

        const todoBtn = document.createElement('button')
        todoBtn.textContent = `Todos`

        albumsButton.addEventListener('click', async () => {
            albumsContainer.innerHTML = `<p>Loading Albums for ${user.name}...</p>`
            const albums = await getUserAlbums(user.id)
            albumsContainer.innerHTML = `<h3>Albums for ${user.name} (${albums.length})</h3>`;
            const ul = document.createElement('ul')

            albums.forEach((album) => {
                // console.log(album.id, album.title, album.url)
                const li = document.createElement('li')
                li.textContent = album.title
                ul.appendChild(li)


                const albumBox = document.createElement('div')
                console.log('ALBUM:', album.id, album.title);

                const title = document.createElement('h4')
                title.textContent = album.title

                // Adding photos button
                const photosBtn = document.createElement('button')
                photosBtn.textContent = 'Show Photos'

                const photosArea = document.createElement('div')
                photosArea.className = 'photos-area'
                albumBox.appendChild(photosArea)

                photosBtn.addEventListener('click', async () => {
                    console.log('click photos for album', album.id)
                    photosArea.innerHTML = `<p>Loading photos for album ${album.id}..</p>`

                    const photos = await getAlbumPhotos(album.id)
                    photosArea.innerHTML = ''

                    photos.forEach((photo) => {
                        const img = document.createElement('img')
                        img.src = photo.thumbnailUrl
                        img.alt = photo.title
                        photosArea.appendChild(img)

                    })

                })

                albumBox.appendChild(title)
                albumBox.appendChild(photosBtn)
                albumsContainer.appendChild(albumBox)
                photosArea.dataset.loaded = 'true';


            })
            albumsContainer.appendChild(ul)

        })


        userButton.addEventListener('click', async () => {
            console.log(`You clicked ${user.name} ${user.id}`)
            userPostContainer.innerHTML = `<p>loading posts for ${user.name}....</p>`
            const posts = await getUserPosts(user.id)
            // console.log(posts)
            // userContainer.innerHTML = ''

            posts.forEach((post) => {
                // console.log(`Post title: ${post.title}`)

                const div = document.createElement('div')
                div.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`
                userPostContainer.appendChild(div)

                const commentBtn = document.createElement('button')
                commentBtn.textContent = 'Show Comments'

                commentBtn.addEventListener('click', async () => {
                    const comments = await getComments(post.id)
                    const commentDiv = document.createElement('div')
                    commentDiv.innerHTML = `<p><strong>Loading comments...</strong></p>`

                    commentDiv.innerHTML = `<h4>Comments (${comments.length})</h4>`

                    comments.forEach((comment) => {
                        const p = document.createElement('p')
                        console.log(comment.body)
                        p.textContent = comment.body
                        commentDiv.appendChild(p)
                    })
                    div.appendChild(commentDiv)
                    // console.log('Fetched comments:', comments) 
                })
                div.appendChild(commentBtn)
            })
        })

        todoBtn.addEventListener(('click'), async () => {
            todosContainer.innerHTML = `<p>Loading todos for ${user.name}</p>`
            const todos = await getUsersTodos(user.id)
            todosContainer.innerHTML = `<h3>Loading todos for ${user.name}</h3>`

            const ul = document.createElement('ul')

            todos.forEach((todo) => {
                const li = document.createElement('li')
                li.textContent = `${todo.completed ? '✅' : '❌'} ${todo.title} `
                ul.appendChild(li)
            })
            todosContainer.appendChild(ul)
        })

        userBox.appendChild(userButton)
        userBox.appendChild(todoBtn)
        userBox.appendChild(albumsButton)
        userContainer.appendChild(userBox)

        // console.log(`userButton created for: ${user.name}`)
    });
}

// Get Users Posts helper
async function getUserPosts(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    const data = await response.json()
    // console.log(data)
    return data
}

// Get user todo's helper 
async function getUsersTodos(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
    const data = await response.json()
    console.log(`getUserTodos: parsed `, data);
    return data

}
// usersTodos(1)
// get comments helper
async function getComments(postId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    const data = await response.json()
    console.log(`comments for postId=${postId}`, data)
    return data
}

// user album helper

async function getUserAlbums(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
    const data = await response.json()
    console.log(`Albums for userId=${userId}`, data);
    return data
}

async function getAlbumPhotos(albumId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
    const data = await response.json()
    console.log(`Albums for albumId=${albumId}`, data);
    return data
}

// getComments(1)
showUsers()

// userContainer.addEventListener(('click'), showUsers => {
//     console.log('user clicked')
// })