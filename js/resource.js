/* ==========================================================================
   js/resource.js — 리소스 서브페이지(resource/pdf.html 등) 전용 인터랙션
   - 이벤트 위임(Event Delegation) 방식으로 구현되어, HTML에서 <article class="pdf-card">를
     자유롭게 복사·추가해도 JS 수정 없이 모든 카드의 아코디언 확장이 즉시 동작합니다.
   ========================================================================== */
(function () {
  const list = document.getElementById("pdf-list");
  if (!list) return;

  list.addEventListener("click", (e) => {
    const trigger = e.target.closest(".pdf-card-trigger");
    if (!trigger || !list.contains(trigger)) return;

    const card = trigger.closest(".pdf-card");
    if (!card) return;

    const isOpen = card.classList.toggle("is-open");
    trigger.setAttribute("aria-expanded", String(isOpen));
  });
})();
