/* ==========================================================================
   FILE: js/contact.js — contact.html 전용 인터랙션
   (공통 진행바 #bar, .rv 리빌, 카드 스포트라이트, .b 자석 버튼은 js/nav.js에서 통합 처리)
   1. H1 글자별 스플릿 애니메이션 (#h1)
   2. 이메일 클립보드 복사 및 토스트 알림 (#copy-toast, [data-copy])
   ========================================================================== */
(function () {
  "use strict";

  var $ = function (s, r) {
    return (r || document).querySelector(s);
  };
  var $$ = function (s, r) {
    return Array.prototype.slice.call((r || document).querySelectorAll(s));
  };
  var RM = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  /* 1. H1 letra por letra (conserva <br> y <em>) */
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

  /* 2. Copiar correo + toast */
  var toast = $("#copy-toast");
  var toastText = $("#toast-text");
  var toastTimer = null;

  function showToast(msg) {
    if (!toast || !toastText) return;
    toastText.textContent = msg;
    toast.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 2800);
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
        function () {
          return true;
        },
        function () {
          return legacyCopy(text);
        }
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
            resetTimer = setTimeout(function () {
              btn.textContent = label;
            }, 2000);
          }
        } else {
          showToast("No se pudo copiar. Dirección: " + value);
        }
      });
    });
  });
})();
