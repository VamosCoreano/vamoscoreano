/* Código retirado de index.html — pegar en class.html junto con el HTML de #chips y #ex y el CSS .chips/.chip/.ex */
const EX = [ ["Presentarte", "안녕하세요. 저는 María예요. 저는 콜롬비아 사람이에요.", "Hola, me llamo María. Soy de Colombia."], ["Ubicar", "책상이 어디에 있어요? 침대 옆에 있어요.", "¿Dónde está el escritorio? Está al lado de la cama."], ["Pasado y presente", "저는 어제 한국어를 공부했어요. 그리고 지금은 영어를 공부하고 있어요.", "Ayer estudié coreano. Ahora estudio inglés."], ["Comprar", "이것은 얼마예요? 오천 원이에요. 사과 세 개 주세요.", "¿Cuánto cuesta esto? Son 5.000 wones. Tres manzanas, por favor."], ["Futuro", "마르셀로 씨는 내일 뭐 할 거예요? 한국에 가고 싶어요.", "¿Qué harás mañana, Marcelo? Quiero ir a Corea."] ];      const showEx = i => { $$(".chip").forEach((c, j) => c.setAttribute("aria-selected", j === i));
      const [, k, e] = EX[i], x = $("#ex");
      x.innerHTML = "";
      const d = document.createElement("div");
      d.className = "k kr";
      k.split(" ").forEach((w, n) => {
        const s = document.createElement("span");
        s.style.setProperty("--i", n);
        s.textContent = w;
        d.append(s, " ");
      });
      const p = document.createElement("div");
      p.className = "e";
      p.textContent = e;
      x.append(d, p);
    };

    EX.forEach(([t], i) => {
      const c = document.createElement("button");
      c.className = "chip";
      c.role = "tab";
      c.textContent = t;
      c.onclick = () => showEx(i);
      $("#chips").append(c);
    });
    showEx(0);
