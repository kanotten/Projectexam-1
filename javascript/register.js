document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const name = document.getElementById("user-name").value;
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeat-password").value;

    if (password !== repeatPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      email: email,
      name: name, // Use the "name" attribute from HTML
      password: password,
    };

    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert("User registered successfully!");
        registerForm.reset();
      } else {
        const errorMessage = await response.text();
        console.error("Registration Error:", errorMessage);
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  });
});
