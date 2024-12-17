// Async function to fetch technology data
async function fetchTechnology() {
  try {
    const response = await fetch("/data.json");
    const data = await response.json();
    const technology = data.technology;

    // Function to display a technology item based on index with zoom transitions
    function displayTechnology(index) {
      const techItem = technology[index]; 
      const technologyDiv = document.getElementById("technology-content");

      // Get all the elements we want to zoom out (terminologies, name, description, image)
      const existingTerminology = document.querySelector(".terminology");
      const existingName = document.querySelector(".tech-name");
      const existingDescription = document.querySelector(".tech-description");
      const existingImage = document.querySelector(".tech-image");

      // Add zoom-out animations with timing
      if (existingTerminology && existingName && existingDescription && existingImage) {
        existingTerminology.classList.add("animate__animated", "animate__zoomOut");
        setTimeout(() => {
          existingName.classList.add("animate__animated", "animate__zoomOut");
        }, 200);
        setTimeout(() => {
          existingDescription.classList.add("animate__animated", "animate__zoomOut");
        }, 400);
        setTimeout(() => {
          existingImage.classList.add("animate__animated", "animate__zoomOut");
        }, 600);
      }

      // Wait for the zoom-out animations to complete before changing the content
      setTimeout(() => {
        // Update content after zoom-out
        technologyDiv.innerHTML = `
          <div class="d-flex tech">
            <div class="tech-buttons">
              <button class="circle-btn" data-index="0">1</button>
              <button class="circle-btn" data-index="1">2</button>
              <button class="circle-btn" data-index="2">3</button>
            </div>
            <div class="tech-desc">
              <h3 class="terminology animate__animated" style="opacity: 0;">The Terminologies</h3>
              <h2 class="tech-name animate__animated" style="opacity: 0;">${techItem.name}</h2>
              <p class="tech-description animate__animated" style="opacity: 0;">${techItem.description}</p>
            </div>
            <div class="tech-image animate__animated" style="opacity: 0;">
              <img src="${techItem.images.portrait}" alt="${techItem.name}">
            </div>
          </div>
        `;

        // Set the active state for the currently selected button
        document.querySelectorAll(".circle-btn").forEach((button) => {
          button.classList.remove("active");
        });
        document.querySelector(`.circle-btn[data-index="${index}"]`).classList.add("active");

        // Timing the individual elements to zoom in sequentially
        setTimeout(() => {
          document.querySelector(".terminology").classList.add("animate__zoomIn");
          document.querySelector(".terminology").style.opacity = 1;
        }, 200); // Delay for terminology

        setTimeout(() => {
          document.querySelector(".tech-name").classList.add("animate__zoomIn");
          document.querySelector(".tech-name").style.opacity = 1;
        }, 400); // Delay for name

        setTimeout(() => {
          document.querySelector(".tech-description").classList.add("animate__zoomIn");
          document.querySelector(".tech-description").style.opacity = 1;
        }, 600); // Delay for description

        setTimeout(() => {
          document.querySelector(".tech-image").classList.add("animate__zoomIn");
          document.querySelector(".tech-image").style.opacity = 1;
        }, 800); // Delay for image
      }, 1000); // Delay to allow zoom-out before changing content
    }

    // Event delegation to handle button clicks
    document.getElementById("technology-content").addEventListener("click", (e) => {
      if (e.target.classList.contains("circle-btn")) {
        const technologyIndex = parseInt(e.target.getAttribute("data-index"));
        displayTechnology(technologyIndex); // Update display based on the button clicked
      }
    });

    // Initial display of the first technology item
    displayTechnology(0); // Display the first item by default

  } catch (error) {
    console.error("Error fetching technology:", error);
  }
}

// Call the fetchTechnology function
fetchTechnology();
