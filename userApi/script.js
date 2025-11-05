const userContainer = document.querySelector('#user-container')
const postContainer = document.querySelector('#post-container')
const todoContainer = document.querySelector('#todo-container')
const albumContainer = document.querySelector('#albums-container')


console.log(userContainer, postContainer, todoContainer, albumContainer)

// Fetching users
async function getUsers() {
    console.log("getUsers(): start fetch")
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    console.log("getUsers(): got response")
    const data = await response.json()
    console.log("getUsers(): parsed length =", data.length)
    return data
}

// Fetching user posts
async function getUserPosts(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    const data = await response.json()
    return data
}

// Fetching comments
async function getComments(postId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    const data = await response.json();
    console.log(data)
    return data
}

// Fetching todos
async function getUserTodos(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
    const data = await response.json()
    return data
}

// Fetching albums
async function getUserAlbums(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
    const data = await response.json()
    console.log("getUserAlbums(): got response", data.length)
    return data
}

async function getUserPhotos(albumId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
    const data = await response.json()
    console.log("getUserPhotos(): got response", data.length)
    return data
}
getUserPhotos(2)


//  Displaying users
async function showUsers() {
    userContainer.innerHTML = '👽 Loading....'
    const users = await getUsers()
    userContainer.innerHTML = ''

    // Iterate over users
    users.forEach(user => {
        // User buttons and todo buttons
        const userButton = document.createElement('button')
        userButton.textContent = user.name

        // Todo Button
        const todoBtn = document.createElement('button')
        todoBtn.textContent = 'Todos'

        //Albums button
        const albumsBtn = document.createElement('button')
        albumsBtn.textContent = 'Albums'

        // Container div
        const div = document.createElement('div')
        div.className = 'container-div'

        // Append buttons to div
        div.appendChild(userButton)
        div.appendChild(todoBtn)
        userContainer.appendChild(div)
        div.appendChild(albumsBtn)

        // Event listeners for buttons
        todoBtn.addEventListener('click', async () => {
            todoContainer.innerHTML = '🛎 Todos Loading....'
            const todos = await getUserTodos(user.id)
            const done = todos.filter(todo => todo.completed) // Filter completed todos
            todoContainer.innerHTML = `<h3>Todos for ${user.name} (${done.length}/${todos.length} done)</h3>`// Display completed count
            // console.log('Completed:', done.length, 'of', todos.length);
            const ul = document.createElement('ul') //

            // Iterate over todos
            todos.forEach((todo) => {
                const li = document.createElement('li')
                li.textContent = `${todo.completed ? '✅' : '❌'} ${todo.title}`
                ul.appendChild(li)

                console.log(li)

            })
            // Append ul to todo container
            todoContainer.appendChild(ul)
        })

        albumsBtn.addEventListener('click', async () => {
            albumContainer.innerHTML = '💿Albums Loading...'
            const albums = await getUserAlbums(user.id)
            console.log('Albums received:', albums.length)
            albumContainer.innerHTML = `<h3>Albums for ${user.name} (${albums.length})</h3>`

            const ul = document.createElement('ul')// Create ul for albums

            // Iterate over albums 
            albums.forEach((album) => {
                const li = document.createElement('li')// Create li for each album
                li.textContent = album.title
                console.log(li)

                const photosBtn = document.createElement('button') // Button to load photos
                photosBtn.textContent = 'Show Photos'

                const photosArea = document.createElement('div')// Area to display photos

                // Event listener for photos button
                photosBtn.addEventListener('click', async () => {
                    photosArea.innerHTML = '🎞 Loading Photos...'
                    const photos = await getUserPhotos(album.id)
                    photosArea.innerHTML = ''

                    const test = photos[0];
                    console.log('TEST URL:', test.thumbnailUrl);
                    window.open(test.thumbnailUrl, '_blank'); // opens in a new tab


                    photos.forEach((photo, index) => {
                        if (index < 5) {// Limit to first 5 photos
                            const img = document.createElement('img')
                            img.src = photo.thumbnailUrl
                            img.alt = photo.title
                            img.style.margin = '5px'

                            photosArea.appendChild(img)
                        }
                    })

                })

                li.appendChild(photosBtn)
                li.appendChild(photosArea)
                ul.appendChild(li)

            })
            albumContainer.appendChild(ul)// Appended ul to album container
            console.log('CLICK ALBUMS:', user.id, user.name);
        })

        // Event listener for user button
        userButton.addEventListener('click', async () => {
            postContainer.innerHTML = 'Loading user posts...'
            const posts = await getUserPosts(user.id)
            postContainer.innerHTML = ''

            // Iterate over posts
            posts.forEach((post) => {
                const title = document.createElement('h2')
                title.textContent = post.title
                const body = document.createElement('p')
                body.textContent = post.body

                // Comments button and area
                const commentBtn = document.createElement('button')
                commentBtn.textContent = 'Show Comments'
                const commentArea = document.createElement('div')

                // Event listener for comments button
                commentBtn.addEventListener('click', async () => {
                    // console.log('click comment', post.id)
                    commentArea.innerHTML = 'Comments Loading...'
                    const comments = await getComments(post.id)
                    // console.log('getComments(): length =', comments.length, 'for postId=', post.id)
                    commentArea.innerHTML = ''

                    // Iterate over comments
                    comments.forEach((comment) => {
                        const commentsPara = document.createElement('p')
                        commentsPara.textContent = comment.body
                        commentArea.appendChild(commentsPara)
                        console.log('Render comment:', comment.id);

                    })
                })
                postContainer.appendChild(title) // Fixed: changed from postContainer to title
                postContainer.appendChild(body) // Fixed: changed from postContainer to body
                postContainer.appendChild(commentBtn) // Fixed: changed from postContainer to commentBtn
                postContainer.appendChild(commentArea) // Fixed: changed from postContainer to commentArea
            })

        })

        // console.log(`User ID:-${user.id} and User name: ${user.name}`)
    });
}
showUsers()

