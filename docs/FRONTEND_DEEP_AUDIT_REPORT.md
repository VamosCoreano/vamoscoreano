# 🔬 VAMOS COREANO — 전수 정밀 프론트엔드 아키텍처·성능·보안·접근성(WCAG 2.2 AAA) 감사 리포트

- **감사 대상 워크스페이스**: `vamoscoreano` (총 **24개** 소스 코드 파일 + **9개** 정적 이미지 에셋 전수 검사)
  - **HTML (8개, 2,195 Lines)**: `index.html`, `about.html`, `class.html`, `contact.html`, `join.html`, `resource.html`, `imshi/donate.html`, `imshi/review.html`
  - **CSS (8개, 4,969 Lines / 125,303 Bytes)**: `css/token.css`, `css/style.css`, `css/index.css`, `css/about.css`, `css/class.css`, `css/contact.css`, `css/join.css`, `css/resource.css`
  - **JavaScript (8개, 1,357 Lines / 58,236 Bytes)**: `js/nav.js`, `js/index.js`, `js/about.js`, `js/class.js`, `js/contact.js`, `js/join.js`, `js/resource.js`, `imshi/ejemplo-practico-snippet.js`
  - **Static Assets (9개, 3,104,052 Bytes / 3.03 MB)**: `assets/image/*` (3개), `assets/favicon/*` (6개)
- **감사 기준**: W3C HTML Living Standard, WCAG 2.2 Level AAA, Core Web Vitals (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1), OWASP Frontend Security (CSP Level 3, SRI, DOM XSS), Browser Rendering Pipeline (Composite-only Animations)

---

## 📊 0. 결정론적(Deterministic) 터미널 정적 분석 실행 결과

워킹 디렉터리 내 전체 파일 트리를 대상으로 PowerShell 정적 분석 스크립트(`audit_metrics.ps1`, `deep_css_js_check.ps1`, `html_a11y_scan.ps1`)를 실제 실행하여 수집한 결정론적(Deterministic) 계량 지표입니다.

### 0.1 터미널 스크립트 실행 출력 (Raw Deterministic Output)

```text
==================================================================
1. STATIC ASSETS & IMAGE BINARY HEADER INSPECTION
==================================================================
ASSET: assets/favicon/android-chrome-192x192.png |    10.89 KB (    11156 B) | Dimensions: 192x192
ASSET: assets/favicon/android-chrome-512x512.png |    28.85 KB (    29540 B) | Dimensions: 512x512
ASSET: assets/favicon/apple-touch-icon.png       |     9.77 KB (    10003 B) | Dimensions: 180x180
ASSET: assets/favicon/favicon.ico                |    15.04 KB (    15406 B) | Dimensions: 32x32 (ICO)
ASSET: assets/favicon/favicon-16x16.png          |     0.63 KB (      648 B) | Dimensions: 16x16
ASSET: assets/favicon/favicon-32x32.png          |     1.38 KB (     1416 B) | Dimensions: 32x32
ASSET: assets/image/profile-main.png             |  1379.87 KB (  1412991 B) | Dimensions: 1023x1537
ASSET: assets/image/profile-sample.jpg           |    45.10 KB (    46185 B) | Dimensions: 500x626
ASSET: assets/image/profile-sample.png           |  1539.75 KB (  1576707 B) | Dimensions: 1023x1537

==================================================================
2. WCAG 2.2 AA / AAA COLOR CONTRAST DETERMINISTIC MATRIX
==================================================================
Light Ink (#0F172A) on Canvas (#F8FAFC)                         | Ratio: 17.06:1 | AA: PASS | AAA(Body): PASS | AAA(Large): PASS
Light Subtext (#475569) on Canvas (#F8FAFC)                     | Ratio:  7.24:1 | AA: PASS | AAA(Body): PASS | AAA(Large): PASS
Light Subtext (#475569) on Subtle (#E8EEF5)                     | Ratio:  6.49:1 | AA: PASS | AAA(Body): FAIL | AAA(Large): PASS
Brand Blue (#2563EB) on Canvas (#F8FAFC)                        | Ratio:  4.94:1 | AA: PASS | AAA(Body): FAIL | AAA(Large): PASS
Brand Blue (#2563EB) on Subtle (#E8EEF5) [.peek-tag]            | Ratio:  4.43:1 | AA: FAIL | AAA(Body): FAIL | AAA(Large): FAIL
White (#FFFFFF) on Brand Blue (#2563EB) [.b.p]                  | Ratio:  5.17:1 | AA: PASS | AAA(Body): FAIL | AAA(Large): PASS
White (#FFFFFF) on Orange (#F97316) [.nav-cta-pill / .play-orb] | Ratio:  2.80:1 | AA: FAIL | AAA(Body): FAIL | AAA(Large): FAIL
Orange (#F97316) on White (#FFFFFF) [.kicker / .core-badge]     | Ratio:  2.80:1 | AA: FAIL | AAA(Body): FAIL | AAA(Large): FAIL
Orange (#F97316) on Dark Navy (#090D16) [.join-page .tag]       | Ratio:  6.93:1 | AA: PASS | AAA(Body): FAIL | AAA(Large): PASS
White (#FFFFFF) on Coral (#FF3B5C) [.nav-cta-pill:hover]        | Ratio:  3.48:1 | AA: FAIL | AAA(Body): FAIL | AAA(Large): FAIL
Dark Ink (#F8FAFC) on Dark Canvas (#090D16)                     | Ratio: 18.57:1 | AA: PASS | AAA(Body): PASS | AAA(Large): PASS
Dark Subtext (#94A3B8) on Dark Canvas (#090D16)                 | Ratio:  7.58:1 | AA: PASS | AAA(Body): PASS | AAA(Large): PASS
Dark Subtext (#94A3B8) on Dark Surface (#131B2E)                | Ratio:  6.69:1 | AA: PASS | AAA(Body): FAIL | AAA(Large): PASS
Dark Sky Blue (#60A5FA) on Dark Surface (#131B2E)               | Ratio:  6.75:1 | AA: PASS | AAA(Body): FAIL | AAA(Large): PASS
Dark Surface (#131B2E) on Dark Sky Blue (#60A5FA) [Dark .b.p]   | Ratio:  6.75:1 | AA: PASS | AAA(Body): FAIL | AAA(Large): PASS
White (#FFFFFF) on Dark Sky Blue (#60A5FA) [Dark .logo b]       | Ratio:  2.54:1 | AA: FAIL | AAA(Body): FAIL | AAA(Large): FAIL

==================================================================
3. HTML SEMANTICS, ACCESSIBILITY & BROKEN LINK SCAN
==================================================================
HTML: about.html        | Lines: 241 | Tags: 141 | div:29 span:14 i: 4 (Div+Span:30.5%) | InlineStyle:12 | HangulNoLang: 3 | BrokenRefs: L15-17(favicon), L183(img/profile-julio-main.png)
HTML: class.html        | Lines: 240 | Tags: 136 | div:29 span:15 i: 4 (Div+Span:32.4%) | InlineStyle:13 | HangulNoLang:12 | BrokenRefs: L15-17(favicon), MISSING <main> LANDMARK
HTML: contact.html      | Lines: 255 | Tags: 155 | div:28 span:16 i: 5 (Div+Span:28.4%) | InlineStyle: 0 | HangulNoLang: 1 | BrokenRefs: L15-17(favicon), L203(img/profile-julio-main.png)
HTML: imshi/donate.html | Lines: 159 | Tags:  74 | div: 3 span: 9 i: 0 (Div+Span:16.2%) | InlineStyle: 0 | HangulNoLang: 0 | BrokenRefs: L11(style.css), L12-14(favicon), L21,L24,L25,L27
HTML: imshi/review.html | Lines:  79 | Tags:  56 | div: 6 span: 2 i: 0 (Div+Span:14.3%) | InlineStyle: 0 | HangulNoLang: 0 | BrokenRefs: L11(style.css), L12-14(favicon), L21,L24,L25,L27, L62(consultar.html)
HTML: index.html        | Lines: 526 | Tags: 317 | div:80 span:62 i:23 (Div+Span:44.8%) | InlineStyle:31 | HangulNoLang:19 | BrokenRefs: Unclosed <div> in #Nosotros (L97-155)
HTML: join.html         | Lines: 281 | Tags: 204 | div:58 span:26 i:23 (Div+Span:41.2%) | InlineStyle:18 | HangulNoLang: 8 | BrokenRefs: L18-20(favicon), L256(href="#")
HTML: resource.html     | Lines: 414 | Tags: 249 | div:52 span:44 i:17 (Div+Span:38.6%) | InlineStyle:15 | HangulNoLang: 9 | BrokenRefs: L16-18(favicon), 12x 404 links (pdf/guia/podcast-resource.html)

==================================================================
4. CSS ARCHITECTURE, SPECIFICITY & UNUSED SELECTOR SCAN
==================================================================
CSS: css/about.css      | Lines: 451 | Bytes: 12316 | !important:  0 | Depth>3: 0 | Classes: 39 | Unused: 1 (2.6%) -> L230:.enemy
CSS: css/class.css      | Lines: 489 | Bytes: 12914 | !important:  5 | Depth>3: 1 | Classes: 32 | Unused: 0 (0.0%) -> Depth 4 at L440 (.open .pi > div > *)
CSS: css/contact.css    | Lines: 455 | Bytes:  9662 | !important:  0 | Depth>3: 0 | Classes: 41 | Unused: 1 (2.4%) -> L19:.d-4
CSS: css/index.css      | Lines:1100 | Bytes: 26286 | !important:  0 | Depth>3: 0 | Classes: 85 | Unused: 0 (0.0%)
CSS: css/join.css       | Lines: 514 | Bytes: 15315 | !important:  0 | Depth>3: 0 | Classes: 76 | Unused: 0 (0.0%)
CSS: css/resource.css   | Lines: 666 | Bytes: 16327 | !important:  0 | Depth>3: 0 | Classes: 43 | Unused: 0 (0.0%)
CSS: css/style.css      | Lines:1096 | Bytes: 25727 | !important: 10 | Depth>3: 0 | Classes: 83 | Unused: 8 (9.6%) -> L696:.contact-actions-grid, L781:.sc, L781:.mt, L840:.course-card, L862:.course-foot, L1084:.cs, L1090:.btns, L1090:.ex
CSS: css/token.css      | Lines: 198 | Bytes:  6756 | !important:  0 | Depth>3: 0 | Classes:  1 | Unused: 0 (0.0%)

==================================================================
5. JS RUNTIME, MEMORY & CODE QUALITY SCAN
==================================================================
JS: imshi/ejemplo-practico-snippet.js | Lines:  27 | Bytes:  1678 | Listeners:  1 | Timers: 0 | innerHTML: 1 (L4)  | var:  0
JS: js/about.js                       | Lines:  89 | Bytes:  3803 | Listeners:  4 | Timers: 2 | innerHTML: 0       | var: 13
JS: js/class.js                       | Lines: 263 | Bytes: 16319 | Listeners:  6 | Timers: 0 | innerHTML: 1 (L52) | var:  0
JS: js/contact.js                     | Lines: 186 | Bytes:  6388 | Listeners:  5 | Timers: 2 | innerHTML: 0       | var: 32
JS: js/index.js                       | Lines: 168 | Bytes:  5775 | Listeners:  5 | Timers: 2 | innerHTML: 0       | var:  0
JS: js/join.js                        | Lines: 101 | Bytes:  3701 | Listeners:  6 | Timers: 0 | innerHTML: 0       | var:  0
JS: js/nav.js                         | Lines: 385 | Bytes: 15548 | Listeners: 16 | Timers: 0 | innerHTML: 0       | var:  0
JS: js/resource.js                    | Lines: 138 | Bytes:  5024 | Listeners:  6 | Timers: 0 | innerHTML: 0       | var:  0
```

---

## 🚨 1. 개선이 긴급한 핵심 결함 Top 10 (우선순위 1순위 → 10순위)

1. **[1순위 · 런타임/DOM 폭주] `class.html` 코스 캐러셀(`#peek-track`) 이중 실행으로 인한 DOM 1,600% 팽창(4장 → 64장) 및 `requestAnimationFrame` 스크롤 경합 버그**
   - `class.html:237-238`에서 로드되는 `js/class.js:165-250`과 `js/nav.js:289-377`이 동일한 `#peek-track` 복제 루프(`for (let s = 0; s < 3; s++)`)를 중복 실행합니다. `js/class.js`가 원본 4장을 16장으로 복제한 직후, `js/nav.js`가 16장을 다시 원본으로 오인하여 3회 추가 복제함으로써 **총 64개의 `.peek-card` DOM 노드**를 생성하고, 두 개의 `spinRoulette()` rAF 루프가 동시에 `track.scrollLeft`를 서로 다른 목적지(인덱스 8 vs 인덱스 32)로 제어하여 심각한 레이아웃 스래싱(Layout Thrashing)과 스크롤 떨림을 유발합니다.
2. **[2순위 · INP/메모리 병목] 전 페이지(`about`, `class`, `contact`, `join`, `resource`) 글로벌 이벤트 리스너(`scroll`, `resize`, `pointermove`) 및 `IntersectionObserver` 이중 바인딩**
   - `js/nav.js:207-286`의 `initCommonEngines()`가 이미 `#bar` 스크롤 진행바, `.rv` 리빌 옵저버, 전역 `pointermove` 스포트라이트(`getBoundingClientRect()`) 및 `.b` 자석 버튼을 전 페이지에 마운트하고 있음에도, `js/about.js:7-50`, `js/class.js:117-125, 255-262`, `js/contact.js:17-34, 71-123`, `js/join.js:12-41, 82-98`, `js/resource.js:15-47, 103-137`에서 **완전히 동일한 리스너를 중복 등록**합니다. 특히 `js/class.js:255-262`는 `requestAnimationFrame` 스로틀링조차 없이 매 포인터 이벤트마다 동기식 `getBoundingClientRect()`를 호출하여 INP(Interaction to Next Paint)를 악화시킵니다.
3. **[3순위 · 치명적 404 데드 링크 & 에셋 유실] `resource.html` 12개 리소스 링크 전수 404 에러, 전 페이지 파비콘 21개 404 에러, 공동창업자 프로필 이미지(`img/profile-julio-main.png`) 404 에러 및 `join.html` 결제 CTA(`href="#"`) 불능**
   - `resource.html:142, 153, 167, 181`(`pdf-resource.html`), `222, 233, 247, 261`(`guia-resource.html`), `308, 319, 337, 355`(`podcast-resource.html`) 총 12개 핵심 CTA가 존재하지 않는 파일로 연결됩니다.
   - `about.html:15-17`, `class.html:15-17`, `contact.html:15-17`, `join.html:18-20`, `resource.html:16-18`, `imshi/donate.html:12-14`, `imshi/review.html:12-14`는 실제 경로(`assets/favicon/...`) 대신 `favicon/...`을 호출하여 매 페이지 로드 시 3건씩 404를 발생시키며, `about.html:183` 및 `contact.html:203`의 `img/profile-julio-main.png` 또한 존재하지 않아 인라인 `onerror="this.remove()"`가 실행됩니다.
4. **[4순위 · LCP/CLS 치명적 병목] 1.38MB 비압축 PNG 히어로 이미지(`profile-main.png`, `1023×1537`) 무속성 렌더링 및 달력 플립(`js/index.js:104, 119`)의 2.2초 주기 강제 동기 레이아웃(Forced Synchronous Layout)**
   - `index.html:146`과 `about.html:93`에서 사용하는 `assets/image/profile-main.png`가 **1,412,991 Bytes (1.38 MB)** 달하는 비압축 PNG이며, `width`/`height` 속성, `fetchpriority="high"`, 반응형 `srcset`/`sizes`(WebP/AVIF)가 모두 누락되어 모바일 LCP 지연과 CLS를 유발합니다(미사용 `assets/image/profile-sample.png` 1.54 MB 포함 시 이미지 폴더만 3 MB).
   - 또한 `js/index.js:103-130`는 무한 `setInterval(2200ms)`마다 `wrap.style.width = cards[current].offsetWidth + "px"`를 실행하여 `css/index.css:36`(`transition: width 0.45s`)을 트리거함으로써 **매 2.2초마다 초당 60프레임의 메인 스레드 Layout Reflow**를 발생시킵니다.
5. **[5순위 · HTML 파서 트리 손상 & 랜드마크 결락] `index.html:97-155` 닫는 `</div>` 태그 누락으로 인한 DOM 계층 파괴 및 `class.html`의 `<main>` 랜드마크 완전 누락**
   - `index.html:97, 99, 102`에서 열린 3개의 `<div>` 중 `.authority-content` 닫는 태그가 누락되어 `.authority-visual`(L143)이 그리드 형제가 아닌 `.authority-content` 내부 자식으로 잘못 파싱됩니다.
   - `class.html:47-231`은 전체 페이지 중 유일하게 `<main>` 태그가 아예 존재하지 않으며, 6개 메인 페이지 모두 키보드 사용자를 위한 스킵 네비게이션(`.skip-link`, WCAG 2.4.1 Level A)이 누락되어 있습니다.
6. **[6순위 · WCAG 2.2 AAA 색상 대비 미달] 오렌지(`#F97316`), 코랄(`#FF3B5C`), 다크모드 스카이블루(`#60A5FA`), 브랜드 블루(`#2563EB`) 조합의 명도 대비 기준(7:1 / 4.5:1) 심각한 위반**
   - `css/style.css:164-173`의 `.nav-cta-pill` (`#FFFFFF` on `#F97316`, **2.80:1** — AA 4.5:1 및 AAA 7:1 모두 실패), 호버 상태 (`#FFFFFF` on `#FF3B5C`, **3.48:1** — 실패), `css/about.css:223` `.kicker` 및 `css/index.css:888` `.core-badge` (`#F97316` on `#FFFFFF`, **2.80:1** — 실패), 다크모드 `.logo b` (`#FFFFFF` on `#60A5FA`, **2.54:1** — 실패), `.peek-tag` (`#2563EB` on `#E8EEF5`, **4.43:1** — AA/AAA 모두 실패) 등 주요 UI 컴포넌트가 저시력자 가독성 기준을 충족하지 못합니다.
7. **[7순위 · WCAG 2.2 AAA 키보드 포커스 트랩 & WAI-ARIA 위젯 결함] 모바일 풀스크린 메뉴(`js/nav.js:40-195`), 탭리스트(`resource.html:97-112`), 아코디언(`js/class.js:53-79`) 접근성 결함**
   - 모바일 메뉴(`.stripe-sheet`) 오픈 시 배경(`header`, `main`, `footer`)에 `inert` 처리가 없고 포커스 트랩(Focus Trap) 및 닫기 시 `.stripe-burger`로의 포커스 복귀가 구현되어 있지 않아, 키보드 탭 이동 시 보이지 않는 배경 링크로 포커스가 이탈합니다(WCAG 2.4.3, 2.1.1 위반).
   - `resource.html:97-112`는 `role="tablist"`와 `role="tab"`을 선언했으나 `aria-controls`, `role="tabpanel"`, 좌우 방향키(`ArrowLeft`/`ArrowRight`) 네비게이션이 전무합니다.
   - `about.html:60` `<span class="name-flip" tabindex="0">`는 비대화형 요소에 `role` 없이 `tabindex="0"`을 부여하여 무의미한 포커스 정지를 유발합니다.
8. **[8순위 · CSS 파일 간 스타일 누락으로 인한 UI 렌더링 증발 버그] `resource.html` 파형(`.waveform`), `join.html` 음성 파형(`.wave`), `about.html` 데스크톱 팀 그리드(`.team-grid`), `style.css` 태그 도트(`.tag i`)**
   - `resource.html:299`의 `.waveform`은 `css/index.css:630-652`에만 정의되어 있어 `resource.html`에서는 폭과 높이가 **0×0px**로 증발합니다.
   - `join.html:115`의 `.wave`는 `css/join.css:298`에 `.wave i`만 있고 부모 `.wave`의 `display: flex; height: ...` 정의가 없어 인라인 `<i>` 요소들이 **0×0px**로 렌더링됩니다.
   - `about.html:180`의 `.team-grid`는 `css/about.css:442`의 모바일 미디어 쿼리에만 선언되고 데스크톱 기본 `display: grid; grid-template-columns: ...` 규칙이 누락되어 데스크톱에서도 1열 블록으로 깨집니다.
   - `css/style.css:485`의 `.tag i`는 `width`/`height`/`background`가 정의되지 않아 전 페이지의 `<div class="tag"><i></i>...</div>`脉冲 도트가 화면에 표시되지 않습니다.
9. **[9순위 · 프론트엔드 보안(SRI, CSP, XSS) 취약점] 외부 CDN 무결성 검증(SRI) 누락, 인라인 이벤트/스크립트/스타일 남용, `innerHTML` 기반 DOM 주입**
   - 전 페이지의 `cdn.jsdelivr.net/.../pretendard.min.css` 및 `about.html:237`의 `cdnjs.cloudflare.com/.../vanilla-tilt.min.js`에 Subresource Integrity(`integrity`, `crossorigin="anonymous"`)가 누락되어 CDN 공급망 공격(Supply-chain Compromise)에 무방비합니다.
   - `about.html:183` 및 `contact.html:203`의 인라인 `onerror="this.remove()"`, `imshi/donate.html:101-157`의 인라인 `<script>`, 그리고 총 89개의 인라인 `style="..."` 속성이 엄격한 CSP(`Content-Security-Policy`) 도입을 가로막고 있으며, `js/class.js:52`는 템플릿 리터럴 `el.innerHTML`로 25개 세션을 렌더링합니다.
10. **[10순위 · 렌더 블로킹 CSS 워터폴 & WCAG 3.1.2 다국어 음성 합성 결함] 5단계 직렬 CSS 로딩, `<script defer>` 미적용, 스페인어 문서(`lang="es"`) 내 52개 한국어 텍스트 `lang="ko"` 누락**
    - 모든 페이지 `<head>`가 2개의 외부 폰트 CSS(특히 9개 웨이트 전체를 로드하며 `font-display: swap`이 없는 `pretendard.min.css`)와 3개의 로컬 CSS(`token.css`, `style.css`, `<page>.css`)를 직렬 렌더 블로킹으로 로드하고, 하단 `<script>` 태그에 `defer`가 누락되어 있습니다.
    - `<html lang="es">` 문서 내 스크린 리더에 노출되는 52개 한국어 구문(`index.html` L437 `은/는`, `resource.html` L172, L345 `존댓말 vs. 반말`, `join.html` L112 `의사`, `js/class.js` 25개 세션 전체)에 `lang="ko"`가 누락되어 스페인어 TTS 엔진이 한글을 읽지 못하거나 기괴하게 발음합니다(WCAG 2.2 AAA 3.1.2 Language of Parts 위반).

---

## 🔥 2. Critical Vulnerabilities & Bottlenecks (치명적 결함 Top 5 상세 분석 및 리팩토링)

### [Critical #1] `class.html` + `js/nav.js` + `js/class.js` — 코스 캐러셀(`#peek-track`) 이중 마운트로 인한 64-카드 DOM 폭발 및 듀얼 rAF 스크롤 충돌

- **파일명 및 라인 넘버**:
  - [class.html](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/class.html#L112-L212) (`#peek-track`), [class.html](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/class.html#L237-L238) (`<script>` 로드 순서)
  - [js/class.js](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/js/class.js#L165-L250) (첫 번째 `#peek-track` 복제 및 룰렛 엔진)
  - [js/nav.js](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/js/nav.js#L289-L377) (두 번째 `#peek-track` 복제 및 룰렛 엔진)
- **문제 원인 상세 분석**:
  1. `class.html:237`의 `js/class.js`가 즉시 실행되면서 `#peek-track` 내부의 원본 `.peek-card` 4장을 찾아 `for (let s = 0; s < 3; s++)` 루프로 12장을 복제 추가하여 총 **16장**으로 만듭니다.
  2. 직후 `class.html:238`의 `js/nav.js`가 `initCommonEngines()`를 실행하면서 **아무런 중복 마운트 가드(`dataset.initialized`) 없이** 다시 `const origCards = $$(".peek-card", track)`을 호출합니다.
  3. 이때 `origCards`는 이미 16장이 된 상태이므로, `js/nav.js`가 16장을 3회 추가 복제(`16 × 4 = 64장`)하여 단일 슬라이더 트랙 안에 **64개의 `<article class="peek-card">`와 수백 개의 자식 SVG/DOM 노드**를 생성합니다.
  4. 더욱 치명적인 것은 스크롤 시 두 개의 `IntersectionObserver`가 동시에 `spinRoulette()`을 발화하여, `js/class.js`는 `setSize = 4`(목표 인덱스 8)로, `js/nav.js`는 `setSize = 16`(목표 인덱스 32)로 매 프레임(`requestAnimationFrame`)마다 `track.scrollLeft`에 서로 다른 값을 덮어쓰며 1.5초 동안 격렬한 스크롤 경합(Race Condition)을 일으킵니다.

#### [Before] 기존 소스 코드 (`js/class.js:165-262` & `js/nav.js:289-321`)
```javascript
// [js/class.js:165-185] — js/nav.js:289-310과 100% 중복된 코드가 동일 DOM(#peek-track)에서 이중 실행됨!
(() => {
  const track = $("#peek-track");
  if (!track) return;

  const origCards = $$(".peek-card", track);
  if (!origCards.length) return;

  // 1차 실행(class.js): 4장 -> 16장 / 2차 실행(nav.js): 16장 -> 64장으로 폭주!
  for (let s = 0; s < 3; s++) {
    origCards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.classList.add("in");
      clone.setAttribute("aria-hidden", "true");
      clone.inert = true;
      track.append(clone);
    });
  }
  const allCards = $$(".peek-card", track);
  const setSize = origCards.length; // class.js에서는 4, nav.js에서는 16!
  // ... 이후 IntersectionObserver와 requestAnimationFrame(step)이 이중 등록되어 충돌
})();

// [js/class.js:255-262] — rAF 스로틀링조차 없는 중복 pointermove 리스너
addEventListener("pointermove", e => {
  const c = e.target.closest && e.target.closest(".peek-card, .rw");
  if (c) {
    const r = c.getBoundingClientRect(); // 매 마우스 이벤트마다 강제 동기 레이아웃 유발
    c.style.setProperty("--x", e.clientX - r.left + "px");
    c.style.setProperty("--y", e.clientY - r.top + "px");
  }
}, { passive: true });
```

#### [After] 완전히 리팩토링된 최적화 코드 블록 (`js/nav.js` 단일 책임 위임 + `DocumentFragment` 일괄 삽입 + Resize 캐싱)
```javascript
// 1. [js/class.js:116-125 및 L165-262] 중복된 .rv IntersectionObserver, #peek-track 룰렛, pointermove 리스너를 완전히 제거!
// 2. [js/nav.js:289-377] 아이뎀포턴트(Idempotent) 가드 + DocumentFragment + 레이아웃 캐싱이 적용된 통합 캐러셀 엔진:
(() => {
  const track = $("#peek-track");
  if (!track || track.dataset.rouletteMounted === "true") return;
  track.dataset.rouletteMounted = "true";

  const origCards = $$(".peek-card", track);
  if (!origCards.length) return;

  // DocumentFragment를 사용하여 12장 복제 시 단 1회의 DOM Reflow만 발생하도록 최적화
  const frag = document.createDocumentFragment();
  for (let s = 0; s < 3; s++) {
    origCards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.classList.add("in");
      clone.setAttribute("aria-hidden", "true");
      clone.inert = true;
      // 복제된 카드 내부의 링크가 스크린 리더나 포커스 트리에 노출되지 않도록 이중 방어
      $$("a, button", clone).forEach(el => el.setAttribute("tabindex", "-1"));
      frag.appendChild(clone);
    });
  }
  track.appendChild(frag);

  const allCards = $$(".peek-card", track);
  const setSize = origCards.length;

  const getCenterScroll = (index) => {
    const card = allCards[index];
    return card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
  };

  track.classList.add("is-spinning");
  track.scrollLeft = getCenterScroll(0);
  requestAnimationFrame(() => track.classList.remove("is-spinning"));

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
    const startX = getCenterScroll(0);
    const targetX = getCenterScroll(setSize * 2);
    const distance = targetX - startX;
    const duration = 1500;
    const t0 = performance.now();
    const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

    const step = (now) => {
      const progress = Math.min(1, (now - t0) / duration);
      track.scrollLeft = startX + distance * easeOutQuint(progress);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        track.scrollLeft = getCenterScroll(setSize);
        track.classList.remove("is-spinning");
      }
    };
    requestAnimationFrame(step);
  };

  new IntersectionObserver(([entry], obs) => {
    if (entry.isIntersecting) {
      spinRoulette();
      obs.disconnect();
    }
  }, { threshold: 0.2 }).observe(track);

  const prevBtn = $("#peek-prev"), nextBtn = $("#peek-next");
  const stepWidth = () => origCards[0].offsetWidth + 24;

  if (prevBtn) prevBtn.addEventListener("click", () => track.scrollBy({ left: -stepWidth(), behavior: RM ? "auto" : "smooth" }));
  if (nextBtn) nextBtn.addEventListener("click", () => track.scrollBy({ left: stepWidth(), behavior: RM ? "auto" : "smooth" }));
})();
```

---

### [Critical #2] `index.html` + `js/index.js` + `css/index.css` — 히어로 달력 플립(`calendar-flip`)의 2.2초 주기 강제 레이아웃 리플로우(Reflow), `prefers-reduced-motion` 무시(WCAG 2.2.2/2.3.3 위반) 및 스크린 리더 중복 읽기 결함

- **파일명 및 라인 넘버**:
  - [index.html](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/index.html#L46-L58)
  - [css/index.css](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/css/index.css#L29-L67)
  - [js/index.js](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/js/index.js#L95-L131)
- **문제 원인 상세 분석**:
  1. **연속적인 Layout Thrashing (Reflow & Repaint)**: `js/index.js:103-105`의 `updateWidth()`는 `wrap.style.width = cards[current].offsetWidth + "px"`를 호출하고, `css/index.css:36`은 `.calendar-flip { transition: width 0.45s var(--ez-out); }`로 **`width` 속성을 애니메이션**합니다. `width` 트랜지션은 GPU 합성(Composite)이 불가능하여 2.2초마다 0.45초 동안 매 프레임(약 27회) 인접한 `<em class="hero-suffix">con confianza.</em>`의 좌표를 재계산하는 **메인 스레드 Layout Reflow**를 유발합니다.
  2. **WCAG 2.2.2 (Pause, Stop, Hide - Level A) 및 WCAG 2.3.3 (Animation from Interactions - Level AAA) 위반**: `js/index.js:119`의 `setInterval(..., 2200)`은 사용자의 `prefers-reduced-motion: reduce` 설정(`RM`)을 전혀 확인하지 않으며, 페이지가 백그라운드 탭(`document.hidden`)에 있거나 뷰포트 밖으로 스크롤된 상태에서도 영구 실행되고 타이머 ID조차 저장하지 않습니다.
  3. **시맨틱 분열 및 스크린 리더 중복 낭독**: `<h1 id="h1" aria-label="Coreano desde cero. Habla con confianza.">` 바깥에 `<span class="index-hero">`가 분리되어 있고 `<em class="hero-suffix">con confianza.</em>`(L56)에 `aria-hidden="true"`가 누락되어 스크린 리더가 *"Coreano desde cero. Habla con confianza."*를 읽은 직후 *"con confianza."*를 한 번 더 읽습니다.

#### [Before] 기존 소스 코드 (`index.html:46-57` & `js/index.js:95-131`)
```html
<!-- [index.html:46-57] -->
<h1 id="h1" aria-label="Coreano desde cero. Habla con confianza.">
Coreano desde cero.
</h1>
<span class="index-hero">
<span class="calendar-flip" aria-hidden="true">
  <span class="flip-card active">Habla</span>
  <span class="flip-card">Escucha</span>
  <span class="flip-card">Lee</span>
  <span class="flip-card">Escribe</span>
</span>
<em class="hero-suffix">con confianza.</em>
</span>
```
```javascript
// [js/index.js:95-131]
(() => {
  const wrap = document.querySelector(".calendar-flip");
  const cards = document.querySelectorAll(".calendar-flip .flip-card");
  if (!wrap || !cards.length) return;
  let current = 0;
  const updateWidth = () => {
    wrap.style.width = cards[current].offsetWidth + "px"; // 강제 동기 Reflow + width 트랜지션 유발!
  };
  updateWidth();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(updateWidth);
  }
  window.addEventListener("resize", updateWidth, { passive: true });
  setInterval(() => { // RM 미체크, 해제 불가능한 영구 타이머
    const prev = current;
    current = (current + 1) % cards.length;
    cards[prev].classList.remove("active");
    cards[prev].classList.add("exit");
    cards[current].classList.remove("exit");
    cards[current].classList.add("active");
    updateWidth();
  }, 2200);
})();
```

#### [After] 완전히 리팩토링된 최적화 코드 블록 (`index.html`, `css/index.css`, `js/index.js`)
```html
<!-- [index.html:46-58] h1 내부로 시맨틱 통합 + 스크린 리더 중복 낭독 완벽 차단 -->
<h1 id="h1" aria-label="Coreano desde cero. Habla, escucha, lee y escribe con confianza.">
  <span class="hero-line-main">Coreano desde cero.</span>
  <span class="index-hero" aria-hidden="true">
    <span class="calendar-flip">
      <span class="flip-card active">Habla</span>
      <span class="flip-card">Escucha</span>
      <span class="flip-card">Lee</span>
      <span class="flip-card">Escribe</span>
    </span>
    <em class="hero-suffix">con confianza.</em>
  </span>
</h1>
```
```css
/* [css/index.css:29-59] 모든 .flip-card를 동일 그리드 셀(1/1)에 relative 배치하여 JS width 계산 및 Layout Reflow를 100% 제거 */
.calendar-flip {
  position: relative;
  display: inline-grid;
  place-items: center;
  perspective: 800px;
  height: 1.15em;
  vertical-align: baseline;
  contain: layout style;
}

.flip-card {
  grid-area: 1 / 1;
  position: relative; /* 가장 긴 단어('Escucha') 폭으로 자동 고정되어 인접 텍스트 리플로우 0건 */
  display: inline-block;
  white-space: nowrap;
  color: var(--accent-primary);
  transform-origin: 50% 100%;
  backface-visibility: hidden;
  opacity: 0;
  transform: rotateX(90deg) translateY(12px);
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease;
  will-change: transform, opacity;
  pointer-events: none;
}
```
```javascript
// [js/index.js:95-131] Reflow 제거 + prefers-reduced-motion 준수 + Page Visibility API & IntersectionObserver 수명주기 관리
(() => {
  const wrap = document.querySelector(".calendar-flip");
  const cards = document.querySelectorAll(".calendar-flip .flip-card");
  if (!wrap || !cards.length || RM) return; // 모션 감소(WCAG 2.3.3 AAA) 환경에서는 첫 단어 고정

  let current = 0;
  let flipTimer = null;
  let isVisible = true;

  const tickFlip = () => {
    const prev = current;
    current = (current + 1) % cards.length;
    cards[prev].classList.remove("active");
    cards[prev].classList.add("exit");
    cards[current].classList.remove("exit");
    cards[current].classList.add("active");
  };

  const startFlip = () => {
    if (!flipTimer && isVisible && !document.hidden) {
      flipTimer = setInterval(tickFlip, 2200);
    }
  };

  const stopFlip = () => {
    if (flipTimer) {
      clearInterval(flipTimer);
      flipTimer = null;
    }
  };

  document.addEventListener("visibilitychange", () => {
    document.hidden ? stopFlip() : startFlip();
  });

  new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
    isVisible ? startFlip() : stopFlip();
  }).observe(wrap);
})();
```

---

### [Critical #3] `js/nav.js` — 모바일 풀스크린 네비게이션(`.stripe-sheet`) 포커스 트랩(Focus Trap) 부재, 배경 `inert` 미적용 및 키보드 접근성 실패 (WCAG 2.1.1 / 2.4.3 / 4.1.2 위반)

- **파일명 및 라인 넘버**:
  - [js/nav.js](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/js/nav.js#L40-L195)
  - [css/style.css](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/css/style.css#L275-L315)
- **문제 원인 상세 분석**:
  1. **다이얼로그 시맨틱 및 `<nav>` 랜드마크 누락**: `js/nav.js:64-67`에서 생성하는 `<aside class="stripe-sheet" id="stripe-mobile-sheet" aria-hidden="true">`에 `role="dialog"`, `aria-modal="true"`, `aria-label="Menú de navegación"`이 없으며, 내부 메뉴 리스트(`<ul class="stripe-sheet-nav">`)가 `<nav>` 랜드마크로 감싸져 있지 않습니다.
  2. **배경 `inert` 및 Focus Trap 완전 누락**: 모바일 메뉴를 열었을 때(`setMenuOpen(true)` at `js/nav.js:167-172`), 시각적으로는 화면 전체를 덮지만 DOM 상의 `<header>`, `<main>`, `<footer>`가 그대로 활성 상태로 남아 있어 키보드 `Tab` 키를 누르면 포커스가 메뉴 시트 뒤쪽의 본문 요소들로 빠져나갑니다.
  3. **초기 포커스 이동 및 `Escape` 닫기 시 포커스 복원 누락**: 메뉴가 열릴 때 시트 내부 첫 번째 링크로 포커스를 이동시키지 않으며, `Escape` 키로 닫을 때(`js/nav.js:183-187`) `.stripe-burger` 버튼으로 포커스를 돌려주지 않습니다. 또한 현재 페이지 링크(`js/nav.js:101`)에 `.is-active` 클래스만 부여하고 `aria-current="page"`를 누락했습니다.

#### [Before] 기존 소스 코드 (`js/nav.js:64-68, 100-103, 166-187`)
```javascript
// [js/nav.js:64-68]
const sheet = document.createElement("aside");
sheet.className = "stripe-sheet";
sheet.id = "stripe-mobile-sheet";
sheet.setAttribute("aria-hidden", "true");

// [js/nav.js:100-103]
const a = document.createElement("a");
a.className = "stripe-sheet-link" + (currentPath === item.href ? " is-active" : "");
a.href = item.href;

// [js/nav.js:166-187]
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

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
    setMenuOpen(false);
  }
});
```

#### [After] 완전히 리팩토링된 최적화 코드 블록 (`js/nav.js` — WCAG 2.2 AAA 모달 포커스 트랩 & `inert` 완벽 지원)
```javascript
// [js/nav.js] 다이얼로그 시맨틱, aria-current="page", 배경 inert 및 Tab 포커스 트랩 구현
const sheet = document.createElement("aside");
sheet.className = "stripe-sheet";
sheet.id = "stripe-mobile-sheet";
sheet.setAttribute("role", "dialog");
sheet.setAttribute("aria-modal", "true");
sheet.setAttribute("aria-label", "Menú de navegación móvil");
sheet.setAttribute("aria-hidden", "true");
sheet.inert = true;

// 메뉴 링크 생성 시 aria-current="page" 명시
const isCurrent = currentPath === item.href;
const a = document.createElement("a");
a.className = "stripe-sheet-link" + (isCurrent ? " is-active" : "");
if (isCurrent) a.setAttribute("aria-current", "page");
a.href = item.href;

// 열기/닫기 및 포커스 트랩 제어
const bgRegions = () => [...document.querySelectorAll("header, main, footer")];
const getFocusable = () => [burger, ...sheet.querySelectorAll("a[href], button:not([disabled])")];

function setMenuOpen(open, restoreFocus = false) {
  document.body.classList.toggle("menu-open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Cerrar menú de navegación" : "Abrir menú de navegación");
  sheet.setAttribute("aria-hidden", String(!open));
  sheet.inert = !open;

  // 배경 랜드마크 inert 토글로 스크린 리더 및 키보드 포커스 배경 이탈 원천 차단
  bgRegions().forEach(region => {
    region.inert = open;
    if (open) region.setAttribute("aria-hidden", "true");
    else region.removeAttribute("aria-hidden");
  });

  if (open) {
    const firstLink = sheet.querySelector(".stripe-sheet-link");
    if (firstLink) requestAnimationFrame(() => firstLink.focus());
  } else if (restoreFocus) {
    burger.focus();
  }
}

burger.addEventListener("click", () => {
  const isOpen = document.body.classList.contains("menu-open");
  setMenuOpen(!isOpen, isOpen);
});

document.addEventListener("keydown", e => {
  if (!document.body.classList.contains("menu-open")) return;
  if (e.key === "Escape") {
    e.preventDefault();
    setMenuOpen(false, true);
    return;
  }
  if (e.key === "Tab") {
    const focusables = getFocusable();
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});
```

---

### [Critical #4] `css/token.css` + `css/style.css` — WCAG 2.2 AAA 명도 대비(7:1 / 4.5:1) 대거 위반 및 크로스-파일 CSS 정의 누락으로 인한 UI 증발 버그

- **파일명 및 라인 넘버**:
  - [css/token.css](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/css/token.css#L19-L22), [css/token.css](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/css/token.css#L70-L85)
  - [css/style.css](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/css/style.css#L121-L131), [css/style.css](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/css/style.css#L164-L173), [css/style.css](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/css/style.css#L485-L496)
  - [css/about.css](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/css/about.css#L441-L444) (`.team-grid`), [css/join.css](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/css/join.css#L298) (`.wave`), [css/index.css](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/css/index.css#L630-L652) (`.waveform`)
- **문제 원인 상세 분석**:
  1. **WCAG 2.2 AA/AAA 명도 대비 미달**:
     - `--p-orange-500: #F97316` 위에 흰색 텍스트(`#FFFFFF`, `.nav-cta-pill`, `.play-orb`, `.about-cta .b.p`, `.res-trampolin-btn`)는 명도 대비가 **2.80:1**에 불과하여 WCAG AA(4.5:1)조차 통과하지 못합니다.
     - 흰색 배경(`#FFFFFF`/`#F8FAFC`) 위의 오렌지 텍스트(`.kicker`, `.core-badge`, `.peek-tag-accent`) 역시 **2.80:1**로 실패합니다.
     - 다크 모드에서 `--accent-primary`가 `#60A5FA`(Sky Blue)로 바뀔 때 `--text-on-accent: #FFFFFF`가 그대로 유지되어 `.logo b` 및 다크 모드 강조 버튼의 명도 대비가 **2.54:1**로 추락합니다.
     - WCAG 2.2 Level AAA(일반 텍스트 **7.0:1** 이상, 대형 텍스트/UI **4.5:1** 이상)를 달성하려면 라이트 모드 브랜드 블루/액센트 토큰과 다크 모드 `--text-on-accent` 토큰을 정밀 보정해야 합니다.
  2. **4대 크로스-파일 CSS 정의 누락 버그**:
     - `.tag i` (`style.css:485`): 크기와 배경색이 없어 전 페이지의 태그 옆 도트가 **0×0px**로 보이지 않습니다.
     - `.waveform` (`index.css:630`): `style.css`가 아닌 `index.css`에 선언되어 `resource.html:299`에서 이퀄라이저 바가 **0×0px**로 증발합니다.
     - `.wave` (`join.css:298`): `.wave i`만 선언되고 부모 `.wave`의 `display: flex; height: 20px`가 없어 `join.html:115`의 디스코드 음성 파형이 **0×0px**로 증발합니다.
     - `.team-grid` (`about.css:442`): 데스크톱 `display: grid; grid-template-columns: 0.85fr 1.15fr; gap: var(--s7); align-items: center;` 선언이 누락되어 `about.html:180` Julio 섹션 레이아웃이 무너집니다.

#### [Before] 기존 소스 코드 (`css/token.css:18-23, 70, 122` & `css/style.css:485-496`)
```css
/* [css/token.css:18-23, 70] */
--p-blue-600:    #2563EB; /* #F8FAFC 대비 4.94:1 (AAA 7:1 미달), .peek-tag(#E8EEF5) 대비 4.43:1 (AA 미달) */
--p-blue-400:    #60A5FA; /* 다크 모드 #FFFFFF 텍스트와 결합 시 2.54:1 (치명적 미달) */
--p-orange-500:  #F97316; /* #FFFFFF 대비 2.80:1 (치명적 미달) */
--p-coral-500:   #FF3B5C; /* #FFFFFF 대비 3.48:1 (AA/AAA 미달) */
--text-on-accent: var(--p-white); /* 다크 모드에서도 #FFFFFF 고정 */

/* [css/style.css:485-496] .tag i의 width/height/background 누락 */
.tag i, .live-dot, .res-wave-dot {
  position: relative;
}
```

#### [After] 완전히 리팩토링된 최적화 코드 블록 (`css/token.css`, `css/style.css`, `css/about.css`, `css/join.css`)
```css
/* [css/token.css] WCAG 2.2 AAA (7:1+) 및 AA/AAA Large (4.5:1+) 충족 시맨틱 컬러 토큰 설계 */
:root {
  --p-blue-700:    #1D4ED8; /* #FFFFFF 대비 6.70:1, 텍스트용 #1E40AF는 #F8FAFC 대비 8.32:1 (AAA PASS) */
  --p-blue-800:    #1E40AF; /* 라이트 모드 텍스트/태그 액센트: #F8FAFC 대비 8.32:1 (AAA PASS) */
  --p-orange-700:  #C2410C; /* #FFFFFF 대비 5.18:1 (AA PASS / Large AAA PASS), 텍스트용 #9A3412는 7.68:1 (AAA PASS) */
  --p-orange-800:  #9A3412; /* 라이트 모드 오렌지 텍스트: #FFFFFF 대비 7.68:1 (AAA PASS) */
  --p-coral-700:   #BE123C; /* #FFFFFF 대비 6.60:1 */

  --accent-primary:        var(--p-blue-700);
  --accent-primary-ink:    var(--p-blue-800);
  --accent-secondary:      var(--p-orange-700);
  --accent-secondary-ink:  var(--p-orange-800);
  --accent-highlight:      var(--p-coral-700);
  --text-on-accent:        var(--p-white);
}

@media (min-width: 761px) {
  :root[data-theme="dark"] {
    --accent-primary:   #60A5FA; /* #131B2E 대비 6.75:1, #090D16 대비 7.72:1 (AAA PASS) */
    --accent-secondary: #FB923C; /* #090D16 대비 8.65:1 (AAA PASS) */
    --text-on-accent:   var(--p-navy-950); /* #60A5FA 및 #FB923C 배경 위에서 7.72:1 ~ 8.65:1 (AAA PASS!) */
  }
}

/* [css/style.css] 누락된 .tag i 도트 실체화 및 공통 .waveform, .btn-unete 승격 */
.tag i {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-secondary);
  flex: none;
}

/* [css/about.css:361] 누락된 데스크톱 .team-grid 선언 복원 */
.team .team-grid {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: var(--s7);
  align-items: center;
}

/* [css/join.css:298] 누락된 디스코드 오디오 .wave 컨테이너 플렉스박스 및 높이 선언 복원 */
.wave {
  display: flex;
  align-items: center;
  gap: 3px;
  height: 18px;
}
.wave i {
  display: block;
  width: 3px;
  height: var(--h, 20%);
  background: var(--accent-primary);
  border-radius: 2px;
}
```

---

### [Critical #5] `index.html:97-155` & `class.html:47-231` — HTML 파서 트리 손상(미종료 `<div>`), `<main>` 랜드마크 누락, 1.38MB 히어로 이미지 CLS/LCP 방치 및 렌더 블로킹 리소스 워터폴

- **파일명 및 라인 넘버**:
  - [index.html](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/index.html#L7-L14), [index.html](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/index.html#L97-L156), [index.html](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/index.html#L523-L524)
  - [class.html](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/class.html#L47-L238)
- **문제 원인 상세 분석**:
  1. **`index.html:97-155` 미종료 `<div>` 버그**:
     - L97 `<div class="w authority-container">`, L99 `<div class="authority-content">`, L102 `<div class="authority-body rv">` 총 3개의 `<div>`가 열렸으나 L141과 L155에서 2개만 닫혀 있습니다.
     - 그 결과 우측 사진 컬럼인 L143 `<div class="authority-visual rv">`가 `.authority-container`의 직계 자식이 아니라 `.authority-content`의 자식 노드로 편입됩니다. 현재는 `css/index.css:213`의 `.authority-content { display: contents; }` 덕에 우연히 그리드 배치가 유지되지만, `display: contents` 미지원 접근성 트리나 스타일 변경 시 즉시 레이아웃이 붕괴됩니다.
  2. **`class.html`의 `<main>` 랜드마크 누락 및 전 페이지 Skip Link 누락**:
     - `class.html`에는 `<main>` 요소가 없어 스크린 리더 사용자가 본문 시작점으로 점프할 수 없습니다.
  3. **1.38MB 비압축 PNG 및 이미지 치수(`width`/`height`) 누락**:
     - `assets/image/profile-main.png` (`1023×1537`, 1.38MB)가 `width="1023" height="1537"` 없이 삽입되어 이미지 로드 전후 레이아웃 시프트(CLS)를 일으키며, WebP/AVIF 변환 시 **~65KB (95% 용량 절감)**로 압축 가능합니다.
  4. **외부 CDN 무결성(SRI) 및 `<script defer>` 누락**:
     - `cdn.jsdelivr.net`의 `pretendard.min.css`는 `preconnect`와 `integrity`가 없으며, 모든 페이지 하단의 `<script>`에 `defer`가 없습니다.

#### [Before] 기존 소스 코드 (`index.html:7-14, 97-156, 523-524`)
```html
<!-- [index.html:7-14] meta description 누락, favicon 누락, jsdelivr preconnect/SRI 누락 -->
  <title>VAMOS COREANO</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&display=swap">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
  <link rel="stylesheet" href="css/token.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/index.css">
</head>
...
<!-- [index.html:97-156] <div> 3개 오픈 후 2개만 닫힘 + Div Soup(.proof-list) + 무속성 1.38MB <img> -->
    <section id="Nosotros" class="section-authority">
      <div class="w authority-container">
        <div class="authority-content">
          <h2 class="authority-title rv">TU GUÍA</h2>
          <div class="authority-body rv">
            <p class="authority-desc">Un tutor nativo que domina tu idioma.</p>
            <div class="proof-list">
              <!-- ... proof-item divs ... -->
            </div>
          <div class="authority-cta rv" style="--d:3">
            <a href="about.html" class="b p"><span>Conócenos</span>...</a>
          </div>
        </div>
        <div class="authority-visual rv" style="--d:2">
          <div class="tutor-card-tilt" data-tilt>
            <div class="tutor-card-inner">
              <img src="assets/image/profile-main.png" alt="Hyunho Lee - Tutor nativo de coreano" class="tutor-img">
            </div>
          </div>
        </div>
      </div>
    </section>
...
<!-- [index.html:523-524] defer 누락 -->
  <script src="js/nav.js"></script>
  <script src="js/index.js"></script>
```

#### [After] 완전히 리팩토링된 최적화 코드 블록 (`index.html` 헤드·스킵링크·시맨틱 `<ol>`·반응형 `<picture>`·`defer`)
```html
  <meta name="description" content="Plataforma educativa y comunidad de coreano diseñada 100% a la medida para hispanohablantes.">
  <title>Vamos Coreano | Coreano desde cero para hispanohablantes</title>
  <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="assets/favicon/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&display=swap">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" crossorigin="anonymous">
  <link rel="stylesheet" href="css/token.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/index.css">
</head>
<body>
  <a class="skip-link" href="#contenido">Saltar al contenido principal</a>
  <div id="bar" aria-hidden="true"></div>
...
  <main id="contenido">
...
    <section id="Nosotros" class="section-authority" aria-labelledby="authority-heading">
      <div class="w authority-container">
        <div class="authority-content">
          <h2 id="authority-heading" class="authority-title rv">TU GUÍA</h2>
          <div class="authority-body rv">
            <p class="authority-desc">Un tutor nativo que domina tu idioma.</p>
            <ol class="proof-list" aria-label="Credenciales del tutor">
              <li class="proof-item rv" style="--d:1">
                <span class="proof-num" aria-hidden="true">01</span>
                <div>
                  <strong>Formación en Literatura Coreana</strong>
                  <span>Explicación profunda basada en la estructura real del idioma.</span>
                </div>
              </li>
              <li class="proof-item rv" style="--d:2">
                <span class="proof-num" aria-hidden="true">02</span>
                <div>
                  <strong>Instructor Oficial Certificado</strong>
                  <span>Enseñanza estructurada bajo estándares oficiales.</span>
                </div>
              </li>
              <li class="proof-item rv" style="--d:3">
                <span class="proof-num" aria-hidden="true">03</span>
                <div>
                  <strong>Fluidez Absoluta en Español</strong>
                  <span>Comunicación directa y precisa en tu propio idioma.</span>
                </div>
              </li>
            </ol>
          </div><!-- ✅ 누락되었던 .authority-body 닫는 태그 복원 -->
          <div class="authority-cta rv" style="--d:3">
            <a href="about.html" class="b p">
              <span>Conócenos</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </a>
          </div>
        </div><!-- ✅ .authority-content 정상 종료 -->

        <div class="authority-visual rv" style="--d:2">
          <div class="tutor-card-tilt" data-tilt>
            <div class="tutor-card-inner">
              <img
                src="assets/image/profile-main.png"
                alt="Hyunho Lee - Tutor nativo de coreano"
                class="tutor-img"
                width="1023"
                height="1537"
                loading="lazy"
                decoding="async"
              >
              <div class="tutor-badge">
                <strong>Hyunho Lee</strong>
                <span>Tutor principal · Vamos Coreano</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
...
  <script src="js/nav.js" defer></script>
  <script src="js/index.js" defer></script>
</body>
```

---

## 📁 3. Comprehensive Findings by File (전 파일 현미경 정밀 감사)

### 3.1 HTML 파일 전수 감사 (8개 파일)

---

#### 📄 1) [index.html](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/index.html) (526 Lines / 317 Tags / Div+Span 비중: **44.8%**)

- **L4–L14 (`<head>` 메타데이터 및 에셋 로딩 결함)**:
  - `<meta name="description">` 및 파비콘(`<link rel="icon">`) 선언이 유일하게 전체 누락되어 있습니다.
  - **L10**: `pretendard.min.css`가 `preconnect`, `integrity`(SRI), `crossorigin="anonymous"` 없이 렌더 블로킹으로 로드됩니다. `pretendardvariable-dynamic-subset.min.css`로 교체 시 `font-display: swap`과 유니코드 서브셋 분할 로딩이 자동 적용됩니다.
- **L17 (`<div id="bar"></div>`)**:
  - 시각적 장식용 스크롤 프로그레스 바에 `aria-hidden="true"` 누락.
- **L18–L22 (`<div class="bg">`)**:
  - 비시맨틱 `<i>` 태그에 인라인 스타일(`style="--c:var(--accent-primary);width:46vmax..."`)을 직접 주입하여 CSP `style-src` 정책 위반(`contact.html:23-25`처럼 `.orb-a`, `.orb-b`, `.orb-c` 클래스로 분리 권장).
- **L26 (`<a class="logo" href="index.html"><b class="kr">한</b>Vamos Coreano</a>`)**:
  - 현재 페이지가 `index.html`임에도 `aria-current="page"` 누락.
  - `<b class="kr">한</b>`에 `aria-hidden="true"`(또는 `lang="ko"`)가 없어 스페인어 TTS가 로고 읽기 전 한글 음절 처리에 실패합니다.
- **L34 (`<button id="th">`)**:
  - `type="button"` 및 테마 토글 상태를 알리는 `aria-pressed="false|true"` 누락.
- **L43 (`<main id="top">`)**:
  - `about.html`, `contact.html`, `join.html`은 `<main id="contenido">`를 사용하는 반면 `index.html`과 `resource.html`은 `id="top"`을 사용하여 스킵 링크 타겟 ID가 파편화되어 있습니다.
- **L46–L57 (Hero 헤드라인 분리 및 중복 낭독)**:
  - `<h1>` 외부로 `<span class="index-hero">`가 분리되어 있고, L56 `<em class="hero-suffix">con confianza.</em>`에 `aria-hidden="true"`가 빠져 `<h1>`의 `aria-label`과 중복 낭독됩니다.
- **L97–L155 (CRITICAL: 미종료 `<div>` 및 Div Soup)**:
  - L102 `<div class="authority-body rv">`의 닫는 `</div>`가 누락되어 DOM 계층이 깨집니다.
  - L107–L131 `.proof-list`는 순차 목록(`01`, `02`, `03`)임에도 `<div>` 중첩으로 작성되어 있으므로 `<ol class="proof-list">` + `<li>`로 전환해야 합니다.
  - L146 `<img src="assets/image/profile-main.png">`: `width="1023" height="1537" loading="lazy" decoding="async"` 누락(CLS 유발).
- **L183–L292 (`#peek-track` 수평 코스 캐러셀 및 WCAG 2.4.9 AAA 위반)**:
  - L183 `#peek-track`에 `role="region" aria-label="Carrusel de cursos" tabindex="0"` 누락.
  - L199, L222, L245, L269: 4개 카드의 CTA 링크 텍스트가 모두 `"Explora el curso"`로 동일하여 링크 목록 탐색 시 구분 불가(WCAG 2.4.9 Link Purpose AAA 위반). 각 링크에 `aria-label="Explora el curso Despegue"` 등 고유 라벨 부여 필요.
  - L281, L286: `#peek-prev`, `#peek-next` 버튼에 `aria-controls="peek-track"` 누락.
- **L368–L382 (`.bento-grid` 시맨틱 오남용 및 초기 카운터 값 `0` 노출)**:
  - L368, L375: 제목(`<h3>`)이 없는 단순 통계 박스에 `<article>`을 오남용했고, L369 `+<span data-n="1500">0</span>`과 L376 `<span data-n="100">0</span>%`가 초기값 `0`을 하드코딩하여 스크롤 전 보조기기가 `+0`, `0%`로 읽습니다(`aria-label="+1500"` 명시 또는 HTML 기본값을 `1500`/`100`으로 기록 권장).
- **L421–L493 (`#unete-card` 듀얼 코어 카드 다국어 `lang="ko"` 누락)**:
  - L428 `.core-visual` 내부의 장식용 채팅 UI가 `aria-hidden="true"` 없이 노출되어 있으며, L430 `<span class="chat-avatar kr">한</span>` 및 L437 `은/는`, `이/가`에 `lang="ko"`가 누락되어 있습니다(WCAG 3.1.2 AAA 위반).
- **L517–L522 (`#copy-toast`)**:
  - `index.html`에는 `#copy-email` 버튼이 존재하지 않는데도 불필요한 `#copy-toast` DOM과 `js/index.js:43-67`의 클립보드 로직이 포함되어 있습니다(Dead DOM/Code).
- **L523–L524 (`<script>`)**:
  - `defer` 속성 누락.

---

#### 📄 2) [about.html](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/about.html) (241 Lines / 141 Tags / Div+Span 비중: **30.5%**)

- **L15–L17 (Broken Favicon 404)**:
  - `href="favicon/favicon-32x32.png"` 등 3개 태그가 존재하지 않는 경로를 참조(`assets/favicon/...`으로 수정 필수).
- **L20 (`<div id="bar"></div>`)**: `aria-hidden="true"` 누락.
- **L59–L66 (비대화형 `<span class="name-flip" tabindex="0">` 포커스 트랩 및 다국어 라벨 결함)**:
  - `<span class="name-flip" tabindex="0">`는 클릭/키보드 동작(`role="button"`, `Enter`/`Space`)이 없는 순수 시각 효과임에도 `tabindex="0"`이 부여되어 키보드 탐색 흐름을 방해합니다(WCAG 2.4.3 / 4.1.2 위반).
  - `<h1 class="hero-name" aria-label="Hyunho Lee (이현호)">`는 `lang="es"` 속성을 상속받는 `aria-label` 문자열 안에 한글을 혼합하여 음성 합성기가 `(이현호)`를 읽지 못합니다.
- **L93 (`<img src="assets/image/profile-main.png">`)**:
  - Above-the-fold LCP 핵심 이미지임에도 `width="1023" height="1537" fetchpriority="high" decoding="async"`가 모두 누락되어 있습니다.
- **L108, L114, L122 (`<span class="kicker rv">`)**:
  - `<h2>¿Quiénes somos?</h2>` 하위 섹션을 구분하는 소제목 역할을 수행하지만 `<span>`으로 마크업되어 있고, 정작 L131, L142, L153의 카드 제목은 `<h3>`를 사용하여 문서 아웃라인이 왜곡됩니다. 또한 L122는 인라인 `style="margin-top:0"`을 사용합니다.
- **L183 (CRITICAL: 존재하지 않는 이미지 `img/profile-julio-main.png` 404 에러 + 인라인 `onerror` + `alt` 오타)**:
  - `<img src="img/profile-julio-main.png" alt="Julio Marquez, cofundador y director técnico de Vamos Coreano" onerror="this.remove()">`
  - 워크스페이스에 `img/profile-julio-main.png` 파일이 존재하지 않아 404 에러 발생 후 인라인 JS `onerror="this.remove()"`가 실행됩니다(CSP `script-src` 위반). 또한 `alt`의 `"Julio Marquez"`는 L189 `"Julio Márquez"`와 철자(악센트)가 불일치합니다.
- **L203–L205 (`<div class="q rv">`)**:
  - 인용문(`"Nunca soy solo yo. SOMOS NOSOTROS."`)을 `<blockquote>` 대신 `<div class="q">`로 마크업했습니다.
- **L237–L239 (외부 CDN 스크립트 SRI 누락 및 중복 엔진 로드)**:
  - L237 `<script src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.1/vanilla-tilt.min.js"></script>`에 `integrity`, `crossorigin="anonymous"`, `defer`가 모두 누락되어 있으며, `js/about.js`에는 이미 자체 3D 틸트 코드(`js/index.js`, `js/join.js`)와 동일한 패턴으로 약 20줄이면 대체 가능한데도 외부 서드파티 라이브러리를 추가 로드하고 있습니다.

---

#### 📄 3) [class.html](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/class.html) (240 Lines / 136 Tags / Div+Span 비중: **32.4%**)

- **L5 (`<meta name="viewport">`)**:
  - 다른 5개 페이지와 달리 `viewport-fit=cover`가 누락되어 노치 디스플레이 대응(`env(safe-area-inset-top)`)이 깨집니다.
- **L15–L17 (Broken Favicon 404)**: `favicon/...` → `assets/favicon/...` 수정 필요.
- **L47–L231 (CRITICAL: `<main>` 랜드마크 완전 누락)**:
  - `</header>`(L45)와 `<footer class="footer">`(L232) 사이에 `<main id="contenido">` 래퍼가 아예 누락되어 있습니다(WCAG 1.3.1, 2.4.1 위반).
- **L97 (`<div class="cursos-nav rv" style="--d:2" aria-label="Controles de deslizador">`)**:
  - `index.html:280`과 달리 `role="group"`이 빠져 있어 일반 `<div>`에 부여된 `aria-label`이 WAI-ARIA 명세상 무효 처리됩니다.
- **L153, L176, L199 (동일 링크 텍스트 반복 — WCAG 2.4.9 AAA 위반)**:
  - 3개 코스 카드의 CTA가 모두 `<a href="contact.html" class="b"><span>Consulta este curso</span>...</a>`로 동일합니다.
- **L220–L230 (`<section id="temario" style="padding-top:40px">`)**:
  - L220 인라인 스타일 사용.
  - L224 `<div class="fl2" id="fl2">`에 `role="group" aria-label="Filtrar sesiones por etapa"` 누락.
  - L226 `<div class="rail"><i></i></div>`에 `aria-hidden="true"` 누락.
- **L232–L235 (`<footer class="footer">`)**:
  - 다른 5개 메인 페이지의 `<footer><div class="w"><p>© 2026 Vamos Coreano. Todos los derechos reservados.<br>Diseñado para el mundo hispanohablante.</p></div></footer>` 구조와 불일치하며 `.w` 컨테이너가 누락되어 있습니다.
- **L237–L238 (`<script src="js/class.js">` + `<script src="js/nav.js">`)**:
  - `defer` 누락 및 `#peek-track` 캐러셀 이중 실행 버그(4장 → 64장 폭주) 발생 지점.

---

#### 📄 4) [contact.html](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/contact.html) (255 Lines / 155 Tags / Div+Span 비중: **28.4%**)

- **L15–L17 (Broken Favicon 404)**: `favicon/...` → `assets/favicon/...` 수정 필요.
- **L21 (`<div id="bar"></div>`)**: `aria-hidden="true"` 누락.
- **L80, L102, L216 (`target="_blank"` 새 창 열림 사전 고지 누락 — WCAG 3.2.5 AAA 위반)**:
  - L116(YouTube)과 L137(TikTok)에는 `aria-label="... (se abre en una pestaña nueva)"`가 적용되어 있으나, L80(WhatsApp), L102(Instagram DM), L216(Julio Instagram)에는 새 창 열림 안내가 누락되어 일관성과 접근성이 깨집니다.
- **L115, L136, L212 (프로덕션 HTML 내 `<!-- TODO: ... -->` 주석 잔존)**:
  - 미완성 URL/아이콘 확인용 개발 주석이 프로덕션 소스에 노출되어 있습니다.
- **L175 (`<button id="copy-email">Copia la dirección</button>`)**:
  - 본문에 실제 이메일 주소(`1219.hlee@gmail.com`)가 텍스트로 표시되지 않아, 자바스크립트나 `mailto:` 핸들러를 사용할 수 없는 환경에서 이메일 주소를 확인할 수 없으며 버튼의 `aria-label="Copiar dirección de correo electrónico 1219.hlee@gmail.com"` 보강이 필요합니다.
- **L185 (`<a href="join.html" class="b p btn-unete">`)**:
  - `.btn-unete` 클래스는 `css/index.css:1075`에만 정의되어 있고 `css/style.css`나 `css/contact.css`에는 정의되어 있지 않아 버튼 패딩/폰트/그림자 스타일이 누락됩니다.
- **L203 (Broken Image `img/profile-julio-main.png` 404 + 인라인 `onerror`)**:
  - `about.html:183`과 동일한 404 이미지 및 CSP 위반 인라인 핸들러.

---

#### 📄 5) [join.html](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/join.html) (281 Lines / 204 Tags / Div+Span 비중: **41.2%**)

- **L18–L20 (Broken Favicon 404)**: `favicon/...` → `assets/favicon/...` 수정 필요.
- **L24 (`<div id="bar"></div>`)**: `aria-hidden="true"` 누락.
- **L41 (`<button id="th" aria-label="Cambiar tema" aria-hidden="true" tabindex="-1"></button>`)**:
  - 빈 버튼을 렌더링하고 `aria-hidden="true"`를 부여했으나 `js/nav.js:27`이 여전히 클릭 리스너를 바인딩합니다. DOM에서 제거하거나 `disabled` 처리해야 합니다.
- **L87–L129 (장식용 Discord 목업 UI 스크린 리더 무방비 노출 및 오타/다국어 누락)**:
  - L89–L91 맥 윈도우 버튼(`.mac-dot`), L95–L100 서버 아이콘(`.sidebar-servers`), L114 가짜 재생 버튼(`<div class="play-btn">▶</div>`), L237–L239 바코드(`<div class="barcode">`)에 `aria-hidden="true"`가 누락되어 있습니다.
  - **L103 스페인어 오타**: `# 🗣️ pronuciación-check` → `# 🗣️ pronunciación-check` (`n` 누락).
  - **L112 한국어 `lang="ko"` 누락**: `<span class="kr">의사</span>` → `<span class="kr" lang="ko">의사</span>`.
- **L197, L240 (영어 문구 `lang="en"` 누락 — WCAG 3.1.2 AAA 위반)**:
  - L197 `<span class="bp-class" lang="en">FIRST CLASS</span>`, L240 `<span class="flight-status" lang="en">FLIGHT DEPARTING SOON</span>`으로 언어 속성을 명시해야 합니다.
- **L232–L236 (`<div class="bp-price">`)**:
  - 금액이 `--`로 비어 있어 스크린 리더가 `"dólar guion guion"`으로 읽습니다.
- **L256 (CRITICAL: 메인 결제 전환 CTA `<a href="#" class="b p btn-huge btn-pulse">`)**:
  - 랜딩 페이지 최종 전환 버튼이 `href="#"`로 되어 있어 클릭 시 페이지 최상단으로 점프만 하고 아무런 동작도 하지 않습니다.

---

#### 📄 6) [resource.html](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/resource.html) (414 Lines / 249 Tags / Div+Span 비중: **38.6%**)

- **L16–L18 (Broken Favicon 404)**: `favicon/...` → `assets/favicon/...` 수정 필요.
- **L68 (`<div class="res-pillars-bar rv" style="--d:4" aria-label="Categorías principales de recursos">`)**:
  - `role="group"` 없이 `<div>`에 `aria-label`을 사용하여 WAI-ARIA 규격 위반.
- **L97–L112 (불완전한 WAI-ARIA `role="tablist"` 구현)**:
  - `<button role="tab">` 요소들에 `id`와 `aria-controls`가 없고, 대상 컨테이너(`.res-portal`)에 `role="tabpanel"`이 없으며, `js/resource.js`에 좌우 방향키(`ArrowLeft`/`ArrowRight`/`Home`/`End`) 포커스 이동이 구현되어 있지 않습니다.
  - 특히 `"Todos"` 버튼은 3개 포털을 동시에 표시하므로 탭보다는 `role="group"` + `aria-pressed="true|false"` 필터 툴바 패턴(`class.html`의 `#fl2`와 동일)이 시맨틱하게 정확합니다.
- **L142, L153, L167, L181, L222, L233, L247, L261, L308, L319, L337, L355 (CRITICAL: 12개 리소스 링크 전수 404 Not Found)**:
  - `pdf-resource.html` (4곳), `guia-resource.html` (4곳), `podcast-resource.html` (4곳) 파일이 워크스페이스에 존재하지 않아 모든 리소스 카드 및 CTA 클릭 시 404 에러가 발생합니다.
- **L172, L345 (한국어 조사 및 어휘 `lang="ko"` 누락 — WCAG 3.1.2 AAA 위반)**:
  - L172: `은/는`, `이/가`, `을/를`, `에/에서`에 `<span lang="ko">` 누락.
  - L345: `존댓말`, `반말`에 `<span lang="ko">` 누락.
- **L299 (`<div class="waveform">`)**:
  - `.waveform` 및 `.waveform i` CSS가 `css/index.css`에만 정의되어 있어 `resource.html`에서는 파형이 **0×0px**로 렌더링됩니다.

---

#### 📄 7) [imshi/donate.html](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/imshi/donate.html) (159 Lines / 74 Tags)

- **L11–L14, L21–L27 (CRITICAL: 상대 경로 오류로 인한 CSS 및 네비게이션 전수 404)**:
  - `imshi/` 하위 폴더에 위치함에도 `href="style.css"`, `href="favicon/..."`, `href="index.html"`, `href="about.html"`, `href="class.html"`, `href="contact.html"`을 호출하여 **스타일시트조차 로드되지 않는 완전 무스타일(FOUC/Unstyled) 상태**로 렌더링됩니다(`../css/token.css`, `../css/style.css`, `../index.html` 등으로 수정 필요).
- **L74–L78 & L134–L142 (`#custom-amount-form` 폼 접근성 및 유효성 검사 결함 — WCAG 1.3.5 / 3.3.1 / 3.3.3 위반)**:
  - `<input id="custom-amount" name="amount" type="number" min="1" step="0.01" inputmode="decimal" placeholder="Ej. 8">`에 `required`, `aria-required="true"`, `autocomplete="transaction-amount"`, 에러 메시지 연결용 `aria-describedby`가 모두 누락되어 있습니다.
  - L137–L140: 유효하지 않은 금액 입력 시 `aria-invalid="true"` 설정이나 시각적/스크린 리더용(`role="alert"`) 에러 피드백 없이 포커스만 이동시킵니다.
- **L88 (`<iframe id="crowdfund-frame">`)**:
  - `sandbox="allow-scripts allow-same-origin"` 보안 격리 속성 및 `loading="lazy"` 누락.
- **L101–L157 (57줄 인라인 `<script>` 및 `window.alert` 블로킹 호출)**:
  - 인라인 스크립트로 인해 CSP 적용이 불가능하며, L124 `window.alert(...)`는 메인 스레드를 완전 차단하는 레거시 안티패턴입니다.

---

#### 📄 8) [imshi/review.html](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/imshi/review.html) (79 Lines / 56 Tags)

- **L11–L14, L21, L24–L27, L62 (CRITICAL: 9개 상대 경로 및 `consultar.html` 전수 404)**:
  - `imshi/donate.html`과 동일하게 `style.css` 및 모든 메뉴 링크가 404를 반환하며, 특히 L62 `<a href="consultar.html" class="cta-button">¡Sé el próximo!</a>`는 프로젝트 어디에도 존재하지 않는 `consultar.html`을 가리킵니다(`../contact.html`로 수정 필요).
- **L42–L59 (`<section class="reviews-list">`)**:
  - `<section>` 및 내부 `<article class="card review-card">` 내에 시맨틱 헤딩(`<h2>`/`<h3>`)이 없습니다.

---

### 3.2 CSS 아키텍처 및 렌더링 파이프라인 전수 감사 (8개 파일)

---

#### 🎨 1) [css/token.css](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/css/token.css) (198 Lines / 6,756 Bytes)

- **L19–L22 & L70–L85 (WCAG 2.2 AAA 명도 대비 위반 토큰)**:
  - `--p-orange-500: #F97316` (흰색 대비 **2.80:1**), `--p-coral-500: #FF3B5C` (흰색 대비 **3.48:1**), 다크 모드 `--p-blue-400: #60A5FA` + `--text-on-accent: #FFFFFF` (**2.54:1**), 라이트 모드 `--p-slate-600: #475569` on `--bg-subtle: #E8EEF5` (**6.49:1**, AAA 7:1 미달).
- **L106–L160 (`@media (prefers-color-scheme: dark)`와 `:root[data-theme="dark"]` 26줄 완전 중복)**:
  - 동일한 26줄의 다크 모드 토큰 블록이 L107–L132와 L135–L160, 그리고 L164–L189(`.join-page`)에 **3번 중복 선언**되어 있습니다(총 78줄 중 52줄 중복). CSS Custom Property 믹스인 또는 선택자 병합(`:root[data-theme="dark"], .join-page`)으로 절반 이상 축소 가능합니다.

---

#### 🎨 2) [css/style.css](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/css/style.css) (1,096 Lines / 25,727 Bytes)

- **Dead Code (미사용 레거시 선택자 8종 — 9.6% 클래스 미사용)**:
  - **L696**: `.contact-actions-grid { grid-template-columns: 1fr; }` (HTML 어디에도 없음)
  - **L781, L791, L793, L795**: `.sc`, `.mt` 및 관련 `::after`, `:hover::after`, `.rv:not(.in)` 규칙 (구버전 클래스)
  - **L797–L805**: `.ct .kr span` 및 `@keyframes wv` (`index.html` 및 `about.html`의 `.ct` 내에 `.kr span` 구조 없음)
  - **L840–L863**: `.course-card`, `.course-card h2`, `.course-foot .b` (구버전 코스 카드 스타일; 현재는 `.peek-card`로 대체됨)
  - **L1084, L1090**: `.cs::before`, `.cs::after`, `.btns`, `.ex .k span`, `.ex .e` (`imshi/ejemplo-practico-snippet.js`와 함께 제거된 레거시 선택자)
- **렌더링 파이프라인 (Reflow & Repaint 유발 속성)**:
  - **L255**: `.stripe-burger-line`에서 `transition: ..., top 0.38s cubic-bezier(...)`로 레이아웃 속성인 `top`을 애니메이션합니다(`transform: translateY(...) rotate(...)`만으로 합성 애니메이션 전환 필요).
  - **L296–L314**: `.stripe-sheet`가 `clip-path: inset(...)`을 0.52초 동안 트랜지션하면서 동시에 `overflow-y: auto`를 가집니다(모바일 GPU에서 매 프레임 소프트웨어 래스터라이제이션 유발).
  - **L753**: `.orb` (3개의 초대형 `46vmax` 블러 구체)가 24초 무한 애니메이션(`@keyframes dft`)으로 계속 움직이며 `will-change: transform`을 상시 점유하여 거대한 합성 레이어(Compositor Layer) 메모리를 소비합니다.
  - **L770**: `h2::after { transition: width 1s .4s var(--ez-out); }` 및 `h2.in::after { width: 72px; }` — `width` 애니메이션 대신 고정 `width: 72px` + `transform: scaleX(0)` → `scaleX(1); transform-origin: left`로 변경하면 Layout Reflow를 100% 제거할 수 있습니다.
- **L485 (`.tag i` 스타일 누락 버그)**:
  - `.tag i`에 `width`, `height`, `border-radius`, `background`가 빠져 있어 모든 페이지의 태그 아이콘 도트가 렌더링되지 않습니다.
- **L1077–L1096 (`!important` 10회 사용 및 누락된 무한 애니메이션 차단)**:
  - `@media (prefers-reduced-motion: reduce)` 블록에서 `.gl, .orb, .mq div, .cs::before, .cs::after`만 `animation: none !important`로 멈추고, **`.waveform i`, `.chat-Wave i`, `.synapse`, `.active-link`, `.live-dot::before`, `.tag i::before`, `.res-wave-dot`, `.res-cue`, `.btn-pulse`, `.mouse::before`, `.rk` 등 11종의 무한 애니메이션은 정지 목록에서 누락**되어 있습니다!

---

#### 🎨 3) [css/index.css](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/css/index.css) (1,100 Lines / 26,286 Bytes)

- **L36 (`.calendar-flip { transition: width 0.45s var(--ez-out); }`)**:
  - 2.2초마다 Layout Reflow를 일으키는 주원인(Critical #2 참조).
- **L144–L180 (`.somos-title` 및 `::before` — `css/about.css:288-326`과 40줄 100% 중복)**:
  - `.identidad`, `.identidad-box`, `.somos-title`, `.somos-title::before`, `.somos-title.in::before`가 `css/index.css`와 `css/about.css` 양쪽에 중복 작성되어 있습니다(`css/style.css`로 통합 시 45줄 절감).
- **L630–L652 (`.waveform`, `.waveform i`, `@keyframes eq`)**:
  - `resource.html:299`에서도 동일한 `.waveform` 마크업을 사용하므로 `css/index.css`에서 `css/style.css`로 이동해야 `resource.html`의 파형 증발 버그가 해결됩니다.
- **L800–L820 (`.unete-stage::before`) & L828 (`.dual-core-card`)**:
  - `filter: blur(48px)`와 `backdrop-filter: blur(20px)`가 3D 틸트(`transform: rotateX(...) rotateY(...)`)와 결합되어 포인터 이동 시마다 고비용 GPU 가우시안 블러 재합성을 유발합니다.
- **L201, L418, L737 (콘텐츠 가시성 최적화 누락)**:
  - 첫 화면 아래(Below-the-fold) 대형 섹션(`.section-authority`, `.section-cursos`, `.section-recursos`, `.section-unete`)에 `content-visibility: auto; contain-intrinsic-size: auto 700px;`를 적용하면 초기 렌더링(FCP/LCP) 시 레이아웃 비용을 대폭 줄일 수 있습니다.

---

#### 🎨 4) [css/about.css](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/css/about.css) (451 Lines / 12,316 Bytes)

- **L230–L252 (Dead Code: `.enemy`, `.enemy li`, `.enemy li::before`, `.enemy strong`)**:
  - `about.html`에서 삭제된 구 섹션("El Enemigo")의 미사용 CSS 23줄이 방치되어 있습니다.
- **L272–L326 (`.mision-sec .somos-title` 중복 코드)**:
  - `css/index.css:126-180`과 동일한 그라데이션 클립패스 타이틀 코드가 중복 정의되어 있습니다.
- **L361–L444 (CRITICAL: `.team .team-grid` 데스크톱 그리드 선언 누락)**:
  - L442 `@media(max-width: 760px) { .team .team-grid { grid-template-columns: 1fr; gap: var(--s4); } }`만 존재하고 데스크톱 기본 `.team .team-grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: var(--s7); align-items: center; }`가 누락되어 데스크톱에서도 사진과 텍스트가 수직으로 쌓입니다.
- **L447–L451 (`.about-cta .b.p`)**:
  - `--accent-secondary`(`#F97316`) 배경에 `--bg-surface`(`#FFFFFF`, 다크 모드에서는 `#131B2E`) 텍스트를 사용하여 라이트 모드 명도 대비가 **2.80:1**로 실패합니다.

---

#### 🎨 5) [css/class.css](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/css/class.css) (489 Lines / 12,914 Bytes)

- **L92–L128 (`@keyframes rockStomp` & `@keyframes rockClap`의 `filter: blur(...)` 애니메이션)**:
  - 히어로 H1 텍스트 등장 시 매 프레임 `filter: blur(8px)` → `blur(0)` 및 `drop-shadow(...)`를 애니메이션하여 초기 로드(LCP 직후) 메인 스레드 및 GPU 페인트 부하를 급증시킵니다.
- **L148 (`.class-fly-zone .fly { width: 100vw; margin: 0 0 0 calc(50% - 50vw); }`)**:
  - `100vw`는 데스크톱 스크롤바 폭을 포함하므로 `body { overflow-x: hidden }`이 없거나 모바일 사파리에서 수평 오버플로우를 유발할 수 있습니다(`width: 100%`로 충분).
- **L254 (`.rail i { height: var(--fh, 0px); }`)**:
  - 스크롤 시 `js/class.js:145`가 `--fh` 픽셀 높이를 계속 갱신하여 `height` 변경(Layout Reflow)을 유발합니다(`height: 100%; transform-origin: top; transform: scaleY(var(--fp, 0))`로 변경 시 100% GPU Composite 전환 가능).
- **L349–L356 (`.pn { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .45s var(--ez-out); }`)**:
  - 아코디언이 닫혀 있을 때(`0fr`) 내부 텍스트가 시각적으로만 숨겨지고 `visibility: hidden`이 없어 키보드 포커스나 스크린 리더 탐색이 닫힌 패널 내부로 진입할 수 있습니다(`.pn > div { overflow: hidden; visibility: hidden; transition: visibility 0.45s; } .open .pn > div { visibility: visible; }` 추가 필수).
- **L440 (Selector Nesting Depth = 4)**:
  - `.open .pi > div > *` — 선택자 결합 깊이가 4단계이며 유니버설 선택자(`*`)를 우측 끝에 사용하여 스타일 재계산 비용을 높입니다.
- **L478–L489 (`!important` 5회 사용)**:
  - `@media (prefers-reduced-motion: reduce)` 내부에서 5개의 `!important`를 사용하나, 정작 L410 `.rk`(`animation: lf 1.8s infinite`)와 L432 `.rail i::after`(`animation: pu 1.6s infinite`)는 멈추지 않습니다.

---

#### 🎨 6) [css/contact.css](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/css/contact.css) (455 Lines / 9,662 Bytes)

- **L19 (Dead Code: `.contact-page .d-4 { --d: 4; }`)**: `contact.html`에서 사용되지 않는 클래스.
- **L227–L251 (`.cta-banner::before`의 `filter: blur(48px)` 무한 `ctaGlow` 애니메이션)**:
  - `filter: blur(48px)`가 적용된 대형 의사 요소를 6초 주기로 무한 스케일 애니메이션하여 불필요한 상시 GPU 합성 부하를 유발합니다.
- **L405 & L415 (동일 미디어 쿼리 `@media (max-width: 960px)` 연속 중복 선언)**:
  - L405–L413과 L415–L419가 동일한 `@media (max-width: 960px)` 블록을 연달아 두 번 선언하고 있습니다.

---

#### 🎨 7) [css/join.css](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/css/join.css) (514 Lines / 15,315 Bytes)

- **L1–L4 (`.join-page` 중복 정의)**: `css/token.css:164`와 중복.
- **L298 (CRITICAL: `.wave` 부모 스타일 누락으로 인한 오디오 파형 0×0px 증발)**:
  - `.wave i { width: 3px; height: var(--h, 20%); ... }`만 정의되어 있고 `.wave`의 `display: flex; height: 18px; align-items: center; gap: 3px;`가 누락되어 `<i>` 태그(기본 `display: inline`)의 `width`/`height`가 무시됩니다.
- **L315 (`.active-link { stroke-dasharray: 4; animation: dash 20s linear infinite; }`)**:
  - `stroke-dashoffset` 무한 애니메이션은 비합성 Paint 연산을 매 프레임 유발합니다.
- **L478–L485 (`.btn-pulse`의 `box-shadow` 무한 애니메이션)**:
  - `@keyframes pulseGlow`가 `box-shadow` 반경을 0에서 20px까지 3초 주기로 무한 애니메이션하여 매 프레임 메인 스레드 Paint를 유발합니다(`::after` 의사 요소의 `transform: scale(...)` + `opacity` 애니메이션으로 대체 필수).

---

#### 🎨 8) [css/resource.css](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/css/resource.css) (666 Lines / 16,327 Bytes)

- **L520–L545 (`.res-podcast-wave` 내부 `.waveform` 스타일 누락)**:
  - `resource.html:299`에서 사용하는 `.waveform` 및 `.waveform i` 규칙이 `css/resource.css`와 `css/style.css` 모두에 빠져 있어(`css/index.css:630`에만 존재) 팟캐스트 섹션의 핵심 파형 UI가 화면에 나타나지 않습니다.
- **L601–L609 (`.res-trampolin-btn`)**:
  - `--accent-secondary`(`#F97316`) 배경에 흰색 텍스트를 사용하여 명도 대비 **2.80:1**로 WCAG AA/AAA 기준에 미달합니다.

---

### 3.3 JavaScript 런타임 성능, 메모리 관리 및 모던 표준 전수 감사 (8개 파일)

---

#### ⚡ 1) [js/nav.js](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/js/nav.js) (385 Lines / 15,548 Bytes)

- **L11–L37 (모바일 라이트모드 강제 및 테마 상태 비영속성)**:
  - 사용자가 데스크톱에서 다크/라이트 테마(`#th`)를 전환해도 `localStorage`에 저장하지 않아 페이지를 이동할 때마다 테마가 초기화됩니다.
  - 또한 `#th` 클릭 시 `aria-pressed` 속성을 갱신하지 않으며, 모바일(`<=760px`)에서는 클릭 시 아무 반응이 없는 데드 컨트롤이 됩니다.
- **L40–L195 (`mountStripeMobileNav()` 접근성 및 포커스 트랩 누락)**:
  - `role="dialog"`, `aria-modal="true"`, `<nav>` 랜드마크, `aria-current="page"`, 배경 `inert` 처리, `Tab` 키 포커스 트랩 및 닫기 시 `.stripe-burger` 포커스 복귀가 모두 누락되어 있습니다(Critical #3 참조).
- **L207–L385 (`initCommonEngines()`와 페이지별 JS 파일 간의 전면 중복 실행)**:
  - `js/nav.js`가 모든 페이지에서 `#bar` 스크롤 진행바(L214-225), `.rv` 리빌 옵저버(L228-245), `pointermove` 스포트라이트 및 `.b` 자석 버튼(L248-286), `#peek-track` 룰렛(L289-377)을 실행합니다.
  - 그러나 L224 `addEventListener("resize", tick)`에는 `{ passive: true }`가 누락되어 있으며, L218 `document.documentElement.scrollHeight - innerHeight`를 매 스크롤 이벤트마다 동기 조회하여 레이아웃 재계산을 유발합니다.
  - 무엇보다 `about.js`, `class.js`, `contact.js`, `join.js`, `resource.js`에 동일한 엔진이 중복 작성되어 있으므로, **공통 5대 엔진은 오직 `js/nav.js`에서만 단일 실행**되도록 아키텍처를 일원화해야 합니다.

---

#### ⚡ 2) [js/index.js](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/js/index.js) (168 Lines / 5,775 Bytes)

- **L8–L40 (`#h1` 글자 단위 `<span>` 분할 루프)**:
  - `RM`(`prefers-reduced-motion: reduce`) 체크 없이 실행되어 모션 감소 사용자에게도 불필요하게 22개의 `<span class="ch">` DOM 노드를 생성합니다(`contact.js:38`은 `if (h1 && !RM)`으로 방어함).
- **L43–L67 (Dead Code: `#copy-toast` 및 `#copy-email` 핸들러)**:
  - `index.html`에는 `#copy-email` 버튼이 존재하지 않으므로 L43–L67 전체가 불필요한 데드 코드입니다.
- **L81–L92 (배경 한글 글리프 `.gl` 16개 생성 시 개별 `b.append(g)` 호출)**:
  - `for (let i = 0; i < 16; i++)` 루프 내부에서 `DocumentFragment` 없이 `b.append(g)`를 16회 직접 호출합니다.
- **L95–L131 (`.calendar-flip` 2.2초 `setInterval` 및 `offsetWidth` 강제 동기 레이아웃)**:
  - `RM` 미체크, 타이머 해제 불가, 매 2.2초마다 `offsetWidth` 읽기 직후 `style.width` 쓰기로 인한 0.45초 연속 Layout Reflow 유발(Critical #2 참조).

---

#### ⚡ 3) [js/about.js](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/js/about.js) (89 Lines / 3,803 Bytes)

- **L3–L88 (ES5 레거시 `var` 13회 사용 및 `js/nav.js`와의 75% 코드 중복)**:
  - 모던 ES6+(`const`/`let`, 화살표 함수) 대신 `var`를 13회 사용하고 있습니다.
  - **L6–L50 전체가 `js/nav.js:213-286`과 100% 중복**됩니다(`#bar` 스크롤/리사이즈 리스너 이중 등록, `section h2` `.rv` 부여 및 `IntersectionObserver` 이중 등록, `pointermove` `.cd` 스포트라이트 이중 등록).
  - 심지어 L76–L88의 `.somos-title` 옵저버는 `js/index.js:70-78`과 완전히 동일한 코드이므로 `js/nav.js`로 통합하면 `js/about.js`는 L55–L74(`.name-flip` 오토 티저 20줄)만 남고 70줄을 제거할 수 있습니다.

---

#### ⚡ 4) [js/class.js](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/js/class.js) (263 Lines / 16,319 Bytes)

- **L39–L81 (25개 커리큘럼 아코디언 생성 시 루프 내 `innerHTML` 25회 호출 및 `DocumentFragment` 미사용)**:
  - `S.forEach(...)` 루프에서 25번 연속으로 `el.innerHTML = ...` 파싱과 `its.append(el)`을 수행하여 25회의 동기 DOM 삽입이 발생합니다(`DocumentFragment` 일괄 삽입 필수).
  - **보안 및 접근성 결함**:
    - L53 `<button class="rw" aria-expanded="false">`에 `type="button"`, `id="rw-btn-${i}"`, `aria-controls="rw-panel-${i}"` 누락.
    - L55 `<small class="kr">${kr}</small>`, L66 `<span class="gm">${g}</span>`, L49 `<div class="xx">${a}<small>${b}</small></div>`에 **`lang="ko"` 속성이 전면 누락**되어 있습니다(WCAG 3.1.2 AAA 위반).
    - L62 `<div class="pn">`에 `id="rw-panel-${i}"`, `role="region"`, `aria-labelledby="rw-btn-${i}"`, `inert` 토글이 누락되어 있습니다.
- **L83–L104 (`#fl2` 필터 버튼 생성 루프)**:
  - `DocumentFragment` 없이 매 반복마다 `$("#fl2").append(b)`로 DOM 쿼리와 삽입을 반복하며, `<button class="fb">`에 `type="button"`이 누락되어 있습니다.
- **L117–L125, L165–L250, L255–L262 (CRITICAL: `js/nav.js`와 100% 중복 및 `#peek-track` 64장 폭주 버그)**:
  - L117–L125(`.rv` 옵저버), L165–L250(`#peek-track` 복제 및 룰렛), L255–L262(스로틀링 없는 `pointermove` 리스너)는 `js/nav.js`가 이미 수행하고 있으므로 **즉시 삭제**해야 합니다(Critical #1 참조).

---

#### ⚡ 5) [js/contact.js](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/js/contact.js) (186 Lines / 6,388 Bytes)

- **L12–L174 (ES5 레거시 `var` 32회 사용 및 `document.execCommand("copy")` Deprecated API 사용)**:
  - 파일 전체에서 `var`를 32회 사용하며, L147 `document.execCommand("copy")`는 W3C/WHATWG 명세에서 폐기(Deprecated)된 동기 DOM API입니다.
- **L16–L34 (`#bar`), L36–L69 (`#h1` 글자 분할), L71–L84 (`.rv` 옵저버), L86–L123 (`pointermove` 스포트라이트 및 `.b` 자석 효과)**:
  - **파일의 65%(L16–L123)가 `js/nav.js` 및 `js/index.js`와 중복**되어 `contact.html`에서 스크롤, 리사이즈, 포인터 이동 시 모든 연산이 2번씩 실행됩니다.

---

#### ⚡ 6) [js/join.js](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/js/join.js) (101 Lines / 3,701 Bytes)

- **L12–L41 (`#bar` 프로그레스 바 및 `.rv` 옵저버 중복) & L82–L98 (`.btn-huge` 자석 버튼 중복)**:
  - `js/nav.js:213-286`이 이미 `#bar`, `.rv`, `.b`(`join.html:256`의 `.btn-huge`는 `.b` 클래스를 포함함!)에 대해 동일한 이벤트를 처리하고 있습니다.
  - 특히 `.btn-huge`는 `js/nav.js:268`에서 `--bx`/`--by`(가중치 `0.18`/`0.28`)가 설정된 직후, `js/join.js:85-92`의 별도 `requestAnimationFrame` 콜백에서 다시 `--bx`/`--by`(가중치 `0.15`/`0.25`)로 덮어씌워지는 이중 `getBoundingClientRect()` 연산이 일어납니다.
  - 더욱이 `js/join.js:85`의 `pointermove` 리스너는 `rafId` 가드 플래그조차 없어 포인터가 움직일 때마다 무제한으로 `requestAnimationFrame` 콜백을 큐잉합니다!

---

#### ⚡ 7) [js/resource.js](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/js/resource.js) (138 Lines / 5,024 Bytes)

- **L15–L47 (`#bar` 및 `.rv` 중복) & L103–L137 (`pointermove` 스포트라이트 및 `.b` 자석 버튼 중복)**:
  - `js/nav.js`와 100% 중복되어 매 스크롤 및 마우스 이동 시 두 번씩 실행됩니다.
- **L68 (`void portal.offsetWidth; // Reflow for clean animation restart`)**:
  - 카테고리 탭 클릭 시 `forEach` 루프 안에서 각 `.res-portal`마다 `classList.remove("is-filtering-in")` 직후 `void portal.offsetWidth`를 읽어 **강제 동기 리플로우(Forced Synchronous Layout)**를 루프 횟수만큼 반복 유발합니다.
- **L84–L88 (탭 UI 키보드 접근성 누락)**:
  - WAI-ARIA `role="tablist"` 패턴 필수 요구사항인 `ArrowRight`, `ArrowLeft`, `Home`, `End` 키보드 이벤트 핸들러 및 비활성 탭 `tabindex="-1"` 제어가 누락되어 있습니다.

---

#### ⚡ 8) [imshi/ejemplo-practico-snippet.js](file:///c:/Users/masgr/OneDrive/Escritorio/HDocument/30_Brand_Engineering/git/vamoscoreano/imshi/ejemplo-practico-snippet.js) (27 Lines / 1,678 Bytes)

- **전 파일 미참조 고아 스크립트(Orphaned Dead File)**:
  - 어떠한 HTML 파일에서도 로드되지 않는 조각 코드입니다.
  - 내부 코드 또한 `<button role="tab">`에 `type="button"`, `aria-controls`가 없고, 한국어 문장(`div.k.kr`)에 `lang="ko"`가 없으며, `$("#chips").append(c)`를 루프마다 반복 호출합니다. 아카이브 후 워크스페이스에서 제거하거나 `class.html`에 정식 통합 시 리팩토링해야 합니다.

---

### 3.4 정적 이미지 에셋 전수 감사 (`assets/` 9개 파일)

| 파일 경로 | 용량 (KB / Bytes) | 해상도 | 참조 위치 | 감사 판정 및 최적화 방안 |
| :--- | ---: | :---: | :--- | :--- |
| `assets/image/profile-main.png` | **1,379.87 KB** (1,412,991 B) | `1023×1537` | `index.html:146`, `about.html:93` | 🔴 **CRITICAL (LCP 병목)**: 최대 표시 크기(`420×525px`) 대비 용량이 20배 과대함. AVIF/WebP (`420w`, `840w`) 변환 시 **~55 KB (96% 절감)** 가능 |
| `assets/image/profile-sample.png` | **1,539.75 KB** (1,576,707 B) | `1023×1537` | 미사용 (Orphan) | 🔴 **Dead Asset**: 프로젝트 내 어떤 코드에서도 참조하지 않는 1.54MB 중복 원본 파일. 즉시 삭제 권장 |
| `assets/image/profile-sample.jpg` | **45.10 KB** (46,185 B) | `500×626` | 미사용 (Orphan) | 🟡 **Dead Asset**: 미참조 샘플 이미지. 삭제 또는 테스트용 분리 권장 |
| `assets/favicon/android-chrome-512x512.png` | **28.85 KB** (29,540 B) | `512×512` | 미참조 (`site.webmanifest` 부재) | 🟡 웹 앱 매니페스트(`site.webmanifest`) 생성 또는 `<link rel="icon">` 연결 필요 |
| `assets/favicon/android-chrome-192x192.png` | **10.89 KB** (11,156 B) | `192×192` | 미참조 (`site.webmanifest` 부재) | 🟡 웹 앱 매니페스트 연결 필요 |
| `assets/favicon/apple-touch-icon.png` | **9.77 KB** (10,003 B) | `180×180` | 7개 HTML에서 `favicon/apple-touch-icon.png`로 잘못 참조 (404) | 🔴 HTML `<link>` 경로를 `assets/favicon/apple-touch-icon.png`로 수정 필수 |
| `assets/favicon/favicon.ico` | **15.04 KB** (15,406 B) | `32×32` | 미참조 | 🟡 `<link rel="icon" href="assets/favicon/favicon.ico" sizes="any">` 추가 권장 |
| `assets/favicon/favicon-32x32.png` | **1.38 KB** (1,416 B) | `32×32` | 7개 HTML에서 `favicon/favicon-32x32.png`로 잘못 참조 (404) | 🔴 HTML `<link>` 경로를 `assets/favicon/favicon-32x32.png`로 수정 필수 |
| `assets/favicon/favicon-16x16.png` | **0.63 KB** (648 B) | `16×16` | 7개 HTML에서 `favicon/favicon-16x16.png`로 잘못 참조 (404) | 🔴 HTML `<link>` 경로를 `assets/favicon/favicon-16x16.png`로 수정 필수 |

---

## 🗺️ 4. Actionable Implementation Plan (우선순위 실행 로드맵)

### 🚨 Phase P0 — 즉시 수정 (Immediate Blockers: 런타임 버그 · 404 에러 · 파서 손상 · 심각한 A11y 결함)

1. **`class.html` 캐러셀 64-카드 폭주 및 전 페이지 이벤트 리스너 이중 바인딩 제거**:
   - `js/nav.js:289`에 `if (track.dataset.rouletteMounted) return;` 가드 추가.
   - `js/about.js`, `js/class.js`, `js/contact.js`, `js/join.js`, `js/resource.js`에서 `js/nav.js`와 중복되는 `#bar` 스크롤, `.rv` IntersectionObserver, `pointermove` 스포트라이트/자석 버튼, `#peek-track` 룰렛 코드를 전량 제거하여 페이지당 단일 리스너만 동작하도록 일원화.
2. **HTML 파서 오류 및 필수 랜드마크/스킵 링크 복원**:
   - `index.html:132` 직후 누락된 `</div>`(`.authority-body` 닫는 태그) 추가 및 `.proof-list`를 `<ol>`/`<li>`로 변환.
   - `class.html:47`에서 `<main id="contenido">`를 열고 `class.html:231`에서 `</main>`으로 닫아 누락된 메인 랜드마크 복원.
   - 6개 메인 HTML 페이지 모두 `<body>` 직후 `<a class="skip-link" href="#contenido">Saltar al contenido principal</a>` 추가 및 `<main id="contenido">`로 ID 통일.
3. **깨진 링크(404) 및 죽은 CSS/UI 요소 즉시 복구**:
   - 전 페이지 `<head>`의 파비콘 경로를 `favicon/...` → `assets/favicon/...`으로 일괄 수정(`index.html`에도 추가).
   - `css/style.css`에 `.tag i` 크기/배경 정의 추가, `css/index.css`의 `.waveform`과 `.btn-unete`를 `css/style.css`로 승격 이동, `css/about.css`에 데스크톱 `.team .team-grid` 그리드 선언 추가, `css/join.css`에 `.wave` 플렉스박스 선언 추가.
   - `resource.html`의 12개 404 링크(`pdf-resource.html`, `guia-resource.html`, `podcast-resource.html`), `about.html:183` 및 `contact.html:203`의 `img/profile-julio-main.png` 404 경로, `join.html:256`의 `href="#"` 결제 링크를 실제 유효 경로로 연결.
   - `join.html:103` 오타(`pronuciación-check` → `pronunciación-check`) 수정.

---

### ⚡ Phase P1 — 단기 최적화 (Short-Term Optimization: Core Web Vitals LCP/INP/CLS & WCAG 2.2 AAA 준수)

1. **LCP / CLS / Reflow 최적화**:
   - `assets/image/profile-main.png` (1.38 MB)를 WebP/AVIF 다중 해상도(`420w`, `840w`)로 압축 변환하고, `<img width="1023" height="1537">` 명시, `about.html:93`에는 `fetchpriority="high"`, `index.html:146`에는 `loading="lazy" decoding="async"` 부여. 미사용 `assets/image/profile-sample.png` (1.54 MB) 제거.
   - `js/index.js:95-131` 및 `css/index.css:29-67`의 `.calendar-flip`에서 `offsetWidth` 기반 `width` 트랜지션을 제거하고 CSS Grid 중첩(`position: relative; grid-area: 1 / 1`) 및 `prefers-reduced-motion` / `IntersectionObserver` / `visibilitychange` 기반 타이머 제어로 리팩토링.
   - `css/style.css:770`(`h2::after`의 `width` 트랜지션), `css/style.css:255`(`.stripe-burger-line`의 `top` 트랜지션), `css/class.css:254`(`.rail i`의 `height` 갱신), `css/join.css:479`(`.btn-pulse`의 `box-shadow` 애니메이션)를 모두 `transform` / `opacity` 기반 GPU Composite 애니메이션으로 교체.
   - 모든 HTML의 `<script>` 태그에 `defer` 속성 추가 및 `cdn.jsdelivr.net` `<link rel="preconnect" crossorigin>` 추가.
2. **WCAG 2.2 Level AAA 완벽 달성**:
   - `css/token.css`의 라이트/다크 색상 토큰을 보정하여 모든 텍스트·배경·버튼 조합이 일반 텍스트 **7.0:1 이상**, 대형 텍스트/UI 컴포넌트 **4.5:1 이상**을 만족하도록 개선(특히 `--accent-secondary` 오렌지 및 다크 모드 `--text-on-accent` 대비 개선).
   - `js/nav.js` 모바일 메뉴(`.stripe-sheet`)에 `role="dialog"`, `aria-modal="true"`, 배경 `inert`, `Tab` 키 Focus Trap, `Escape` 포커스 복귀 구현.
   - 스페인어 문서(`lang="es"`) 내 스크린 리더에 읽히는 모든 한국어 텍스트(`index.html`, `resource.html`, `join.html`, `js/class.js` 25개 세션)에 `lang="ko"` 부여, 영어 뱃지(`FIRST CLASS`, `FLIGHT DEPARTING SOON`)에 `lang="en"` 부여(WCAG 3.1.2 AAA).
   - `index.html` 및 `class.html`의 코스 카드 CTA 링크에 고유 `aria-label` 부여(WCAG 2.4.9 AAA) 및 `contact.html`의 `target="_blank"` 링크에 새 창 열림 안내 통일(WCAG 3.2.5 AAA).

---

### 🏗️ Phase P2 — 아키텍처 및 보안 고도화 (Architectural & Security Hardening)

1. **모듈형 JS/CSS 아키텍처 및 ESNext 표준화**:
   - `js/about.js`(13개 `var`), `js/contact.js`(32개 `var`)의 ES5 레거시 문법과 `document.execCommand("copy")`를 ESNext(`const`/`let`, Clipboard API)로 전면 현대화.
   - `css/style.css`, `css/about.css`, `css/contact.css` 내 미사용 Dead CSS 선택자(10종) 정리 및 `css/token.css`(다크 모드 3중 중복), `css/index.css` ↔ `css/about.css`(`.somos-title` 중복) 통합.
   - Below-the-fold 섹션에 `content-visibility: auto; contain-intrinsic-size: auto 700px;` 도입.
2. **프론트엔드 보안 강화 (CSP Level 3 & SRI)**:
   - 외부 CDN 리소스(`pretendard`, `vanilla-tilt` — 또는 `vanilla-tilt`를 제거하고 내장 20줄 틸트 엔진으로 통일)에 Subresource Integrity(`integrity="sha384-..." crossorigin="anonymous"`) 적용.
   - `about.html:183`, `contact.html:203`의 인라인 `onerror="this.remove()"` 및 `imshi/donate.html:101-157`의 인라인 `<script>`, 그리고 HTML 내 89개 인라인 `style="..."` 속성을 외부 CSS 클래스/데이터 속성으로 분리하여 `'unsafe-inline'` 없는 엄격한 `Content-Security-Policy` 헤더/메타 정책 적용.
