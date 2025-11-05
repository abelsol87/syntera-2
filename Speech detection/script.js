// Import stylesheets
// import './style.css';

window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

if (!window.SpeechRecognition) {
    const compatibilityMessage = 'Sorry, your browser does not support the Web Speech API required for this feature. Please try using Google Chrome or Microsoft Edge.';
    alert(compatibilityMessage);

    words.innerHTML = `<p style="color: red;">${compatibilityMessage}</p>`;

    // Stop the script from trying to proceed
    throw new Error("Speech API not supported");
}

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.continuous = true
recognition.lang = 'en-US';


let p = document.createElement('p')
const words = document.querySelector('.words')
words.appendChild(p)
console.log(`This is paragraph ${p}`)


recognition.addEventListener('result', (e) => {

    const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');


    console.log(transcript);
    const replaced = transcript.replace(/poop|shit|poep/, "🥴")

    p.textContent = transcript;

    if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
    }

});



recognition.addEventListener('end', recognition.start);

recognition.start();
