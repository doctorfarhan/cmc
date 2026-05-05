const root = document.documentElement;
const header = document.querySelector("[data-header]");
const revealItems = document.querySelectorAll(".reveal");
const ticker = document.querySelector(".ticker");

root.classList.add("motion-ready");

if (ticker) {
  ticker.innerHTML += ticker.innerHTML;
}

let ticking = false;

function updateScrollState() {
  const y = window.scrollY || 0;
  root.style.setProperty("--scroll", y.toFixed(2));
  header?.classList.toggle("is-scrolled", y > 20);
  ticking = false;
}

function requestScrollUpdate() {
  if (!ticking) {
    window.requestAnimationFrame(updateScrollState);
    ticking = true;
  }
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    rootMargin: "0px 0px -12% 0px",
    threshold: 0.12,
  },
);

revealItems.forEach((item) => revealObserver.observe(item));

window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", requestScrollUpdate);
updateScrollState();
