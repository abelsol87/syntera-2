// select all videos 

const videos = document.querySelectorAll('.videos li')
console.log(videos)

// get the time for each video
const times = Array.from(videos).map((video) => video.dataset.time);
console.log(times);

// Convert time into total seconds
const seconds = times.map((time) => {
    const [mins, sec] = time.split(':').map(Number);
    console.log(`${time} = ${mins} minutes and ${sec} Seconds`)
    const totalSeconds = mins * 60 + sec
    // console.log(`${time} =  total seconds ${totalSeconds}`)
    return totalSeconds;
})

console.log(seconds)

// Adding up all seconds using reduce()
const totalSeconds = seconds.reduce((total, sec) => {
    console.log(`Adding ${sec} to total ${total}`);
    return total + sec
}, 0)


const hours = Math.floor(totalSeconds / 3600)
const minutes = Math.floor((totalSeconds % 3600) / 60)
const totalSecond = totalSeconds % 60

console.log(hours)
console.log(minutes)
console.log(totalSecond)

console.log(`${hours}H ${minutes}M ${totalSecond}Sec`)

document.body.insertAdjacentHTML(
    'beforeend',
    `<h2>Total time: ${hours}h ${minutes}m ${seconds}s</h2>`
);


// const timeNodes = Array.from(document.querySelectorAll('[data-time]'));

// const seconds = timeNodes
//     .map((node) => node.dataset.time)
//     .map((timeCode) => {
//         const [mins, secs] = timeCode.split(':').map(parseFloat);
//         return mins * 60 + secs;
//     })
//     .reduce((total, vidSeconds) => total + vidSeconds);

// let secondsLeft = seconds;
// const hours = Math.floor(secondsLeft / 3600);
// secondsLeft = secondsLeft % 3600;

// const mins = Math.floor(secondsLeft / 60);
// secondsLeft = secondsLeft % 60;

// console.log(hours, mins, secondsLeft);