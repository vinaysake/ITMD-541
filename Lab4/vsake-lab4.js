// IIFE to encapsulate the functionality
(function() {
    // Set the background color, text color, and border for the body
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'blue';
    document.body.style.border = '4px solid blue';
    
    // Create the "Get Started" button
    const button = document.createElement('button');
    button.textContent = 'Get Started';
    button.style.backgroundColor = 'white';
    button.style.color = 'blue';
    button.style.border = 'none';
    button.style.padding = '10px 20px';
    button.style.cursor = 'pointer';
    button.style.boxShadow = '1px 1px 5px rgba(0, 0, 0, 0.1)';
    button.onclick = function() {
        alert('Thank You for your interest in Stellar Marketing!');
    };
    
    // Append the button to the body or a specific section
    document.body.appendChild(button); // Change as needed to append it to a specific container

    // Change icon color in the services section
    const serviceIcons = document.querySelectorAll('.service-icon'); // Assuming these icons have a class 'service-icon'
    serviceIcons.forEach(icon => {
        icon.style.color = '#6495ed';
    });

    // Change digital marketing icon to 'Ads Click'
    const digitalMarketingIcon = document.querySelector('.digital-marketing-icon'); // Change selector as needed
    if (digitalMarketingIcon) {
        digitalMarketingIcon.className = 'material-symbols-outlined ads_click'; // Change to ads_click
    }

    // Change the layout of the specialized marketing solutions section
    const solutionsSection = document.querySelector('.specialized-marketing-solutions'); // Change selector as needed
    if (solutionsSection) {
        const mediaQuery = window.matchMedia('(min-width: 1024px)');
        const applyGridStyle = () => {
            if (mediaQuery.matches) {
                solutionsSection.style.display = 'grid';
                solutionsSection.style.gridTemplateColumns = 'repeat(4, 1fr)';
            } else {
                solutionsSection.style.display = 'grid';
                solutionsSection.style.gridTemplateColumns = 'repeat(2, 1fr)';
            }
        };
        applyGridStyle();
        mediaQuery.addListener(applyGridStyle); // Listen for screen size changes
    }

    // Change Musicians image
    const musiciansImage = document.querySelector('.musicians-image'); // Change selector as needed
    if (musiciansImage) {
        musiciansImage.src = 'https://picsum.photos/id/453/400/300';
    }

    // Handle form submission
    const form = document.querySelector('form'); // Change to the specific form selector
    if (form) {
        form.onsubmit = function(event) {
            event.preventDefault(); // Prevent the form from submitting to a broken URL
            
            const name = form.querySelector('input[name="name"]').value; // Change input name as necessary
            const email = form.querySelector('input[name="email"]').value; // Change input name as necessary

            if (name && email) {
                alert(`Thank you, ${name}! We will be in touch with you shortly at ${email}.`);
            } else {
                alert('Please provide a name and email.');
            }
        };
    }
})();
