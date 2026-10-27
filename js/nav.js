(function () {
  const th = document.getElementById("th");
  if (!th) return;
  th.addEventListener("click", () => {
    const d = document.documentElement;
    const dark = d.dataset.theme ? d.dataset.theme === "dark" : matchMedia("(prefers-color-scheme:dark)").matches;
    d.dataset.theme = dark ? "light" : "dark";
  });
})();

(function () {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  const label = toggle.querySelector(".visually-hidden");

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    if (label) {
      label.textContent = open ? "Cerrar menú" : "Abrir menú";
    }
  }

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
})();

/* Sección 4 슬라이드 좌우 버튼 작동 */
(() => {
  const track = $("#peek-track"), prev = $("#peek-prev"), next = $("#peek-next");
  if (!track || !prev || !next) return;
  const step = () => (track.querySelector(".peek-card")?.offsetWidth || 360) + 24;
  prev.onclick = () => track.scrollBy({ left: -step(), behavior: "smooth" });
  next.onclick = () => track.scrollBy({ left: step(), behavior: "smooth" });
})();