// Function to handle form submission
function handleFormSubmission(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Collect form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone_number').value.trim(),
        degree: document.getElementById('degree').value.trim(),
        institute: document.getElementById('institute').value.trim(),
        passingYear: document.getElementById('passingYear').value.trim(),
        jobTitle: document.getElementById('job_title').value.trim(),
        company: document.getElementById('company').value.trim(),
        duration: document.getElementById('duration').value.trim(),
        responsibility: document.getElementById('responsibility').value.trim(),
        languages: Array.from(document.querySelectorAll('.checkbox-group input:checked')).map(el => el.value),
        frameworks: Array.from(document.querySelectorAll('.check-grp input:checked')).map(el => el.value),
        versionControl: document.getElementById('version').value.trim(),
        projectName: document.getElementById('ProjectName').value.trim(),
        projectDescription: document.getElementById('ProjectDescription').value.trim()
    };

    console.log("Collected Form Data:", formData); // Debugging log

    // Save the form data to sessionStorage as JSON
    sessionStorage.setItem('resumeData', JSON.stringify(formData));

    // Redirect to resume.html
    window.location.href = 'resume.html';
}

// Function to load and display data on resume.html
function loadResumeData() {
    const formData = JSON.parse(sessionStorage.getItem('resumeData')); // Retrieve data from sessionStorage

    if (formData) {
        // Update placeholders in resume.html with form data
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
        // Redirect back to form.html if no data is found
        console.warn("No data in sessionStorage. Redirecting to form.html...");
        window.location.href = 'form.html';
    }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Check if on form.html
    if (document.getElementById('detailsForm')) {
        document.getElementById('detailsForm').addEventListener('submit', handleFormSubmission);
    }
    // Check if on resume.html
    else if (document.getElementById('resumePage')) {
        loadResumeData();
    }
});
