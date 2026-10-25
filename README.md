# 🚀 VAMOS COREANO — Documentación del Proyecto & Guía de Estilo

---

## 🎨 Principios de Diseño Visual & UX

| # | Principio | Regla de Diseño |
|---|---|---|
| **1** | **One Action, One Screen** | En una pantalla, no hables de dos cosas a la vez. Mantén un solo objetivo claro por sección/pantalla. |
| **2** | **White Space** | No llenes la pantalla con demasiado texto. Deja que el diseño respire para guiar la atención del usuario. |
| **3** | **Micro-interactions** | Cada detalle importa. Un sutil efecto de *glow*, *fade*, textura y movimiento fluido hace que la página se sienta premium. |
| **4** | **Restricción de Color** | Máximo **4 colores** estrictos en todo el sitio para mantener la consistencia visual. |
| **5** | **Jerarquía Tipográfica** | Máximo 2 familias tipográficas y 4 tamaños exactos (Título principal, Título, Subtítulo, Cuerpo) respetados estrictamente. |
| **6** | **Reutilización de Componentes** | Sistema modular ("Piezas de Lego"). Kit básico en CSS (botones, tarjetas, etc.) reutilizado globalmente. |
| **7** | **Tono y Voz** | Trato directo de **"tú"** (cercano y profesional). Botones con **verbos de acción directa**. Enfoque colectivo: **"NOSOTROS"** (nunca "yo"). |
| **8** | **Sistema de Espaciado (8pt)** | Todos los márgenes y *paddings* deben ser múltiplos de 8 (`8px`, `16px`, `24px`, `32px`, `48px`, `64px`). |

---

### 🎨 Paleta de Colores Principal

| Rol de Color | Nombre | Código HEX | Muestra |
|---|---|---|---|
| **Fondo Base / Cremoso** | Blanco Soft | `#F8FAFC` | `[  #F8FAFC  ]` |
| **Texto Principal** | Negro Profundo | `#0F172A` | `[  #0F172A  ]` |
| **Color de Marca** | Azul Vibrante | `#2563EB` | `[  #2563EB  ]` |
| **Acento / Botones (CTA)** | Naranja Energético | `#F97316` | `[  #F97316  ]` |

---

### ✍️ Guía de Tono, Voz y Botones (CTA)

| ❌ Incorrecto | ✅ Correcto | Explicación |
|---|---|---|
| *Descubrir el curso* | **Descubre el curso** | Usar imperativo/acción directa |
| *Enviar* | **Envía** | Acción clara e inmediata |
| *Conocer* | **Conoce** | Segunda persona del singular ("tú") |
| *Unirse a la comunidad* | **Únete a la comunidad** | Cercano y profesional |

> 📌 **Nota sobre autoría:** Usar siempre **"NOSOTROS"** en lugar de "Yo" en los textos generales del sitio.

---

## 🇰🇷 Brand Identity (Identidad de Marca)

### 0. We Are (우리의 정의)
**VAMOS COREANO** es una plataforma y marca educativa que ofrece contenidos y una comunidad de aprendizaje diseñados exclusivamente a la medida de los hispanohablantes.

### 1. La Misión
Guiar a los hispanohablantes a dominar el coreano de la forma más rápida y precisa, **sin pasar por el filtro innecesario del inglés**.

### 2. ¿Por qué nosotros?
No somos otra simple plataforma de cursos. Nuestro diferencial radica en un tutor optimizado exclusivamente para el público hispano:
* Especialista en **Literatura Coreana**.
* Certificación oficial como instructor de coreano.
* Comprensión absoluta del mundo y la cultura hispana.

### 3. El Enemigo
* Materiales traducidos de forma deficiente con IA a través del inglés.
* Dependencia excesiva de la romanización (que destruye la pronunciación).
* Educación aburrida basada en memorizar sin comprender principios ni contextos.

### 4. Valores Centrales

| Valor | Descripción |
|---|---|
| **🎯 Claridad Extrema** | Cero confusión. Ningún principiante debe preguntarse *"¿Qué debo hacer aquí?"* ni por 0.1 segundos. UX/UI limpia y abrumadoramente intuitiva. |
| **💎 Valor Real** | Cero compromisos que ensucien la experiencia. Jamás colocaremos anuncios o distracciones que arruinen la inmersión por obtener ingresos rápidos. |

### 5. Slogan
> **"Un idioma. Un objetivo. 100% para hispanohablantes."**  
> *(하나의 언어. 하나의 목표. 100% 스페인어 화자를 위하여.)*

---

## 🗺️ Mapa del Sitio (Site Structure)

> ⚠️ **Regla:** Cualquier cambio de arquitectura en la web debe actualizarse primero en este documento.

### 📍 Menú Principal (GNB — Global Navigation Bar)
El menú consta de **exactamente 5 elementos** ordenados estratégicamente:

1. `SOBRE MÍ` — Construcción de autoridad y confianza.
2. `CURSOS` — Producto principal.
3. `RECURSOS` — Materiales y contenido de atracción.
4. `CONTACTO` — Vía rápida de comunicación.
5. `[ ÚNETE ]` — **CTA Destacado** a la derecha con el color de acento (`#F97316`), dirigiendo a la landing de pago/comunidad.

---

### 📂 Estructura de Archivos HTML (6 Archivos en total)

| Archivo HTML | Nombre de Sección | Propósito y Función |
|---|---|---|
| `index.html` | **Inicio (Hub Central)** | Tarjeta de presentación premium. Manifiesto de marca y distribuidor del tráfico principal. |
| `about.html` | **Sobre Mí** | Página de autoridad y confianza. Demuestra la "ventaja injusta" (título, certificación, fluidez). |
| `class.html` | **Clases** | Showroom de cursos y oferta académica. |
| `resource.html` | **Recursos** | Lead Magnet para tráfico orgánico (podcasts, PDFs descargables, guías). |
| `contact.html` | **Contacto** | Formulario directo y enlace directo a WhatsApp. |
| `join.html` | **Únete (Landing Discord)** | Página de conversión clave. Explicación del modelo de comunidad de pago con estilo Apple. |

---

## 📐 Especificaciones de Contenido por Página

### 🏠 `index.html` — Hub Central

* **Objetivo:** Primera impresión impactante (Efecto WOW). Menos información, mayor jerarquía visual y estética premium.
* **Estructura de Secciones (Scroll vertical):**
  1. **Hero Section:** Mensaje visual y textual contundente (Impacto inmediato).
  2. **Identidad:** Breve manifiesto de *VAMOS COREANO*.
  3. **Sobre Mí (Resumen):** Bloque rápido de confianza con enlace a `about.html`.
  4. **Cursos (Resumen):** Preview de la oferta académica.
  5. **Recursos (Resumen):** Gancho con descargas gratuitas.
  6. **Contacto (Resumen):** Vía rápida de mensaje.
  7. **ÚNETE (Final CTA):** Cierre visual de alto impacto que empuja al registro.
  8. **Footer.**

---

### 👨‍🏫 `about.html` — Sobre Mí

* **Regla Absoluta:** Jerarquía visual estricta. Cero intro aburrida de "Hola me llamo...".

```
┌─────────────────────────────────────────────────────────────┐
│ SECCIÓN 1: IMPACTO DE HECHOS (Pantalla inicial)             │
│                                                             │
│ [ A la izquierda ]                   [ A la derecha ]       │
│ Tipografía Gigante:                  Foto de perfil         │
│ 1. Especialidad en Literatura Coreana  profesional          │
│ 2. Instructor Oficial Certificado                           │
│ 3. Fluidez Absoluta en Español                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ (Scroll)
┌─────────────────────────────────────────────────────────────┐
│ SECCIÓN 2/3: STORYTELLING & FILOSOFÍA                       │
│ Fuente en tamaño estándar/cuerpo.                           │
│ Explicación de la historia, el problema de las apps         │
│ tradicionales y la visión de VAMOS COREANO.                 │
└─────────────────────────────────────────────────────────────┘
```