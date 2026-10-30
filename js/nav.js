/* ==========================================================================
   js/nav.js — 모바일 라이트모드 강제 + Stripe 스타일 플로팅 햄버거 & 풀스크린 익스팬드 메뉴
   ========================================================================== */
(function () {
  const d = document.documentElement;
  const th = document.getElementById("th");
  const mobileMQ = window.matchMedia("(max-width: 760px)");

  // [Task 1] 모바일 뷰포트(<=760px) 접속 시 항상 밝은 모드(light) 강제
  function enforceMobileLightMode() {
    if (mobileMQ.matches) {
      d.dataset.theme = "light";
    }
  }

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