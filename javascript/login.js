hasUsernameInput = false;

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();

  // Handle login form submission
  const loginForm = document.querySelector(".form-container");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Perform login
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${encodeURIComponent(email)}&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("accessToken", result.accessToken); // Store the token if provided
        window.location.href = "index.html"; // Redirect to home page
      } else {
        const errorMessage = await response.text();
        alert(`Login failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  });
});

function findEmailInputElement() {
  if (hasUsernameInput) {
    return;
  }

  const email = document.getElementById("email").value;
  if (email.length < 1) {
    return;
  }

  const nameInput = document.getElementById("username").value;
  const username = generateUsername(email);
  document.getElementById("username").value = username;
}

function callbackUsernameField() {
  // called each time username field changes focus
  hasUsernameInput = true;
  if (usernameField.value.length < 1) {
    // re-enable random username
    hasUsernameInput = false;
  }
}

function setupEventListeners() {
  const emailField = document.getElementById("email");
  emailField.addEventListener("input", findEmailInputElement);

  const usernameField = document.getElementById("username");
  usernameField.addEventListener("blur", callbackUsernameField);
  usernameField.addEventListener("focus", callbackUsernameField);
}

function getEmailUsername(email) {
  const characterLimiter = 10;
  let atIndex = email.indexOf("@");
  if (atIndex < 0) {
    atIndex = characterLimiter;
  }

  const username = email.substring(atIndex - characterLimiter, atIndex);
  return username;
}

function cleanUsername(inputString) {
  // Replace any spaces with underscores
  let input = inputString.replace(/\s+/g, "_");
  // Remove any non-alphanumeric characters except underscores
  input = input.replace(/[^\w]/g, "");
  return input;
}

function insertRandomName(name) {
  const predefinedStrings = ["awesome", "super", "cool", "mega", "fantastic"];
  const randomIndex = Math.floor(Math.random() * predefinedStrings.length);
  const randomString = predefinedStrings[randomIndex] + "_" + name;
  return randomString;
}

function insertRandomNumber(username) {
  const randomNumber = Math.floor(Math.random() * 90) + 10;
  username = username + randomNumber;
  return username;
}

function generateUsername(input) {
  input = input.trim().toLowerCase();

  input = getEmailUsername(input);
  input = cleanUsername(input);
  input = insertRandomName(input);
  input = insertRandomNumber(input);
  return input;
}
