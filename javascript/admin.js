hasUsernameInput = false;

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
});

function findEmailInputElement() {
  if (hasUsernameInput) {
    return;
  }

  const email = document.getElementById("email").value;
  if (email.length < 1) {
    return;
  }

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

  // Handle login form submission
  const loginForm = document.querySelector(".form-container");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check if the user exists
    const userExists = await checkUserExists(email, password);

    if (userExists) {
      window.location.href = 'index.html';
    } else {
      showMessage("User does not exist. Please register first.");
    }
  });
}

async function checkUserExists(email, password) {
  try {
    const response = await fetch("https://v2.api.noroff.dev/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    return response.ok;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
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

function showMessage(message) {
  // Create a div for the message
  const messageDiv = document.createElement("div");
  messageDiv.className = "message-popup";
  messageDiv.innerText = message;

  // Append the message div to the body
  document.body.appendChild(messageDiv);

  // Remove the message after 3 seconds
  setTimeout(() => {
    document.body.removeChild(messageDiv);
  }, 3000);
}
