// Select all the key boxes
const keys = document.querySelectorAll('.key');
console.log('✅ Keys found:', keys.length);

// 1️⃣ When any keyboard key is pressed
window.addEventListener('keydown', (event) => {


    // Find the matching audio and key box
    const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);

    // Stop if there is no matching sound
    if (!audio) {
        return;
    }

    // Rewind sound to start and play it
    audio.currentTime = 0;
    audio.play();
    console.log('🎵 Playing sound...');

    // Add highlight effect
    key.classList.add('playing');
    console.log('.playing class');
});

// 2️⃣ When the animation ends, remove the highlight
keys.forEach((key) => {
    key.addEventListener('transitionend', (event) => {
        if (event.propertyName !== 'transform') return; // only when transform finishes
        key.classList.remove('playing');
        console.log('Removed .playing class');
    });
});


