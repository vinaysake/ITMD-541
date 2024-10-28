(function() {
    // Update main headline text
    document.querySelector('.hero h1').innerText = "Supercharge Your Brand with Stellar Marketing";

    // Update sub-headline text with bold and italic
    document.querySelector('.hero p').innerHTML = "<b><i>Leverage innovative strategies from Stellar Marketing to make your business shine and succeed.</i></b>";

    // Update the hero section background image
    const heroSection = document.querySelector('.hero');
    heroSection.style.backgroundImage = "url('https://picsum.photos/id/683/1280/720')";
    heroSection.style.backgroundSize = "cover";
    heroSection.style.backgroundPosition = "center";
    heroSection.style.backgroundRepeat = "no-repeat";

    // Change the navbar background color to match the footer
    const navbar = document.querySelector('nav');
    const footer = document.querySelector('footer');
    if (footer && navbar) {
        navbar.style.backgroundColor = window.getComputedStyle(footer).backgroundColor;
    }

    // Remove the "Get Started" CTA button in the hero section
    const ctaButton = document.querySelector('.hero .cta-button'); // Adjust selector if necessary
    if (ctaButton) {
        ctaButton.remove();
    }

    // Add a new full-width section with CTA below the hero
    const newSection = document.createElement('section');
    newSection.style.width = "100%";
    newSection.style.backgroundColor = "#6495ed";
    newSection.style.padding = "32px 0";
    newSection.style.textAlign = "center";

    const newCTAButton = document.createElement('button');
    newCTAButton.innerText = "Learn More";
    newCTAButton.style.backgroundColor = "#ffffff";
    newCTAButton.style.color = "#6495ed";
    newCTAButton.style.border = "4px solid #6495ed";
    newCTAButton.style.padding = "10px 20px";
    newCTAButton.style.fontSize = "16px";
    newCTAButton.style.cursor = "pointer";
    newCTAButton.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
    newCTAButton.addEventListener('click', () => {
        alert("Thank You for your interest in Stellar Marketing!");
    });

    newSection.appendChild(newCTAButton);
    heroSection.insertAdjacentElement('afterend', newSection);

    // Change the color of icons in the services section
    const icons = document.querySelectorAll('.services .material-icons-outlined');
    icons.forEach(icon => {
        icon.style.color = "#6495ed";
    });

    // Update the digital marketing icon to 'Ads Click'
    const digitalMarketingIcon = document.querySelector('.services .digital-marketing-icon'); // Adjust selector if needed
    if (digitalMarketingIcon) {
        digitalMarketingIcon.innerText = "ads_click";
    }

    // Adjust layout in the specialized marketing solutions section for larger screens
    const specializedSolutionsSection = document.querySelector('.specialized-solutions');
    if (specializedSolutionsSection) {
        specializedSolutionsSection.style.display = "grid";
        specializedSolutionsSection.style.gridTemplateColumns = "repeat(auto-fit, minmax(200px, 1fr))";
        specializedSolutionsSection.style.gap = "20px";
    }

    // Change the Musicians image
    const musiciansImage = document.querySelector('.specialized-solutions .musicians img');
    if (musiciansImage) {
        musiciansImage.src = "https://picsum.photos/id/453/400/300";
    }

    // Form submission changes (for graduate requirements)
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission to a broken URL

            // Select input fields by name attributes
            const nameInput = document.querySelector('input[name="name"]');
            const emailInput = document.querySelector('input[name="email"]');

            // Check if name and email inputs exist and retrieve their values
            const name = nameInput ? nameInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";

            if (name && email) {
                // Display success alert with name and email from the form
                alert(`Thank you, ${name}! We will be in touch with you shortly at ${email}.`);
            } else {
                // Display error alert if name or email is missing
                alert("Please provide a name and email.");
            }
        });
    }
})();
