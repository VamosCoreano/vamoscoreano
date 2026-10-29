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
      const m = $("#mq");
      m.innerHTML += m.innerHTML;
      $(".ct .kr").innerHTML = [..."안녕하세요"].map((c, i) => `<span style="--i:${i}">${c}</span>`).join("");
      
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

    /* hangul burst */
    $("#go").onclick = e => {
      const r = e.currentTarget.getBoundingClientRect(), L = ["안", "녕", "하", "세", "요", "한", "글", "ㅎ", "ㅏ", "ㄴ", "ㄱ", "ㅁ"];
      if (RM) return;
      for (let i = 0; i < 22; i++) {
        const s = document.createElement("span");
        s.className = "cf";
        s.textContent = L[i % L.length];
        s.style.left = r.left + r.width / 2 + "px";
        s.style.top = r.top + r.height / 2 + "px";
        s.style.color = ["#2563EB", "#60A5FA", "#94A3B8"][i % 3];
        document.body.append(s);
        const a = Math.random() * Math.PI * 2, d = 90 + Math.random() * 170;
        s.animate([
          { transform: "translate(-50%,-50%) scale(.4)", opacity: 1 },
          { transform: `translate(calc(-50% + ${Math.cos(a) * d}px),calc(-50% + ${Math.sin(a) * d - 70}px)) rotate(${Math.random() * 240 - 120}deg) scale(1)`, opacity: 0 }
        ], { duration: 1100 + Math.random() * 500, easing: "cubic-bezier(.2,.8,.3,1)" }).onfinish = () => s.remove();
      }
    };
    
    /* 탁상달력 플립 타이머 (2.2초마다 촤르륵) */
(() => {
  const cards = document.querySelectorAll(".calendar-flip .flip-card");
  if (!cards.length) return;
  
  let current = 0;
  setInterval(() => {
    const prev = current;
    current = (current + 1) % cards.length;
    
    cards[prev].classList.remove("active");
    cards[prev].classList.add("exit");
    
    cards[current].classList.remove("exit");
    cards[current].classList.add("active");
  }, 2200);
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
});