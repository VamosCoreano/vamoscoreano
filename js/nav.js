/* ==========================================================================
   js/nav.js — 모바일 라이트모드 강제 + Stripe 스타일 플로팅 햄버거 & 풀스크린 익스팬드 메뉴
   ========================================================================== */
(function () {
  const d = document.documentElement;
  const th = document.getElementById("th");
  const mobileMQ = window.matchMedia("(max-width: 760px)");


  const THEME_KEY = "vc-theme";

  function getSavedTheme() {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      return saved === "dark" || saved === "light" ? saved : null;
    } catch (e) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}
  }

  // 1. 페이지 로드 및 뷰포트 전환 시 테마 복원 (모바일 강제 라이트 모드 & .join-page 예외 규칙 유지)
  function enforceMobileLightMode() {
    const isJoinPage = document.body && document.body.classList.contains("join-page");
    if (isJoinPage) {
      d.dataset.theme = "dark";
      return;
    }
    if (mobileMQ.matches) {
      d.dataset.theme = "light";
      return;
    }
    const saved = getSavedTheme();
    if (saved) {
      d.dataset.theme = saved;
    }
  }

  // 2. 실행 및 이벤트 리스너 바인딩
  enforceMobileLightMode();
  if (mobileMQ.addEventListener) {
    mobileMQ.addEventListener("change", enforceMobileLightMode);
  } else if (mobileMQ.addListener) {
    mobileMQ.addListener(enforceMobileLightMode);
  }

  // 데스크톱 다크모드 토글 버튼 (#th) + localStorage("vc-theme") 영속 저장
  if (th) {
    th.addEventListener("click", () => {
      if (document.body && document.body.classList.contains("join-page")) {
        return;
      }
      if (mobileMQ.matches) {
        d.dataset.theme = "light";
        return;
      }
      const dark = d.dataset.theme
        ? d.dataset.theme === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
      const nextTheme = dark ? "light" : "dark";
      d.dataset.theme = nextTheme;
      saveTheme(nextTheme);
    });
  }

  // [Task 2 & 3] 스트라이프 스타일 플로팅 햄버거 버튼 및 익스팬드 풀스크린 메뉴 자동 마운트
  function mountStripeMobileNav() {
    if (document.querySelector(".stripe-burger")) return;

    const currentPath = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    const logoHref = document.querySelector("header .logo")?.getAttribute("href") || "index.html";
    const basePrefix = logoHref.startsWith("../") ? "../" : "";
    const activeNavHref = document.querySelector("header nav a.on")?.getAttribute("href") || "";

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
    sheet.setAttribute("role", "dialog");
    sheet.setAttribute("aria-modal", "true");
    sheet.setAttribute("aria-label", "Menú de navegación");
    sheet.setAttribute("aria-hidden", "true");
    sheet.inert = true;

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
      fallbackLogo.href = basePrefix + "index.html";
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

      const isActive = currentPath === item.href || activeNavHref.endsWith(item.href);
      const a = document.createElement("a");
      a.className = "stripe-sheet-link" + (isActive ? " is-active" : "");
      a.href = basePrefix + item.href;
      if (isActive) {
        a.setAttribute("aria-current", "page");
      }

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
    upperWrap.setAttribute("role", "navigation");
    upperWrap.setAttribute("aria-label", "Navegación móvil");
    upperWrap.append(topBar, ul);

    // 하단 영역: 스트라이프 스타일 카탈로그 카드 + 2단 풀사이즈 CTA 버튼
    const bottomWrap = document.createElement("div");
    bottomWrap.className = "stripe-sheet-bottom";

    const promoBox = document.createElement("a");
    promoBox.className = "stripe-promo-box";
    promoBox.href = basePrefix + "class.html";
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
    primaryBtn.href = basePrefix + "join.html";
    primaryBtn.textContent = "Únete a la comunidad ›";

    const secondaryBtn = document.createElement("a");
    secondaryBtn.className = "stripe-btn-secondary";
    secondaryBtn.href = basePrefix + "contact.html";
    secondaryBtn.textContent = "Habla con nosotros";

    ctaStack.append(primaryBtn, secondaryBtn);
    bottomWrap.append(promoBox, ctaStack);

    sheet.append(upperWrap, bottomWrap);
    document.body.append(burger, sheet);

    const sheetLinks = [...sheet.querySelectorAll("a[href]")];
    const focusables = [burger, ...sheetLinks];

    // 배경 요소 inert 격리/복원 (기존에 inert였던 요소는 보존)
    function setBackgroundInert(open) {
      [...document.body.children].forEach(el => {
        if (el === burger || el === sheet || el.tagName === "SCRIPT") return;
        if (open) {
          if (!el.inert) {
            el.inert = true;
            el.dataset.menuInert = "1";
          }
        } else if (el.dataset.menuInert === "1") {
          el.inert = false;
          delete el.dataset.menuInert;
        }
      });
    }

    // 열기/닫기 상태 제어 함수
    function setMenuOpen(open, { restoreFocus = false } = {}) {
      document.body.classList.toggle("menu-open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Cerrar menú de navegación" : "Abrir menú de navegación");
      sheet.setAttribute("aria-hidden", String(!open));
      sheet.inert = !open;
      setBackgroundInert(open);

      if (!open && restoreFocus) {
        burger.focus();
      }
    }

    burger.addEventListener("click", () => {
      const isOpen = document.body.classList.contains("menu-open");
      setMenuOpen(!isOpen);
    });

    sheetLinks.forEach(link => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("keydown", e => {
      if (!document.body.classList.contains("menu-open")) return;

      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false, { restoreFocus: true });
        return;
      }

      if (e.key === "Tab") {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;

        if (e.shiftKey) {
          if (active === first || !focusables.includes(active)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last || !focusables.includes(active)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    });

    // 화면이 데스크톱 크기(>760px)로 넓어지면 열린 모바일 메뉴 자동 닫기
    if (mobileMQ.addEventListener) {
      mobileMQ.addEventListener("change", e => {
        if (!e.matches && document.body.classList.contains("menu-open")) {
          setMenuOpen(false);
        }
      });
    }
  }

  /* ==========================================================================
     [재사용 모듈] 서브 상단 캡슐 스위처 (SUB_NAV_GROUPS & mountSubCapsuleNav)
     - Cursos / Recursos 및 향후 확장될 섹션에서 공통으로 재사용 가능한 선언형 구조
     - 데스크톱 전용(모바일은 CSS에서 생략, 추후 햄버거 상세메뉴에 SUB_NAV_GROUPS 재사용 가능)
     - 스크롤을 내리면 숨겨지고(.is-hidden), 올리면 다시 떠오르는 방향 감지 엔진 내장
     ========================================================================== */
  const SUB_NAV_GROUPS = {
    cursos: {
      ariaLabel: "Submenú de cursos",
      items: [
        { id: "despegue", label: "Despegue", href: "class/despegue.html" },
        { id: "ascenso", label: "Ascenso", href: "class/ascenso.html" },
        { id: "viaje", label: "Viaje", href: "class/viaje.html" },
        { id: "conversacion", label: "Conversación", href: "class/conversacion.html" }
      ]
    },
    recursos: {
      ariaLabel: "Submenú de recursos",
      items: [
        { id: "pdf", label: "Materiales PDF", href: "resource/pdf.html" },
        { id: "guia", label: "Guías de Estudio", href: "resource/guia.html" },
        { id: "podcast", label: "Podcast", href: "resource/podcast.html" }
      ]
    }
  };

  function resolveSubNavKey(currentPath, activeNavHref) {
    const explicitKey = document.body.dataset.subnav?.toLowerCase();
    if (explicitKey && SUB_NAV_GROUPS[explicitKey]) return explicitKey;

    if (
      document.body.dataset.course ||
      activeNavHref.endsWith("class.html") ||
      currentPath === "class.html"
    ) {
      return "cursos";
    }

    if (
      activeNavHref.endsWith("resource.html") ||
      currentPath === "resource.html" ||
      currentPath.endsWith("-resource.html")
    ) {
      return "recursos";
    }

    return null;
  }

  function mountSubCapsuleNav() {
    if (document.querySelector(".sub-capsule-wrap")) return;
    const header = document.querySelector("header");
    if (!header) return;

    const currentPath = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    const logoHref = document.querySelector("header .logo")?.getAttribute("href") || "index.html";
    const basePrefix = logoHref.startsWith("../") ? "../" : "";
    const activeNavHref = document.querySelector("header nav a.on")?.getAttribute("href") || "";

    const groupKey = resolveSubNavKey(currentPath, activeNavHref);
    if (!groupKey) return;

    const group = SUB_NAV_GROUPS[groupKey];
    if (!group || !group.items.length) return;

    const activeCourseId = (
      document.body.dataset.course ||
      document.body.dataset.subitem ||
      ""
    ).toLowerCase();

    const wrap = document.createElement("div");
    wrap.className = "sub-capsule-wrap";

    const capsule = document.createElement("div");
    capsule.className = "sub-capsule";
    capsule.setAttribute("role", "navigation");
    capsule.setAttribute("aria-label", group.ariaLabel);

    const frag = document.createDocumentFragment();
    group.items.forEach((item, idx) => {
      if (idx > 0) {
        const dot = document.createElement("span");
        dot.className = "sub-capsule-dot";
        dot.setAttribute("aria-hidden", "true");
        frag.appendChild(dot);
      }

      const itemFile = item.href.split("/").pop().toLowerCase();
      const isActive = activeCourseId === item.id || currentPath === itemFile;

      const a = document.createElement("a");
      a.className = "sub-capsule-link" + (isActive ? " is-active" : "");
      a.href = basePrefix + item.href;
      a.textContent = item.label;
      if (isActive) {
        a.setAttribute("aria-current", "page");
      }
      frag.appendChild(a);
    });

    capsule.appendChild(frag);
    wrap.appendChild(capsule);
    header.insertAdjacentElement("afterend", wrap);

    // 스크롤 방향 감지: 아래로 내리면 숨기고(.is-hidden), 위로 올리면 다시 떠오름
    let lastY = Math.max(0, window.scrollY);
    let subNavTicking = false;

    const updateSubCapsuleVisibility = () => {
      subNavTicking = false;
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;

      if (y <= 24) {
        wrap.classList.remove("is-hidden");
        lastY = y;
      } else if (delta > 6 && y > 56) {
        wrap.classList.add("is-hidden");
        lastY = y;
      } else if (delta < -6) {
        wrap.classList.remove("is-hidden");
        lastY = y;
      }
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!subNavTicking) {
          requestAnimationFrame(updateSubCapsuleVisibility);
          subNavTicking = true;
        }
      },
      { passive: true }
    );

    // 키보드 Tab 포커스 진입 시 숨겨진 캡슐 즉시 표시 (접근성 보장)
    wrap.addEventListener("focusin", () => {
      wrap.classList.remove("is-hidden");
    });
  }

  function initNavigation() {
    mountStripeMobileNav();
    mountSubCapsuleNav();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNavigation);
  } else {
    initNavigation();
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
            const c = t.closest && t.closest(".sc,.cd,.mt,.rw,.action-card,.proof-item,.tutor-card-inner,.peek-card,.bento-card,.cta-banner-card,.julio-card,.res-item-card,.res-portal,.prog-card,.learn-card,.pdf-card");
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

    /* 5. Cursos: 3-Set 순환 링 버퍼(좌측 복제 4 + 중앙 원본 4 + 우측 복제 4 = 총 12장) 및 전 구간 버튼 인터랙션 보장 */
    (() => {
      const track = $("#peek-track");
      if (!track || track.dataset.peekInit === "1") return;

      const origCards = $$(".peek-card:not([data-clone])", track);
      if (!origCards.length) return;
      track.dataset.peekInit = "1";

      const setSize = origCards.length; // 원본 카드 개수 (4장)

      // 클론 생성 헬퍼: inert를 절대 부여하지 않아 모든 복제 카드의 버튼 클릭/호버 인터랙션을 100% 활성화
      // (스크린 리더 중복 읽기 방지용 aria-hidden과 키보드 Tab 중복 방지용 tabindex="-1"만 부여)
      const createCloneSet = () => {
        const frag = document.createDocumentFragment();
        origCards.forEach(card => {
          const clone = card.cloneNode(true);
          clone.dataset.clone = "true";
          clone.classList.add("in");
          clone.setAttribute("aria-hidden", "true");
          $$("a, button", clone).forEach(el => el.setAttribute("tabindex", "-1"));
          $$(".b", clone).forEach(q => q.addEventListener("pointerleave", () => {
            q.style.setProperty("--bx", "0px");
            q.style.setProperty("--by", "0px");
          }));
          frag.appendChild(clone);
        });
        return frag;
      };

      // 구조: [좌측 버퍼 세트(0~3)] - [중앙 원본 홈 세트(4~7)] - [우측 버퍼 세트(8~11)] (총 12장)
      track.insertBefore(createCloneSet(), origCards[0]);
      track.appendChild(createCloneSet());

      const allCards = $$(".peek-card", track);

      // 특정 인덱스의 카드를 트랙 정중앙에 맞추는 scrollLeft 좌표 계산
      const getCenterScroll = (index) => {
        const card = allCards[index];
        return card ? card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2 : 0;
      };

      const getStepWidth = () =>
        allCards.length > 1
          ? allCards[1].offsetLeft - allCards[0].offsetLeft
          : origCards[0].offsetWidth + 24;

      const getSetSpan = () => getCenterScroll(setSize * 2) - getCenterScroll(setSize);

      // 스냅/스무스 간섭 없이 단일 프레임 내에 좌표를 즉시 치환하고 인터랙션 잠금을 즉시 해제하는 헬퍼
      const setInstantScroll = (targetLeft) => {
        track.classList.add("is-spinning");
        track.scrollLeft = targetLeft;
        void track.offsetWidth; // 즉시 레이아웃 반영
        track.classList.remove("is-spinning");
      };

      // 초기 위치: 중앙 원본 홈 세트의 첫 카드(인덱스 4, 원본 DESPEGUE)를 정중앙에 배치
      // (좌측에는 인덱스 3 CONVERSACIÓN 카드가 자연스럽게 피크되어 빈 공간이 생기지 않음)
      setInstantScroll(getCenterScroll(setSize));

      // 2. 1.5초(1500ms) 동안 모듈러(Modular) 연산으로 2바퀴(8장 거리) 회전 후 원본 홈(인덱스 4)에 정지
      // 초기 랜딩 회전 중에는 마우스 호버/휠/클릭이 개입해 애니메이션을 멈추지 않도록 완전 보호
      let spun = false;
      let spinRafId = null;
      let spinFailSafeTimer = null;

      const spinRoulette = () => {
        if (spun) return;
        spun = true;

        // [READ 단계] 기하 좌표 선제 측정
        const homeX = getCenterScroll(setSize);       // 중앙 원본 DESPEGUE (인덱스 4)
        const setSpan = getSetSpan();                 // 1세트(4장)의 정확한 픽셀 주기

        // [WRITE 단계] 원본 카드 표시 전환
        origCards.forEach(c => c.classList.add("in"));

        if (RM || setSpan <= 0) {
          setInstantScroll(homeX);
          return;
        }

        track.classList.add("is-spinning");

        const totalDistance = setSpan * 2; // 정확히 2바퀴(8장 분량) 회전
        const duration = 1500;
        const t0 = performance.now();
        const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

        const finishSpin = () => {
          if (spinRafId !== null) {
            cancelAnimationFrame(spinRafId);
            spinRafId = null;
          }
          if (spinFailSafeTimer !== null) {
            clearTimeout(spinFailSafeTimer);
            spinFailSafeTimer = null;
          }
          // 도착 지점: 정확히 중앙 원본 DESPEGUE(인덱스 4)에 안착 후 is-spinning 해제(인터랙션 활성화)
          setInstantScroll(homeX);
        };

        const step = (now) => {
          const elapsed = now - t0;
          const progress = Math.min(1, elapsed / duration);

          if (progress < 1) {
            const traveled = totalDistance * easeOutQuint(progress);
            // [핵심] homeX ~ homeX + setSpan 구간 내에서 모듈러 순환하여 단 3세트(12장)만으로 무한 회전 구현
            track.scrollLeft = homeX + (traveled % setSpan);
            spinRafId = requestAnimationFrame(step);
          } else {
            finishSpin();
          }
        };

        spinRafId = requestAnimationFrame(step);
        // 탭 전환이나 브라우저 프레임 드랍 시에도 1.5초 후 반드시 인터랙션 잠금이 해제되도록 안전장치 부여
        spinFailSafeTimer = setTimeout(finishSpin, duration + 100);
      };

      // 3. 화면 20% 지점 도달 감지 (threshold: 0.2)
      new IntersectionObserver(([entry], obs) => {
        if (entry.isIntersecting) {
          spinRoulette();
          obs.disconnect();
        }
      }, { threshold: 0.2 }).observe(track);

      // 4. 사용자 터치 스와이프 / 트랙패드 스크롤 시 양방향 무한 루프 자동 복원
      let scrollIdleTimer = null;
      const normalizeInfiniteScroll = () => {
        if (spinRafId !== null) return;
        const stepW = getStepWidth();
        const setSpan = getSetSpan();
        if (setSpan <= 0) return;

        const homeStart = getCenterScroll(setSize);             // 인덱스 4 (원본 첫 카드)
        const homeEnd = getCenterScroll(setSize * 2 - 1);       // 인덱스 7 (원본 마지막 카드)

        if (track.scrollLeft < homeStart - stepW * 0.45) {
          setInstantScroll(track.scrollLeft + setSpan);
        } else if (track.scrollLeft > homeEnd + stepW * 0.45) {
          setInstantScroll(track.scrollLeft - setSpan);
        }
      };

      track.addEventListener("scroll", () => {
        if (spinRafId !== null) return;
        const setSpan = getSetSpan();
        if (setSpan > 0) {
          // 빠른 연속 플릭(Flick) 시 양 끝단(인덱스 1 이하 또는 인덱스 10 이상)에 도달하기 전 즉시 순환
          if (track.scrollLeft <= getCenterScroll(1)) {
            setInstantScroll(track.scrollLeft + setSpan);
          } else if (track.scrollLeft >= getCenterScroll(setSize * 3 - 2)) {
            setInstantScroll(track.scrollLeft - setSpan);
          }
        }
        clearTimeout(scrollIdleTimer);
        scrollIdleTimer = setTimeout(normalizeInfiniteScroll, 220);
      }, { passive: true });

      // 5. 좌우 화살표 버튼(#peek-prev, #peek-next) 중앙 스냅 및 무한 루프 보정 연동
      const prevBtn = $("#peek-prev"), nextBtn = $("#peek-next");

      const moveByStep = (dir) => {
        if (spinRafId !== null) return; // 초기 1.5초 랜딩 애니메이션 중에는 화살표 버튼 간섭 차단
        clearTimeout(scrollIdleTimer);

        const stepW = getStepWidth();
        const setSpan = getSetSpan();
        const homeStart = getCenterScroll(setSize);
        if (stepW <= 0 || setSpan <= 0) return;

        // 현재 스크롤 좌표를 기준으로 가장 가까운 카드 인덱스 산출 후 중앙 원본 세트(4~7) 범위로 정규화
        let curIdx = setSize + Math.round((track.scrollLeft - homeStart) / stepW);
        while (curIdx < setSize) {
          setInstantScroll(track.scrollLeft + setSpan);
          curIdx += setSize;
        }
        while (curIdx >= setSize * 2) {
          setInstantScroll(track.scrollLeft - setSpan);
          curIdx -= setSize;
        }

        // 경계(4번에서 이전, 7번에서 다음) 이동 시 반대편 복제 세트로 무결점 치환 후 중앙 원본 세트(4~7) 내부로 스무스 진입
        if (dir < 0 && curIdx <= setSize) {
          setInstantScroll(track.scrollLeft + setSpan);
          curIdx += setSize; // 4 -> 8 (다음 목표: 7번 원본 카드)
        } else if (dir > 0 && curIdx >= setSize * 2 - 1) {
          setInstantScroll(track.scrollLeft - setSpan);
          curIdx -= setSize; // 7 -> 3 (다음 목표: 4번 원본 카드)
        }

        const targetIdx = curIdx + dir;
        track.scrollTo({
          left: getCenterScroll(targetIdx),
          behavior: RM ? "auto" : "smooth"
        });
      };

      if (prevBtn) prevBtn.addEventListener("click", () => moveByStep(-1));
      if (nextBtn) nextBtn.addEventListener("click", () => moveByStep(1));
    })();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCommonEngines);
  } else {
    initCommonEngines();
  }
})();
