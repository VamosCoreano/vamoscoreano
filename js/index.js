document.addEventListener("DOMContentLoaded", () => {    
    
    const $ = (s, r = document) => r.querySelector(s),
          $$ = (s, r = document) => [...r.querySelectorAll(s)];
    const RM = window.matchMedia ? window.matchMedia("(prefers-reduced-motion:reduce)").matches : false;
    
    /* headline letters */
    (() => {
      const h = $("#h1");
      let i = 0;
      const wrap = (n) => {
        [...n.childNodes].forEach(c => {
          if (c.nodeType === 3) {
            const f = document.createDocumentFragment();
            c.textContent.split(/(\s+)/).forEach(w => {
              if (!w) return;
              if (/^\s+$/.test(w)) {
                f.append(" ");
                return;
              }
              const s = document.createElement("span");
              s.style.display = "inline-block";
              s.setAttribute("aria-hidden", "true");
              [...w].forEach(l => {
                const x = document.createElement("span");
                x.className = "ch";
                x.style.setProperty("--i", i++);
                x.textContent = l;
                s.append(x);
              });
              f.append(s);
            });
            c.replaceWith(f);
          } else {
            wrap(c);
          }
        });
      };
      wrap(h);
    })();

    /* Lógica de Notificación Toast y Copia */
    const toast = $("#copy-toast"), toastText = $("#toast-text");
    let toastTimer = null;
    
    function showToast(m) {
      if (!toast) return;
      toastText.textContent = m;
      toast.classList.add("show");
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove("show");
      }, 2800);
    }

    const copyBtn = $("#copy-email");
    if (copyBtn) {
      copyBtn.onclick = async () => {
        const email = "1219.hlee@gmail.com";
        try {
          await navigator.clipboard.writeText(email);
          showToast("Correo copiado al portapapeles: " + email);
        } catch (e) {
          showToast("Dirección: " + email);
        }
      };
    }

    /* SOMOS 전용: 화면 중간(-25%)에 왔을 때만 차오름 */
    const somosEl = $(".somos-title");
    if (somosEl) {
      new IntersectionObserver(([e], obs) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          obs.disconnect();
        }
      }, { rootMargin: "0px 0px -25% 0px" }).observe(somosEl);
    }

    /* fondo, cinta, spotlight, imán */
    (() => {
      const b = $(".bg"), G = [..."ㅎㅏㄴㄱㅡㄹ한글가나다라마바사"];
      if (!RM) {
        for (let i = 0; i < 16; i++) {
          const g = document.createElement("i");
          g.className = "gl";
          g.textContent = G[i % G.length];
          g.style.cssText = `left:${(i * 37 + 8) % 96}%;--s:${1.6 + i % 4 * .9}rem;animation-duration:${26 + i * 3}s;animation-delay:-${i * 4}s`;
          b.append(g);
        }
      }
    })();

/* 탁상달력 플립 타이머 (강제 동기 레이아웃 제거 + 폭 캐싱 + Reduced Motion/가시성 제어) */
(() => {
  const wrap = document.querySelector(".calendar-flip");
  const cards = document.querySelectorAll(".calendar-flip .flip-card");
  if (!wrap || !cards.length) return;

  let current = 0;
  let cardWidths = [];
  let timerId = null;
  let resizeRaf = null;
  let inView = true;

  const motionMQ = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null;

  // [READ/WRITE 분리] 초기화·웹폰트 로드 완료·리사이즈 시점에만 4개 단어 폭을 일괄 측정해 메모리에 캐싱
  const measureAndApplyWidth = () => {
    cardWidths = [...cards].map(c => c.offsetWidth);
    if (cardWidths[current] > 0) {
      wrap.style.width = cardWidths[current] + "px";
    }
  };

  // 플립 실행 시점에는 DOM Read(offsetWidth) 없이 캐싱된 폭만 즉시 반영 (강제 동기 리플로우 0회)
  const applyCachedWidth = () => {
    const w = cardWidths[current] || cards[current].offsetWidth;
    wrap.style.width = w + "px";
  };

  // 1. 초기 폭 측정 및 반영
  measureAndApplyWidth();

  // 2. 웹폰트(Bricolage Grotesque) 로딩이 끝난 직후 정확한 폭으로 재측정
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(measureAndApplyWidth);
  }

  // 3. 브라우저 창 크기를 조절할 때 rAF 스로틀링으로 반응형 폰트 크기에 맞춰 재측정
  window.addEventListener("resize", () => {
    if (resizeRaf !== null) return;
    resizeRaf = requestAnimationFrame(() => {
      resizeRaf = null;
      measureAndApplyWidth();
    });
  }, { passive: true });

  // 4. 2.2초 순차 플립 1스텝 함수 (내부에서 offsetWidth를 읽지 않아 Layout Thrashing 원천 차단)
  const stepFlip = () => {
    const prev = current;
    current = (current + 1) % cards.length;

    cards[prev].classList.remove("active");
    cards[prev].classList.add("exit");

    cards[current].classList.remove("exit");
    cards[current].classList.add("active");

    applyCachedWidth();
  };

  // 5. 타이머 생명주기 제어: 모션 감소(WCAG 2.2.2/2.3.3), 백그라운드 탭, 화면 밖 스크롤 시 자동 일시정지
  const shouldRun = () => {
    const reduced = motionMQ ? motionMQ.matches : RM;
    return !reduced && !document.hidden && inView;
  };

  const syncTimer = () => {
    if (shouldRun()) {
      if (timerId === null) {
        timerId = setInterval(stepFlip, 2200);
      }
    } else if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }
  };

  // 히어로 영역이 화면에서 벗어나면 플립 중지 (하단 섹션 스크롤 중 상단 width 변경 리플로우 방지)
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncTimer();
    }, { threshold: 0 }).observe(wrap);
  }

  document.addEventListener("visibilitychange", syncTimer);
  if (motionMQ && motionMQ.addEventListener) {
    motionMQ.addEventListener("change", syncTimer);
  }

  syncTimer();
})();
  /* ÚNETE: 듀얼 코어 카드 3D 틸트(기울기) & 홀로그램 반사광(Glare) 제어 */
  (() => {
    const card = $("#unete-card");
    if (!card || RM) return; // 모션 감소 환경에서는 고정

    let rafId = null;

    card.addEventListener("pointermove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // 카드 내 마우스 X 좌표
      const y = e.clientY - rect.top;  // 카드 내 마우스 Y 좌표

      // 중심점(0.5, 0.5) 기준 -1 ~ +1 비율 계산
      const pctX = (x / rect.width) - 0.5;
      const pctY = (y / rect.height) - 0.5;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          // 너무 과하지 않고 고급스러운 최대 ±5도 틸트
          card.style.setProperty("--rx", `${(-pctY * 8).toFixed(2)}deg`);
          card.style.setProperty("--ry", `${(pctX * 10).toFixed(2)}deg`);
          // 홀로그램 반사광 위치 업데이트
          card.style.setProperty("--gx", `${x}px`);
          card.style.setProperty("--gy", `${y}px`);
          rafId = null;
        });
      }
    }, { passive: true });

    // 마우스가 카드를 벗어나면 스르륵 원래 각도(0deg)로 복귀
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  })();

});
