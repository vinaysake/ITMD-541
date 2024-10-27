(function() {
    // 1. Update Hero Section
    document.querySelector('h1.hero-headline').innerText = "Supercharge Your Brand with Stellar Marketing";
    document.querySelector('p.hero-subheadline').innerHTML = "<b><i>Leverage innovative strategies from Stellar Marketing to make your business shine and succeed.</i></b>";
    document.querySelector('.hero-background').style.backgroundImage = "url('https://picsum.photos/id/683/1280/720')";
    
    // Remove the Get Started CTA from the hero section
    const getStartedCta = document.querySelector('.hero-cta');
    if (getStartedCta) {
      getStartedCta.remove();
    }
  
    // 2. Add Full-width Section below the Hero
    const newSection = document.createElement('section');
    newSection.style.cssText = "width: 100%; background-color: #6495ed; padding: 32px 0; text-align: center;";
  
    const newCtaButton = document.createElement('button');
    newCtaButton.innerText = "Get Started";
    newCtaButton.style.cssText = `
      padding: 10px 20px; 
      background-color: white; 
      color: #6495ed; 
      border: 4px solid #6495ed; 
      box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
      font-size: 16px;
      cursor: pointer;
    `;
    newCtaButton.onclick = function() {
      alert("Thank You for your interest in Stellar Marketing!");
    };
  
    newSection.appendChild(newCtaButton);
    document.querySelector('.hero').insertAdjacentElement('afterend', newSection);
  
    // 3. Style Modifications
    // Change the nav bar background color to match the footer
    const footerColor = getComputedStyle(document.querySelector('footer')).backgroundColor;
    document.querySelector('nav').style.backgroundColor = footerColor;
  
    // Change services section icon color
    document.querySelectorAll('.services-icon').forEach(icon => {
      icon.style.color = "#6495ed";
    });
  
    // Change the digital marketing icon to 'Ads Click'
    const digitalMarketingIcon = document.querySelector('.digital-marketing-icon');
    if (digitalMarketingIcon) {
      digitalMarketingIcon.innerText = "ads_click";
    }
  
    // Adjust specialized marketing solutions section layout for wider screens
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    function updateSolutionLayout(e) {
      if (e.matches) {
        document.querySelector('.specialized-solutions').style.gridTemplateColumns = "repeat(4, 1fr)";
      } else {
        document.querySelector('.specialized-solutions').style.gridTemplateColumns = "repeat(2, 1fr)";
      }
    }
    mediaQuery.addListener(updateSolutionLayout);
    updateSolutionLayout(mediaQuery);
  
    // Change Musicians image
    document.querySelector('.musicians-image').src = "https://picsum.photos/id/453/400/300";
  
    // 4. Graduate Requirements: Form Validation
    const form = document.querySelector('form');
    form.onsubmit = function(event) {
      event.preventDefault(); // Prevent default form submission
      const name = form.querySelector('input[name="name"]').value;
      const email = form.querySelector('input[name="email"]').value;
  
      if (name && email) {
        alert(`Thank you, ${name}! We will be in touch with you shortly at ${email}.`);
      } else {
        alert("Please provide a name and email.");
      }
    };
  })();
  