// 1. Structure to store questions (Requirement 1)
const questions = [
    {
        id: "name",
        type: "text",
        title: "What is your full name?",
        desc: "Please enter your first and last name.",
        required: true,
        limit: 100
    },
    {
        id: "email",
        type: "text",
        title: "What is your email address?",
        desc: "We may use this to follow up on your feedback.",
        required: true,
        limit: 255
    },
    {
        id: "satisfaction",
        type: "radio",
        title: "How satisfied are you with our service?",
        desc: "Please select the option that best describes your experience.",
        required: true,
        options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"]
    },
    {
        id: "features",
        type: "checkbox",
        title: "Which features have you used?",
        desc: "Select all that apply. Minimum 1, maximum 5 selections.",
        required: true,
        options: ["Dashboard Analytics", "Custom Reports", "Third-party Integrations", "Workflow Automation", "API Access", "Mobile App", "Customer Support"],
        min: 1,
        max: 5
    },
    {
        id: "feedback",
        type: "textarea",
        title: "Any additional feedback or suggestions?",
        desc: "Share your thoughts with us (10-500 characters).",
        required: false,
        limit: 500
    }
];

// 2. Dynamically Generate Form (Requirement 2)
const container = document.getElementById('dynamicFields');

function buildSurvey() {
    document.getElementById('qCount').innerText = `${questions.length} questions (${questions.filter(q=>q.required).length} required)`;
    
    questions.forEach(q => {
        const card = document.createElement('div');
        card.className = 'card q-card';
        card.id = `card-${q.id}`;

        let html = `
            <div class="q-title">${q.title} ${q.required ? '<span class="required-star">*</span>' : ''}</div>
            <div class="q-desc">${q.desc}</div>
        `;

        if (q.type === 'text' || q.type === 'textarea') {
            const inputTag = q.type === 'text' ? 'input' : 'textarea';
            html += `
                <${inputTag} class="input-box" id="input-${q.id}" placeholder="${q.type === 'text' ? 'Enter your response' : 'Tell us what you think...'}" oninput="updateProgress()"></${inputTag}>
                <div class="char-count" id="count-${q.id}">0/${q.limit}</div>
            `;
        } else {
            html += `<div class="options-container">`;
            q.options.forEach(opt => {
                html += `
                    <label class="option-row" id="row-${q.id}-${opt.replace(/\s/g, '')}">
                        <input type="${q.type}" name="${q.id}" value="${opt}" onchange="toggleRowClass(this); updateProgress()">
                        <span>${opt}</span>
                    </label>
                `;
            });
            html += `</div>`;
        }

        html += `<div class="error-msg" id="error-${q.id}">This field is required</div>`;
        card.innerHTML = html;
        container.appendChild(card);
    });
}

// UI Helper: Highlight selected rows (Matches your screenshots)
function toggleRowClass(el) {
    const name = el.name;
    const type = el.type;
    if (type === 'radio') {
        document.querySelectorAll(`input[name="${name}"]`).forEach(input => {
            input.parentElement.classList.remove('selected');
        });
    }
    if (el.checked) el.parentElement.classList.add('selected');
    else el.parentElement.classList.remove('selected');
}

// 3. Validation Logic (Requirement 3, 4, 5)
function validateForm() {
    let isValid = true;

    questions.forEach(q => {
        const errorEl = document.getElementById(`error-${q.id}`);
        let fieldValid = true;

        if (q.type === 'text' || q.type === 'textarea') {
            const val = document.getElementById(`input-${q.id}`).value.trim();
            if (q.required && val === "") fieldValid = false;
            if (q.limit && val.length > q.limit) fieldValid = false;
        } else {
            const checked = document.querySelectorAll(`input[name="${q.id}"]:checked`);
            if (q.required && checked.length === 0) fieldValid = false;
            if (q.min && checked.length < q.min) fieldValid = false;
            if (q.max && checked.length > q.max) fieldValid = false;
        }

        // 4. DOM Manipulation for Errors (Requirement 5)
        if (!fieldValid) {
            errorEl.style.display = 'block';
            isValid = false;
        } else {
            errorEl.style.display = 'none';
        }
    });

    return isValid;
}

// Real-time Progress Tracker
function updateProgress() {
    let completed = 0;
    questions.forEach(q => {
        if (q.type === 'text' || q.type === 'textarea') {
            if (document.getElementById(`input-${q.id}`).value.trim() !== "") completed++;
        } else {
            if (document.querySelectorAll(`input[name="${q.id}"]:checked`).length > 0) completed++;
        }
    });
    
    const percent = Math.round((completed / questions.length) * 100);
    document.getElementById('progressBarFill').style.width = percent + "%";
    document.getElementById('percentText').innerText = percent + "% complete";
}

// 5. Prevent submission if invalid (Requirement 6)
document.getElementById('surveyForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
        alert("Survey Submitted Successfully! Thank you for your feedback.");
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

buildSurvey();