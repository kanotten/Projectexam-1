let hasUsernameInput = false; // Declare hasUsernameInput variable

async function createApiKey(accessToken) {
  try {
    const response = await fetch(
      "https://v2.api.noroff.dev/auth/create-api-key",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name: "My API Key" }),
      },
    );

    if (response.ok) {
      const responseData = await response.json();
      const apiKey = responseData.data.key;

      localStorage.setItem("apiKey", apiKey);
    }
  } catch (error) {
    // Handle error silently
    console.error("Error creating API key:", error);
  }
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

    if (response.ok) {
      const responseData = await response.json();
      const accessToken = responseData.data.accessToken;

      localStorage.setItem("accessToken", accessToken);

      await createApiKey(accessToken);

      window.location.href = "index.html";
    } else {
      showMessage("Login failed. Please try again.");
    }

    return response.ok;
  } catch (error) {
    // Handle error silently
    console.error("Error checking user existence:", error);
    return false;
  }
}

function getEmailUsername(email) {
  const atIndex = email.indexOf("@");
  const characterLimiter = 10;
  const username =
    atIndex >= 0 ? email.substring(atIndex - characterLimiter, atIndex) : ""; // Ensure username is not empty if no "@" found
  return username;
}

function showMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.className = "message-popup";
  messageDiv.innerText = message;
  document.body.appendChild(messageDiv);

  setTimeout(() => {
    document.body.removeChild(messageDiv);
  }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  const emailField = document.getElementById("email");
  const usernameField = document.getElementById("username");

  emailField.addEventListener("input", findEmailInputElement);
  usernameField.addEventListener("blur", callbackUsernameField);
  usernameField.addEventListener("focus", callbackUsernameField);

  const loginForm = document.querySelector(".form-container");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailField.value; // Use emailField directly
    const username = usernameField.value; // Use usernameField directly
    const password = document.getElementById("password").value;

    const userExists = await checkUserExists(email, password);

    if (!userExists) {
      showMessage("User does not exist. Please register first.");
    }
  });
});

function findEmailInputElement() {
  const email = document.getElementById("email").value;
  if (email.length > 0 && !hasUsernameInput) {
    const username = generateUsername(email);
    document.getElementById("username").value = username;
  }
}

function callbackUsernameField() {
  hasUsernameInput = this.value.length > 0; // Update hasUsernameInput based on usernameField value
}

function generateUsername(input) {
  input = input.trim().toLowerCase();
  return getEmailUsername(input);
}
