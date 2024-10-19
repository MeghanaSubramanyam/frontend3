// Get DOM elements
const startTimerBtn = document.getElementById('start-timer-btn');
const timersList = document.getElementById('timers-list');
const alertSound = document.getElementById('alert-sound');

// Store active timers
let activeTimers = [];

startTimerBtn.addEventListener('click', () => {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert('Please set a valid time.');
        return;
    }

    const totalTimeInSeconds = (hours * 3600) + (minutes * 60) + seconds;
    createNewTimer(totalTimeInSeconds);
});

function createNewTimer(duration) {
    const timerId = Date.now(); // Unique ID for the timer
    let remainingTime = duration;

    // Create HTML for the new timer
    const timerElement = document.createElement('div');
    timerElement.classList.add('timer');
    timerElement.innerHTML = `
        <p>${formatTime(remainingTime)}</p>
        <button data-timer-id="${timerId}">Stop Timer</button>
    `;

    // Append to the list of active timers
    timersList.appendChild(timerElement);

    const interval = setInterval(() => {
        remainingTime--;

        // Update the display
        timerElement.querySelector('p').textContent = formatTime(remainingTime);

        if (remainingTime <= 0) {
            clearInterval(interval);
            timerElement.classList.add('timer-ended');
            timerElement.querySelector('button').remove();
            alertSound.play();
        }
    }, 1000);

    // Store the interval so we can clear it later
    activeTimers.push({ timerId, interval });

    // Stop timer functionality
    timerElement.querySelector('button').addEventListener('click', () => {
        clearInterval(interval);
        timerElement.remove();
        activeTimers = activeTimers.filter(timer => timer.timerId !== timerId);
    });
}

// Format time in HH:MM:SS
function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
