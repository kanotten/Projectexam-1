document.addEventListener("DOMContentLoaded", async () => {
  // Retrieve user data from the API
  try {
    const response = await fetch("https://v2.api.noroff.dev/users/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"), // Assuming you stored the access token in localStorage
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const userData = await response.json();
      displayUserData(userData);
    } else {
      const errorMessage = await response.text();
      console.error("Error:", errorMessage);
      alert(`Error: ${errorMessage}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An unexpected error occurred. Please try again.");
  }
});

function displayUserData(userData) {
  // Assuming there's a <div> element with id="userData" to display user data
  const userDataElement = document.getElementById("userData");

  // Example of displaying user data in the userDataElement
  userDataElement.innerHTML = `
    <h2>User Information</h2>
    <p><strong>Email:</strong> ${userData.email}</p>
    <p><strong>Username:</strong> ${userData.username}</p>
    <p><strong>Name:</strong> ${userData.name}</p>
    <!-- Add more fields as needed -->
  `;
}
