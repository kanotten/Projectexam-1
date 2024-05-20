async function getAllPosts() {
  const apiKey = localStorage.getItem("apiKey");
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch("https://v2.api.noroff.dev/social/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData)
    }

  } catch (error) {
    console.error("failed to get all posts:", error);
    return
  }
}

getAllPosts()

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("blogPostForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const postTitle = document.getElementById("postTitle").value;
    const postContent = document.getElementById("postContent").value;

    const apiKey = localStorage.getItem("apiKey");
    const accessToken = localStorage.getItem("accessToken");

    const postData = {
      title: postTitle,
      content: postContent,
    };

    try {
      const response = await fetch("https://v2.api.noroff.dev/social/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey
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
