const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

// ===== Palabra dinámica: Habla → Lee → Escribe, sin salir nunca de una línea =====
const word = document.getElementById("dynamic-word");
const words = ["Habla", "Lee", "Escribe"];
const HOLD_MS = 2600;                                   // tiempo que se queda cada palabra
const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
const EASE_IN = "cubic-bezier(0.3, 0, 0.8, 0.15)";
let index = 0;

async function nextWord() {
  // Salida corta y discreta
  await word.animate(
    [{ opacity: 1, filter: "blur(0)", transform: "translateY(0)" },
     { opacity: 0, filter: "blur(8px)", transform: "translateY(-0.12em)" }],
    { duration: 260, easing: EASE_IN, fill: "forwards" }
  ).finished;

  // Cambia el texto y anima el ancho, para que "Coreano" se deslice en vez de saltar
  const from = word.offsetWidth;
  index = (index + 1) % words.length;
  word.textContent = words[index];
  const to = word.offsetWidth;
  word.animate([{ width: `${from}px` }, { width: `${to}px` }], { duration: 520, easing: EASE_OUT });

  // Entrada más larga, desde abajo y desenfocada
  word.animate(
    [{ opacity: 0, filter: "blur(8px)", transform: "translateY(0.12em)" },
     { opacity: 1, filter: "blur(0)", transform: "translateY(0)" }],
    { duration: 520, easing: EASE_OUT, fill: "forwards" }
  );
}

if (!prefersReducedMotion) {
  setTimeout(function loop() {
    nextWord().finally(() => setTimeout(loop, HOLD_MS));
  }, HOLD_MS + 1200); // la primera espera incluye la entrada del titular
}

// ===== Dock: magnificación sutil según la distancia del puntero a cada icono =====
const dock = document.querySelector(".dock");
const items = [...dock.querySelectorAll(".dock__item")];
const MAX_SCALE = 1.25;   // tamaño máximo del icono más cercano (crece dentro de su botón)
const RANGE_PX = 140;     // distancia a partir de la cual ya no crece
const canHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

if (canHover && !prefersReducedMotion) {
  dock.addEventListener("pointermove", (event) => {
    for (const item of items) {
      const rect = item.getBoundingClientRect();
      const distance = Math.abs(event.clientX - (rect.left + rect.width / 2));
      const strength = Math.max(0, 1 - distance / RANGE_PX);
      const eased = strength * strength * (3 - 2 * strength); // curva suave, sin bordes
      item.style.setProperty("--scale", (1 + (MAX_SCALE - 1) * eased).toFixed(3));
    }
  });
  dock.addEventListener("pointerleave", () => {
    for (const item of items) item.style.setProperty("--scale", "1");
  });
}

// ===== Hangul flotando: cada hueco cambia de palabra mientras es invisible =====
const hangulWords = ["사람", "친구", "가족", "선생님", "학생", "집", "학교", "회사", "식당", "병원",
  "오늘", "내일", "어제", "지금", "시간", "책", "물", "돈", "시계", "전화",
  "가다", "오다", "먹다", "마시다", "보다", "듣다", "자다", "하다", "사다", "일하다",
  "공부하다", "만나다", "알다", "모르다", "주다", "크다", "작다", "좋다", "나쁘다", "많다",
  "적다", "비싸다", "싸다", "바쁘다", "재미있다", "그리고", "하지만", "누구", "무엇", "어디"];
const slots = [...document.querySelectorAll(".hangul span")];
let nextHangul = 0;

for (const slot of slots) {
  slot.textContent = hangulWords[nextHangul++ % hangulWords.length];
  slot.style.animationDelay = `${-Math.random() * parseFloat(slot.style.getPropertyValue("--d"))}s`;
  slot.addEventListener("animationiteration", () => {
    slot.textContent = hangulWords[nextHangul++ % hangulWords.length];
  });
}

// Oculta los caracteres que quedarían cerca del titular o del dock en la pantalla actual
const CLEARANCE_PX = 40; // margen libre alrededor del titular y del dock (cubre también su recorrido de ±24px)
const headline = document.querySelector(".headline");

function keepTextClear() {
  const line = headline.getBoundingClientRect();
  // El titular cambia de ancho con cada palabra: se protege su franja completa, de borde a borde
  const zones = [{ left: 0, right: innerWidth, top: line.top, bottom: line.bottom }, dock.getBoundingClientRect()];
  for (const slot of slots) {
    // offset* ignora el transform de la animación: es la posición base del hueco
    const box = {
      left: slot.offsetLeft - CLEARANCE_PX,
      right: slot.offsetLeft + slot.offsetWidth + CLEARANCE_PX,
      top: slot.offsetTop - CLEARANCE_PX,
      bottom: slot.offsetTop + slot.offsetHeight + CLEARANCE_PX,
    };
    const overlaps = zones.some((z) => box.left < z.right && box.right > z.left && box.top < z.bottom && box.bottom > z.top);
    slot.classList.toggle("is-hidden", overlaps);
  }
}

document.fonts.ready.then(keepTextClear);
addEventListener("resize", keepTextClear);

// ===== Cristal traductor: cada pocos segundos (o al pasar el cursor) una palabra del fondo se traduce =====
// PENDIENTE: revisar las traducciones con Hyunho (algunas palabras tienen más de un significado)
const translations = {
  "사람": "persona", "친구": "amigo", "가족": "familia", "선생님": "profesor", "학생": "estudiante",
  "집": "casa", "학교": "escuela", "회사": "empresa", "식당": "restaurante", "병원": "hospital",
  "오늘": "hoy", "내일": "mañana", "어제": "ayer", "지금": "ahora", "시간": "tiempo",
  "책": "libro", "물": "agua", "돈": "dinero", "시계": "reloj", "전화": "teléfono",
  "가다": "ir", "오다": "venir", "먹다": "comer", "마시다": "beber", "보다": "ver",
  "듣다": "escuchar", "자다": "dormir", "하다": "hacer", "사다": "comprar", "일하다": "trabajar",
  "공부하다": "estudiar", "만나다": "encontrarse", "알다": "saber", "모르다": "no saber", "주다": "dar",
  "크다": "grande", "작다": "pequeño", "좋다": "bueno", "나쁘다": "malo", "많다": "mucho",
  "적다": "poco", "비싸다": "caro", "싸다": "barato", "바쁘다": "ocupado", "재미있다": "divertido",
  "그리고": "y", "하지만": "pero", "누구": "quién", "무엇": "qué", "어디": "dónde",
};

const glass = document.querySelector(".glass");
const glassText = glass.querySelector(".glass__text");
const GLASS_EVERY_MS = 8000;  // pausa entre una traducción automática y la siguiente
const FOCUS_HOLD_MS = 1500;   // fase 2: la palabra se queda nítida en coreano
const SPANISH_HOLD_MS = 1800; // fase 4: tiempo que se ve la traducción
const PAD_X = 16;             // margen interior del cristal alrededor del texto
const PAD_Y = 8;
const EDGE_PX = 8;            // distancia mínima a los bordes de la pantalla
const ZONE_GAP_PX = 16;       // distancia mínima al titular y al dock
const SPANISH_SCALE = 0.8;    // la traducción va al 80% del tamaño del hangul (el latino ocupa más ancho)...
const SPANISH_MAX_PX = 26;    // ...y nunca más de 26px (5vw en móvil): el panel central no pierde protagonismo
const WORD_MAX_PX = 44;       // solo se traducen palabras medianas o pequeñas
const EASE_SETTLE = "cubic-bezier(0.34, 1.4, 0.64, 1)"; // entrada con un asentamiento elástico muy leve
const EASE_IN_OUT = "cubic-bezier(0.65, 0, 0.35, 1)";
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mide un texto con una fuente concreta, sin mostrarlo
const measurer = document.createElement("span");
measurer.className = "glass__measure";
measurer.setAttribute("aria-hidden", "true");
document.body.append(measurer);

function textSize(text, font) {
  measurer.style.font = font;
  measurer.textContent = text;
  const { width, height } = measurer.getBoundingClientRect();
  return { width, height };
}

function spanishFont(word) {
  const size = Math.min(parseFloat(getComputedStyle(word).fontSize) * SPANISH_SCALE, SPANISH_MAX_PX, innerWidth * 0.05);
  return `700 ${size}px / 1 "Plus Jakarta Sans", sans-serif`;
}

// Caja del cristal centrada en la palabra, con el tamaño del texto más su margen
function glassBox(word, size) {
  const r = word.getBoundingClientRect();
  const width = Math.ceil(size.width + PAD_X * 2);
  const height = Math.ceil(size.height + PAD_Y * 2);
  const left = Math.min(Math.max(EDGE_PX, r.left + r.width / 2 - width / 2), innerWidth - EDGE_PX - width);
  const top = r.top + r.height / 2 - height / 2;
  return { left, top, width, height };
}

function boxesFor(word) {
  const r = word.getBoundingClientRect();
  const korean = glassBox(word, { width: r.width, height: r.height });
  const spanish = glassBox(word, textSize(translations[word.textContent], spanishFont(word)));
  return { korean, spanish };
}

// El cristal (en coreano y en español) no puede tocar el titular, el dock ni salir de la pantalla
function fitsClear({ korean, spanish }) {
  const line = headline.getBoundingClientRect();
  const zones = [{ left: 0, right: innerWidth, top: line.top, bottom: line.bottom }, dock.getBoundingClientRect()];
  return [korean, spanish].every((b) =>
    b.left >= EDGE_PX - 0.5 && b.left + b.width <= innerWidth - EDGE_PX + 0.5 && b.top >= EDGE_PX && b.top + b.height <= innerHeight - EDGE_PX &&
    zones.every((z) => b.left + b.width + ZONE_GAP_PX <= z.left || b.left - ZONE_GAP_PX >= z.right ||
                       b.top + b.height + ZONE_GAP_PX <= z.top || b.top - ZONE_GAP_PX >= z.bottom));
}

function pickWord() {
  const candidates = slots.filter((slot) =>
    !slot.classList.contains("is-hidden") &&
    translations[slot.textContent] &&
    parseFloat(getComputedStyle(slot).fontSize) <= WORD_MAX_PX &&
    parseFloat(getComputedStyle(slot).opacity) > 0.6 * parseFloat(slot.style.getPropertyValue("--a")) &&
    fitsClear(boxesFor(slot)));
  return candidates[Math.floor(Math.random() * candidates.length)];
}

const toFrame = (b) => ({ left: `${b.left}px`, top: `${b.top}px`, width: `${b.width}px`, height: `${b.height}px` });

// Partículas de luz muy ligeras alrededor del cristal
function sparkle(box) {
  for (let i = 0; i < 6; i++) {
    const spark = document.createElement("span");
    spark.className = "spark";
    const onTop = Math.random() < 0.5;
    const x = box.left + Math.random() * box.width;
    const y = onTop ? box.top : box.top + box.height;
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    document.body.append(spark);
    const drift = (onTop ? -1 : 1) * (8 + Math.random() * 14);
    spark.animate(
      [{ opacity: 0, transform: "translate(-50%, -50%) scale(0.3)" },
       { opacity: 0.7, transform: `translate(-50%, calc(-50% + ${drift * 0.4}px)) scale(1)`, offset: 0.35 },
       { opacity: 0, transform: `translate(calc(-50% + ${(Math.random() - 0.5) * 16}px), calc(-50% + ${drift}px)) scale(0.2)` }],
      { duration: 1100 + Math.random() * 700, delay: i * 70, easing: "ease-out", fill: "forwards" }
    ).finished.then(() => spark.remove());
  }
}

let translating = false; // una sola traducción a la vez

async function translateWord(word, { hover = false, released = null } = {}) {
  if (translating) return;
  translating = true;
  const float = word.getAnimations().find((animation) => animation.animationName === "floatUp");
  float?.pause(); // la palabra se queda quieta (y no cambia de palabra) durante toda la secuencia
  const own = []; // animaciones propias sobre la palabra, para devolverla intacta al final
  const animateWord = (frames, options) => { const a = word.animate(frames, { fill: "forwards", ...options }); own.push(a); return a; };

  try {
    const rest = getComputedStyle(word);
    const restOpacity = rest.opacity;
    const restFilter = rest.filter;
    const { korean, spanish } = boxesFor(word);

    // 2. Anticipación: pierde el blur poco a poco y se queda nítida en coreano
    await animateWord([{ filter: restFilter, opacity: restOpacity }, { filter: "blur(0px)", opacity: 0.85 }],
      { duration: hover ? 300 : 900, easing: EASE_OUT }).finished;
    if (!hover) await wait(FOCUS_HOLD_MS);

    // 3. Aparece el cristal, ajustado a la palabra en coreano, con brillo y partículas
    glassText.textContent = translations[word.textContent];
    glassText.style.font = spanishFont(word);
    glass.style.cssText = Object.entries(toFrame(korean)).map(([k, v]) => `${k}:${v}`).join(";");
    glass.classList.add("is-shining");
    sparkle(korean);
    await glass.animate([{ opacity: 0, transform: "scale(0.9)" }, { opacity: 1, transform: "scale(1)" }],
      { duration: 520, easing: EASE_SETTLE, fill: "forwards" }).finished;

    // 4. Traducción: el cristal se ajusta al español mientras el hangul se va y entra la traducción
    glass.animate([toFrame(korean), toFrame(spanish)], { duration: 560, easing: EASE_OUT, fill: "forwards" });
    animateWord([{ opacity: 0.85 }, { opacity: 0 }], { duration: 260, easing: EASE_IN });
    await glassText.animate([{ opacity: 0, filter: "blur(6px)", transform: "translateY(4px)" },
                             { opacity: 1, filter: "blur(0px)", transform: "translateY(0)" }],
      { duration: 420, delay: 140, easing: EASE_OUT, fill: "forwards" }).finished;
    await (hover ? released : wait(SPANISH_HOLD_MS));

    // 5. Retorno: sale la traducción, el cristal vuelve al coreano y desaparece; la palabra recupera el blur
    glassText.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, easing: EASE_IN, fill: "forwards" });
    glass.animate([toFrame(spanish), toFrame(korean)], { duration: 420, easing: EASE_OUT, fill: "forwards" });
    await animateWord([{ opacity: 0 }, { opacity: 0.85 }], { duration: 320, delay: 140, easing: EASE_OUT }).finished;
    glass.animate([{ opacity: 1, transform: "scale(1)" }, { opacity: 0, transform: "scale(0.96)" }],
      { duration: 360, easing: EASE_IN, fill: "forwards" });
    await animateWord([{ filter: "blur(0px)", opacity: 0.85 }, { filter: restFilter, opacity: restOpacity }],
      { duration: hover ? 600 : 1000, easing: EASE_IN_OUT }).finished;
  } finally {
    own.forEach((a) => a.cancel());       // vuelve a sus valores de CSS, iguales al estado de reposo: sin saltos
    glass.getAnimations().forEach((a) => a.cancel());
    glass.classList.remove("is-shining");
    glass.removeAttribute("style");
    float?.play();
    translating = false;
  }
}

if (!prefersReducedMotion) {
  // Automático: cada pocos segundos
  setTimeout(async function glassLoop() {
    const word = pickWord();
    if (word) await translateWord(word);
    setTimeout(glassLoop, GLASS_EVERY_MS);
  }, 4000);

  // Al pasar el cursor por una palabra: se traduce mientras el cursor está encima
  if (canHover) {
    for (const slot of slots) {
      slot.addEventListener("pointerenter", () => {
        if (translating || slot.classList.contains("is-hidden") || !translations[slot.textContent]) return;
        if (!fitsClear(boxesFor(slot))) return;
        const left = new Promise((resolve) => slot.addEventListener("pointerleave", resolve, { once: true }));
        translateWord(slot, { hover: true, released: Promise.all([left, wait(400)]) });
      });
    }
  }
}
