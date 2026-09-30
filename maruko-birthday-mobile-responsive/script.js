const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

// ===== Countdown =====
const targetDate = new Date("2026-10-01T00:00:00+07:00");
const pad = (value) => String(Math.max(0, value)).padStart(2, "0");

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    $("#days").textContent = "00";
    $("#hours").textContent = "00";
    $("#minutes").textContent = "00";
    $("#seconds").textContent = "00";
    $(".countdown-subtitle").innerHTML = "Hari ini waktunya merayakan kamu! 🎉";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  $("#days").textContent = pad(days);
  $("#hours").textContent = pad(hours);
  $("#minutes").textContent = pad(minutes);
  $("#seconds").textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== Scroll reveal =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

$$(".reveal").forEach((element) => observer.observe(element));

// ===== Little reasons modal =====
const reasonModal = $("#reasonModal");
const reasonText = $("#reasonText");
const reasonTitle = $("#reasonTitle");
const closeModal = () => {
  reasonModal.classList.remove("open");
  reasonModal.setAttribute("aria-hidden", "true");
};

$$(".reason-card").forEach((card) => {
  card.addEventListener("click", () => {
    reasonText.textContent = card.dataset.reason;
    reasonTitle.textContent = card.querySelector("strong").textContent;
    reasonModal.classList.add("open");
    reasonModal.setAttribute("aria-hidden", "false");
  });
});

$("#modalClose").addEventListener("click", closeModal);
$(".modal-backdrop").addEventListener("click", closeModal);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

// ===== Birthday confetti =====
const confettiColors = [
  "#e786a3",
  "#ffd75f",
  "#76a98b",
  "#252222",
  "#ffffff",
  "#f3a6bd",
];
const confettiShapes = ["rectangle", "ribbon", "circle", "star"];

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function makeRainPiece() {
  const piece = document.createElement("span");
  const shape =
    confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
  piece.className =
    `confetti-rain-piece ${shape === "star" ? "star" : shape === "circle" ? "circle" : shape === "ribbon" ? "ribbon" : ""}`.trim();
  piece.textContent = shape === "star" ? "✦" : "";
  piece.style.left = `${randomBetween(0, 100)}%`;
  piece.style.setProperty("--fall-duration", `${randomBetween(6.5, 11)}s`);
  piece.style.setProperty("--fall-delay", `${randomBetween(-10, 0)}s`);
  piece.style.setProperty("--sway", `${randomBetween(22, 85)}px`);
  piece.style.opacity = randomBetween(0.42, 0.85).toFixed(2);

  const color =
    confettiColors[Math.floor(Math.random() * confettiColors.length)];
  if (shape === "star") {
    piece.style.color = color;
    piece.style.fontSize = `${randomBetween(0.75, 1.25)}rem`;
  } else {
    piece.style.background = color;
  }
  piece.style.transform = `rotate(${randomBetween(0, 180)}deg)`;
  return piece;
}

function startConfettiRain(amount = 46) {
  const wrap = $("#confettiRain");
  if (!wrap) return;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < amount; i += 1) fragment.appendChild(makeRainPiece());
  wrap.appendChild(fragment);
}

function burstConfetti(amount = 80) {
  const wrap = $("#confetti");
  const shapes = ["■", "●", "◆", "✦"];
  for (let i = 0; i < amount; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.top = `${-20 - Math.random() * 60}px`;
    piece.style.animationDelay = `${Math.random() * 0.45}s`;
    piece.style.fontSize = `${8 + Math.random() * 8}px`;
    piece.style.color =
      confettiColors[Math.floor(Math.random() * confettiColors.length)];
    wrap.appendChild(piece);
    setTimeout(() => piece.remove(), 2400);
  }
}

startConfettiRain();
$("#wishBtn").addEventListener("click", () => {
  burstConfetti(110);
  const button = $("#wishBtn");
  button.textContent = "Wish sent! 💗";
  button.disabled = true;
  setTimeout(() => {
    button.disabled = false;
    button.textContent = "Tiup lilinnya ✨";
  }, 2400);
});

// ===== Video placeholder =====
const birthdayVideo = $("#birthdayVideo");
const videoFrame = $("#videoFrame");
const videoPlaceholder = $("#videoPlaceholder");

if (birthdayVideo && videoFrame && videoPlaceholder) {
  birthdayVideo.addEventListener("loadeddata", () =>
    videoFrame.classList.add("has-video"),
  );
  birthdayVideo.addEventListener("canplay", () =>
    videoFrame.classList.add("has-video"),
  );
  birthdayVideo.addEventListener("error", () =>
    videoFrame.classList.remove("has-video"),
  );
  videoPlaceholder.addEventListener("click", () => {
    birthdayVideo.play().catch(() => {
      videoPlaceholder.querySelector("strong").textContent =
        "VIDEO SIAP DIGANTI 🎬";
    });
  });
}

// ===== Back to top =====
$("#topBtn").addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

// ===== Backing track =====
document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bgMusic");

  music.volume = 0.25;

  // Coba autoplay saat halaman dibuka
  const tryAutoplay = () => {
    music.play().catch(() => {
      // Browser memblokir autoplay.
      // Tidak ada error yang perlu ditampilkan.
      console.log("Autoplay diblokir oleh browser.");
    });
  };

  tryAutoplay();

  // Kalau browser awalnya menolak,
  // coba lagi setelah interaksi pertama dengan halaman.
  const startAfterInteraction = () => {
    music.play().catch(() => {});

    document.removeEventListener("click", startAfterInteraction);
    document.removeEventListener("touchstart", startAfterInteraction);
    document.removeEventListener("keydown", startAfterInteraction);
  };

  document.addEventListener("click", startAfterInteraction, { once: true });
  document.addEventListener("touchstart", startAfterInteraction, {
    once: true,
  });
  document.addEventListener("keydown", startAfterInteraction, { once: true });
});
