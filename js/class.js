     const $ = (s, r = document) => r.querySelector(s),
           $$ = (s, r = document) => [...r.querySelectorAll(s)];
    const RM = window.matchMedia ? window.matchMedia("(prefers-reduced-motion:reduce)").matches : false;

    const PN = ["Todas", "Hangul y presentación", "Acciones y lugares", "Números y compras", "Los tres tiempos", "Expresarte y conectar"];
    const S = [
      ["인사하고 자기소개 하기 / 한글 1", "Saludar y presentarse · Hangul 1", "S이에요/예요", "Consonantes ㅇ ㄴ ㅁ ㄹ~Vocales ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ~Saludar y presentar el nombre", "안녕하세요=Hola;저는 마리아예요=Soy María", 1],
      ["국적 말하기 / 한글 2", "Hablar de la nacionalidad · Hangul 2", "S이에요/예요", "Consonantes ㄱ ㄷ ㅂ ㅅ ㅈ ㅎ~Vocales ㅐ ㅔ ㅚ ㅟ~Hablar de la nacionalidad", "저는 콜롬비아 사람이에요=Soy colombiano/a;저는 멕시코 사람이에요=Soy mexicano/a", 1],
      ["직업 말하기 / 한글 3", "Hablar de las profesiones · Hangul 3", "S이에요/예요", "Consonantes ㅋ ㅌ ㅍ ㅊ~Vocales ㅑ ㅕ ㅛ ㅠ ㅒ ㅖ~Concepto de consonante final (Batchim)~Hablar de las profesiones", "저는 학생이에요=Soy estudiante;저는 가수예요=Soy cantante", 1],
      ["사물 묻고 답하기 / 한글 4", "Preguntar y responder sobre objetos · Hangul 4", "S은/는 S이에요/예요", "Consonantes ㄲ ㄸ ㅃ ㅆ ㅉ~Vocales ㅘ ㅝ ㅙ ㅞ ㅢ~Preguntar por objetos", "이것은 뭐예요?=¿Qué es esto?;이것은 커피예요=Esto es café", 1],
      ["부정 표현하기 1", "Expresar negación 1", "S은/는 S이/가 아니에요", "Repaso de Hangul~Ser (이에요/예요) vs. no ser (아니에요)", "저는 멕시코 사람이 아니에요=No soy mexicano/a;후안은 가수가 아니에요=Juan no cantante", 1],
      ["일상생활 동작 말하기", "Hablar de acciones cotidianas", "V + -아요/-어요/-해요", "Repaso de Hangul~Conjugación básica del presente~Concepto de raíz verbal", "밥을 먹어요=Como;커피를 마셔요=Bebo café", 2],
      ["문장 넓히기 (목적어)", "Ampliar oraciones: acción y objeto", "", "", "", 2],
      ["부정 표현하기 2", "Expresar negación 2", "S은/는 S을/를 안 V", "Repaso de Hangul~Uso de la negación básica~Negación “안” con verbos~Concepto de partícula", "저는 밥을 안 먹어요=Yo no como;저는 커피를 안 마셔요=Yo no tomo café", 2],
      ["위치와 존재 말하기", "Expresar ubicación y existencia", "S이/가 S에 있어요/없어요", "Ubicación y existencia~Partícula de lugar -에", "우산이 있어요=Hay un paraguas;우산이 방에 있어요=Hay un paraguas en la habitación", 2],
      ["장소와 행동 말하기", "Hablar de acciones en un lugar", "-에/-에서", "Partículas de lugar: -에 vs. -에서~Sustantivos de ubicación", "어디에서 공부해요?=¿Dónde estudia?;집에서 한국어를 공부해요=Estudio coreano en casa", 2],
      ["중간 점검 및 종합 연습", "Repaso intermedio y práctica general", "종합 복습 및 활용", "Repaso acumulativo de las sesiones 1–9~Juego de adivinar personajes~Hablar de objetos en una habitación~Escuchar y describir un espacio~Encontrar errores en oraciones", "컵이 책상 위에 있어요=La taza está sobre el escritorio", 2],
      ["숫자 읽기 1 (한자어)", "Leer los números 1 (sino-coreanos)", "숫자 (한자어)", "Números sino-coreanos 1–10, 100, 1.000, 10.000~Fechas y días de la semana", "오월 구 일이에요=Es el 9 de mayo", 3],
      ["숫자 읽기 2 (고유어)", "Leer los números 2 (nativos coreanos)", "숫자 (고유어) + 단위 명사 (개, 명, 살)", "Números nativos coreanos 1–100~Contadores (개, 명) y edad (살)", "딸기 한 개 얼마예요?=¿Cuánto cuesta una fresa?;사과 다섯 개는 오천 원이에요=Cinco manzanas cuestan 5.000 wones", 3],
      ["시간 묻고 물건 사기", "Preguntar la hora y hacer compras", "숫자(고유어) 시 + 숫자(한자어) 분", "Hora nativa + minutos sino-coreanos~Preguntar y responder la hora~Práctica general de los números", "몇 시예요?=¿Qué hora es?;세 시 사십오 분이에요=Son las 3 y 45", 3],
      ["과거 경험 말하기", "Hablar de experiencias pasadas", "V + -았/었/했어요", "Sufijo de tiempo pasado (-았/었/했-)", "어제 밥을 먹었어요=Ayer comí;금요일에 학교에 갔어요=El viernes fui a la escuela", 4],
      ["현재 진행 상황 말하기", "Hablar de acciones en curso", "V + -고 있어요", "Describir acciones en curso (presente continuo)", "마리아는 지금 음악을 듣고 있어요=María está escuchando música ahora", 4],
      ["미래 계획 말하기", "Hablar de planes futuros", "V + -(으)ㄹ 거예요", "Adverbios de tiempo futuro~Hablar de planes o agendas futuras", "내일 학교에 갈 거예요=Mañana iré a la escuela", 4],
      ["시제 종합 연습 (과거/현재/미래)", "Práctica de tiempos verbales (pasado, presente, futuro)", "", "Práctica combinada de los 3 tiempos verbales~Uso de vocabulario de tiempo futuro", "아침에 밥을 먹었어요=Desayuné por la mañana", 4],
      ["상태 및 감정 표현하기", "Expresar estados y emociones", "A + -아요/어요", "Uso de adjetivos básicos~Conjugación de adjetivos~Tener hambre, dolerse, estar cansado, etc.", "저는 배고파요=Tengo hambre;동생은 피곤해요=Mi hermano/a menor está cansado/a", 5],
      ["이유 말하기", "Expresar causas y motivos", "A/V + -아서/-어서", "Causas y motivos~Conectar oraciones con causa y efecto", "저는 피곤해서 지금 자요=Me duermo ahora porque estoy cansado", 5],
      ["희망사항 표현하기", "Expresar deseos", "V + -고 싶어요", "Deseos y planes con -고 싶어요~Hablar de lo que se quiere hacer", "저는 한국에 가고 싶어요=Quiero ir a Corea", 5],
      ["요청하기", "Hacer peticiones e instrucciones", "V + -(으)세요", "Instrucciones y peticiones~Pedir favores o dar indicaciones", "여기에 앉으세요=Tome asiento aquí, por favor", 5],
      ["제안하기", "Hacer sugerencias", "V + -(으)ㄹ래요?", "Simulación de situaciones: cafetería, estación~Toda la gramática aprendida", "내일 영화관에 갈래요?=¿Quieres ir al cine mañana?", 5],
      ["문장 연결하기", "Conectar oraciones", "A/V + -지만 · A/V + -고", "Conjunción adversativa -지만 (pero)~Conjunción copulativa -고 (y, además)", "한국어는 어렵지만 재미있어요=El coreano es difícil, pero divertido", 5],
      ["최종 발표 및 졸업식 하기", "Presentación final y graduación de Despegue", "종합 복습 및 활용", "Escritura final y sesión de preguntas~Feedback general y resumen~Entrega de certificados", "", 5]
    ];
    
    const RK = '<svg class="rk" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c3 2 5 6 5 10l-2 4H9l-2-4c0-4 2-8 5-10zM9 16l-3 4 4-1M15 16l3 4-4-1"/><circle cx="12" cy="10" r="1.6"/></svg>';
    const its = $("#its");

    if (its) {
      S.forEach(([kr, es, g, c, x, ph], i) => {
        const fin = i === S.length - 1;
        const el = document.createElement("div");
        el.className = "it" + (fin ? " fin" : "");
        el.dataset.ph = ph;
        
        const li = a => a ? "<ul>" + a.split("~").map(t => `<li>${t}</li>`).join("") + "</ul>" : "";
        
        const ex = x ? x.split(";").map(p => {
          const [a, b] = p.split("=");
          return `<div class="xx">${a}<small>${b}</small></div>`;
        }).join("") : "";
        
        el.innerHTML = `
          <button class="rw" aria-expanded="false">
            <span class="no">${fin ? RK : i + 1}</span>
            <span><b>${es}</b><small class="kr">${kr}</small></span>
            <span class="pl">
              <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <path d="M6 1v10M1 6h10"/>
              </svg>
            </span>
          </button>
          <div class="pn">
            <div>
              <div class="pi">
                <div>
                  ${g ? `<h4>Estructura gramatical</h4><span class="gm">${g}</span>` : ""}
                  ${c ? `<h4>Contenido de la clase</h4>${li(c)}` : `<h4>Contenido</h4><p>Ampliar oraciones combinando acción y objeto.</p>`}
                </div>
                <div>
                  ${ex ? `<h4>Ejemplos</h4>${ex}` : `<h4>${fin ? "Cierre" : "Ejemplos"}</h4><p>${fin ? "Tu graduación de Despegue." : "Se practican en clase."}</p>`}
                </div>
              </div>
            </div>
          </div>`;
        
        $(".rw", el).onclick = e => {
          const o = el.classList.toggle("open");
          e.currentTarget.setAttribute("aria-expanded", o);
        };
        its.append(el);
      });

      PN.forEach((n, i) => {
        const b = document.createElement("button");
        b.className = "fb";
        b.textContent = n;
        b.setAttribute("aria-pressed", i === 0);
        b.onclick = () => {
          $$(".fb").forEach(x => x.setAttribute("aria-pressed", x === b)); 
          $$(".it").forEach(el => {
            const h = i && +el.dataset.ph !== i;
            el.classList.toggle("hd", h);
            if (!h) {
              el.classList.remove("ent");
              requestAnimationFrame(() => {
                if (!h) el.classList.add("ent");
              });
            }
          });
          // 필요한 경우 class.html의 스크롤 업데이트 함수 호출
          if (typeof tick === 'function') tick(); 
        };
        $("#fl2").append(b);
      });
    }

    const io_temario = new IntersectionObserver(es => es.forEach(e => { 
      if (e.isIntersecting) { 
        e.target.classList.add("vis"); 
        io_temario.unobserve(e.target); 
      } 
    }), { threshold: .15, rootMargin: "0px 0px -6% 0px" });      
    
    $$(".it").forEach(el => typeof RM !== 'undefined' && RM ? el.classList.add("vis") : io_temario.observe(el));

    // <script> 태그 내 최하단(scroll 이벤트 위쪽)에 추가
  const revealTargets = $$(".rv");
  const io_rv = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    e.target.classList.add("in");
    io_rv.unobserve(e.target);
  }
  }), { threshold: .15 });
  revealTargets.forEach(el => typeof RM !== 'undefined' && RM ? el.classList.add("in") : io_rv.observe(el));

// (기존 코드: tl_temario 스크롤 이벤트 끝부분)
    const tl_temario = $("#tl");
    if(tl_temario) {
      addEventListener("scroll", () => {
        const vh = innerHeight;
        const rr = $(".rail", tl_temario).getBoundingClientRect();
        const ly = vh * 0.6; 
        tl_temario.style.setProperty("--fh", Math.max(0, Math.min(rr.height, ly - rr.top)) + "px");  
        $$(".it").forEach(el => {
          if (el.offsetParent) el.classList.toggle("pass", el.getBoundingClientRect().top + 36 < ly);
        });
      }, { passive: true });
    }

    /* =====================================================================
       👇 [여기에 추가 1] index.js에서 가져온 코스 카드 룰렛 회전 & 좌우 화살표 제어
       ===================================================================== */
    (() => {
      const track = $("#peek-track");
      if (!track) return;

      const origCards = $$(".peek-card", track);
      if (!origCards.length) return;

      // 1. 앞뒤로 카드 세트를 복제하여 2바퀴 이상 돌 수 있는 물리적 트랙 확보 (총 4세트)
      for (let s = 0; s < 3; s++) {
        origCards.forEach(card => {
          const clone = card.cloneNode(true);
          clone.classList.add("in"); // 복제된 카드는 투명하지 않게 즉시 표시
          clone.setAttribute("aria-hidden", "true");
          clone.inert = true;
          track.append(clone);
        });
      }

      const allCards = $$(".peek-card", track);
      const setSize = origCards.length; // 원본 카드 개수 (4개면 4, 5개면 5로 자동 계산됨)

      // 특정 인덱스의 카드를 화면 정중앙에 맞추는 scrollLeft 좌표 계산 함수
      const getCenterScroll = (index) => {
        const card = allCards[index];
        return card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
      };

      // 초기 위치: 첫 번째 카드(DESPEGUE)를 정중앙에 세팅
      track.classList.add("is-spinning");
      track.scrollLeft = getCenterScroll(0);
      requestAnimationFrame(() => track.classList.remove("is-spinning"));

      // 2. 화면에 트랙이 보이면 1.5초 동안 2바퀴 돌아 DESPEGUE 정중앙에 멈추는 함수
      let spun = false;
      const spinRoulette = () => {
        if (spun) return;
        spun = true;
        origCards.forEach(c => c.classList.add("in"));
        
        if (RM) {
          track.scrollLeft = getCenterScroll(setSize);
          return;
        }

        track.classList.add("is-spinning");

        const startX = getCenterScroll(0);            // 출발: 0번 세트 DESPEGUE
        const targetX = getCenterScroll(setSize * 2); // 도착: 정확히 2바퀴 뒤 DESPEGUE
        const distance = targetX - startX;
        const duration = 1500;                        // 1.5초 동안 시원하게 회전 후 감속
        const t0 = performance.now();

        const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

        const step = (now) => {
          const elapsed = now - t0;
          const progress = Math.min(1, elapsed / duration);
          track.scrollLeft = startX + distance * easeOutQuint(progress);

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            // 정지 직후 가운데 세트로 좌표를 치환해 좌우 어느 쪽으로든 화살표 이동이 가능하게 만듦
            track.scrollLeft = getCenterScroll(setSize);
            track.classList.remove("is-spinning");
          }
        };

        requestAnimationFrame(step);
      };

      // 3. 스크롤을 내려 코스 트랙이 화면에 20% 보일 때 룰렛 스타트!
      new IntersectionObserver(([entry], obs) => {
        if (entry.isIntersecting) {
          spinRoulette();
          obs.disconnect();
        }
      }, { threshold: 0.2 }).observe(track);

      // 4. 우측 상단 좌/우 화살표 버튼(#peek-prev, #peek-next) 클릭 시 카드 1장씩 부드럽게 이동
      const prevBtn = $("#peek-prev"), nextBtn = $("#peek-next");
      const stepWidth = () => origCards[0].offsetWidth + 24; // 카드 폭 + 간격(24px)

      if (prevBtn) prevBtn.onclick = () => track.scrollBy({ left: -stepWidth(), behavior: "smooth" });
      if (nextBtn) nextBtn.onclick = () => track.scrollBy({ left: stepWidth(), behavior: "smooth" });
    })();

    /* =====================================================================
       👇 [여기에 추가 2] 마우스를 올렸을 때 카드(.peek-card)와 타임라인(.rw)이 은은하게 빛나는 효과
       ===================================================================== */
    addEventListener("pointermove", e => {
      const c = e.target.closest && e.target.closest(".peek-card, .rw");
      if (c) {
        const r = c.getBoundingClientRect();
        c.style.setProperty("--x", e.clientX - r.left + "px");
        c.style.setProperty("--y", e.clientY - r.top + "px");
      }
    }, { passive: true });
