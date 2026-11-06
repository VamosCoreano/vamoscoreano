/* ==========================================================================
   FILE: js/about.js — about.html 전용 인터랙션
   (공통 진행바 #bar, .rv 리빌, 카드 스포트라이트, .b 자석 버튼은 js/nav.js에서 통합 처리)
   1. 이름 3D 달력 플립 오토 티저 & 호버 제어 (.name-flip)
   2. LA MISIÓN 전용 그라데이션 필인 옵저버 (.somos-title)
   ========================================================================== */
(function () {
  "use strict";

  var $$ = function (s, r) {
    return Array.prototype.slice.call((r || document).querySelectorAll(s));
  };
  var RM = window.matchMedia && matchMedia("(prefers-reduced-motion:reduce)").matches;

  /* 1. 이름 3D 달력 플립 오토 티저 & 호버 제어 (.name-flip 모두 지원)
     - Hyunho Lee <-> 이현호, Julio Márquez <-> 이인우 등 모든 .name-flip 요소에 공통 작동
     - 각 이름이 화면에 들어올 때 0.9초 후 한국어 이름으로 플립 -> 1초 후 스페인어 이름으로 복귀 */
  var nameFlips = $$(".name-flip");
  if (nameFlips.length && !RM) {
    var runFlipTeaser = function (el) {
      if (el.dataset.flipTeased === "1") return;
      el.dataset.flipTeased = "1";

      var flipInTimer = setTimeout(function () {
        el.classList.add("is-flipped");
      }, 900);

      var flipOutTimer = setTimeout(function () {
        el.classList.remove("is-flipped");
      }, 1900);

      el.addEventListener(
        "pointerenter",
        function () {
          clearTimeout(flipInTimer);
          clearTimeout(flipOutTimer);
          el.classList.remove("is-flipped");
        },
        { once: true }
      );
    };

    if ("IntersectionObserver" in window) {
      var flipObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            runFlipTeaser(entry.target);
            flipObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.5 }
      );

      nameFlips.forEach(function (el) {
        flipObserver.observe(el);
      });
    } else {
      nameFlips.forEach(runFlipTeaser);
    }
  }

  /* 2. LA MISIÓN 전용: 화면 중간(-25%)에 도달했을 때 그라데이션 잉크가 차오름 (index.js와 동일 로직) */
  var somosEl = document.querySelector(".somos-title");
  if (somosEl) {
    if (RM || !("IntersectionObserver" in window)) {
      somosEl.classList.add("in");
    } else {
      new IntersectionObserver(
        function (entries, obs) {
          if (entries[0].isIntersecting) {
            entries[0].target.classList.add("in");
            obs.disconnect();
          }
        },
        { rootMargin: "0px 0px -25% 0px" }
      ).observe(somosEl);
    }
  }
})();
