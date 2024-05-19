document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector("form");

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("psw").value;
    const repeatPassword = document.getElementById("repeat-psw").value;

    if (password !== repeatPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("User registered successfully");
        window.location.href = "login.html";
      } else {
        const errorMessage = await response.json();
        if (
          errorMessage.errors &&
          errorMessage.errors[0].message === "Profile already exists"
        ) {
          alert("Email is already in use. Please try with a different email.");
        } else {
          console.error("Error:", errorMessage);
          alert(`Error: ${errorMessage}`);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  });
});
