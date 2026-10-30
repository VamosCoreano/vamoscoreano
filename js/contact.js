/* ==========================================================================
   js/contact.js — interacciones exclusivas de contact.html
   1. Barra de progreso de scroll (#bar)
   2. Animación letra por letra del H1 (#h1)
   3. Revelado al hacer scroll (.rv -> .in)
   4. Foco de luz en tarjetas (--x, --y) e imán sutil en botones (.b)
   5. Copiar correo al portapapeles + toast (#copy-toast)
   ========================================================================== */
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var RM = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;

  /* 1. Barra de progreso */
  var bar = $("#bar");
  var barTick = false;

  function updateBar() {
    barTick = false;
    if (!bar) return;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    bar.style.transform = "scaleX(" + p + ")";
  }

  window.addEventListener("scroll", function () {
    if (barTick) return;
    barTick = true;
    requestAnimationFrame(updateBar);
  }, { passive: true });
  window.addEventListener("resize", updateBar, { passive: true });
  updateBar();

  /* 2. H1 letra por letra (conserva <br> y <em>) */
  var h1 = $("#h1");
  if (h1 && !RM) {
    var idx = 0;
    var wrap = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var frag = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(" "));
              return;
            }
            var word = document.createElement("span");
            word.className = "ch-word";
            word.setAttribute("aria-hidden", "true");
            Array.from(part).forEach(function (letter) {
              var ch = document.createElement("span");
              ch.className = "ch";
              ch.style.setProperty("--i", idx++);
              ch.textContent = letter;
              word.appendChild(ch);
            });
            frag.appendChild(word);
          });
          c.parentNode.replaceChild(frag, c);
        } else if (c.nodeType === 1) {
          wrap(c);
        }
      });
    };
    wrap(h1);
  }

  /* 3. Revelado al hacer scroll */
  var reveals = $$(".rv");
  if (RM || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -4% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* 4. Spotlight en tarjetas + imán en botones (throttle con rAF) */
  var SPOT = ".action-card, .cta-banner-card, .julio-card";
  var pTick = false;
  var lastEv = null;

  window.addEventListener("pointermove", function (e) {
    lastEv = e;
    if (pTick) return;
    pTick = true;
    requestAnimationFrame(function () {
      pTick = false;
      var ev = lastEv;
      if (!ev || !ev.target || !ev.target.closest) return;

      var card = ev.target.closest(SPOT);
      if (card) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--x", (ev.clientX - r.left) + "px");
        card.style.setProperty("--y", (ev.clientY - r.top) + "px");
      }

      if (!RM && ev.pointerType === "mouse") {
        var btn = ev.target.closest(".b");
        if (btn) {
          var br = btn.getBoundingClientRect();
          btn.style.setProperty("--bx", ((ev.clientX - br.left - br.width / 2) * 0.16) + "px");
          btn.style.setProperty("--by", ((ev.clientY - br.top - br.height / 2) * 0.24) + "px");
        }
      }
    });
  }, { passive: true });

  $$(".b").forEach(function (btn) {
    btn.addEventListener("pointerleave", function () {
      btn.style.setProperty("--bx", "0px");
      btn.style.setProperty("--by", "0px");
    });
  });

  /* 5. Copiar correo + toast */
  var toast = $("#copy-toast");
  var toastText = $("#toast-text");
  var toastTimer = null;

  function showToast(msg) {
    if (!toast || !toastText) return;
    toastText.textContent = msg;
    toast.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2800);
  }

  function legacyCopy(text) {
    try {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.className = "sr-only";
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, text.length);
      var ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch (err) {
      return false;
    }
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(
        function () { return true; },
        function () { return legacyCopy(text); }
      );
    }
    return Promise.resolve(legacyCopy(text));
  }

  $$("[data-copy]").forEach(function (btn) {
    var label = btn.textContent;
    var resetTimer = null;

    btn.addEventListener("click", function () {
      var value = btn.getAttribute("data-copy");
      copyText(value).then(function (ok) {
        if (ok) {
          showToast("Correo copiado al portapapeles: " + value);
          var done = btn.getAttribute("data-done");
          if (done) {
            btn.textContent = done;
            if (resetTimer) clearTimeout(resetTimer);
            resetTimer = setTimeout(function () { btn.textContent = label; }, 2000);
          }
        } else {
          showToast("No se pudo copiar. Dirección: " + value);
        }
      });
    });
  });
})();
