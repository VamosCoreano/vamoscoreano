/* ==========================================================================
   js/resource.js — resource.html 전용 인터랙션 엔진
   1. 상단 스크롤 진행바 (#bar)
   2. 카테고리 탭 필터링 (Todos / PDF / Guías / Podcast) + 해시(#pdf 등) 연동
   3. IntersectionObserver 스크롤 등장 (.rv -> .in)
   4. 리소스 카드 마우스 스포트라이트 (--x, --y) 및 마그네틱 버튼 (.b)
   ========================================================================== */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const RM = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  // 1. 상단 스크롤 프로그레스 바 (#bar)
  const bar = $("#bar");
  let barTicking = false;
  function updateBar() {
    if (!bar) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0})`;
    barTicking = false;
  }
  window.addEventListener("scroll", () => {
    if (!barTicking) {
      requestAnimationFrame(updateBar);
      barTicking = true;
    }
  }, { passive: true });
  window.addEventListener("resize", updateBar, { passive: true });
  updateBar();

  // 2. 스크롤 등장 애니메이션 (.rv -> .in)
  const rvItems = $$(".rv");
  if (RM || !("IntersectionObserver" in window)) {
    rvItems.forEach(el => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -4% 0px" });
    rvItems.forEach(el => io.observe(el));
  }

  // 3. 카테고리 탭 UI 필터링 ([Todos] / [PDF] / [Guías] / [Podcast])
  const tabs = $$(".res-tab[data-filter]");
  const portals = $$(".res-portal[data-category]");
  const pillarChips = $$(".res-pillar-chip[data-filter-trigger]");

  function activateCategory(cat, shouldScroll = false) {
    const targetCat = cat || "all";

    tabs.forEach(tab => {
      const isMatch = tab.dataset.filter === targetCat;
      tab.setAttribute("aria-selected", String(isMatch));
    });

    portals.forEach(portal => {
      const show = targetCat === "all" || portal.dataset.category === targetCat;
      if (show) {
        portal.classList.remove("is-hidden");
        if (!RM) {
          portal.classList.remove("is-filtering-in");
          void portal.offsetWidth; // Reflow for clean animation restart
          portal.classList.add("is-filtering-in");
        }
      } else {
        portal.classList.add("is-hidden");
        portal.classList.remove("is-filtering-in");
      }
    });

    if (shouldScroll) {
      const hub = $("#explorar");
      if (hub) hub.scrollIntoView({ behavior: RM ? "auto" : "smooth", block: "start" });
    }
    updateBar();
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      activateCategory(tab.dataset.filter, false);
    });
  });

  pillarChips.forEach(chip => {
    chip.addEventListener("click", e => {
      e.preventDefault();
      activateCategory(chip.dataset.filterTrigger, true);
    });
  });

  // URL 해시(#pdf, #guia, #podcast)로 직접 진입 시 해당 탭 자동 활성화
  const initialHash = location.hash.replace("#", "").toLowerCase();
  if (["pdf", "guia", "podcast"].includes(initialHash)) {
    activateCategory(initialHash, true);
  }

  // 4. 카드 마우스 스포트라이트 (--x, --y) 및 버튼 미세 자석 효과 (rAF 스로틀링)
  let pointerTicking = false;
  let lastEv = null;

  window.addEventListener("pointermove", e => {
    lastEv = e;
    if (!pointerTicking) {
      requestAnimationFrame(() => {
        if (!lastEv) return;
        const t = lastEv.target;
        const card = t.closest && t.closest(".res-item-card, .res-portal, .cd");
        if (card) {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--x", `${lastEv.clientX - r.left}px`);
          card.style.setProperty("--y", `${lastEv.clientY - r.top}px`);
        }

        const btn = t.closest && t.closest(".b");
        if (btn && !RM) {
          const r = btn.getBoundingClientRect();
          btn.style.setProperty("--bx", `${(lastEv.clientX - r.left - r.width / 2) * 0.16}px`);
          btn.style.setProperty("--by", `${(lastEv.clientY - r.top - r.height / 2) * 0.24}px`);
        }
        pointerTicking = false;
      });
      pointerTicking = true;
    }
  }, { passive: true });

  $$(".b").forEach(btn => {
    btn.addEventListener("pointerleave", () => {
      btn.style.setProperty("--bx", "0px");
      btn.style.setProperty("--by", "0px");
    });
  });
})();