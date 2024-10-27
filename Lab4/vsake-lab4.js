// userId-lab4.js
(function() {
  // Change the main headline
  const mainHeadline = document.querySelector('.hero h1');
  if (mainHeadline) {
      mainHeadline.textContent = "Supercharge Your Brand with Stellar Marketing";
  }

  // Change the line of text below the hero headline
  const subHeadline = document.querySelector('.hero p');
  if (subHeadline) {
      subHeadline.innerHTML = "<strong><em>Leverage innovative strategies from Stellar Marketing to make your business shine and succeed.</em></strong>";
  }

  // Change the background image of the hero
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
      heroSection.style.backgroundImage = "url('https://picsum.photos/id/683/1280/720')";
  }

  // Change the background color of the nav bar
  const navBar = document.querySelector('nav');
  const footer = document.querySelector('footer');
  if (navBar && footer) {
      const footerColor = window.getComputedStyle(footer).backgroundColor;
      navBar.style.backgroundColor = footerColor;
  }

  // Remove the 'Get Started' CTA from the hero
  const ctaButton = document.querySelector('.hero .cta-button');
  if (ctaButton) {
      ctaButton.remove();
  }

  // Add a new full-width section below the hero
  const newSection = document.createElement('section');
  newSection.style.backgroundColor = '#6495ed';
  newSection.style.padding = '32px 0';
  newSection.innerHTML = `
      <div style="text-align: center;">
          <button id="new-cta" style="background-color: white; color: #6495ed; border: 4px solid #6495ed; padding: 16px; font-size: 16px; cursor: pointer; box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);">
              New CTA Button
          </button>
      </div>`;
  document.body.appendChild(newSection);

  // Add event listener for the new button
  const newCtaButton = document.getElementById('new-cta');
  if (newCtaButton) {
      newCtaButton.addEventListener('click', function() {
          alert("Thank You for your interest in Stellar Marketing!");
      });
  }

  // Change the services section icon colors
  const serviceIcons = document.querySelectorAll('.service-icon');
  serviceIcons.forEach(icon => {
      icon.style.color = '#6495ed';
  });

  // Change the digital marketing icon
  const digitalMarketingIcon = document.querySelector('.service-icon[data-icon="digital-marketing"]');
  if (digitalMarketingIcon) {
      digitalMarketingIcon.innerHTML = '<span class="material-symbols-outlined">ads_click</span>';
  }

  // Change layout for specialized marketing solutions section
  const solutionsSection = document.querySelector('.specialized-marketing-solutions');
  if (solutionsSection) {
      const tiles = solutionsSection.querySelectorAll('.solution-tile');
      tiles.forEach(tile => {
          tile.style.flexBasis = 'calc(25% - 20px)'; // Adjust tile width for 4 across
      });
  }

  // Change the Musicians image
  const musiciansImage = document.querySelector('.specialized-marketing-solutions img[data-id="musicians"]');
  if (musiciansImage) {
      musiciansImage.src = "https://picsum.photos/id/453/400/300";
  }

  // Form submission behavior (for graduate requirement)
  const form = document.querySelector('form');
  if (form) {
      form.addEventListener('submit', function(event) {
          event.preventDefault(); // Prevent form submission to broken URL
          const nameInput = form.querySelector('input[name="name"]');
          const emailInput = form.querySelector('input[name="email"]');
          const name = nameInput.value.trim();
          const email = emailInput.value.trim();

          if (name && email) {
              alert(`Thank you, ${name}! We will be in touch with you shortly at ${email}.`);
          } else {
              alert("Please provide a name and email.");
          }
      });
  }

  console.log("Changes applied successfully!");
})();
