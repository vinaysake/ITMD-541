(function () {
    // Change hero section headline text
    const heroHeadline = document.querySelector(".hero h1");
    if (heroHeadline) {
      heroHeadline.textContent = "Supercharge Your Brand with Stellar Marketing";
    }
  
    // Change subheadline text below the hero headline
    const heroSubheadline = document.querySelector(".hero p");
    if (heroSubheadline) {
      heroSubheadline.innerHTML = `<strong><em>Leverage innovative strategies from Stellar Marketing to make your business shine and succeed.</em></strong>`;
    }
  
    // Change hero background image
    const heroSection = document.querySelector(".hero");
    if (heroSection) {
      heroSection.style.backgroundImage = "url('https://picsum.photos/id/683/1280/720')";
    }
  
    // Change nav bar background color to match footer
    const navbar = document.querySelector("nav");
    const footer = document.querySelector("footer");
    if (navbar && footer) {
      const footerBackgroundColor = getComputedStyle(footer).backgroundColor;
      navbar.style.backgroundColor = footerBackgroundColor;
    }
  
    // Remove the "Get Started" CTA button from hero
    const getStartedButton = document.querySelector(".hero button");
    if (getStartedButton) {
      getStartedButton.remove();
    }
  
    // Create and insert new full-width section below the hero
    const newSection = document.createElement("section");
    newSection.style.width = "100%";
    newSection.style.backgroundColor = "#6495ed";
    newSection.style.padding = "32px 0";
    newSection.style.textAlign = "center";
  
    const newButton = document.createElement("button");
    newButton.textContent = "Explore Stellar Marketing";
    newButton.style.padding = "12px 24px";
    newButton.style.backgroundColor = "white";
    newButton.style.color = "#6495ed";
    newButton.style.border = "4px solid #6495ed";
    newButton.style.fontSize = "16px";
    newButton.style.cursor = "pointer";
    newButton.style.boxShadow = "0px 2px 5px rgba(0, 0, 0, 0.1)";
    newButton.onclick = function () {
      alert("Thank You for your interest in Stellar Marketing!");
    };
  
    newSection.appendChild(newButton);
    heroSection.insertAdjacentElement("afterend", newSection);
  
    // Change color of icons in the services section
    const serviceIcons = document.querySelectorAll(".services .material-icons-outlined");
    serviceIcons.forEach((icon) => {
      icon.style.color = "#6495ed";
    });
  
    // Change the digital marketing icon to 'Ads Click'
    const digitalMarketingIcon = document.querySelector(".services .digital-marketing .material-icons-outlined");
    if (digitalMarketingIcon) {
      digitalMarketingIcon.textContent = "ads_click";
    }
  
    // Change layout of tiles in the specialized marketing solutions section
    const marketingSolutions = document.querySelector(".specialized-marketing-solutions .tiles");
    if (marketingSolutions) {
      marketingSolutions.style.display = "grid";
      marketingSolutions.style.gridTemplateColumns = "repeat(auto-fit, minmax(250px, 1fr))";
      marketingSolutions.style.gap = "20px";
    }
  
    // Change image for Musicians in specialized marketing solutions section
    const musiciansImage = document.querySelector(".specialized-marketing-solutions .musicians img");
    if (musiciansImage) {
      musiciansImage.src = "https://picsum.photos/id/453/400/300";
    }
  
    // Form adjustments (for ITMD 541 students)
    const form = document.querySelector("form");
    if (form) {
      const inputs = form.querySelectorAll("input, textarea");
      inputs.forEach((input) => {
        input.style.border = "2px solid #6495ed";
        input.style.borderRadius = "5px";
      });
    }
  })();
  