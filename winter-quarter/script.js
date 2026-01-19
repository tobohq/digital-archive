const nav = document.getElementById("navLinks");
const indicator = document.getElementById("navIndicator");
const links = nav.querySelectorAll("a");

function moveIndicatorTo(el) {
  const navRect = nav.getBoundingClientRect();
  const rect = el.getBoundingClientRect();

  const left = rect.left - navRect.left;
  const width = rect.width;

  indicator.style.left = `${left}px`;
  indicator.style.width = `${width}px`;
}

// start on the first link (or current page)
window.addEventListener("load", () => {
  // Try to match current URL to highlight active page
  const currentPath = window.location.pathname.split("/").pop();
  const active = Array.from(links).find(a => a.getAttribute("href")?.includes(currentPath)) || links[0];
  moveIndicatorTo(active);
});

links.forEach(a => {
  a.addEventListener("mouseenter", () => moveIndicatorTo(a));
  a.addEventListener("focus", () => moveIndicatorTo(a)); // keyboard users
});

// keep it correct on resize
window.addEventListener("resize", () => {
  const active = nav.querySelector("a:focus") || links[0];
  moveIndicatorTo(active);
});

let activeLink = null;

window.addEventListener("load", () => {
  const currentPath = window.location.pathname.split("/").pop();
  activeLink = Array.from(links).find(a => a.getAttribute("href")?.includes(currentPath)) || links[0];
  moveIndicatorTo(activeLink);
});

nav.addEventListener("mouseleave", () => {
  if (activeLink) moveIndicatorTo(activeLink);
});
