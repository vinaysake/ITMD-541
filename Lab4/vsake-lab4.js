(function() {
  // Change hero section headline
  const heroHeadline = document.querySelector('.hero h1'); // Adjust selector as necessary
  if (heroHeadline) {
      heroHeadline.textContent = "Supercharge Your Brand with Stellar Marketing";
  }

  // Change the hero section subtitle
  const heroSubtitle = document.querySelector('.hero p'); // Adjust selector as necessary
  if (heroSubtitle) {
      heroSubtitle.innerHTML = "<strong><em>Leverage innovative strategies from Stellar Marketing to make your business shine and succeed.</em></strong>";
  }

  // Change background image of the hero
  const heroSection = document.querySelector('.hero'); // Adjust selector as necessary
  if (heroSection) {
      heroSection.style.backgroundImage = "url('https://picsum.photos/id/683/1280/720')";
  }

  // Change navbar background color to footer color
  const navbar = document.querySelector('nav'); // Adjust selector as necessary
  const footer = document.querySelector('footer'); // Adjust selector as necessary
  if (navbar && footer) {
      navbar.style.backgroundColor = getComputedStyle(footer).backgroundColor;
  }

  // Remove "Get Started" CTA
  const getStartedCTA = document.querySelector('.hero .cta'); // Adjust selector as necessary
  if (getStartedCTA) {
      getStartedCTA.remove();
  }

  // Add new full-width section below the hero
  const newSection = document.createElement('div');
  newSection.style.backgroundColor = '#6495ed';
  newSection.style.color = 'blue';
  newSection.style.textAlign = 'center';
  newSection.style.padding = '32px 0';
  newSection.innerHTML = "<button id='newCTA' style='background: white; color: blue; border: 4px solid blue; padding: 10px 20px; box-shadow: 2px 2px 5px rgba(0,0,0,0.2);'>New Call to Action</button>";
  document.body.insertBefore(newSection, heroSection.nextSibling);
  
  // Add click event for the new CTA button
  document.getElementById('newCTA').onclick = function() {
      alert("Thank You for your interest in Stellar Marketing!");
  };

  // Change services section icon color
  const serviceIcons = document.querySelectorAll('.services .icon'); // Adjust selector as necessary
  serviceIcons.forEach(icon => {
      icon.style.color = '#6495ed';
  });

  // Change digital marketing icon
  const digitalMarketingIcon = document.querySelector('.services .icon.digitamarketing'); // Adjust selector as necessary
  if (digitalMarketingIcon) {
      digitalMarketingIcon.innerHTML = '<span class="material-symbols-outlined" style="color:#6495ed;">ads_click</span>';
  }

  // Layout adjustment for specialized marketing solutions
  const specializedSection = document.querySelector('.specialized-marketing-solutions'); // Adjust selector as necessary
  if (specializedSection) {
      const tiles = specializedSection.querySelectorAll('.tile'); // Adjust selector as necessary
      if (window.innerWidth >= 1024) {
          specializedSection.style.display = "grid";
          specializedSection.style.gridTemplateColumns = "repeat(4, 1fr)";
      }
  }

  // Change Musicians image
  const musiciansImage = document.querySelector('.specialized-marketing-solutions .musicians img'); // Adjust selector as necessary
  if (musiciansImage) {
      musiciansImage.src = "https://picsum.photos/id/453/400/300";
  }

  // Handle form submission (graduate requirement)
  const form = document.querySelector('form'); // Adjust selector as necessary
  if (form) {
      form.addEventListener('submit', function(event) {
          event.preventDefault(); // Prevent form from submitting to broken URL
          
          const name = form.querySelector('input[name="name"]').value; // Adjust selector as necessary
          const email = form.querySelector('input[name="email"]').value; // Adjust selector as necessary
          
          if (name && email) {
              alert(`Thank you, ${name}! We will be in touch with you shortly at ${email}.`);
          } else {
              alert("Please provide a name and email.");
          }
      });
  }
})();