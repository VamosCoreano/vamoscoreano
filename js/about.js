/* about.html: barra de progreso, revelado en cascada y foco de luz en tarjetas */
(function () {
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var RM = window.matchMedia && matchMedia("(prefers-reduced-motion:reduce)").matches;

  /* barra de progreso de scroll */
  var bar = document.getElementById("bar");
  function tick() {
    if (!bar) return;
    var max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = "scaleX(" + (max > 0 ? scrollY / max : 0) + ")";
  }
  addEventListener("scroll", tick, { passive: true });
  addEventListener("resize", tick);
  tick();

  /* los h2 también se revelan (activa la línea naranja bajo el título) */
  $$("section h2").forEach(function (h) { h.classList.add("rv"); });

  /* revelado: al llegar al 20% del elemento aparece; --d escalona de arriba-izquierda a abajo-derecha */
  var els = $$(".rv");
  if (RM || !("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        io.unobserve(e.target);
      });
    }, { threshold: 0.2 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* foco de luz que sigue al cursor sobre las tarjetas de valores */
  var ticking = false, last = null;
  addEventListener("pointermove", function (ev) {
    last = ev;
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var c = last.target.closest && last.target.closest(".cd");
      if (c) {
        var r = c.getBoundingClientRect();
        c.style.setProperty("--x", last.clientX - r.left + "px");
        c.style.setProperty("--y", last.clientY - r.top + "px");
      }
      ticking = false;
    });
  }, { passive: true });
})();
