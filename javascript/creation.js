var accessToken = ""
var apiKey = ""

async function do_log_in() {
  const email = "jk123@stud.noroff.no"
  const password = "12345678"
  try {
    const response = await fetch("https://v2.api.noroff.dev/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      accessToken = responseData.data.accessToken;
      console.log("accessToken: " + accessToken);
    }

    return response.ok;
  } catch (error) {
    console.error("Error:", error);
  }
  return "";
}

async function get_api_key() {
  try {
    const response = await fetch("https://v2.api.noroff.dev/auth/create-api-key", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name: "My API Key" }),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      apiKey = responseData.data.key;
      let status = responseData.data.status;
      console.log("apiKey: " + apiKey);
      console.log("status: " + status);
    }

    return response.ok;
  } catch (error) {
    console.error("Error:", error);
  }
  return "";
}

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
      await do_log_in()
      await get_api_key()
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
