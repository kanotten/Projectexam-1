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
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey,
          },
        },
      );

      if (response.ok) {
        const postData = await response.json();
        populateForm(postData.data);
      } else {
        console.error("Failed to load post:", response.statusText);
        alert("Failed to load post. Please check the Post ID and try again.");
      }
    } catch (error) {
      console.error("Error loading post:", error);
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
    let isValid = true;

    const title = document.getElementById("post-title").value.trim();
    const content = document.getElementById("post-content").value.trim();
    const imageUrl = document.getElementById("post-image-url").value.trim();
    const imageAlt = document.getElementById("post-image-alt").value.trim();

    // Clear previous error messages
    document.getElementById("title-error").textContent = "";
    document.getElementById("content-error").textContent = "";
    document.getElementById("image-url-error").textContent = "";
    document.getElementById("image-alt-error").textContent = "";

    if (!title) {
      document.getElementById("title-error").textContent = "Title is required.";
      isValid = false;
    }

    if (!content) {
      document.getElementById("content-error").textContent =
        "Content is required.";
      isValid = false;
    }

    if (imageUrl && !isValidURL(imageUrl)) {
      document.getElementById("image-url-error").textContent =
        "Invalid URL format.";
      isValid = false;
    }

    if (!imageAlt) {
      document.getElementById("image-alt-error").textContent =
        "Image alt text is required.";
      isValid = false;
    }

    return isValid;
  }

  function isValidURL(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  async function updatePost() {
    const postId = document.getElementById("post-id").value;
    const title = document.getElementById("post-title").value;
    const body = document.getElementById("post-content").value;
    const imageUrl = document.getElementById("post-image-url").value;
    const imageAlt = document.getElementById("post-image-alt").value;
    const tags = []; // Add code to collect tags if required
    const accessToken = localStorage.getItem("accessToken");
    const apiKey = localStorage.getItem("apiKey");

    const postData = {
      title,
      body,
      tags,
      media: {
        url: imageUrl,
        alt: imageAlt,
      },
    };

    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/blog/posts/kenblog/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey,
          },
          body: JSON.stringify(postData),
        },
      );

      if (response.ok) {
        const responseData = await response.json();
        alert("Post updated successfully!");
        console.log(responseData);
      } else {
        const errorData = await response.json();
        console.error("Failed to update post:", errorData);
        alert("Failed to update post. Please try again.");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Error updating post. Please try again.");
    }
  }

  async function deletePost() {
    const postId = document.getElementById("post-id").value;
    const accessToken = localStorage.getItem("accessToken");
    const apiKey = localStorage.getItem("apiKey");

    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/blog/posts/kenblog/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey,
          },
        },
      );

      if (response.ok) {
        alert("Post deleted successfully!");
        // Clear the form after deletion
        document.getElementById("edit-post-form").reset();
      } else {
        console.error("Failed to delete post:", response.statusText);
        alert("Failed to delete post. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Error deleting post. Please try again.");
    }
  }
});
