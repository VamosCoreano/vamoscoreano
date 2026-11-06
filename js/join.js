/* ==========================================================================
   FILE: js/join.js — join.html 전용 3D 틸트 & 글레어 인터랙션
   (공통 진행바 #bar, .rv 리빌, .b 자석 버튼은 js/nav.js에서 통합 처리)
   ========================================================================== */
(function () {
  "use strict";

  const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
  const RM = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  /* 3D Tilt Effect & Glare (Apple/Stripe Vibe) */
  if (!RM) {
    const tiltElements = $$("[data-tilt], #boarding-pass");

    tiltElements.forEach((el) => {
      let rafId = null;

      el.addEventListener(
        "pointermove",
        (e) => {
          if (rafId) return;
          rafId = requestAnimationFrame(() => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const pctX = x / rect.width - 0.5;
            const pctY = y / rect.height - 0.5;

            const maxTilt = el.id === "boarding-pass" ? 8 : 4;
            const rx = (-pctY * maxTilt * 2).toFixed(2);
            const ry = (pctX * maxTilt * 2).toFixed(2);

            el.style.setProperty("--rx", `${rx}deg`);
            el.style.setProperty("--ry", `${ry}deg`);

            el.style.setProperty("--gx", `${x}px`);
            el.style.setProperty("--gy", `${y}px`);

            rafId = null;
          });
        },
        { passive: true }
      );

      el.addEventListener("pointerleave", () => {
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      });
    });
  }
})();
