20261025





Principios de Diseño

. One Action, One Screen

En una pantalla, no hables de dos cosas a la vez. Mantén un solo objetivo claro por sección(pantalla)

2\. White Space (Espacio en blanco)

No llenes la pantalla con demasiado texto. Deja que el diseño respire para guiar la atención del usuario.

3\. Micro-interactions

Cada detalle importa. Un sutil efecto de glow, fade, textura y movimiento fluido hace que la página se sienta premium.

4\. Restricción de color

Para mantener la consistencia visual, utilizaremos estrictamente solo 4 colores en toda la página:

• Blanco (Fondo base/cremoso) - #F8FAFC

• Negro (Texto principal) - #0F172A

• Azul (Color de marca) - #2563EB

• Naranja (Acento/Botones) - #F97316

5\. Jerarquía Tipográfica

Usa un máximo de 2 tipográficas(fondo de texto)

Define 4 tamaños exactos

Título principal(más grueso y fuerte,

Título

Subtítulo

Cuerpo

Y respétalos estrictamente en todo el sitio.

6\.  Reutilización de Componentes

Nunca inventes un diseño nuevo para cada página. Crea un "kit básico" (botón principal, tarjeta de curso) en css y úsalo como piezas de Lego.(como coreano jaja)

7\. Tono y Voz

Todos los mandatos debe hablar en de "tú" (cercano pero profesional). Los botones siempre deben comenzar con un verbo de acción directa. Y siempre no soy yo. SOMOS NOSOTROS.

E.j.:

⁠Descubre el curso⁠ (O)

⁠Enviar⁠ (X) ➔ Envía (O)

⁠Únete a la comunidad⁠ (O).

Conocer (X) -> conoce (O)

// \*QUe hago con sobre mi… (Sobre nosotros es muy largo :v)

8\. Sistema de Espaciado 8pt

Regla: Todos los márgenes y paddings deben ser múltiplos de 8 (8px, 16px, 24px, 32px, 48px, 64px).





VAMOS COREANO : BRAND

0\. We Are (우리의 정의)

VAMOS COREANO es una plataforma y marca que ofrece contenidos educativos de coreano y una comunidad, diseñados a la medida para hispanohablantes.

1\. La Misión

Nuestra misión es guiar a los hispanohablantes a dominar el coreano de la forma más rápida y precisa, sin pasar por el filtro innecesario del "inglés"

2\. ¿Por qué nosotros?

No somos otra simple plataforma de cursos de coreano. Un tutor optimizado exclusivamente para hispanohablantes, que combina su especialidad en Literatura Coreana, certificación oficial y una comprensión absoluta del mundo hispano, diseña y lidera este camino.

3\. El Enemigo

Materiales mal traducidos con IA a través del inglés, la dependencia de la romanización que arruina la pronunciación, y la educación aburrida que obliga a memorizar sin explicar los principios ni el contexto.

4\. Valores Centrales

&#x20;Claridad Extrema : Que ningún principiante se pregunte "¿Qué debo hacer aquí?" ni por 0.1 segundos. Diseñaremos la educación, la web y el UX/UI de la comunidad de manera abrumadoramente sistemática e intuitiva.

&#x20;Valor Real : No seremos una marca vacía que solo persigue dinero. Jamás haremos compromisos estúpidos que ensucien la página o interrumpan la inmersión del estudiante solo por ganar unos dólares (como poner anuncios innecesarios).

5\. Slogan

Un idioma. Un objetivo. 100% para hispanohablantes.

하나의 언어. 하나의 목표. 100% 스페인어 화자를 위하여.





\[VAMOS COREANO] Mapa del Sitio

0\. Principio

Si necesitas hacer un cambio en la página web, modifica este mapa primero.

1\. Menú Principal (GNB):

Exactamente 5 elementos El orden no es aleatorio.

&#x20;SOBRE MÍ -> CURSOS ➔ RECURSOS ➔ ➔ CONTACTO ➔ \[ ÚNETE ]

SOBRE MÍ: Autoridad (Sonbre nosotros 하고싶은데 길다..)

CURSOS: El producto principal

RECURSOS: Materiales

CONTACTO: Contacto

\[ ÚNETE ]: El destino final (Botón CTA con color de acento, destacado a la derecha).

2\. Número de archivos HTML: Exactamente 6

index.html (Inicio):

El lugar donde el visitante aterriza por primera vez. Contiene nuestro imponente manifiesto de marca y actúa como el hub central que distribuye el tráfico hacia todas las subpáginas.

about.html (Sobre el tutor):

Página diseñada para construir confianza. Aquí demostramos nuestra "Ventaja Injusta" (especialidad en Literatura Coreana, certificación oficial de tutor, etc.).

class.html (Clases):

El showroom que presenta las clases que hemos creado.

resource.html (Materiales):

La página imán (Lead Magnet) que atrae el tráfico de búsqueda del mundo hispano al sitio web, ofreciendo enlaces a podcasts, descargas de PDF, entre otros.

contact.html (Contacto):

Página de contacto directa que incluye un enlace de consulta por WhatsApp o un formulario de correo electrónico.

join.html (Landing de Discord):

La página de ventas clave. Explica el valor de nuestro modelo de negocio principal ("la comunidad de pago") con la majestuosidad de una presentación de Apple, guiando directamente al usuario hacia el pago y registro. (El botón 'ÚNETE' del menú superior dirige a esta página).





Instrucciones para index.html (El Hub Central)

1\. ¿Qué es este archivo?

Es el lugar donde el visitante aterriza por primera vez. No es una página para dar mucha información, sino nuestra "Tarjeta de Presentación Premium". Contiene nuestro imponente manifiesto de marca y actúa como el hub central que distribuye el tráfico hacia todas las subpáginas.

2\. Reglas de Diseño y UX (La Sensación)

Efecto "WOW" (Micro-interacciones): La primera impresión debe ser de extrema profesionalidad. Necesitamos un uso abundante de sutiles efectos de glow, fade-in, texturas y animaciones fluidas al hacer scroll.

Menos Información, Más Impacto: No intentes enseñar ni explicar todo aquí. El objetivo es que el usuario piense: "¡Wow, esta página es increíblemente profesional!". Diseño y micro-interacciones vale más que el texto en esta página.

Una Pantalla, Un Concepto: Si el contenido es largo, córtalo. Usa botones de (Ver más / Leer más) para enviar al usuario a las subpáginas.

3\. Estructura de Secciones (Flujo de Scroll de arriba hacia abajo)

\[Sección 1] Hero Section (Impacto Brutal): La primera pantalla. Un mensaje visual y textual abrumador que atrape al usuario al instante (El efecto "¡Boom!").

\[Sección 2] Identidad: ¿Qué es VAMOS COREANO? (Manifiesto breve).

\[Sección 3] Sobre Mí (Resumen): Autoridad y confianza en pocas líneas.

\[Sección 4] Cursos (Resumen): Un vistazo rápido a nuestras clases.

\[Sección 5] Recursos (Resumen): El gancho de material.

\[Sección 6] Contacto (Resumen): Vía rápida.

\[Sección 7] ÚNETE (Final CTA): Como es el final de la página, debe tener otro impacto visual brutal igual que la Sección 1, empujando al usuario a la acción definitiva.

\[Footer]





Instrucciones para sobre-mi.html

1\. Regla Absoluta: Jerarquía Visual

Prohibido empezar con "Hola, me llamo..." o historias aburridas sobre Duolingo etc etc…

El tamaño del texto debe ir de MAYOR a menor: comenzamos con textos ENORMES y frases cortas (Impacto). A medida que el usuario hace scroll hacia abajo, el texto se vuelve más pequeño y detallado.

2\. El Impacto de Hechos en pagina 1

\- Diseño: Foto de perfil profesional a la derecha. A la izquierda, tipografía gigante y contundente.

\- Contenido: Golpea al usuario directamente con estos 3 hechos indiscutibles (Sin rodeos):

&#x20; 1. Especialidad en Literatura Coreana.

&#x20; 2. Instructor Oficial Certificado.

&#x20; 3. Fluidez Absoluta en Español.

3\. \[Sección 2 o 3] La Historia Detallada (구구절절 설명 - Storytelling)

\- Cuándo aparece: Solo después de hacer 1 o 2 scrolls y haber aplastado al usuario con los "Hechos" de la Sección 1.

\- Diseño: Aquí el tamaño de la fuente se reduce (tamaño de 'Cuerpo' o 'Cuerpo grande').

\- Contenido: Ahora sí, explicamos detalladamente nuestra filosofía, el problema con las apps convencionales y la historia de VAMOS COREANO.

