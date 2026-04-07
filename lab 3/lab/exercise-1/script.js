const form = document.getElementById('registrationForm');
const roleSelect = document.getElementById('role');
const passwordInput = document.getElementById('password');

// 1. Dynamic UI: Hide/Show Skills for Admin
roleSelect.addEventListener('change', () => {
    const skillsSection = document.getElementById('skillsSection');
    // Admins don't need skills field in this example
    skillsSection.style.display = roleSelect.value === 'admin' ? 'none' : 'block';
    validateForm(); 
});

// 2. Email Domain Validation
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// 3. Password Strength (Stronger for Admin)
function checkPasswordStrength(pass) {
    let strength = 0;
    if (pass.length > 5) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    
    // Dynamic rule: Admin MUST have strength 4, others 2
    const minRequired = roleSelect.value === 'admin' ? 4 : 2;
    return { score: strength, isValid: strength >= minRequired };
}

// 4. Real-time Validation Feedback
function showError(input, message) {
    const group = input.parentElement;
    const errorDisplay = group.querySelector('.error-msg');
    if (message) {
        input.classList.add('invalid');
        errorDisplay.innerText = message;
    } else {
        input.classList.remove('invalid');
        errorDisplay.innerText = '';
    }
}

function validateForm() {
    let isFormValid = true;

    // Name check
    const name = document.getElementById('name');
    if (name.value.length < 3) {
        showError(name, "Name must be at least 3 characters");
        isFormValid = false;
    } else { showError(name, ""); }

    // Email check
    const email = document.getElementById('email');
    if (!isValidEmail(email.value)) {
        showError(email, "Enter a valid email address");
        isFormValid = false;
    } else { showError(email, ""); }

    // Password check
    const passResult = checkPasswordStrength(passwordInput.value);
    const meter = document.getElementById('strengthMeter');
    meter.style.width = (passResult.score * 25) + "%";
    meter.style.backgroundColor = passResult.isValid ? "#28a745" : "#ff4d4d";
    
    if (!passResult.isValid) {
        const msg = roleSelect.value === 'admin' ? "Admin needs: Caps, Number, & Symbol" : "Password too weak";
        showError(passwordInput, msg);
        isFormValid = false;
    } else { showError(passwordInput, ""); }

    // Confirm Password
    const confirm = document.getElementById('confirmPassword');
    if (confirm.value !== passwordInput.value || confirm.value === "") {
        showError(confirm, "Passwords do not match");
        isFormValid = false;
    } else { showError(confirm, ""); }

    return isFormValid;
}

// Listen for typing to update UI
form.addEventListener('input', validateForm);

// Prevent submission if invalid
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
        alert("Registration Successful for " + roleSelect.value.toUpperCase() + "!");
    } else {
        alert("Please fix errors before submitting.");
    }
});