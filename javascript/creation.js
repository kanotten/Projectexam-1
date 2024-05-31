// Wait for DOM content to be loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM content loaded");

  const form = document.getElementById("blogPostForm");
  if (!form) {
    return;
  }

  // handles form submissions
  function handleFormSubmit(event) {
    event.preventDefault();

    const postTitle = document.getElementById("postTitle").value;
    const postContent = document.getElementById("postContent").value;
    const imageUrl = document.getElementById("image-url").value;
    const imageAlt = document.getElementById("image-alt").value;
    const apiKey = localStorage.getItem("apiKey");
    const accessToken = localStorage.getItem("accessToken");

    const postData = {
      title: postTitle,
      body: postContent,
      media: {
        url: imageUrl,
        alt: imageAlt,
      },
    };

    try {
      fetch("https://v2.api.noroff.dev/blog/posts/kenblog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify(postData),
      })
        .then((response) => {
          if (response.ok) {
            alert("Blog post created successfully!");
            form.reset(); // Reset the form
          } else {
            return response.text().then((errorMessage) => {
              alert(`Error: ${errorMessage}`);
            });
          }
        })
        .catch((error) => {
          alert("An unexpected error occurred. Please try again.");
        });
    } catch (error) {
      alert("An unexpected error occurred. Please try again.");
    }
  }

  // Add event listener to the form for submission
  form.addEventListener("submit", handleFormSubmit);
});
