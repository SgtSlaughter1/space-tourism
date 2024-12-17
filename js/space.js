// async function loadContent(pageId) {
//     try {
//       const response = await fetch("/data.json");
  
//       // Check if the response is OK
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
  
//       const data = await response.json();
  
//       // Log the fetched data
//       console.log("Fetched Data:", data);
  
//       // Check if pageId is correctly passed and corresponding section is selected
//       console.log("Current Page ID:", pageId);
  
//       // Hide all sections and show the current one
//       document.querySelectorAll(".content-section").forEach((section) => {
//         section.classList.remove("active");
//       });
  
//       const contentDiv = document.getElementById(`${pageId}-content`);
  
//       // Check if the contentDiv exists
//       console.log("Content Div:", contentDiv);
  
//       if (!contentDiv) {
//         console.error(`Element with ID ${pageId}-content not found`);
//         return;
//       }
  
//       document.getElementById(pageId).classList.add("active");
  
//       // Update content based on the page
//       switch (pageId) {
//         case "destination":
//           contentDiv.innerHTML = data.destinations
//             .map(
//               (dest) => `
//                         <div class="col-md-6 mb-4">
//                             <h2>${dest.name}</h2>
//                             <p>${dest.description}</p>
//                             <p>Distance: ${dest.distance}</p>
//                             <p>Travel Time: ${dest.travel}</p>
//                             <img src="${dest.images.png}" alt="${dest.name}">
//                         </div>
//                     `
//             )
//             .join("");
//           break;
//         case "crew":
//           contentDiv.innerHTML = data.crew
//             .map(
//               (crews) => `
//                         <div class="col-md-6 mb-4 d-flex cew">
//                             <div>
//                             <h2>${crews.name}</h2>
//                             <h3>${crews.role}</h3>
//                             <p>${crews.bio}</p>
//                             </div>
//                             <div>
//                             <img src="${crews.images.png}" alt="${crews.name}">
//                             </div>
//                         </div>
//                     `
//             )
//             .join("");
//           break;
//         case "technology":
//           contentDiv.innerHTML = data.technology
//             .map(
//               (tech) => `
//                         <div class="col-md-6 mb-4">
//                             <h2>${tech.name}</h2>
//                             <p>${tech.description}</p>
//                         </div>
//                         <div>
//                             <img src="${tech.images.png}" alt="${tech.name}">
//                         </div>
//                     `
//             )
//             .join("");
//           break;
//         default:
//           console.error("Unknown pageId:", pageId);
//       }
//     } catch (error) {
//       console.error("Error loading content:", error);
//       document.getElementById(pageId).innerHTML =
//         "<h1>Error loading content</h1>";
//     }
//   }
  