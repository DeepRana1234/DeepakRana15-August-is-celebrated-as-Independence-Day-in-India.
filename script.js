const progress = document.getElementById("readingProgress");
window.addEventListener("scroll", () => {
  const doc = document.documentElement;
  const percent = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
  progress.style.width = `${percent}%`;
});

const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("deepak-theme");
if (savedTheme === "dark") document.body.classList.add("dark");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("deepak-theme", document.body.classList.contains("dark") ? "dark" : "light");
});

const sections = [...document.querySelectorAll(".article-section[id]")];
const links = [...document.querySelectorAll(".article-index a")];

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(link => link.classList.remove("active"));
    const active = links.find(link => link.getAttribute("href") === `#${entry.target.id}`);
    if (active) active.classList.add("active");
  });
}, { rootMargin: "-30% 0px -55% 0px" });

sections.forEach(section => observer.observe(section));


// ===============================
// 🎵 Background Music
// ===============================

const bgMusic = document.getElementById("bgMusic");

let musicStarted = false;

function startBackgroundMusic() {

  if (musicStarted || !bgMusic) return;

  bgMusic.volume = 0.35;

  bgMusic.play()
    .then(() => {
      musicStarted = true;

      // Music start hone ke baad listeners hata do
      window.removeEventListener("wheel", startBackgroundMusic);
      window.removeEventListener("touchstart", startBackgroundMusic);
      window.removeEventListener("pointerdown", startBackgroundMusic);
      window.removeEventListener("keydown", startBackgroundMusic);
    })
    .catch(() => {
      // Browser ne block kiya to next interaction par dobara try hoga
    });
}

// Scroll karte hi music start
window.addEventListener("wheel", startBackgroundMusic, { passive: true });

// Mobile par swipe/touch karte hi
window.addEventListener("touchstart", startBackgroundMusic, { passive: true });

// Mouse se page par interaction
window.addEventListener("pointerdown", startBackgroundMusic, { passive: true });

// Keyboard se interaction
window.addEventListener("keydown", startBackgroundMusic);