// Function to handle form submission
function handleFormSubmission(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone_number').value,
        degree: document.getElementById('degree').value,
        institute: document.getElementById('institute').value,
        passingYear: document.getElementById('passingYear').value,
        jobTitle: document.getElementById('job_title').value,
        company: document.getElementById('company').value,
        duration: document.getElementById('duration').value,
        responsibility: document.getElementById('responsibility').value,
        languages: Array.from(document.querySelectorAll('.checkbox-group input:checked')).map(el => el.value),
        frameworks: Array.from(document.querySelectorAll('.check-grp input:checked')).map(el => el.value),
        versionControl: document.getElementById('version').value,
        projectName: document.getElementById('ProjectName').value,
        projectDescription: document.getElementById('ProjectDescription').value
    };

    // Save form data to sessionStorage
    sessionStorage.setItem('resumeData', JSON.stringify(formData));

    // Redirect to resume.html
    window.location.href = 'resume.html';
}

// Function to load and populate resume data
function loadResumeData() {
    const formData = JSON.parse(sessionStorage.getItem('resumeData')); // Retrieve data

    if (formData) {
        // Populate placeholders with form data
        document.getElementById('displayName').textContent = formData.name || 'N/A';
        document.getElementById('displayEmail').textContent = formData.email || 'N/A';
        document.getElementById('displayPhone').textContent = formData.phone || 'N/A';

        document.getElementById('displayEducation').innerHTML = `
            <strong>Degree:</strong> ${formData.degree || 'N/A'}<br>
            <strong>Institution:</strong> ${formData.institute || 'N/A'}<br>
            <strong>Passing Year:</strong> ${formData.passingYear || 'N/A'}
        `;

        document.getElementById('displayExperience').innerHTML = `
            <strong>Job Title:</strong> ${formData.jobTitle || 'N/A'}<br>
            <strong>Company:</strong> ${formData.company || 'N/A'}<br>
            <strong>Duration:</strong> ${formData.duration || 'N/A'}<br>
            <strong>Responsibility:</strong> ${formData.responsibility || 'N/A'}
        `;

        document.getElementById('displaySkills').innerHTML = `
            <ul>
                <li><strong>Languages:</strong> ${formData.languages.join(', ') || 'N/A'}</li>
                <li><strong>Frameworks:</strong> ${formData.frameworks.join(', ') || 'N/A'}</li>
                <li><strong>Version Control:</strong> ${formData.versionControl || 'N/A'}</li>
            </ul>
        `;

        document.getElementById('displayProject').innerHTML = `
            <ul>
                <li><strong>Project Name:</strong> ${formData.projectName || 'N/A'}</li>
                <li><strong>Project Description:</strong> ${formData.projectDescription || 'N/A'}</li>
            </ul>
        `;
    } else {
        // Redirect to form.html if no data exists
        window.location.href = 'form.html';
    }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('detailsForm')) {
        // Attach form submission handler if on form.html
        document.getElementById('detailsForm').addEventListener('submit', handleFormSubmission);
    } else if (document.getElementById('resumePage')) {
        // Load resume data if on resume.html
        loadResumeData();
    }
});
