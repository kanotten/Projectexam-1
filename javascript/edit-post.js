document.addEventListener("DOMContentLoaded", () => {
  const editPostForm = document.getElementById("edit-post-form");
  const deletePostButton = document.getElementById("delete-post");
  const loadPostButton = document.getElementById("load-post");

  loadPostButton.addEventListener("click", async () => {
    const postId = document.getElementById("load-post-id").value.trim();
    if (postId) {
      await loadPost(postId);
    } else {
      alert("Please enter a Post ID to load.");
    }
  });

  editPostForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (validateForm()) {
      await updatePost();
    }
  });

  deletePostButton.addEventListener("click", async () => {
    await deletePost();
  });

  async function loadPost(postId) {
    const accessToken = localStorage.getItem("accessToken");
    const apiKey = localStorage.getItem("apiKey");

    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/blog/posts/kenblog/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey,
          },
        },
      );

      if (response.ok) {
        const postData = await response.json();
        populateForm(postData); // Modified this line
      } else {
        alert("Failed to load post. Please check the Post ID and try again.");
      }
    } catch (error) {
      alert("Error loading post. Please try again.");
    }
  }

  function populateForm(post) {
    document.getElementById("post-id").value = post.id;
    document.getElementById("post-title").value = post.title;
    document.getElementById("post-content").value = post.body;
    document.getElementById("post-image-url").value = post.media.url;
    document.getElementById("post-image-alt").value = post.media.alt;
  }

  function validateForm() {
    // Validation code remains the same
  }

  // Remaining functions remain unchanged
});
