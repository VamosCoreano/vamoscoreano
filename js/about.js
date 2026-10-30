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
  /* ==========================================================================
     [TASK 2] 이름 3D 플립 오토 티저 (입장 -> 1초 후 '이현호.' -> 1초 후 'Hyunho Lee.')
     - 페이지 입장 후 사용자에게 "이 이름에 마우스를 올리면 뒤집힌다"는 힌트를 1회 자동 시연
     ========================================================================== */
  var nameFlip = document.querySelector(".name-flip");
  if (nameFlip && !RM) {
    // 1. 페이지 입장 1초(1000ms) 후: '이현호.'로 플립!
    var flipInTimer = setTimeout(function () {
      nameFlip.classList.add("is-flipped");
    }, 1000);

    // 2. 그로부터 1초 뒤(총 2000ms 시점): 다시 'Hyunho Lee.'로 원상 복구!
    var flipOutTimer = setTimeout(function () {
      nameFlip.classList.remove("is-flipped");
    }, 2000);

    // 3. [디테일 방어] 만약 자동 시연 도중 사용자가 직접 마우스를 올리면,
    //    자동 타이머를 즉시 끄고 사용자의 마우스 호버에 제어권을 100% 넘김
    nameFlip.addEventListener("pointerenter", function () {
      clearTimeout(flipInTimer);
      clearTimeout(flipOutTimer);
      nameFlip.classList.remove("is-flipped"); // 이후엔 순수 CSS :hover로만 작동
    }, { once: true });
  }
})();
