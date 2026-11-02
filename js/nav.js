/* ==========================================================================
   js/nav.js — 모바일 라이트모드 강제 + Stripe 스타일 플로팅 햄버거 & 풀스크린 익스팬드 메뉴
   ========================================================================== */
(function () {
  const d = document.documentElement;
  const th = document.getElementById("th");
  const mobileMQ = window.matchMedia("(max-width: 760px)");


// 1. 함수 내부에 join-page 예외 조건 추가
function enforceMobileLightMode() {
  if (mobileMQ.matches && !document.body.classList.contains('join-page')) {
    d.dataset.theme = "light";
  }
}

// 2. 실행 및 이벤트 리스너 바인딩 (원래대로 유지)
enforceMobileLightMode();
if (mobileMQ.addEventListener) {
  mobileMQ.addEventListener("change", enforceMobileLightMode);
} else if (mobileMQ.addListener) {
  mobileMQ.addListener(enforceMobileLightMode);
}

  // 데스크톱 다크모드 토글 버튼 (#th)
  if (th) {
    th.addEventListener("click", () => {
      if (mobileMQ.matches) {
        d.dataset.theme = "light";
        return;
      }
      const dark = d.dataset.theme
        ? d.dataset.theme === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
      d.dataset.theme = dark ? "light" : "dark";
    });
  }

  // [Task 2 & 3] 스트라이프 스타일 플로팅 햄버거 버튼 및 익스팬드 풀스크린 메뉴 자동 마운트
  function mountStripeMobileNav() {
    if (document.querySelector(".stripe-burger")) return;

    const currentPath = (location.pathname.split("/").pop() || "index.html").toLowerCase();

    // 1. 우측 상단 둥둥 떠 있는 햄버거 버튼 생성
    const burger = document.createElement("button");
    burger.type = "button";
    burger.className = "stripe-burger";
    burger.setAttribute("aria-label", "Abrir menú de navegación");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-controls", "stripe-mobile-sheet");

    const box = document.createElement("span");
    box.className = "stripe-burger-box";
    box.setAttribute("aria-hidden", "true");
    for (let i = 0; i < 3; i++) {
      const line = document.createElement("span");
      line.className = "stripe-burger-line";
      box.appendChild(line);
    }
    burger.appendChild(box);

    // 2. 햄버거에서 화면 전체로 익스팬드되는 풀스크린 메뉴 시트 생성
    const sheet = document.createElement("aside");
    sheet.className = "stripe-sheet";
    sheet.id = "stripe-mobile-sheet";
    sheet.setAttribute("aria-hidden", "true");

    // 상단 영역 (로고 복제)
    const topBar = document.createElement("div");
    topBar.className = "stripe-sheet-top";
    const origLogo = document.querySelector("header .logo");
    if (origLogo) {
      const logoClone = origLogo.cloneNode(true);
      topBar.appendChild(logoClone);
    } else {
      const fallbackLogo = document.createElement("a");
      fallbackLogo.className = "logo";
      fallbackLogo.href = "index.html";
      fallbackLogo.textContent = "Vamos Coreano";
      topBar.appendChild(fallbackLogo);
    }

    // 중앙 메뉴 리스트 (Nosotros, Cursos, Recursos, Contacto)
    const menuItems = [
      { label: "Nosotros", href: "about.html" },
      { label: "Cursos", href: "class.html" },
      { label: "Recursos", href: "resource.html" },
      { label: "Contacto", href: "contact.html" }
    ];

    const ul = document.createElement("ul");
    ul.className = "stripe-sheet-nav";

    menuItems.forEach((item, idx) => {
      const li = document.createElement("li");
      li.className = "stripe-sheet-item";
      li.style.setProperty("--m", String(idx));

      const a = document.createElement("a");
      a.className = "stripe-sheet-link" + (currentPath === item.href ? " is-active" : "");
      a.href = item.href;

      const textSpan = document.createElement("span");
      textSpan.textContent = item.label;

      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("class", "stripe-sheet-chevron");
      svg.setAttribute("width", "18");
      svg.setAttribute("height", "18");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("fill", "none");
      svg.setAttribute("stroke", "currentColor");
      svg.setAttribute("stroke-width", "2.4");
      svg.setAttribute("stroke-linecap", "round");
      svg.setAttribute("stroke-linejoin", "round");
      svg.setAttribute("aria-hidden", "true");

      const path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", "m9 18 6-6-6-6");
      svg.appendChild(path);

      a.append(textSpan, svg);
      li.appendChild(a);
      ul.appendChild(li);
    });

    const upperWrap = document.createElement("div");
    upperWrap.append(topBar, ul);

    // 하단 영역: 스트라이프 스타일 카탈로그 카드 + 2단 풀사이즈 CTA 버튼
    const bottomWrap = document.createElement("div");
    bottomWrap.className = "stripe-sheet-bottom";

    const promoBox = document.createElement("a");
    promoBox.className = "stripe-promo-box";
    promoBox.href = "class.html";
    const promoTitle = document.createElement("strong");
    promoTitle.className = "stripe-promo-title";
    promoTitle.textContent = "Ver todos los cursos";
    const promoDesc = document.createElement("span");
    promoDesc.className = "stripe-promo-desc";
    promoDesc.textContent = "Explora nuestro programa completo diseñado 100% para hispanohablantes.";
    promoBox.append(promoTitle, promoDesc);

    const ctaStack = document.createElement("div");
    ctaStack.className = "stripe-cta-stack";

    const primaryBtn = document.createElement("a");
    primaryBtn.className = "stripe-btn-primary";
    primaryBtn.href = "join.html";
    primaryBtn.textContent = "Únete a la comunidad ›";

    const secondaryBtn = document.createElement("a");
    secondaryBtn.className = "stripe-btn-secondary";
    secondaryBtn.href = "contact.html";
    secondaryBtn.textContent = "Habla con nosotros";

    ctaStack.append(primaryBtn, secondaryBtn);
    bottomWrap.append(promoBox, ctaStack);

    sheet.append(upperWrap, bottomWrap);
    document.body.append(burger, sheet);

    // 열기/닫기 상태 제어 함수
    function setMenuOpen(open) {
      document.body.classList.toggle("menu-open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Cerrar menú de navegación" : "Abrir menú de navegación");
      sheet.setAttribute("aria-hidden", String(!open));
    }

    burger.addEventListener("click", () => {
      const isOpen = document.body.classList.contains("menu-open");
      setMenuOpen(!isOpen);
    });

    sheet.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
        setMenuOpen(false);
      }
    });

    // 화면이 데스크톱 크기(>760px)로 넓어지면 열린 모바일 메뉴 자동 닫기
    if (mobileMQ.addEventListener) {
      mobileMQ.addEventListener("change", e => {
        if (!e.matches) setMenuOpen(false);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountStripeMobileNav);
  } else {
    mountStripeMobileNav();
  }
})();

/* ==========================================================================
   공통 5대 엔진 (진행바, .rv 리빌, 스포트라이트, 자석 버튼, 가로 룰렛)
   ========================================================================== */
(function () {
  function initCommonEngines() {
    const $ = (s, r = document) => r.querySelector(s),
          $$ = (s, r = document) => [...r.querySelectorAll(s)];
    const RM = window.matchMedia ? window.matchMedia("(prefers-reduced-motion:reduce)").matches : false;

    /* 1. scroll: progress (#bar) */
    const bar = $("#bar");

    function tick() {
      if (!bar) return;
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    }
    window.tick = tick;

    addEventListener("scroll", tick, { passive: true });
    addEventListener("resize", tick);
    tick();

    /* 2. reveal (.rv -> .in) + counters ([data-n]) */
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      const n = e.target.matches("[data-n]") ? e.target : e.target.querySelector("[data-n]");
      if (n && !n.done) {
        n.done = 1;
        const T = +n.dataset.n, t0 = performance.now(), f = t => {
          const k = Math.min(1, (t - t0) / 1400);
          n.textContent = Math.round(T * (1 - Math.pow(1 - k, 3)));
          k < 1 && requestAnimationFrame(f);
        };
        RM ? n.textContent = T : requestAnimationFrame(f);
      }
      io.unobserve(e.target);
    }), { threshold: .25 });

    $$("section h2").filter(h => !h.closest(".rv") && !h.classList.contains("somos-title") && !h.classList.contains("sr-only")).forEach(h => h.classList.add("rv"));
    $$(".rv,.ls").forEach(el => RM ? el.classList.add("in") : io.observe(el));

    /* 3 & 4. spotlight (--x, --y) & imán (.b --bx, --by) */
    (() => {
      let ticking = false;
      let latestEvent = null;

      addEventListener("pointermove", e => {
        latestEvent = e; // 1. 최신 마우스 위치만 기억해둠
        
        if (!ticking) {
          requestAnimationFrame(() => { // 2. 브라우저 렌더링 주기에 맞춤
            if (!latestEvent) return;
            const ev = latestEvent;
            
            const t = ev.target;
            const c = t.closest && t.closest(".sc,.cd,.mt,.rw,.action-card,.proof-item,.tutor-card-inner,.peek-card,.bento-card,.cta-banner-card,.julio-card,.res-item-card,.res-portal");
            if (c) {
              const r = c.getBoundingClientRect(); // 3. 부하가 걸리지 않도록 주기에 맞춰 안전하게 실행
              c.style.setProperty("--x", ev.clientX - r.left + "px");
              c.style.setProperty("--y", ev.clientY - r.top + "px");
            }
            
            const q = t.closest && t.closest(".b");
            if (q && !RM) {
              const r = q.getBoundingClientRect();
              q.style.setProperty("--bx", (ev.clientX - r.left - r.width / 2) * .18 + "px");
              q.style.setProperty("--by", (ev.clientY - r.top - r.height / 2) * .28 + "px");
            }
            
            ticking = false; // 4. 다음 움직임을 받을 준비 완료
          });
          
          ticking = true;
        }
      }, { passive: true });
      
      $$(".b").forEach(q => q.addEventListener("pointerleave", () => {
        q.style.setProperty("--bx", "0px");
        q.style.setProperty("--by", "0px");
      }));
    })();

    /* 5. Cursos: 화면 20% 도달 시 2바퀴(2초) 회전 후 DESPEGUE 정중앙 정지 */
    (() => {
      const track = $("#peek-track");
      if (!track) return;

      const origCards = $$(".peek-card", track);
      if (!origCards.length) return;

      // 1. 앞뒤로 카드 세트를 복제하여 2바퀴 이상 돌 수 있는 물리적 트랙 확보 (총 4세트 = 16장)
      // 구조: [세트0(앞 여유분)] - [세트1(시작점)] - [세트2] - [세트3(2바퀴 도착점: DESPEGUE)]
      for (let s = 0; s < 3; s++) {
        origCards.forEach(card => {
          const clone = card.cloneNode(true);
          clone.classList.add("in"); // 복제 카드는 투명하지 않게 즉시 표시
          clone.setAttribute("aria-hidden", "true");
          clone.inert = true;
          track.append(clone);
        });
      }

      const allCards = $$(".peek-card", track);
      const setSize = origCards.length; // 4장

      // 특정 인덱스의 카드를 트랙 정중앙에 맞추는 scrollLeft 좌표 계산 함수
      const getCenterScroll = (index) => {
        const card = allCards[index];
        return card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
      };

      // 초기 위치: 첫 번째 카드(인덱스 0, DESPEGUE)를 중앙에 세팅
      track.classList.add("is-spinning");
      track.scrollLeft = getCenterScroll(0);
      requestAnimationFrame(() => track.classList.remove("is-spinning"));

      // 2. 2초(2000ms) 동안 2바퀴(카드 8장분) 돌아 인덱스 8(3번째 세트 DESPEGUE)에 멈추는 함수
      let spun = false;
      const spinRoulette = () => {
        if (spun) return;
        spun = true;
        origCards.forEach(c => c.classList.add("in"));
        // 모션 감소 설정(접근성) 켜진 경우 회전 없이 즉시 중앙 정렬
        if (RM) {
          track.scrollLeft = getCenterScroll(setSize);
          return;
        }

        track.classList.add("is-spinning");

        const startX = getCenterScroll(0);          // 출발: 0번 (첫 세트 DESPEGUE)
        const targetX = getCenterScroll(setSize * 2); // 도착: 8번 (정확히 2바퀴 뒤 DESPEGUE)
        const distance = targetX - startX;
        const duration = 1500; // 요청하신 2초(2000ms) 여유 있는 회전
        const t0 = performance.now();

        // Quintic Out 곡선: 초반엔 휙휙 돌고 끝에서 부드럽고 묵직하게 감속
        const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

        const step = (now) => {
          const elapsed = now - t0;
          const progress = Math.min(1, elapsed / duration);
          track.scrollLeft = startX + distance * easeOutQuint(progress);

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            // 3. 정지 직후: 눈치채지 못하게 가운데 세트(인덱스 4, DESPEGUE)로 좌표를 치환해
            // 이후 사용자가 좌/우 어느 쪽으로든 화살표나 드래그를 할 수 있게 여유 공간 확보
            track.scrollLeft = getCenterScroll(setSize);
            track.classList.remove("is-spinning");
          }
        };

        requestAnimationFrame(step);
      };

      // 4. 화면 20% 지점 도달 감지 (threshold: 0.2)
      new IntersectionObserver(([entry], obs) => {
        if (entry.isIntersecting) {
          spinRoulette();
          obs.disconnect(); // 최초 1회만 실행
        }
      }, { threshold: 0.2 }).observe(track);

      // 5. 좌우 화살표 버튼(#peek-prev, #peek-next) 중앙 스냅 이동 연동
      const prevBtn = $("#peek-prev"), nextBtn = $("#peek-next");
      const stepWidth = () => origCards[0].offsetWidth + 24; // 카드 폭 + gap(24px)

      if (prevBtn) prevBtn.onclick = () => track.scrollBy({ left: -stepWidth(), behavior: "smooth" });
      if (nextBtn) nextBtn.onclick = () => track.scrollBy({ left: stepWidth(), behavior: "smooth" });
    })();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCommonEngines);
  } else {
    initCommonEngines();
  }
})();