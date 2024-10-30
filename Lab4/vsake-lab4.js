// userId-lab4.js
(function () {
    // Change the hero headline text
    const heroHeadline = document.querySelector(".hero h1");
    if (heroHeadline) {
      heroHeadline.textContent = "Supercharge Your Brand with Stellar Marketing";
    }
  
    // Change the hero subheadline text
    const heroSubHeadline = document.querySelector(".hero p");
    if (heroSubHeadline) {
      heroSubHeadline.innerHTML =
        "<strong>Leverage innovative strategies from Stellar Marketing</strong> to make your business <em>shine and succeed.</em>";
    }
  
    // Change hero background image
    const heroSection = document.querySelector(".hero");
    if (heroSection) {
      heroSection.style.backgroundImage = "url('https://picsum.photos/id/683/1280/720')";
    }
  
    // Change the nav bar background color to match the footer
    const navBar = document.querySelector("nav");
    const footer = document.querySelector("footer");
    if (navBar && footer) {
      const footerColor = getComputedStyle(footer).backgroundColor;
      navBar.style.backgroundColor = footerColor;
    }
  
    // Remove the 'Get Started' CTA button from hero
    const getStartedBtn = document.querySelector(".hero .cta-button");
    if (getStartedBtn) {
      getStartedBtn.remove();
    }
  
    // Create and insert the new full-width section below hero
    const newSection = document.createElement("section");
    newSection.style.width = "100%";
    newSection.style.backgroundColor = "#6495ed";
    newSection.style.padding = "32px 0";
    newSection.style.display = "flex";
    newSection.style.justifyContent = "center";
  
    const newButton = document.createElement("button");
    newButton.textContent = "Explore Stellar Marketing";
    newButton.style.padding = "12px 24px";
    newButton.style.backgroundColor = "white";
    newButton.style.color = "#6495ed";
    newButton.style.border = "4px solid #6495ed";
    newButton.style.fontSize = "16px";
    newButton.style.cursor = "pointer";
    newButton.style.boxShadow = "0px 2px 5px rgba(0,0,0,0.1)";
    newButton.onclick = function () {
      alert("Thank You for your interest in Stellar Marketing!");
    };
  
    newSection.appendChild(newButton);
    heroSection.insertAdjacentElement("afterend", newSection);
  
    // Change icons color in the services section
    const serviceIcons = document.querySelectorAll(".services .material-symbols-outlined");
    serviceIcons.forEach((icon) => {
      icon.style.color = "#6495ed";
    });
  
    // Change digital marketing icon to 'Ads Click'
    const digitalMarketingIcon = document.querySelector(".services .digital-marketing .material-symbols-outlined");
    if (digitalMarketingIcon) {
      digitalMarketingIcon.textContent = "ads_click";
    }
  
    // Adjust tiles layout to 4 across in specialized marketing solutions section at >= 1024px
    const solutionsSection = document.querySelector(".specialized-marketing-solutions");
    if (solutionsSection) {
      const style = document.createElement("style");
      style.textContent = `
        @media (min-width: 1024px) {
          .specialized-marketing-solutions .tile {
            width: 25%;
          }
        }
      `;
      document.head.appendChild(style);
    }
  
    // Change Musicians image
    const musiciansImage = document.querySelector(".specialized-marketing-solutions .musicians img");
    if (musiciansImage) {
      musiciansImage.src = "https://picsum.photos/id/453/400/300";
    }
  
    // Form adjustments (if applicable for ITMD 541 students)
    const form = document.querySelector("form");
    if (form) {
      // Example form adjustments: add placeholders, style inputs, etc.
      const inputs = form.querySelectorAll("input, textarea");
      inputs.forEach((input) => {
        input.style.border = "2px solid #6495ed";
        input.style.borderRadius = "5px";
      });
    }
  
    console.log("Lab 4 IIFE executed successfully");
  })();
  