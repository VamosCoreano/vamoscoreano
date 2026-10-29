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

    /* scroll: progress, rail */
    const tl = $("#tl"), bar = $("#bar");

    function tick() {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    }

    addEventListener("scroll", tick, { passive: true });
    addEventListener("resize", tick);
    tick();

    /* reveal + counters */
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

    $$("section h2").filter(h => !h.closest(".rv") && !h.classList.contains("somos-title")).forEach(h => h.classList.add("rv"));
    $$(".rv,.ls").forEach(el => io.observe(el));

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

      // 최적화된 코드 (`requestAnimationFrame` 스로틀링 적용 ✨)
let ticking = false;
let latestEvent = null;

addEventListener("pointermove", e => {
  latestEvent = e; // 1. 최신 마우스 위치만 기억해둠
  
  if (!ticking) {
    requestAnimationFrame(() => { // 2. 브라우저 렌더링 주기에 맞춤
      if (!latestEvent) return;
      const ev = latestEvent;
      
      const t = ev.target;
      const c = t.closest && t.closest(".sc,.cd,.mt,.rw,.action-card,.proof-item,.tutor-card-inner,.peek-card,.bento-card");
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

/* 탁상달력 플립 타이머 (중복 제거 + 웹폰트 로드 및 리사이즈 완벽 대응) */
(() => {
  const wrap = document.querySelector(".calendar-flip");
  const cards = document.querySelectorAll(".calendar-flip .flip-card");
  if (!wrap || !cards.length) return;
  
  let current = 0;

  // 현재 활성화된 카드의 실제 폭을 측정해 반영하는 함수
  const updateWidth = () => {
    wrap.style.width = cards[current].offsetWidth + "px";
  };

  // 1. 초기 폭 설정
  updateWidth();

  // 2. 웹폰트(Bricolage Grotesque) 로딩이 끝난 직후 정확한 폭으로 재계산
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(updateWidth);
  }

  // 3. 브라우저 창 크기를 조절할 때도 반응형 폰트 크기에 맞춰 폭 재계산
  window.addEventListener("resize", updateWidth, { passive: true });

  // 4. 2.2초마다 순차 플립 (단일 타이머)
  setInterval(() => {
    const prev = current;
    current = (current + 1) % cards.length;
    
    cards[prev].classList.remove("active");
    cards[prev].classList.add("exit");
    
    cards[current].classList.remove("exit");
    cards[current].classList.add("active");

    updateWidth();
  }, 2200);
})();
/* Cursos: 화면 20% 도달 시 2바퀴(2초) 회전 후 DESPEGUE 정중앙 정지 */
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