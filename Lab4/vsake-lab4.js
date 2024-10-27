(function() {
  // Change hero headline
  const heroHeadline = document.querySelector('.hero h1');
  if (heroHeadline) {
      heroHeadline.textContent = "Supercharge Your Brand with Stellar Marketing";
  }

  // Change hero subtext with bold and italic
  const heroSubtext = document.querySelector('.hero p');
  if (heroSubtext) {
      heroSubtext.innerHTML = "Leverage <i>innovative</i> strategies from <b>Stellar Marketing</b> to make your business shine and succeed.";
  }

  // Change hero background image
  const hero = document.querySelector('.hero');
  if (hero) {
      hero.style.backgroundImage = 'url("https://picsum.photos/id/683/1280/720")';
  }

  // Change navbar background color to match footer
  const footer = document.querySelector('footer');
  const nav = document.querySelector('nav');
  if (footer && nav) {
      const footerBgColor = window.getComputedStyle(footer).backgroundColor;
      nav.style.backgroundColor = footerBgColor;
  }

  // Remove get started CTA from hero
  const getStartedCta = document.querySelector('.hero .cta');
  if (getStartedCta) {
      getStartedCta.remove();
  }

  // Add new full-width section below hero
  const newSection = document.createElement('section');
  newSection.style.backgroundColor = '#6495ed';
  newSection.style.padding = '32px 0';
  newSection.style.textAlign = 'center';
  newSection.style.width = '100%';

  const newButton = document.createElement('button');
  newButton.textContent = 'Get Started';
  newButton.style.backgroundColor = 'white';
  newButton.style.color = '#6495ed';
  newButton.style.border = '4px solid #6495ed';
  newButton.style.padding = '16px 32px';
  newButton.style.fontSize = '1.25rem';
  newButton.style.cursor = 'pointer';
  newButton.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
  
  newButton.addEventListener('click', () => {
      alert('Thank You for your interest in Stellar Marketing!');
  });

  newSection.appendChild(newButton);
  hero.after(newSection);

  // Change service icons color
  const serviceIcons = document.querySelectorAll('.services .material-symbols-outlined');
  serviceIcons.forEach(icon => {
      icon.style.color = '#6495ed';
  });

  // Change digital marketing icon
  const digitalMarketingIcon = document.querySelector('.services li:first-child .material-symbols-outlined');
  if (digitalMarketingIcon) {
      digitalMarketingIcon.textContent = 'ads_click';
  }

  // Add styles for 4-across layout at >=1024px
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
      @media (min-width: 1024px) {
          .specialized-solutions .grid {
              grid-template-columns: repeat(4, 1fr) !important;
          }
      }
  `;
  document.head.appendChild(styleSheet);

  // Change Musicians image
  const musiciansImg = document.querySelector('.specialized-solutions img[alt*="Musicians"]');
  if (musiciansImg) {
      musiciansImg.src = 'https://picsum.photos/id/453/400/300';
  }

  // Graduate requirement: Handle form submission
  const contactForm = document.querySelector('form');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          const nameInput = this.querySelector('input[type="text"]');
          const emailInput = this.querySelector('input[type="email"]');
          
          if (nameInput?.value && emailInput?.value) {
              alert(`Thank you, ${nameInput.value}! We will be in touch with you shortly at ${emailInput.value}.`);
          } else {
              alert('Please provide a name and email.');
          }
      });
  }
})();