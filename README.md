# [VAMOS COREANO: BRAND & WEB BLUEPRINT v1.0 - 2026.10]

## Principios de Diseño
### 1. One Action, One Screen
En una pantalla, no hables de dos cosas a la vez. Mantén un solo objetivo claro por sección(pantalla)
2. White Space (Espacio en blanco)
No llenes la pantalla con demasiado texto. Deja que el diseño respire para guiar la atención del usuario.
### 3. Micro-interactions
Cada detalle importa. Un sutil efecto de glow, fade, textura y movimiento fluido hace que la página se sienta premium.
### 4. Restricción de color
Para mantener la consistencia visual, utilizaremos estrictamente solo 4 colores en toda la página:
• Blanco (Fondo base/cremoso) - #F8FAFC
• Negro (Texto principal) - #0F172A
• Azul (Color de marca) - #2563EB
• Naranja (Acento/Botones) - #F97316
### 5. Jerarquía Tipográfica
Usa un máximo de 2 tipográficas(fondo de texto)
  Bricolage Grotesque
  Pretendard
Define 6 tamaños exactos
  hero-impact: 5rem
  hero: 3rem
  title: 2rem
  subtitle: 1.25rem
  body: 1rem
  micro: 0.875rem
### 6.  Reutilización de Componentes
Nunca inventes un diseño nuevo para cada página. Crea un "kit básico" (botón principal, tarjeta de curso) en css y úsalo como piezas de Lego.(como coreano jaja)
### 7. Tono y Voz
Todos los mandatos debe hablar en de "tú" (cercano pero profesional). Los botones siempre deben comenzar con un verbo de acción directa. Y siempre no soy yo. SOMOS NOSOTROS.
E.j.:
⁠Descubre el curso⁠ (O)
⁠Enviar⁠ (X) ➔ Envía (O)
⁠Únete a la comunidad⁠ (O).
Conocer (X) -> conoce (O) 
// *QUe hago con sobre mi… (Sobre nosotros es muy largo :v)
### 8. Sistema de Espaciado 8pt
Regla: Todos los márgenes y paddings deben ser múltiplos de 8 (8px, 16px, 24px, 32px, 48px, 64px).

## VAMOS COREANO : BRAND
### 0. We Are (우리의 정의)
VAMOS COREANO es una plataforma y marca que ofrece contenidos educativos de coreano y una comunidad, diseñados a la medida para hispanohablantes. 
### 1. La Misión
Nuestra misión es guiar a los hispanohablantes a dominar el coreano de la forma más rápida y precisa, sin pasar por el filtro innecesario del "inglés" 
### 2. ¿Por qué nosotros?
No somos otra simple plataforma de cursos de coreano. Un tutor optimizado exclusivamente para hispanohablantes, que combina su especialidad en Literatura Coreana, certificación oficial y una comprensión absoluta del mundo hispano, diseña y lidera este camino. 
### 3. El Enemigo
Materiales mal traducidos con IA a través del inglés, la dependencia de la romanización que arruina la pronunciación, y la educación aburrida que obliga a memorizar sin explicar los principios ni el contexto. 
### 4. Valores Centrales
 Claridad Extrema : Que ningún principiante se pregunte "¿Qué debo hacer aquí?" ni por 0.1 segundos. Diseñaremos la educación, la web y el UX/UI de la comunidad de manera abrumadoramente sistemática e intuitiva. 
 Valor Real : No seremos una marca vacía que solo persigue dinero. Jamás haremos compromisos estúpidos que ensucien la página o interrumpan la inmersión del estudiante solo por ganar unos dólares (como poner anuncios innecesarios). 
### 5. Slogan
Un idioma. Un objetivo. 100% para hispanohablantes.
하나의 언어. 하나의 목표. 100% 스페인어 화자를 위하여.

## [VAMOS COREANO] Mapa del Sitio 
### 0. Principio
Si necesitas hacer un cambio en la página web, modifica este mapa primero. 
### 1. Menú Principal (GNB):
Exactamente 5 elementos El orden no es aleatorio.
 SOBRE MÍ -> CURSOS ➔ RECURSOS ➔ ➔ CONTACTO ➔ [ ÚNETE ]
* SOBRE MÍ: Autoridad (Sonbre nosotros 하고싶은데 길다..)
* CURSOS: El producto principal
* RECURSOS: Materiales
* CONTACTO: Contacto
* [ ÚNETE ]: El destino final (Botón CTA con color de acento, destacado a la derecha).
### 2. Número de archivos HTML: Exactamente 6
* index.html (Inicio): 
El lugar donde el visitante aterriza por primera vez. Contiene nuestro imponente manifiesto de marca y actúa como el hub central que distribuye el tráfico hacia todas las subpáginas.
* about.html (Sobre el tutor):
Página diseñada para construir confianza. Aquí demostramos nuestra "Ventaja Injusta" (especialidad en Literatura Coreana, certificación oficial de tutor, etc.).
* class.html (Clases):
El showroom que presenta las clases que hemos creado.
* resource.html (Materiales):
La página imán (Lead Magnet) que atrae el tráfico de búsqueda del mundo hispano al sitio web, ofreciendo enlaces a podcasts, descargas de PDF, entre otros.
* contact.html (Contacto):
Página de contacto directa que incluye un enlace de consulta por WhatsApp o un formulario de correo electrónico.
* join.html (Landing de Discord):
La página de ventas clave. Explica el valor de nuestro modelo de negocio principal ("la comunidad de pago") con la majestuosidad de una presentación de Apple, guiando directamente al usuario hacia el pago y registro. (El botón 'ÚNETE' del menú superior dirige a esta página).

## Instrucciones para index.html
### 1. ¿Qué es este archivo?
Es el lugar donde el visitante aterriza por primera vez. No es una página para dar mucha información, sino nuestra "Tarjeta de Presentación Premium". Contiene nuestro imponente manifiesto de marca y actúa como el hub central que distribuye el tráfico hacia todas las subpáginas.
### 2. Reglas de Diseño y UX (La Sensación)
* Efecto "WOW" (Micro-interacciones): La primera impresión debe ser de extrema profesionalidad. Necesitamos un uso abundante de sutiles efectos de glow, fade-in, texturas y animaciones fluidas al hacer scroll.
* Menos Información, Más Impacto: No intentes enseñar ni explicar todo aquí. El objetivo es que el usuario piense: "¡Wow, esta página es increíblemente profesional!". Diseño y micro-interacciones vale más que el texto en esta página.
* Una Pantalla, Un Concepto: Si el contenido es largo, córtalo. Usa botones de (Ver más / Leer más) para enviar al usuario a las subpáginas.
### 3. Estructura de Secciones (Flujo de Scroll de arriba hacia abajo)
* [Sección 1] Hero Section (Impacto Brutal): La primera pantalla. Un mensaje visual y textual abrumador que atrape al usuario al instante (El efecto "¡Boom!").
* [Sección 2] Identidad: ¿Qué es VAMOS COREANO? (Manifiesto breve).
      [왕크게] SOMOS
      [적당 크게] Una plataforma que ofrece contenidos educativos de coreano y una comunidad.
      [주절주절] Diseñados a la medida para hispanohablantes.
* [Sección 3] Sobre Mí (Resumen): Autoridad y confianza en pocas líneas.
* [Sección 4] Cursos (Resumen): Un vistazo rápido a nuestras clases.
[왕글씨]CURSOS
[중간 글씨] Diseñados exclusivamente para ti.
[설명 글씨] Explora nuestros programas regulares y especiales creados a la medida de tus metas. Sin rodeos, 100% en tu idioma.
* [Sección 5] Recursos (Resumen): El gancho de material.
[왕글씨] RECURSOS
[중간 글씨] Aprende sin barreras. Crece sin límites.
* [Sección 6] Contacto (Resumen): Vía rápida.
* [Sección 7] ÚNETE (Final CTA): Como es el final de la página, debe tener otro impacto visual brutal igual que la Sección 1, empujando al usuario a la acción definitiva.
* [Footer]

## Instrucciones para about.html
### 1. Regla Absoluta: Jerarquía Visual
Prohibido empezar con "Hola, me llamo..." o historias aburridas sobre Duolingo etc etc… 
El tamaño del texto debe ir de MAYOR a menor: comenzamos con textos ENORMES y frases cortas (Impacto). A medida que el usuario hace scroll hacia abajo, el texto se vuelve más pequeño y detallado.
### 2. El Impacto de Hechos en pagina 1 
- Diseño: Foto de perfil profesional a la derecha. A la izquierda, tipografía gigante y contundente.
- Contenido: Golpea al usuario directamente con estos 3 hechos indiscutibles (Sin rodeos):
  1. Especialidad en Literatura Coreana.
  2. Instructor Oficial Certificado.
  3. Fluidez Absoluta en Español.
### 3. [Sección 2 o 3] La Historia Detallada (구구절절 설명 - Storytelling)
- Cuándo aparece: Solo después de hacer 1 o 2 scrolls y haber aplastado al usuario con los "Hechos" de la Sección 1.
- Diseño: Aquí el tamaño de la fuente se reduce (tamaño de 'Cuerpo' o 'Cuerpo grande'). 
- Contenido: Ahora sí, explicamos detalladamente nuestra filosofía, el problema con las apps convencionales y la historia de VAMOS COREANO.
### Foto de perfil
- Cambio: En lugar del giro (spin) al hacer hover, sugiero un efecto sutil de 3D Tilt + Reflejo de luz (Glare).
- Look & Feel: Como el brillo de una tarjeta de crédito física o membresía VIP al moverla. Minimalista y muy elegante.
- Tech: Se puede implementar con backdrop-filter en CSS y alguna librería de Tilt (ej. Vanilla-tilt.js).

## Instrucciones para class.html
### 1. [Sección 1] Hero Section (El Impacto Tipográfico)
* Diseño: Esta sección debe ocupar el 100% de la altura de la pantalla. La protagonista absoluta es la tipografía. Gran contraste, texto centrado con mucho espacio en blanco (White Space).
* Copy (Texto Exacto):
Un idioma. Un objetivo. H1 BLACK
100% para hispanohablantes.  H1 BLUE
Aprende coreano desde tu idioma, no desde el inglés. H2 GRAY
### 2. [Sección 2] Cursos Regulares (Ruta de Vuelo Principal)
   * Concepto Visual: Las clases principales (Despegue, Ascenso, etc.) se mostrarán en una lista vertical. Cada tarjeta debe tener el diseño de un rectángulo glow.
   * Regla de Interacción (UX): Cuando el usuario hace clic, la tarjeta se expande suavemente hacia abajo (Acordeón).
   * Contenido Desplegado: Al abrirse el acordeón, el currículum debe mostrarse detalles. y cada bloc tiene
Estructura gramatical
contenido de clase
ejemplos
### 3. CTA EN EL ULTIMO PARTE
Para accion
Ya sea ir a contacto o ver recuerso etc..

## Instrucciones para resource.html
### 1. [Sección 1] Main Landing (Hero Section)
   * Diseño: Impacto visual inmediato. Debe transmitir la sensación de "Aquí hay oro gratuito".
Copy (Sugerencia):
   * Aprende sin barreras. Crece sin límites.
   * Desde recursos gratuitos esenciales hasta guías avanzadas. Todo diseñado 100% para hispanohablantes. 
### 2. [Sección 2] Navegación de Categorías (Tab UI)
   * Regla de Diseño: ¡NO crees nuevos archivos HTML para cada categoría! Mantén todo en recursos.html. (Se puede cambiar)
   *    * UI: Usa un menú de pestañas (Tabs) elegante o botones de filtro interactivos justo debajo del Hero Section (Ej: [ Todos ] [ 📄 PDF ] [ 🎧 Podcast ]). Al hacer clic, el contenido de abajo cambia suavemente sin recargar la página.
### 3. [Sección 3] Listado de Recursos (Contenido)
   * Diseño de Tarjetas (Cards): Cada recurso debe presentarse en una tarjeta minimalista, con un ícono claro (PDF o Audio) y un botón de "Descargar" o "Escuchar".
   *    * Copy de Categoría A (PDFs):
   * 
   * Materiales Descargables (PDF)
   * Desde el Hangeul básico hasta vocabulario avanzado. Descarga materiales en múltiples formatos y estudia sin la barrera del inglés.
   *    * Copy de Categoría B (Podcast):
   * 
   * VAMOS COREANO Podcast
   * Conocimientos del idioma y la cultura coreana de forma sencilla y divertida. Perfecto para escuchar gratis mientras conduces o lavas los platos.
   * 4. [Sección 4] El Trampolín Final (막단 방지 CTA)


      * Objetivo: Si el usuario ya descargó un PDF o escuchó un podcast, está listo para el siguiente nivel.
      *       * Copy: "¿Te gustó el material gratuito? Imagina lo que lograrás con nuestra comunidad privada."
      *       * Acción: Botón gigante ➔ [ Únete a la comunidad ] (Dirige a unete.html).

## Instrucciones para contact.html 
### 1. [Sección 1] Hero Section (El Saludo)
      * Diseño: Muy limpio y minimalista. Un gran título centrado con mucho espacio en blanco para transmitir tranquilidad y profesionalismo.
      * Copy: …??
      * Sub-copy: "Cualquier duda que tengas, nuestro equipo está listo para ayudarte al instante." (어떤 질문이든, 우리 팀이 즉시 도와드릴 준비가 되어 있습니다.)
### 2. Seccion 2 Sobre profe
Diseño.: Explicacion en la izquierda. foto en la derecha
Copy:
### . [Sección 2] Los 3 Canales (Tarjetas Flotantes)
      * Regla de Diseño : Diseña 3 tarjetas (Cards) minimalistas dispuestas horizontalmente (o verticalmente en móvil). Al pasar el ratón (hover), las tarjetas deben tener un suave efecto de elevación (Floating/Shadow).
      * Contenido de las 3 Tarjetas:
      1. WhatsApp (Respuesta Rápida): Ícono de WhatsApp. Texto: "Chatea con nosotros". Ideal para respuestas inmediatas y ventas.
      2. Instagram (Comunidad): Ícono de Instagram. Texto: "Mándanos un DM". Para interacciones más casuales y social proof.
      3. Correo Electrónico (Formal): Ícono de un sobre minimalista. Texto: "Envíanos un correo". Para asuntos de negocios o consultas largas.
### 3. [Sección 3] Contacto Directo (El Toque Humano - Opcional pero recomendado)
      * Concepto: Para dar el contacto directo de un miembro clave del equipo (Inwoo).
      * Diseño: Una tarjeta especial arriba de footer con un diseño ligeramente distinto (quizás con una pequeña foto de perfil o un avatar elegante).
      * Copy:
Habla con nuestro Cofundador y Director Técnico Conoce nuestro Cofundador y Director Técnico.  [ Contactar a Inwoo por instagram ]

## Instrucciones para unete.html (El Destino Final)
### 1. [Sección 1] Hero Section
         * 목적: 들어오자마자 가슴을 웅장하게 만듭니다. 배경은 가장 어두운 톤(Negro)으로 깔고 텍스트에 빛(Glow)을 줍니다.
         * Copy:
No estudies coreano. Vívelo. (한국어를 공부하지 마라. 살아내라.) Únete a la tripulación VIP y domina el idioma con nuestro sistema definitivo: Discord + Obsidian. 
[Sección 2] 문제 제기 (왜 혼자 하면 망하는가?)
            * 목적: 유저의 뼈를 때려서 '결핍'을 느끼게 합니다. (텍스트 중심의 짧은 섹션)
            * Copy:
¿Por qué el 90% abandona el coreano? Porque aprender solo, con PDFs sueltos y sin feedback, es volar a ciegas. (왜 90%가 한국어를 포기할까? 피드백 없이 혼자 낱장 PDF로 공부하는 건 눈을 가리고 비행하는 것과 같기 때문이다.)
[Sección 3] 솔루션 A : Discord (관제탑 & 크루)
               * 디자인/UX: 여기서부터 스크롤 애니메이션 폭발! 스크롤을 내리면 멋지게 세팅된 디스코드 커뮤니티 화면 목업(Mockup)이 아이패드나 모니터 프레임 안에 담겨서 스르륵 커지며 나타납니다.
               * 핵심 어필: '외롭지 않은 환경'과 '즉각적인 피드백'
               * Copy:
Tu Torre de Control 24/7 (24시간 관제탑) Entorno de inmersión total en Discord. Preguntas en vivo, correcciones de pronunciación y una comunidad de hispanohablantes con tu mismo objetivo. (디스코드에서의 완벽한 몰입 환경. 라이브 질문, 발음 교정, 그리고 같은 목표를 가진 스페인어권 커뮤니티.)
[Sección 4] 솔루션 B : Obsidian (제2의 뇌 & 비행 일지)
                  * 디자인/UX: 디스코드 화면이 사라지면서, 이번엔 옵시디언의 세련된 다크모드 화면과 노드 그래프(점들이 연결된 우주 같은 화면)가 웅장하게 나타납니다. (옵시디언의 노드 뷰는 시각적 뽕이 엄청납니다).
                  * 핵심 어필: '지식의 체계화', '복습의 자동화'
                  * Copy:
Tu Segundo Cerebro (당신의 제2의 뇌) Olvídate de los cuadernos desordenados. Construimos tu base de conocimientos en Obsidian. Todo el vocabulario y gramática conectados como una red neuronal. (어수선한 노트는 잊어라. 옵시디언에 지식 베이스를 구축한다. 신경망처럼 연결되는 어휘와 문법.)
[Sección 5] 가격 및 플랜 (티켓 발권)
                     * 디자인/UX: 길게 말하지 않고 딱 떨어지는 '프리미엄 멤버십 카드' 또는 '퍼스트 클래스 티켓' 디자인으로 가격을 보여줍니다.
                     * Copy:
Pase de Abordaje (탑승권 / 멤버십 플랜) Acceso total. Sin pagos ocultos. (전체 접근 권한. 숨겨진 비용 없음.)
                        * Acceso a todos los cursos (모든 코스 접근)
                        * Comunidad Discord VIP (디스코드 VIP)
                        * Plantillas de Obsidian (옵시디언 템플릿)
[Sección 6] Final CTA (최종 결제 버튼)
                        * 목적: 화면 하단에 다다랐을 때, 거대한 버튼 하나만 덩그러니 놓아두어 다른 곳으로 빠져나갈 수 없게 만듭니다.
                        * Copy:
El vuelo está a punto de despegar. ¿Subes? (비행기가 곧 이륙합니다. 탑승하시겠습니까?) [ Unirme a la Tripulación Ahora (지금 크루 합류하기) ]

## Instruccion para footer
1.Contenido
© 2026 Vamos Coreano. Todos los derechos reservados.
Diseñado para el mundo hispanohablante.