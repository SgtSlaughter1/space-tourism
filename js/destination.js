// Async function to fetch destinations data
async function fetchDestinations() {
  try {
    const response = await fetch('/data.json');
    const data = await response.json();
    const destinations = data.destinations;

    // Create location buttons once
    createLocationButtons(destinations);


    // Initially display content for the first destination (e.g., Moon)
    updateDestinationContent(destinations[0]);

  } catch (error) {
    console.error('Error fetching destinations:', error);
  }
}

// Function to create location buttons and set click event listeners
function createLocationButtons(destinations) {
  const locationContainer = document.createElement('div');
  locationContainer.classList.add('d-flex', 'location');

  // Create a button for each destination
  destinations.forEach((destination, index) => {
    const locationElement = document.createElement('p');
    locationElement.innerText = destination.name.toUpperCase();

    // Add click event to each location button
    locationElement.addEventListener('click', () => {
      updateDestinationContent(destinations[index]);

      // Add 'active' class to clicked location for styling
      document.querySelectorAll('.location p').forEach((loc) => loc.classList.remove('active'));
      locationElement.classList.add('active');
    });

    locationElement.setAttribute('data-index', index); // Add a data-index attribute for tracking
    locationContainer.appendChild(locationElement);
  });

  // Add the location buttons to the DOM
  document.getElementById('location-buttons-container').appendChild(locationContainer);

  // Set the initial active state for the first button
  document.querySelector('.location p[data-index="0"]').classList.add('active');
}

// Function to update the displayed content based on the selected destination
function updateDestinationContent(destination) {
  const destinationsDiv = document.getElementById('destinations-content');
  
  // Get all the elements we want to slide out (image and content)
  const existingImage = destinationsDiv.querySelector('.dest-image');
  const existingContent = destinationsDiv.querySelector('.dest-content');

  // Add slide-out animations with timing
  if (existingImage || existingContent) {
    if (existingContent) {
      existingContent.classList.add("animate__animated", "animate__slideOutRight");
    }

    if (existingImage) {
      existingImage.classList.add("animate__animated", "animate__slideOutLeft");
    }

    // Wait for the slide-out animations to complete before changing the content
    setTimeout(() => {
      // Update the content after slide-out
      destinationsDiv.innerHTML = `
        <div class="dest d-flex">
          <div class="dest-image animate__animated animate__slideInDown">
            <img src="${destination.images.png}" alt="Image of ${destination.name}">
          </div>
          <div class="dest-content animate__animated animate__slideInRight">
            <div class="name">
              <h2>${destination.name}</h2>
              <p>${destination.description}</p>
              <hr>
            </div>
            <div class="d-flex dist">
              <p class="distance">Avg. Distance: <span>${destination.distance}</span></p>
              <p class="time">Travel Time: <span>${destination.travel}</span></p>
            </div>
          </div>
        </div>
      `;
    }, 600); // Delay to allow slide-out before changing content
  } else {
    // If there's no existing content, just display the new one
    destinationsDiv.innerHTML = `
      <div class="dest d-flex">
        <div class="dest-image animate__animated animate__slideInLeft">
          <img src="${destination.images.png}" alt="Image of ${destination.name}">
        </div>
        <div class="dest-content animate__animated animate__slideInRight">
          <div class="name">
            <h2>${destination.name}</h2>
            <p>${destination.description}</p>
            <hr>
          </div>
          <div class="d-flex dist">
            <p class="distance">Avg. Distance: <span>${destination.distance}</span></p>
            <p class="time">Travel Time: <span>${destination.travel}</span></p>
          </div>
        </div>
      </div>
    `;
  }
}

// Call the fetch function to initialize everything
fetchDestinations();
