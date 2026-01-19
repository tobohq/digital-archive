const nav = document.getElementById("navLinks");
const indicator = document.getElementById("navIndicator");
const links = nav.querySelectorAll("a");

// Move pill under a link
function moveIndicatorTo(el, animate = true) {
  const navRect = nav.getBoundingClientRect();
  const rect = el.getBoundingClientRect();

  indicator.style.transition = animate ? "left .5s ease, width .5s ease" : "none";
  indicator.style.left = `${rect.left - navRect.left}px`;
  indicator.style.width = `${rect.width}px`;
}

// 1) Choose active link: prefer #active, otherwise fallback to URL match, otherwise first
function getActiveLink() {
  const byId = document.getElementById("active");
  if (byId) return byId;

  const currentPath = window.location.pathname.split("/").pop();
  return Array.from(links).find(a => a.getAttribute("href")?.includes(currentPath)) || links[0];
}

let activeLink = null;

window.addEventListener("load", () => {
  activeLink = getActiveLink();

  // Teleport instantly on load (no animation)
  moveIndicatorTo(activeLink, false);

  // Then re-enable animation for hover moves
  requestAnimationFrame(() => {
    indicator.style.transition = "left .5s ease, width .5s ease";
  });
});

// Hover/focus moves
links.forEach(a => {
  a.addEventListener("mouseenter", () => moveIndicatorTo(a, true));
  a.addEventListener("focus", () => moveIndicatorTo(a, true));
});

// Return to active on mouse leave
nav.addEventListener("mouseleave", () => {
  if (activeLink) moveIndicatorTo(activeLink, true);
});

// Keep pill accurate on resize
window.addEventListener("resize", () => {
  if (activeLink) moveIndicatorTo(activeLink, false);
});
