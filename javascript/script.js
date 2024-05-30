import carouselModule from "./javascript/carousel.js";
document.addEventListener("DOMContentLoaded", () => {
  const nextButton = document.querySelector("#nextButton");
  const prevButton = document.querySelector("#prevButton");
  const slides = document.querySelectorAll(".mySlides");
  const dots = document.querySelectorAll(".dot");
  const postContainer = document.querySelector("#post-list");
  let allPosts = []; // To store all posts fetched from the API
  let currentIndex = 0;

  carouselModule.populateCarousel();

  async function displayUserPosts() {
    await fetchAndStoreUserPosts(); // Fetch and store posts if not stored locally
  }

  async function fetchAndStoreUserPosts() {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const apiKey = localStorage.getItem("apiKey");
      const response = await fetch(
        "https://v2.api.noroff.dev/blog/posts/kenblog/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey,
          },
        },
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        if (!Array.isArray(responseData.data)) {
          responseData.data = [responseData.data];
          console.log(responseData.data);
        }
        allPosts = responseData.data; // Store all fetched posts
        renderPosts(allPosts);
        updateCarouselWithLatestPosts(); // Update the carousel with latest posts
      } else {
        console.error("Failed to fetch user posts:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  }

  function renderPosts(posts) {
    // Clear existing posts
    postContainer.innerHTML = "";

    // Render each post
    posts.forEach((post, index) => {
      const postElement = document.createElement("div");
      postElement.className = "post-list";
      postElement.innerHTML = `
                <h3>${post.title}</h3>
                <img src="${post.media.url}" alt="${post.media.alt}" />
            `;
      postContainer.appendChild(postElement);
    });
  }

  function filterPostsByTitle(title) {
    const filteredPosts = allPosts.filter((post) =>
      post.title.toLowerCase().includes(title.toLowerCase()),
    );
    renderPosts(filteredPosts);
  }

  function updateCarouselWithLatestPosts() {
    // Get the latest 3 posts
    const latestPosts = allPosts.slice(0, 3);

    // Update the carousel HTML with the images of the latest posts
    const carouselSlides = latestPosts
      .map(
        (post, index) => `
            <div class="mySlides fade">
                <div class="numbertext">${index + 1} / ${latestPosts.length}</div>
                <img src="${post.media.url}" style="width: 100%" data-post-id="${post.id}" />
            </div>
        `,
      )
      .join("");

    document.querySelector(".slideshow-container").innerHTML = carouselSlides;
  }

  displayUserPosts(); // Display user-specific posts on the home page

  nextButton.addEventListener("click", () => {
    showSlide(currentIndex + 1);
  });

  prevButton.addEventListener("click", () => {
    showSlide(currentIndex - 1);
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      showSlide(i);
    });
  });

  function showSlide(index) {
    if (index >= slides.length) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = slides.length - 1;
    } else {
      currentIndex = index;
    }
    slides.forEach((slide, i) => {
      slide.style.display = i === currentIndex ? "block" : "none";
    });
    dots.forEach((dot, i) => {
      dot.className = dot.className.replace(" active", "");
      if (i === currentIndex) {
        dot.className += " active";
      }
    });
  }

  showSlide(currentIndex);
});
