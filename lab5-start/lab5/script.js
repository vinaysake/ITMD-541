// Function to handle form submission
function handleFormSubmission(event) {
    event.preventDefault(); 
    const formData = {
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
        languages: Array.from(document.querySelectorAll('.checkbox-group input:checked')).map(el => el.value),
        frameworks: Array.from(document.querySelectorAll('.check-grp input:checked')).map(el => el.value),
        versionControl: document.getElementById('version').value,
        projectName: document.getElementById('ProjectName').value,
        projectDescription: document.getElementById('ProjectDescription').value
    };

    sessionStorage.setItem('resumeData', JSON.stringify(formData));

    window.location.href = 'resume.html';
}

function loadResumeData() {
    const formData = JSON.parse(sessionStorage.getItem('resumeData'));

    if (formData) {
        // Populate placeholders with form data
        document.getElementById('displayName').textContent = formData.name;
        document.getElementById('displayEmail').textContent = formData.email;
        document.getElementById('displayPhone').textContent = formData.phone;

        document.getElementById('displayEducation').innerHTML = `
            <strong>Degree:</strong> ${formData.degree}<br>
            <strong>Institution:</strong> ${formData.institute}<br>
            <strong>Passing Year:</strong> ${formData.passingYear}
        `;

        document.getElementById('displayExperience').innerHTML = `
            <strong>Job Title:</strong> ${formData.jobTitle}<br>
            <strong>Company:</strong> ${formData.company}<br>
            <strong>Duration:</strong> ${formData.duration}<br>
            <strong>Responsibility:</strong> ${formData.responsibility}
        `;

        document.getElementById('displaySkills').innerHTML = `
            <ul>
                <li><strong>Languages:</strong> ${formData.languages.join(', ')}</li>
                <li><strong>Frameworks:</strong> ${formData.frameworks.join(', ')}</li>
                <li><strong>Version Control:</strong> ${formData.versionControl}</li>
            </ul>
        `;

        document.getElementById('displayProject').innerHTML = `
            <ul>
                <li><strong>Project Name:</strong> ${formData.projectName}</li>
                <li><strong>Project Description:</strong> ${formData.projectDescription}</li>
            </ul>
        `;
    } else {
        // Redirect to form.html if no data is present
        window.location.href = 'form.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('detailsForm')) {
      
        document.getElementById('detailsForm').addEventListener('submit', handleFormSubmission);
    } else if (document.getElementById('resumePage')) {
        
        loadResumeData();
    }
});
