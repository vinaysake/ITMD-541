(function() {
  // Update hero content
  const heroH1 = document.querySelector('.hero h1');
  const heroP = document.querySelector('.hero-text');
  if (heroH1) heroH1.textContent = "Supercharge Your Brand with Stellar Marketing";
  if (heroP) heroP.innerHTML = "Leverage <i>innovative</i> strategies from <b>Stellar Marketing</b> to make your business shine and succeed.";

  // Remove original CTA and add new section
  const originalCTA = document.querySelector('.hero .cta-button');
  if (originalCTA) originalCTA.remove();

  // Create new CTA section
  const newCTASection = document.createElement('section');
  newCTASection.className = 'cta-section';
  const newCTAButton = document.createElement('button');
  newCTAButton.className = 'cta-button';
  newCTAButton.textContent = 'Get Started';
  newCTAButton.onclick = () => alert('Thank You for your interest in Stellar Marketing!');
  newCTASection.appendChild(newCTAButton);
  
  // Insert new CTA section after hero
  const hero = document.querySelector('.hero');
  if (hero) hero.after(newCTASection);

  // Update digital marketing icon
  const digitalMarketingIcon = document.querySelector('.services-grid .service-icon:first-child');
  if (digitalMarketingIcon) digitalMarketingIcon.textContent = 'ads_click';

  // Handle form submission
  const form = document.querySelector('.contact-form');
  if (form) {
      form.onsubmit = function(e) {
          e.preventDefault();
          const name = this.querySelector('input[type="text"]').value;
          const email = this.querySelector('input[type="email"]').value;
          
          if (name && email) {
              alert(`Thank you, ${name}! We will be in touch with you shortly at ${email}.`);
          } else {
              alert('Please provide a name and email.');
          }
      };
  }
})();