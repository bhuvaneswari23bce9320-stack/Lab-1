// State Management
let currentStep = 1;
const totalSteps = 4;
const formData = {}; // Temporary storage for user input

// DOM Elements
const form = document.getElementById('multiStepForm');
const progressBar = document.getElementById('progressBar');
const backBtn = document.getElementById('backBtn');
const continueBtn = document.getElementById('continueBtn');

// Navigation Logic
continueBtn.addEventListener('click', () => {
    if (validateStage(currentStep)) {
        saveData(currentStep);
        if (currentStep < totalSteps) {
            currentStep++;
            updateUI();
        } else {
            alert("Registration Complete! Data: " + JSON.stringify(formData));
        }
    }
});

backBtn.addEventListener('click', () => {
    if (currentStep > 1) {
        currentStep--;
        updateUI();
    }
});

// Validation Logic
function validateStage(step) {
    const stage = document.getElementById(`stage${step}`);
    const inputs = stage.querySelectorAll('input');
    let isValid = true;

    inputs.forEach(input => {
        const group = input.closest('.input-group');
        // Basic check: required and email format
        const isFieldValid = input.value.trim() !== "" && (input.type !== 'email' || validateEmail(input.value));
        
        if (!isFieldValid) {
            group.classList.add('invalid');
            isValid = false;
        } else {
            group.classList.remove('invalid');
        }
    });

    return isValid;
}

function validateEmail(email) {
    return String(email).toLowerCase().match(/^\S+@\S+\.\S+$/);
}

// Temporary Data Storage
function saveData(step) {
    const stage = document.getElementById(`stage${step}`);
    const inputs = stage.querySelectorAll('input');
    inputs.forEach(input => {
        formData[input.name] = input.value;
    });

    if (currentStep === 4) renderReview();
}

// UI Updates
function updateUI() {
    // Show/Hide stages
    document.querySelectorAll('.form-stage').forEach((s, idx) => {
        s.classList.toggle('active', idx + 1 === currentStep);
    });

    // Update Progress Bar
    progressBar.style.width = `${(currentStep / totalSteps) * 100}%`;

    // Update Step Icons
    for (let i = 1; i <= totalSteps; i++) {
        const icon = document.getElementById(`stepIcon${i}`);
        icon.classList.toggle('active', i === currentStep);
        icon.classList.toggle('completed', i < currentStep);
    }

    // Buttons
    backBtn.disabled = currentStep === 1;
    continueBtn.innerText = currentStep === totalSteps ? 'Finish' : 'Continue →';
}

function renderReview() {
    const reviewBox = document.getElementById('reviewData');
    reviewBox.innerHTML = `
        <strong>Name:</strong> ${formData.firstName} ${formData.lastName}<br>
        <strong>Email:</strong> ${formData.email}<br>
        <strong>Address:</strong> ${formData.street}, ${formData.city}, ${formData.state} ${formData.zip}<br>
        <strong>Username:</strong> ${formData.username}
    `;
}