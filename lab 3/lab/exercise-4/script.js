// Activity Storage
let activities = [];
let counts = { clicks: 0, keys: 0, focus: 0 };
const thresholds = { clicks: 15, keys: 50, focus: 20 };

// DOM Elements
const activityLog = document.getElementById('activityLog');
const clickDisplay = document.getElementById('clickCount');
const keyDisplay = document.getElementById('keyCount');
const focusDisplay = document.getElementById('focusCount');
const totalDisplay = document.getElementById('eventTotal');
const warningBanner = document.getElementById('warningBanner');
const warningDetail = document.getElementById('warningDetail');

// 1. & 3. Tracking Events (Using Bubbling and Capturing)
const trackEvent = (type, e, phase) => {
    const activity = {
        type: type,
        phase: phase,
        target: e.target.tagName.toLowerCase() + (e.target.className ? `.${e.target.className.split(' ')[0]}` : ''),
        timestamp: new Date().toLocaleTimeString() + "." + new Date().getMilliseconds(),
        position: type === 'CLICK' ? `(${e.clientX}, ${e.clientY})` : 'N/A'
    };

    activities.unshift(activity); // Add to start of array
    updateStats(type);
    renderLog();
    checkThresholds();
};

// Global Listeners
// Capturing Phase (third argument true)
window.addEventListener('click', (e) => trackEvent('CLICK', e, 'capture'), true);
window.addEventListener('keydown', (e) => trackEvent('KEYPRESS', e, 'capture'), true);
window.addEventListener('focus', (e) => trackEvent('FOCUS', e, 'capture'), true);

// Bubbling Phase (third argument false/default)
window.addEventListener('click', (e) => trackEvent('CLICK', e, 'bubble'), false);
window.addEventListener('keydown', (e) => trackEvent('KEYPRESS', e, 'bubble'), false);
window.addEventListener('focus', (e) => trackEvent('FOCUS', e, 'bubble'), false);

// 4. Dynamically update the DOM
function renderLog() {
    activityLog.innerHTML = activities.slice(0, 50).map(act => `
        <div class="log-entry">
            <div style="display:flex; justify-content: space-between;">
                <strong>${act.type}</strong>
                <span class="tag ${act.phase === 'capture' ? 'tag-capture' : 'tag-bubble'}">${act.phase}</span>
            </div>
            <div style="color: #94a3b8; margin-top: 5px;">
                Target: ${act.target}<br>
                ${act.type === 'CLICK' ? `Pos: ${act.position}` : ''}
                <small style="display:block; margin-top:5px;">${act.timestamp}</small>
            </div>
        </div>
    `).join('');
    totalDisplay.innerText = `${activities.length} events`;
}

function updateStats(type) {
    if (type === 'CLICK') counts.clicks++;
    if (type === 'KEYPRESS') counts.keys++;
    if (type === 'FOCUS') counts.focus++;

    clickDisplay.innerText = counts.clicks;
    keyDisplay.innerText = counts.keys;
    focusDisplay.innerText = counts.focus;
}

// 5. Suspicious Activity (Logic for threshold in 10s window)
function checkThresholds() {
    if (counts.clicks > thresholds.clicks) {
        warningBanner.classList.remove('hidden');
        warningDetail.innerText = `High click rate: ${counts.clicks} clicks detected!`;
    }
}

// 6. Reset and Export
document.getElementById('resetBtn').addEventListener('click', () => {
    activities = [];
    counts = { clicks: 0, keys: 0, focus: 0 };
    clickDisplay.innerText = '0';
    keyDisplay.innerText = '0';
    focusDisplay.innerText = '0';
    warningBanner.classList.add('hidden');
    renderLog();
});

document.getElementById('exportBtn').addEventListener('click', () => {
    const text = activities.map(a => `[${a.timestamp}] ${a.type} | Phase: ${a.phase} | Target: ${a.target}`).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const anchor = document.createElement('a');
    anchor.download = 'activity_log.txt';
    anchor.href = window.URL.createObjectURL(blob);
    anchor.click();
});