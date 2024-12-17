// Async function to fetch crew data
async function fetchCrew() {
  try {
    const response = await fetch("/data.json");
    const data = await response.json();
    const crew = data.crew;

    // Function to display a crew member based on index with fade transitions
    function displayCrewMember(index) {
      const member = crew[index];
      const crewDiv = document.getElementById("crew-content");

      // Get all the elements we want to fade out (role, name, bio, image)
      const existingRole = document.querySelector(".role");
      const existingName = document.querySelector(".name");
      const existingBio = document.querySelector(".bio");
      const existingImage = document.querySelector(".crew-image");

      // Add fade-out animations with timing
      if (existingRole && existingName && existingBio && existingImage) {
        existingRole.classList.add("animate__animated", "animate__fadeOutLeft");
        setTimeout(() => {
          existingName.classList.add("animate__animated", "animate__fadeOutLeft");
        }, 200);

        setTimeout(() => {
          existingBio.classList.add("animate__animated", "animate__fadeOutLeft");
        }, 400);

        setTimeout(() => {
          existingImage.classList.add("animate__animated", "animate__fadeOutRight");
        }, 600);
      }

      // Wait for the fade-out animations to complete before changing the content
      setTimeout(() => {
        // Update content after fade-out
        crewDiv.innerHTML = `
          <div class="d-flex crew-content">
            <div class="crew-detail">
              <h3 class="role animate__animated" style="opacity: 0;">${member.role}</h3>
              <h2 class="name animate__animated" style="opacity: 0;">${member.name}</h2>
              <p class="bio animate__animated" style="opacity: 0;">${member.bio}</p>
              <div class="crew-buttons show">
                <button class="circle-btn" data-index="0"></button>
                <button class="circle-btn" data-index="1"></button>
                <button class="circle-btn" data-index="2"></button>
                <button class="circle-btn" data-index="3"></button>
              </div>
            </div>
            <div class="crew-image animate__animated" style="opacity: 0;">
              <img src="${member.images.png}" alt="${member.name}">
            </div>
          </div>
        `;

        // Set the active state for the currently selected button
        document.querySelectorAll(".circle-btn").forEach((button) => {
          button.classList.remove("active");
        });
        document.querySelector(`.circle-btn[data-index="${index}"]`).classList.add("active");

        // Timing the individual elements to fade in sequentially
        setTimeout(() => {
          document.querySelector(".role").classList.add("animate__fadeInLeft");
          document.querySelector(".role").style.opacity = 1;
        }, 200); // Delay for role

        setTimeout(() => {
          document.querySelector(".name").classList.add("animate__fadeInLeft");
          document.querySelector(".name").style.opacity = 1;
        }, 400); // Delay for name

        setTimeout(() => {
          document.querySelector(".bio").classList.add("animate__fadeInLeft");
          document.querySelector(".bio").style.opacity = 1;
        }, 600); // Delay for bio

        setTimeout(() => {
          document.querySelector(".crew-image").classList.add("animate__fadeInRight");
          document.querySelector(".crew-image").style.opacity = 1;
        }, 800); // Delay for image
      }, 1000); // Delay to allow fade-out before changing content
    }

    // Event delegation to handle button clicks
    document.getElementById("crew-content").addEventListener("click", (e) => {
      if (e.target.classList.contains("circle-btn")) {
        const crewIndex = parseInt(e.target.getAttribute("data-index"));
        displayCrewMember(crewIndex); // Update display based on the button clicked
      }
    });

    // Initial display of the first crew member
    displayCrewMember(0); // Display the first crew member by default

  } catch (error) {
    console.error("Error fetching crew:", error);
  }
}

// Call the fetchCrew function
fetchCrew();
