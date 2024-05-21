document.addEventListener("DOMContentLoaded", () => {
  const nextButton = document.querySelector("#nextButton");
  const prevButton = document.querySelector("#prevButton");
  const slides = document.querySelectorAll(".mySlides");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;

  async function displayUserPosts() {
    const userPosts = JSON.parse(localStorage.getItem("userPosts"));
    if (userPosts) {
      renderPosts(userPosts); // Use stored posts
    } else {
      await fetchAndStoreUserPosts(); // Fetch and store posts if not stored locally
    }
  }

  async function fetchAndStoreUserPosts() {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        "https://v2.api.noroff.dev/social/posts/2024",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.ok) {
        const { data: userPosts } = await response.json();
        localStorage.setItem("userPosts", JSON.stringify(userPosts));
        renderPosts(userPosts);
      } else {
        console.error("Failed to fetch user posts:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  }

  function renderPosts(posts) {
    const postContainer = document.querySelector("#blog-posts");

    // Check if posts is an array
    if (!Array.isArray(posts)) {
      console.error("Invalid posts data:", posts);
      return;
    }

    // Clear existing posts
    postContainer.innerHTML = "";

    // Render each post
    posts.forEach((post, index) => {
      const postElement = document.createElement("div");
      postElement.className = "blog-post";
      postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      `;
      postContainer.appendChild(postElement);
    });
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
