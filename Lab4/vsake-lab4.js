(function() {
  // Modify the main heading in the hero section
  const primaryHeading = document.querySelector('#hero h1');
  if (primaryHeading) {
      primaryHeading.textContent = "Supercharge Your Brand with Stellar Marketing";
  }

  // Update the subheading in the hero section
  const secondaryHeading = document.querySelector('#hero p');
  if (secondaryHeading) {
      secondaryHeading.innerHTML = "Leverage innovative strategies from Stellar Marketing to make your business <strong><em>shine</em></strong> and <strong><em>succeed</em></strong>.";
  }

  // Set a fresh background image for the hero banner
  const heroSection = document.getElementById('hero');
  if (heroSection) {
      heroSection.style.backgroundImage = "url('https://picsum.photos/id/683/1280/720')";
  }

  // Match the navbar color to the footer color
  const topNav = document.querySelector('header');
  const siteFooter = document.querySelector('footer');
  if (topNav && siteFooter) {
      topNav.style.backgroundColor = window.getComputedStyle(siteFooter).backgroundColor;
  }

  // Remove the "Get Started" call-to-action from the hero section
  const heroButton = document.querySelector('#hero a');
  if (heroButton) {
      heroButton.remove();
  }

  // Add a new section with a call-to-action button below the hero
  const actionSection = document.createElement('section');
  actionSection.style.backgroundColor = "#6495ed";
  actionSection.style.margin = "-3rem 0 3rem 0";
  actionSection.style.padding = "32px 0";
  actionSection.style.width = "100%";
  actionSection.style.textAlign = "center";

  const consultButton = document.createElement('button');
  consultButton.textContent = "Schedule a Consultation Today";
  consultButton.style.backgroundColor = "white";
  consultButton.style.color = "#6495ed";
  consultButton.style.padding = "10px 20px";
  consultButton.style.border = "4px solid #6495ed";
  consultButton.style.fontSize = "1rem";
  consultButton.style.borderRadius = "5px";
  consultButton.style.boxShadow = "0px 2px 5px rgba(0, 0, 0, 0.1)";
  consultButton.addEventListener("click", () => {
      alert("Thank you for your interest in Stellar Marketing!");
  });

  actionSection.appendChild(consultButton);
  heroSection.insertAdjacentElement('afterend', actionSection);

  // Update icon colors in the Services section
  const serviceSymbols = document.querySelectorAll('#services .material-symbols-outlined');
  serviceSymbols.forEach(symbol => {
      symbol.style.color = "#6495ed";
  });

  // Replace the "Digital Marketing" icon with 'Ads Click'
  const clickIcon = document.querySelector('#services .material-symbols-outlined[data-icon="digital"]');
  if (clickIcon) {
      clickIcon.textContent = "ads_click";
  }

  // Adjust layout for marketing solutions to display 4 columns on large screens
  const responsiveStyle = document.createElement("style");
  responsiveStyle.textContent = `
      @media (min-width: 1024px) {
          #solutions .grid-cols-1.md\\:grid-cols-2 {
              grid-template-columns: repeat(4, 1fr);
          }
      }
  `;
  document.head.appendChild(responsiveStyle);

  // Update the Musicians image in the solutions section
  const musicianPhoto = document.querySelector('#solutions img[alt="Musicians"]');
  if (musicianPhoto) {
      musicianPhoto.src = "https://picsum.photos/id/453/400/300";
  }

  // Prevent the form submission and validate inputs
  const inquiryForm = document.querySelector('#contact form');
  if (inquiryForm) {
      inquiryForm.addEventListener('submit', function(event) {
          event.preventDefault(); // Prevent form submission to contact.html

          const nameField = document.querySelector('#name').value.trim();
          const emailField = document.querySelector('#email').value.trim();

          if (nameField && emailField) {
              alert(`Thank you, ${nameField}! We will be in touch with you shortly at ${emailField}.`);
          } else {
              alert("Please provide a name and email.");
          }
      });
  }
})();
