document.addEventListener("DOMContentLoaded", () => {
  const nextButton = document.querySelector("#nextButton");
  const prevButton = document.querySelector("#prevButton");
  const slides = document.querySelectorAll(".mySlides");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;

  async function displayUserPosts() {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const apiKey = localStorage.getItem("apiKey");
      const response = await fetch(
        "https://v2.api.noroff.dev/blog/posts/kenblog/?_sort=created_at:desc&_limit=3",
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
        renderSliderPosts(responseData.data); // Render posts in the slider
        renderPosts(responseData.data); // Render posts under the slider
      } else {
        console.error("Failed to fetch user posts:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  }

  function renderPosts(posts) {
    const postContainer = document.querySelector("#post-list");

    // Clear existing posts
    postContainer.innerHTML = "";

    // Render each post
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.className = "post-list";
      const imageUrl = post.media?.url || "https://via.placeholder.com/150";
      const imageAlt = post.media?.alt || "No description available";
      postElement.innerHTML = `
        <h3>${post.title}</h3>
        <img src="${imageUrl}" alt="${imageAlt}" />
      `;

      // Add event listener to make the post clickable
      postElement.addEventListener("click", () => {
        navigateToPostIndex(post);
      });

      postContainer.appendChild(postElement);
    });
  }

  function renderSliderPosts(posts) {
    slides.forEach((slide, index) => {
      const post = posts[index];
      const imageUrl = post.media?.url || "https://via.placeholder.com/150";
      const imageAlt = post.media?.alt || "No description available";
      const postTitle = post.title;
      const postContent = post.body;

      slide.innerHTML = `
        <div class="numbertext">${index + 1} / ${posts.length}</div>
        <img src="${imageUrl}" style="width: 100%" alt="${imageAlt}" />
        <div class="text">
          <h2>${postTitle}</h2>
          <p>${postContent}</p>
        </div>
      `;

      // Add event listener to make the slide clickable
      slide.addEventListener("click", () => {
        navigateToPostIndex(post);
      });
    });
  }

  function navigateToPostIndex(post) {
    const queryParams = new URLSearchParams({
      id: post.id,
      title: post.title,
      content: post.body,
      author: post.author.name,
      date: post.created,
      imageUrl: post.media?.url || "",
      imageAlt: post.media?.alt || "",
    }).toString();
    window.location.href = `post/index.html?${queryParams}`;
  }

  displayUserPosts();

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
