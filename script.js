
/*
  BdyWish01 - Birthday Surprise Website
  Personalise the name and messages in index.html.
*/

const music = document.getElementById("bgMusic");
const heartsContainer = document.getElementById("hearts");

let cakeHasBeenCut = false;
let wishHasBeenMade = false;
let celebrationTimer = null;

// Move to a screen by its number.
function showScreen(number) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(`screen${number}`);

  if (target) {
    target.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (number === 3 || number === 8) {
    burstHearts(number === 8 ? 35 : 15);
  }
}

// Start the surprise and attempt to play background music.
function startSurprise() {
  if (music) {
    music.volume = 0.35;

    const playAttempt = music.play();

    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(() => {
        console.log("Music is optional. Add assets/music.mp3 to enable it.");
      });
    }
  }

  showScreen(2);
}

// Turn on the birthday room lights.
function turnOnLights() {
  const darkScreen = document.getElementById("screen2");
  const bulb = document.getElementById("bulb");

  darkScreen.classList.add("lit");
  bulb.textContent = "💡";

  burstHearts(12);

  window.setTimeout(() => {
    showScreen(3);
  }, 1400);
}

// Cake interaction.
function cutCake() {
  if (cakeHasBeenCut) return;

  cakeHasBeenCut = true;

  const cake = document.getElementById("cake");
  const candle = document.getElementById("candle");
  const message = document.getElementById("cakeMessage");
  const wishButton = document.getElementById("wishButton");

  cake.classList.add("cut");
  candle.textContent = "✨";

  message.textContent =
    "Yay! You cut your birthday cake! 🎂❤️";

  burstHearts(18);

  // Reveal the next action after the cake separates.
  window.setTimeout(() => {
    wishButton.classList.remove("hidden");
    message.textContent =
      "Now close your eyes and make a beautiful wish! 💕";
  }, 1000);
}

// Make a wish and unlock the next screen.
function makeWish() {
  showScreen(5);
}

// Reveal the next part of the surprise.
function revealWish() {
  if (wishHasBeenMade) return;

  wishHasBeenMade = true;

  document.getElementById("wishMessage").textContent =
    "May your beautiful wish come true. You deserve the world! 🌟";

  document.getElementById("memoriesButton").classList.remove("hidden");

  burstHearts(20);
}

// Floating hearts decoration.
function createHeart() {
  if (!heartsContainer) return;

  const heart = document.createElement("span");
  const symbols = ["♥", "♡", "💕", "💗", "✨"];

  heart.className = "floating-heart";
  heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${14 + Math.random() * 20}px`;
  heart.style.animationDuration = `${5 + Math.random() * 5}s`;

  heartsContainer.appendChild(heart);

  window.setTimeout(() => {
    heart.remove();
  }, 11000);
}

function burstHearts(count = 15) {
  for (let i = 0; i < count; i++) {
    window.setTimeout(createHeart, i * 90);
  }
}

// A gentle background effect throughout the experience.
function startHeartEffect() {
  if (celebrationTimer !== null) {
    window.clearInterval(celebrationTimer);
  }

  celebrationTimer = window.setInterval(() => {
    if (document.visibilityState === "visible") {
      createHeart();
    }
  }, 1400);
}

// Final celebration.
function celebrateAgain() {
  burstHearts(40);

  const button = document.querySelector("#screen8 .primary-btn");
  const originalText = "One More Hug? 🤗";

  button.textContent = "Sending you the biggest hug! 🤗❤️";
  button.disabled = true;

  window.setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
  }, 2500);
}

// Start decorations once the document is ready.
document.addEventListener("DOMContentLoaded", startHeartEffect);
