// Function to handle form submission and save data to sessionStorage
function submitForm(event) {
    event.preventDefault(); 
    const resumeDetails = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone_number').value,
        degree: document.getElementById('degree').value,
        institute: document.getElementById('institute').value,
        passingYear: document.getElementById('passing Year').value,
        jobTitle: document.getElementById('job_title').value,
        company: document.getElementById('company').value,
        duration: document.getElementById('duration').value,
        responsibility: document.getElementById('responsibility').value,
        languages: Array.from(document.querySelectorAll('.checkbox-group input:checked')).map(input => input.value),
        frameworks: Array.from(document.querySelectorAll('.check-grp input:checked')).map(input => input.value),
        versionControl: document.getElementById('version').value,
        projectName: document.getElementById('ProjectName').value,
        projectDescription: document.getElementById('ProjectDescription').value
    };

    sessionStorage.setItem('resumeData', JSON.stringify(resumeDetails));
    window.location.href = 'resume.html';
}

// Function to load and display stored resume data
function loadResume() {
    const resumeDetails = JSON.parse(sessionStorage.getItem('resumeData'));

    if (resumeDetails) {
        document.getElementById('displayName').textContent = resumeDetails.name;
        document.getElementById('displayEmail').textContent = resumeDetails.email;
        document.getElementById('displayPhone').textContent = resumeDetails.phone;

        document.getElementById('displayEducation').innerHTML = `
            <strong>Degree:</strong> ${resumeDetails.degree}<br>
            <strong>Institution:</strong> ${resumeDetails.institute}<br>
            <strong>Passing Year:</strong> ${resumeDetails.passingYear}
        `;

        document.getElementById('displayExperience').innerHTML = `
            <strong>Job Title:</strong> ${resumeDetails.jobTitle}<br>
            <strong>Company:</strong> ${resumeDetails.company}<br>
            <strong>Duration:</strong> ${resumeDetails.duration}<br>
            <strong>Responsibilities:</strong> ${resumeDetails.responsibility}
        `;

        document.getElementById('displaySkills').innerHTML = `
            <ul>
                <li><strong>Languages:</strong> ${resumeDetails.languages.join(', ')}</li>
                <li><strong>Frameworks:</strong> ${resumeDetails.frameworks.join(', ')}</li>
                <li><strong>Version Control:</strong> ${resumeDetails.versionControl}</li>
            </ul>
        `;

        document.getElementById('displayProject').innerHTML = `
            <ul>
                <li><strong>Project Name:</strong> ${resumeDetails.projectName}</li>
                <li><strong>Project Description:</strong> ${resumeDetails.projectDescription}</li>
            </ul>
        `;
    } else {
        window.location.href = 'form.html';
    }
}

// Event listener to trigger functions based on page load
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('detailsForm');
    if (form) {
        form.addEventListener('submit', submitForm);
    } else if (document.getElementById('resumePage')) {
        loadResume();
    }
});
