# Brief de landing - Mint

Base: repo actual de Mint (React + Vite + Tailwind). Tokens: Sora (display, 600-700, tracking -0.02em), DM Sans (body, 400/500), navy #0A1628, hairline #E6EAEF, mint #00C07A / #00875A (empresas), indigo #2D4CC8 (proveedores), gris de sección #F7F9FB. Lienzo 90% neutral, acentos menos del 10%. Radios: cards 10px, botones 8px, chips 999px. Sombras solo en flotantes. Screenshots siempre de la app real con datos demo en MXN y empresas mexicanas verosímiles (Distribuidora del Bajío, Grupo Alimentos Norte). El gradiente mint-indigo aparece exactamente una vez (sección dual); prohibido en cualquier otro lugar.

Ritmo de fondos: navbar blanco, hero blanco, cómo funciona #F7F9FB, sección dual blanco, features #F7F9FB, confianza blanco, CTA final navy, footer navy.

---

## 1. Navbar

**Objetivo:** orientar en 2 segundos quién eres (empresa o proveedor) y mandarte a tu lado.

**Layout:** barra sticky, fondo blanco, borde inferior hairline #E6EAEF, altura 64px, contenido en container max-w-6xl. Izquierda: logotipo "Mint" en Sora 600 navy con el sello de folio a 24px (círculo + ticks, trazo mint) como isotipo. Centro: dos links en DM Sans 500 navy ("Cómo funciona", "Para proveedores", anchors). Derecha: link fantasma "Soy proveedor" (texto navy, hover indigo) + botón primario mint (bg #00C07A, texto blanco, hover #00875A, radio 8px).

**Copy:**
- Links: `Cómo funciona` · `Para proveedores`
- Link secundario: `Soy proveedor` → /suppliers
- CTA: `Crea tu primera licitación` → /app

**Dualidad:** un solo acento visible (mint en el CTA). El indigo solo asoma en el hover de "Soy proveedor": pista, no protagonismo.

---

## 2. Hero

**Objetivo:** que un gerente de compras entienda en un vistazo que Mint convierte su "mándame tres cotizaciones" en un proceso formal con IA.

**Layout:** patrón Tailscale (hero dividido panel de marca + screenshot, ref. Mobbin del memo de marca). Grid asimétrico 5/7 sobre fondo blanco, py-24. Izquierda: H1 en Sora 700, 44-48px, tracking -0.02em, navy; subhead DM Sans 400 16-17px, navy al 70%, max-w-md; fila de CTAs. Derecha: panel navy #0A1628, radio 16px, que sangra por el borde derecho del viewport (overflow visible, sin padding derecho del container); dentro, el sello de folio grande (LIC-2026-014) en trazo mint al 20% como textura de fondo, y encima un screenshot real del kanban de propuestas recortado al 70% (se ve la columna Recibida completa, Análisis parcial), dentro del marco estándar: radio 12px, borde hairline, barra superior de 28px con tres puntos. Nada de laptops ni 3D.

**Copy:**
- H1 (6 palabras): `Licita en orden. Decide con datos.`
- Subhead: `El Asistente Mint convierte lo que necesitas comprar en una licitación formal de 11 secciones, lista en minutos. Tus proveedores aplican con un link y todas las propuestas caen en un solo tablero.`
- CTA primario (mint): `Crea tu primera licitación` → /app
- CTA secundario (link navy con flecha, hover indigo): `Ver licitaciones abiertas` → /suppliers
- Microcopy bajo el CTA (DM Sans 13px, navy 60%): `Tus primeras 2 licitaciones son gratis.`

**Dualidad:** hero pertenece al lado empresa: mint en CTA y en el sello del panel. El camino proveedor existe pero en voz baja (link secundario).

---

## 3. Cómo funciona (empresas)

**Objetivo:** demostrar que el proceso completo son tres movimientos, no un ERP.

**Layout:** fondo #F7F9FB, py-20. Título de sección en Sora 600 28px centrado + una línea de apoyo. Tres columnas (grid-cols-3, gap-8, stack en móvil). Cada paso: card blanca radio 10px borde hairline, arriba el sello de folio a 48px como indicador de paso: en el paso 1 los ticks se rellenan parcialmente (secciones del documento), en el 2 el anillo completo, en el 3 los ticks marcan stages del pipeline; trazo mint. Es el hilo visual que pide el memo de marca. Título de paso en Sora 600 18px, cuerpo DM Sans 15px navy 70%. Bajo cada card, un screenshot recortado al 70% de la vista real (asistente, documento publicado, kanban) en el marco estándar.

**Copy:**
- Título: `Tu próxima compra, en tres pasos`
- Apoyo: `Del "necesito cotizaciones" a una decisión con datos, sin salir de un solo lugar.`
- Paso 1: `Describe con el asistente` / `Contesta 10 preguntas en el chat. El Asistente Mint redacta las 11 secciones del documento: objetivo, alcance, criterios, presupuesto, cronograma. Tú editas lo que quieras.`
- Paso 2: `Publica e invita` / `Publica tu licitación y comparte el link con los proveedores que ya conoces. Aplican sin fricción, con su propuesta económica y sus archivos.`
- Paso 3: `Compara y decide` / `Cada propuesta cae en tu tablero: monto, contacto y etapa. Arrastra, negocia y acepta la que gane. Todo queda registrado.`

**Dualidad:** sección 100% lado empresa, único acento mint (sellos y detalles). Cero indigo.

---

## 4. La otra cara: proveedores (sección dual + flip a indigo)

**Objetivo:** decirle al proveedor que Mint le cuesta cero y le da acceso formal a licitaciones, y mostrar la dualidad como identidad de marca.

**Layout:** fondo blanco, py-20. Patrón Contra (dos cards CTA para dos audiencias, ref. Mobbin del memo). Título de sección neutral en Sora 600 centrado. Debajo, dos cards lado a lado con gap de 24px, radio 10px, borde hairline: izquierda "Para empresas que licitan" con fondo rgba(0,192,122,.06) y CTA mint; derecha "Para proveedores" con fondo rgba(45,76,200,.06) y CTA indigo, y con más peso visual (ligeramente más alta, incluye un screenshot del portal de licitaciones abiertas recortado al 70%, marco estándar). En el gap entre las dos cards, la línea vertical de 2px con el gradiente del trato (linear-gradient 180deg mint → indigo, stops 38/62): la única aparición del gradiente en toda la landing. Iconos Phosphor regular, uno por card, del color de su lado.

**Copy:**
- Título: `Dos lados, un mismo trato`
- Apoyo: `Mint es neutral: le sirve igual al que compra y al que vende.`
- Card empresas: `Para empresas que licitan` / `Publica licitaciones formales, recibe propuestas comparables y decide con tu proceso en orden.` / CTA mint: `Crea tu primera licitación` → /app
- Card proveedores: `Para proveedores` / `Recibe el link de tu cliente o explora las licitaciones abiertas. Lee el documento completo, presenta tu propuesta con tus archivos y da seguimiento por correo. Sin costo, siempre.` / CTA indigo: `Ver licitaciones abiertas` → /suppliers
- Microcopy card proveedor (13px): `Los proveedores nunca pagan por usar Mint.`

**Dualidad:** este es el momento de marca. Mint e indigo conviven en la sección pero nunca en el mismo componente; solo la línea del gap los funde. Es el easter egg y no se repite.

---

## 5. Features grid

**Objetivo:** aterrizar el pitch en las cuatro piezas concretas que la app ya hace hoy.

**Layout:** fondo #F7F9FB, py-20. Título Sora 600 centrado. Grid 2x2 (gap-6, stack en móvil): cards blancas radio 10px, borde hairline, sin sombra, padding 24px. Cada card: icono Phosphor regular 24px mint, título Sora 600 17px, cuerpo DM Sans 15px navy 70%. Sin screenshots aquí (ya hubo tres arriba); las cards respiran.

**Copy:**
- Título: `Lo que hace Mint por ti`
- Card 1: `Asistente Mint` / `Te hace las preguntas correctas, una a la vez, y convierte tus respuestas en prosa de documento formal. Si falta un dato, lo deja marcado como pendiente: nunca inventa.`
- Card 2: `Documento de 11 secciones` / `Antecedentes, objetivo, alcance, entregables, criterios de evaluación, presupuesto, cronograma y más. Cada sección editable a mano, siempre. El asistente ayuda, tú mandas.`
- Card 3: `Pipeline de propuestas` / `Un tablero por licitación: Recibida, Análisis, Negociación, Aceptada, Rechazada. Arrastra propuestas entre etapas y ve el total de cada columna.`
- Card 4: `Propuestas comparables` / `Todas las propuestas llegan con la misma estructura: monto, contacto, resumen y descripción. Ábrelas lado a lado desde el tablero y compara peras con peras.`

Nota de build: la card 4 describe el drawer sobre datos homogéneos, no un comparador dedicado (eso es P1). No prometer tabla de comparación.

**Dualidad:** sección lado empresa, acento mint únicamente (iconos).

---

## 6. Confianza

**Objetivo:** sonar mexicano y formal sin fingir tracción que no existe.

**Layout:** fondo blanco, py-20. Layout de dos columnas 5/7: izquierda el claim de categoría en Sora 600 26px, derecha tres filas tipo lista (icono Phosphor regular navy + título DM Sans 500 + una línea), separadas por hairlines. Sin logos, sin números, sin testimonios: el memo de marca lo prohíbe y no hay clientes aún. La tercera fila lleva un chip neutral (fondo #F7F9FB, texto navy 60%, radio 999px) que dice "En camino": honestidad sobre la verificación fiscal, que es lo primero que se construye pero aún no está en producción.

**Copy:**
- Claim: `Hecho para el B2B mexicano`
- Apoyo: `Montos en MXN, lenguaje de compras real y las reglas del juego formal: facturación, referencias y contratos entre las partes.`
- Fila 1: `Tus proveedores, tu red` / `En México nadie le compra a desconocidos. En Mint invitas a los proveedores que ya conoces; cada licitación arranca con tu propia red.`
- Fila 2: `Mint no toca el dinero` / `El pago y la factura CFDI siguen siendo directos entre tu empresa y tu proveedor, con tus términos de crédito. Mint ordena el proceso, no se mete en tu flujo.`
- Fila 3 (chip "En camino"): `Verificación fiscal` / `Cada participante con su Constancia de Situación Fiscal: RFC y razón social verificados, con badge visible en cada propuesta.`

**Dualidad:** sección neutral a propósito: navy e ink, sin acentos de lado. La confianza es de los dos.

---

## 7. CTA final

**Objetivo:** cerrar con la oferta concreta y una sola acción.

**Layout:** panel navy #0A1628 de ancho completo, py-20, texto centrado max-w-2xl. H2 en Sora 600 32px blanco, apoyo DM Sans blanco al 70%, botón mint grande (px-8 py-3). Detrás del texto, a la derecha, el sello de folio gigante en trazo mint al 12% recortado por el borde: eco del hero. Botón secundario fantasma (borde blanco 30%, texto blanco) para el lado proveedor.

**Copy:**
- H2: `Tu siguiente compra merece un proceso serio`
- Apoyo: `Crea tu cuenta, contesta 10 preguntas y publica tu primera licitación hoy. Las primeras 2 son gratis.`
- CTA primario (mint): `Crea tu primera licitación` → /app
- CTA secundario (fantasma): `Ver licitaciones abiertas` → /suppliers

**Dualidad:** mint sobre navy como cierre del lado empresa; el proveedor conserva su salida en fantasma neutral (no indigo sobre navy, contraste insuficiente y el indigo ya tuvo su sección).

---

## 8. Footer

**Objetivo:** señales de formalidad mexicana, sin fingir nada.

**Layout:** continúa el navy #0A1628 (separado del CTA final por un hairline blanco al 10%), py-12, texto blanco al 70% en DM Sans 14px. Tres columnas: (1) logo Mint en blanco + una línea de descripción; (2) links de producto (Cómo funciona, Para empresas → /app, Para proveedores → /suppliers); (3) legal y contacto. Como cierre, el sello de folio en gris blanco al 15%, grande, recortado por la esquina inferior derecha. Sin badges de "clientes felices", sin logos, sin redes que no existan.

**Copy:**
- Descripción: `Licitaciones B2B en orden, hechas en México.`
- Columna legal: `Aviso de privacidad` · `Términos y condiciones` · `Contacto`
- Línea inferior: `© 2026 Mint. Todos los derechos reservados.`
- Pendientes (no inventar): razón social legal y correo de contacto reales los da Mike antes del deploy. Placeholder en build: `[Razón social pendiente]`, `[correo pendiente]`. No publicar con placeholders visibles.

**Dualidad:** ninguna. El footer es navy neutral; el sello en gris es marca, no lado.
