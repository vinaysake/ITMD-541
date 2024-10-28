(function() {
    // Step 1: Change the main headline text in the hero section
    document.querySelector("#hero h1").textContent = "Supercharge Your Brand with Stellar Marketing";

    // Step 2: Change the sub-headline text below the main headline
    document.querySelector("#hero p").innerHTML = "<b><i>Leverage innovative strategies from Stellar Marketing to make your business shine and succeed.</i></b>";

    // Step 3: Change the background image of the hero section
    document.querySelector("#hero").style.backgroundImage = "url('https://picsum.photos/id/683/1280/720')";

    // Step 4: Change the background color of the navbar to match the footer
    const footerColor = window.getComputedStyle(document.querySelector("#footer")).backgroundColor;
    document.querySelector("#navbar").style.backgroundColor = footerColor;

    // Step 5: Remove the "Get Started" CTA button
    const ctaButton = document.querySelector("#hero .cta-button");
    if (ctaButton) ctaButton.remove();

    // Step 6: Add a new section below the hero with a CTA button
    const newSection = document.createElement("section");
    newSection.className = "new-section";
    newSection.style.width = "100%";
    newSection.innerHTML = `
        <button class="cta-button" style="background-color: white; color: #6495ed; border: 4px solid #6495ed; padding: 10px 20px; box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);">
            Learn More
        </button>
    `;
    newSection.querySelector(".cta-button").onclick = () => alert("Thank You for your interest in Stellar Marketing!");
    document.querySelector("#hero").insertAdjacentElement("afterend", newSection);

    // Step 7: Change icons color in the services section
    document.querySelectorAll("#services .material-icons-outlined").forEach(icon => {
        icon.style.color = "#6495ed";
    });

    // Step 8: Change the digital marketing icon to 'Ads Click'
    const digitalMarketingIcon = document.querySelector("#services .material-icons-outlined");
    if (digitalMarketingIcon) digitalMarketingIcon.textContent = "ads_click";

    // Step 9: Modify layout for the specialized marketing solutions section for screens >=1024px
    const solutionsSection = document.querySelector("#solutions");
    if (solutionsSection) {
        solutionsSection.style.display = "grid";
        solutionsSection.style.gridTemplateColumns = "repeat(4, 1fr)";
    }

    // Step 10: Change the Musicians image in the specialized marketing solutions section
    const musiciansImage = document.querySelector("#solutions img");
    if (musiciansImage) musiciansImage.src = "https://picsum.photos/id/453/400/300";

    // Step 11: Prevent form submission to a broken URL and add validation for name and email fields
    document.querySelector("#contact-form").onsubmit = function(event) {
        event.preventDefault(); // Prevent actual form submission
        const name = document.querySelector("#name").value;
        const email = document.querySelector("#email").value;

        if (name && email) {
            alert(`Thank you, ${name}! We will be in touch with you shortly at ${email}.`);
        } else {
            alert("Please provide a name and email.");
        }
    };
})();
