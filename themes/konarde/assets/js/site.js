// adityakonarde.com: menu, theme preference, scroll reveals, tagline words, code copy, TOC state.
// No dependencies. Every observer is an IntersectionObserver; there is no scroll listener.

const doc = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---- Mobile menu ----
const btn = document.querySelector(".menu-btn");
const overlay = document.getElementById("menu");
if (btn && overlay) {
  const setOpen = (open) => {
    doc.classList.toggle("menu-open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (open) {
      overlay.removeAttribute("inert");
      const first = overlay.querySelector("a");
      if (first) setTimeout(() => first.focus({ preventScroll: true }), 50);
    } else {
      overlay.setAttribute("inert", "");
    }
  };
  btn.addEventListener("click", () => setOpen(!doc.classList.contains("menu-open")));
  overlay.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && doc.classList.contains("menu-open")) { setOpen(false); btn.focus(); }
  });
  window.matchMedia("(min-width: 768px)").addEventListener("change", (m) => { if (m.matches) setOpen(false); });
}

// ---- Theme preference (auto / light / dark), same storage key as the old theme ----
const pref = document.getElementById("theme-pref");
if (pref) {
  let saved = "auto";
  try { saved = localStorage.getItem("pref-theme") || "auto"; } catch (e) { /* storage blocked */ }
  pref.value = saved === "dark" || saved === "light" ? saved : "auto";
  pref.addEventListener("change", () => {
    const v = pref.value;
    try {
      if (v === "auto") localStorage.removeItem("pref-theme"); else localStorage.setItem("pref-theme", v);
    } catch (e) { /* storage blocked: still apply for this page */ }
    if (v === "auto") delete doc.dataset.theme; else doc.dataset.theme = v;
  });
}

// ---- Scroll reveal: heavy fade up as elements enter the viewport ----
const reveals = document.querySelectorAll("[data-reveal]");
if (reduceMotion || !("IntersectionObserver" in window)) {
  reveals.forEach((el) => el.classList.add("is-in"));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  reveals.forEach((el) => {
    // Anything already on screen at load reveals immediately, staggered.
    io.observe(el);
  });
}

// ---- Tagline: words light up one at a time as they cross a trigger line ----
const words = document.querySelectorAll(".tagline .w");
if (words.length) {
  if (reduceMotion || !("IntersectionObserver" in window)) {
    words.forEach((w) => w.classList.add("on"));
  } else {
    // Trigger line sits 35% above the bottom of the viewport.
    const wo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const below = entry.boundingClientRect.top > (entry.rootBounds ? entry.rootBounds.bottom : window.innerHeight);
        if (entry.isIntersecting) entry.target.classList.add("on");
        else if (below) entry.target.classList.remove("on");
      });
    }, { rootMargin: "0px 0px -35% 0px", threshold: 1 });
    // Offset each word's trigger slightly by reading order so a line lights left to right.
    words.forEach((w, i) => { w.style.transitionDelay = `${(i % 6) * 40}ms`; wo.observe(w); });
  }
}

// ---- Copy buttons on code blocks ----
const copyIcon = '<svg class="icon" aria-hidden="true" viewBox="0 0 256 256" fill="currentColor"><path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"/></svg>';
document.querySelectorAll(".prose pre").forEach((pre) => {
  if (!navigator.clipboard) return;
  const host = pre.parentElement && pre.parentElement.classList.contains("highlight") ? pre.parentElement : pre;
  const b = document.createElement("button");
  b.type = "button";
  b.className = "copy-btn";
  b.innerHTML = `${copyIcon}<span>Copy</span>`;
  b.setAttribute("aria-label", "Copy code to clipboard");
  b.addEventListener("click", async () => {
    const code = pre.querySelector("code") || pre;
    try {
      await navigator.clipboard.writeText(code.innerText.replace(/\n$/, ""));
      b.lastChild.textContent = "Copied";
    } catch (e) {
      b.lastChild.textContent = "Copy failed";
    }
    setTimeout(() => { b.lastChild.textContent = "Copy"; }, 1800);
  });
  host.appendChild(b);
});

// ---- TOC: open by default on wide screens, highlight the section in view ----
const toc = document.querySelector(".toc details");
if (toc) {
  const wide = window.matchMedia("(min-width: 1200px)");
  const sync = () => { if (wide.matches) toc.open = true; };
  sync(); wide.addEventListener("change", sync);
  const links = new Map();
  toc.querySelectorAll("nav a[href^='#']").forEach((a) => links.set(decodeURIComponent(a.hash.slice(1)), a));
  const heads = [...document.querySelectorAll(".prose h2[id], .prose h3[id]")].filter((h) => links.has(h.id));
  if (heads.length && "IntersectionObserver" in window) {
    const ho = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((a) => a.classList.remove("active"));
          links.get(entry.target.id).classList.add("active");
        }
      });
    }, { rootMargin: "-96px 0px -70% 0px" });
    heads.forEach((h) => ho.observe(h));
  }
}
