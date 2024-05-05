hasUsernameInput = false;

document.addEventListener("DOMContentLoaded", () => {
    setupEventListeners();
})

function findEmailInputElement() {
    if (hasUsernameInput) {
        return
    }

    email =  document.getElementById('email').value;
    if (email.length < 1) {
        return;
    }

    const nameInput = document.getElementById('username').value;
    username = generateUsername(email);
    document.getElementById('username').value = username;
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
    emailField = document.getElementById('email')
    emailField.addEventListener('input', findEmailInputElement);

    usernameField = document.getElementById("username");
    usernameField.addEventListener("blur", function () {
        callbackUsernameField();
    });
    usernameField.addEventListener("focus", function () {
        callbackUsernameField();
    });
}

function getEmailUsername(email) {
    characterLimiter = 10
    atIndex = email.indexOf('@');
    if (atIndex < 0) {
        atIndex = characterLimiter
    }

    const username = email.substring(atIndex - characterLimiter, atIndex);
    return username;
}

function cleanUsername(inputString) {
    // Replace any spaces with underscores
    input = inputString.replace(/\s+/g, '_');
    // Remove any non-alphanumeric characters except underscores
    input = input.replace(/[^\w]/g, '');
    return input;
}

function insertRandomName(name) {
    const predefinedStrings = ["awesome", "super", "cool", "mega", "fantastic"];
    const randomIndex = Math.floor(Math.random() * predefinedStrings.length);
    const randomString = predefinedStrings[randomIndex] + '_' + name;
    return randomString;
}

function insertRandomNumber(username) {
    const randomNumber = Math.floor(Math.random() * 90) + 10;
    username = username + randomNumber;
    return username;
}

function generateUsername(input) {
    input = input.trim();
    input = input.toLowerCase();

    input = getEmailUsername(input);
    input = cleanUsername(input)
    input = insertRandomName(input);
    input = insertRandomNumber(input);
    return input;
}
