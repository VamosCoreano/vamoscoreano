# VAMOS COREANO — v3

Portada experimental de **VAMOS COREANO**, la plataforma para aprender coreano 100% en español.
Esta carpeta es independiente del sitio actual: no modifica ningún archivo de la raíz del repositorio.

## Cómo verla

Son archivos estáticos (HTML, CSS y JavaScript, sin dependencias ni build). Desde esta carpeta:

```bash
python -m http.server 8082
```

y abre `http://localhost:8082`. También funciona abriendo `index.html` directamente en el navegador.

## Qué contiene

| Archivo | Contenido |
| --- | --- |
| `index.html` | Estructura: fondo, hangul flotante, cristal traductor, titular y dock |
| `styles.css` | Todo el diseño y las animaciones en CSS |
| `script.js` | Palabra dinámica, magnificación del dock, hangul flotante y cristal traductor |

### 1. Fondo nocturno animado
Degradado vertical azul noche → azul profundo → verde azulado oscuro, con un foco de luz azul eléctrico detrás del titular y un segundo foco verde azulado más tenue.
Cada foco se desplaza y pulsa con periodos distintos (23 s / 9 s y 31 s / 13 s), así el movimiento es continuo y el bucle no tiene saltos.
Una capa de grano muy leve evita bandas de color.

### 2. Titular dinámico
**Habla / Lee / Escribe** + **Coreano**, siempre en una sola línea (el tamaño escala con el ancho de pantalla; máximo 88 px).
La palabra sale desenfocándose, entra enfocándose, y "Coreano" se desliza suavemente cuando cambia el ancho.

### 3. Dock estilo macOS
Cristal claro con tres opciones (Sobre Nosotros · Cursos · Contacto), del mismo ancho.
Con ratón, cada icono crece hasta ×1,25 según la distancia del cursor, siempre dentro de su botón. En móvil ocupa el ancho de la pantalla.

### 4. Hangul flotante
50 palabras básicas de coreano repartidas en 12 huecos (bandas superior e inferior y márgenes). Aparecen, suben y se desvanecen; cada hueco cambia de palabra mientras es invisible.
Su tamaño es relativo al titular (como máximo el 60 %), y un control oculta cualquier palabra que quedaría a menos de 40 px del titular o del dock.

### 5. Cristal traductor
Cada 8 s, o al pasar el cursor por una palabra del fondo:
1. La palabra pierde el blur y queda nítida en coreano (~1,5 s).
2. Aparece un cristal rectangular ajustado a la palabra, con un destello y unas pocas partículas de luz.
3. El cristal cambia de tamaño para encajar la traducción al español, mientras el hangul se desvanece.
4. Vuelve el coreano, el cristal desaparece y la palabra recupera su blur.

Antes de elegir una palabra se comprueba que el cristal (en coreano y en español) no toca el titular, el dock ni los bordes. La traducción va como máximo a 26 px para no restar protagonismo al titular.

## Decisiones técnicas

- **Rendimiento:** los fondos y las palabras solo animan `transform` y `opacity` (sin `filter: blur` animado en el fondo).
- **Accesibilidad:** con "reducir movimiento" todo queda quieto y el cristal no aparece; con "reducir transparencia" el dock pasa a cristal opaco. El titular tiene una etiqueta accesible fija ("Habla, lee y escribe coreano") y las capas decorativas están ocultas para lectores de pantalla.
- **Responsive:** comprobado de 320 px a 2560 px y en móvil apaisado, sin scroll lateral y sin solapamientos.

## Pendiente

- **Enlaces del dock:** apuntan a `#nosotros`, `#cursos` y `#contacto`, secciones que aún no existen.
- **Traducciones:** son las equivalencias estándar y están marcadas como `PENDIENTE` en `script.js` para que Hyunho las revise. Algunas tienen más de un significado: 시간 (tiempo / hora), 만나다 (encontrarse / quedar), 알다 (saber / conocer).

## Historial del rediseño

- **v1:** portada en un solo archivo, separada en HTML, CSS y JS; titular dinámico y botón "Conoce a tu profesor" con presentación de Hyunho.
- **v2:** sitio de 6 páginas (inicio, nosotros, cursos, recursos, contacto, únete) con un sistema de diseño basado en tokens de Material Design 3, paleta de 4 colores y rejilla de 8 pt.
- **v3 (esta carpeta):** nueva portada inmersiva — fondo nocturno animado, titular dinámico, dock y hangul flotante con cristal traductor.

v1 y v2 se conservan en local; esta rama solo publica la v3.
