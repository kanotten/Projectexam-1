document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("blogPostForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const postTitle = document.getElementById("postTitle").value;
    const postContent = document.getElementById("postContent").value;

    const postData = {
      title: postTitle,
      content: postContent,
    };

    try {
      const response = await fetch("https://api.example.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        alert("Blog post created successfully!");
        form.reset();
      } else {
        const errorMessage = await response.text();
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  });
});
