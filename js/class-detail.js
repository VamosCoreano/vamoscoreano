(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const RM = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  /* ==========================================================================
     [COURSE_DATA] 코스별 커리큘럼 데이터 사전 (data-course 속성으로 자동 매칭)
     - 각 세션 배열 구조: [한국어 제목, 스페인어 제목, 핵심 문법, 수업 내용(~구분), 예문(; 및 =구분), 단계 번호(1~N)]
     ========================================================================== */
  const COURSE_DATA = {
    despegue: {
      graduationText: "Tu graduación de Despegue.",
      sessions: [
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
      ]
    },

    // 추후 오픈될 코스들을 위한 슬롯 (동일한 데이터 구조로 채우기만 하면 즉시 렌더링)
    ascenso: {
      graduationText: "Tu graduación de Ascenso.",
      sessions: []
    },
    viaje: {
      graduationText: "Tu graduación de Expresiones para Viaje.",
      sessions: []
    },
    conversacion: {
      graduationText: "Tu graduación de Conversación y Cultura.",
      sessions: []
    }
  };

  const RK =
    '<svg class="rk" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c3 2 5 6 5 10l-2 4H9l-2-4c0-4 2-8 5-10zM9 16l-3 4 4-1M15 16l3 4-4-1"/><circle cx="12" cy="10" r="1.6"/></svg>';

  // 현재 페이지의 data-course 속성 감지 (기본값: despegue)
  const courseKey = (
    document.body.dataset.course ||
    $("[data-course]")?.dataset.course ||
    "despegue"
  ).toLowerCase();

  const course = COURSE_DATA[courseKey] || COURSE_DATA.despegue;
  const S = course.sessions;

  const its = $("#its");
  const tl_temario = $("#tl");
  let updateTimeline = null;

  if (its && S.length) {
    const itemsFrag = document.createDocumentFragment();

    S.forEach(([kr, es, g, c, x, ph], i) => {
      const fin = i === S.length - 1;
      const el = document.createElement("div");
      el.className = "it" + (fin ? " fin" : "");
      el.dataset.ph = ph;

      const li = (a) =>
        a ? "<ul>" + a.split("~").map((t) => `<li>${t}</li>`).join("") + "</ul>" : "";

      const ex = x
        ? x
            .split(";")
            .map((p) => {
              const [a, b] = p.split("=");
              return `<div class="xx">${a}<small>${b}</small></div>`;
            })
            .join("")
        : "";

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
                ${ex ? `<h4>Ejemplos</h4>${ex}` : `<h4>${fin ? "Cierre" : "Ejemplos"}</h4><p>${fin ? course.graduationText : "Se practican en clase."}</p>`}
              </div>
            </div>
          </div>
        </div>`;

      $(".rw", el).onclick = (e) => {
        const o = el.classList.toggle("open");
        e.currentTarget.setAttribute("aria-expanded", o);
      };
      itemsFrag.appendChild(el);
    });

    its.appendChild(itemsFrag);
  }

  // 스크롤 진입 시 각 세션 아이템(.it) 순차 표시
  const allItems = $$(".it");
  if (allItems.length) {
    const io_temario = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("vis");
            io_temario.unobserve(e.target);
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );

    allItems.forEach((el) =>
      RM ? el.classList.add("vis") : io_temario.observe(el)
    );
  }

  // 타임라인 수직 레일(.rail) 스크롤 게이지 연동
  if (tl_temario) {
    const railEl = $(".rail", tl_temario);
    const items = $$(".it", tl_temario);
    let tlTicking = false;

    updateTimeline = () => {
      tlTicking = false;
      if (!railEl) return;
      const ly = innerHeight * 0.6;

      // [1단계: READ 전용] 모든 기하 측정을 먼저 한 번에 수행
      const rr = railEl.getBoundingClientRect();
      const fh = Math.max(0, Math.min(rr.height, ly - rr.top));
      const passStates = items.map(
        (el) =>
          !el.classList.contains("hd") && el.getBoundingClientRect().top + 36 < ly
      );

      // [2단계: WRITE 전용] 측정값을 바탕으로 스타일·클래스 일괄 반영
      tl_temario.style.setProperty("--fh", fh + "px");
      items.forEach((el, idx) => {
        if (!el.classList.contains("hd")) {
          el.classList.toggle("pass", passStates[idx]);
        }
      });
    };

    addEventListener(
      "scroll",
      () => {
        if (!tlTicking) {
          requestAnimationFrame(updateTimeline);
          tlTicking = true;
        }
      },
      { passive: true }
    );
    updateTimeline();
  }
})();
