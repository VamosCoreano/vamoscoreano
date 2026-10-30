/* ==========================================================================
   FILE: js/join.js
   Animaciones 3D, Parallax y Revelado para la Landing de Ventas
   ========================================================================== */
(function () {
  "use strict";

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
  const RM = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;

  /* 1. Progress Bar */
  const bar = $("#bar");
  let barTick = false;
  function updateBar() {
    if (!bar) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0})`;
    barTick = false;
  }
  window.addEventListener("scroll", () => {
    if (!barTick) { requestAnimationFrame(updateBar); barTick = true; }
  }, { passive: true });
  window.addEventListener("resize", updateBar, { passive: true });
  updateBar();

  /* 2. Scroll Reveal (.rv -> .in) */
  const reveals = $$(".rv");
  if (RM || !("IntersectionObserver" in window)) {
    reveals.forEach(el => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -5% 0px" });
    reveals.forEach(el => io.observe(el));
  }

  /* 3. 3D Tilt Effect & Glare (Apple/Stripe Vibe) */
  if (!RM) {
    const tiltElements = $$("[data-tilt], #boarding-pass");
    
    tiltElements.forEach(el => {
      let rafId = null;
      
      el.addEventListener("pointermove", (e) => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const pctX = (x / rect.width) - 0.5;
          const pctY = (y / rect.height) - 0.5;
          
          // Limitar ángulos
          const maxTilt = el.id === "boarding-pass" ? 8 : 4;
          const rx = (-pctY * maxTilt * 2).toFixed(2);
          const ry = (pctX * maxTilt * 2).toFixed(2);
          
          el.style.setProperty("--rx", `${rx}deg`);
          el.style.setProperty("--ry", `${ry}deg`);
          
          // Posición del resplandor (Glare)
          el.style.setProperty("--gx", `${x}px`);
          el.style.setProperty("--gy", `${y}px`);
          
          rafId = null;
        });
      }, { passive: true });
      
      el.addEventListener("pointerleave", () => {
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      });
    });

    /* Magnet Button Effect para el Gran CTA */
    const magnetBtn = $(".btn-huge");
    if (magnetBtn) {
      magnetBtn.addEventListener("pointermove", (e) => {
        requestAnimationFrame(() => {
          const r = magnetBtn.getBoundingClientRect();
          const mx = (e.clientX - r.left - r.width / 2) * 0.15;
          const my = (e.clientY - r.top - r.height / 2) * 0.25;
          magnetBtn.style.setProperty("--bx", `${mx}px`);
          magnetBtn.style.setProperty("--by", `${my}px`);
        });
      }, { passive: true });
      magnetBtn.addEventListener("pointerleave", () => {
        magnetBtn.style.setProperty("--bx", "0px");
        magnetBtn.style.setProperty("--by", "0px");
      });
    }
  }

})();