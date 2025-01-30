// Function to create floating letters
function createFloatingLetters() {
  const letterPool = document.getElementById("letter-pool");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < 100; i++) {
    const letter = document.createElement("div");
    letter.className = "pool-letter";
    letter.textContent = letters[Math.floor(Math.random() * letters.length)];
    letter.style.left = `${Math.random() * 100}%`;
    letter.style.top = `${Math.random() * 100}%`;
    letter.style.setProperty("--rand-x1", Math.random());
    letter.style.setProperty("--rand-y1", Math.random());
    letter.style.setProperty("--rand-x2", Math.random());
    letter.style.setProperty("--rand-y2", Math.random());
    letter.style.setProperty("--rand-x3", Math.random());
    letter.style.setProperty("--rand-y3", Math.random());
    letterPool.appendChild(letter);
  }
}

// Function to animate letters into a message
function animateLettersToMessage(message, isUser) {
  const letters = message.split("");
  const messageElement = document.createElement("div");
  messageElement.className = `message ${isUser ? "sent" : "received"}`;
  messageElement.innerHTML = `<p class="text">${message}</p>`;
  document.getElementById("chat-message-column").appendChild(messageElement);

  letters.forEach((char, index) => {
    const letter = document.createElement("div");
    letter.className = "overlay-letter";
    letter.textContent = char;
    letter.style.left = `${Math.random() * 100}%`;
    letter.style.top = `${Math.random() * 100}%`;
    document.getElementById("letter-overlay").appendChild(letter);

    setTimeout(() => {
      letter.style.left = `${messageElement.offsetLeft + index * 10}px`;
      letter.style.top = `${messageElement.offsetTop}px`;
      setTimeout(() => {
        document.getElementById("letter-overlay").removeChild(letter);
      }, 1000);
    }, index * 100);
  });
}

// Function to send a message
async function sendMessage() {
  const userInput = document.getElementById("message-input-field").value;
  if (!userInput.trim()) return;

  // Animate user message
  animateLettersToMessage(userInput, true);

  // Clear input
  document.getElementById("message-input-field").value = "";

  try {
    // Send message to Flask backend
    const response = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput }),
    });

    const data = await response.json();

    // Animate bot response
    animateLettersToMessage(data.response, false);
  } catch (error) {
    console.error("Error:", error);
    animateLettersToMessage("Sorry, something went wrong.", false);
  }
}

// Initialize floating letters
createFloatingLetters();

// Event listener for Enter key
document
  .getElementById("message-input-field")
  .addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
