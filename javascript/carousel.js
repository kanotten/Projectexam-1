const carouselModule = (() => {
  const apiUrl = "https://v2.api.noroff.dev/blog/posts/kenblog/";

  async function fetchLatestPosts() {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch latest posts");
      }
      const responseData = await response.json();
      return responseData.data.slice(0, 3); // Get the 3 latest posts
    } catch (error) {
      console.error("Error fetching latest posts:", error);
    }
  }

  async function populateCarousel() {
    const latestPosts = await fetchLatestPosts();
    const carouselItems = document.querySelectorAll(".carousel-item");
    const carouselImages = document.querySelectorAll(".carousel-image");
    const postTitles = document.querySelectorAll(".post-title");
    const postAlts = document.querySelectorAll(".post-alt");

    latestPosts.forEach((post, index) => {
      carouselImages[index].src = post.media.url;
      postTitles[index].textContent = post.title;
      postAlts[index].textContent = post.media.alt;
    });
  }

  return {
    populateCarousel,
  };
})();

// Execute the populateCarousel function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  carouselModule.populateCarousel();
});
