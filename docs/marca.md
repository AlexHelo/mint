# Marca - el carácter de Mint

## 1. Personalidad

**Formal sin ser acartonado. Directo. Confiable.**

Mint opera en un terreno donde el default es la desconfianza: empresas y proveedores que no se conocen, contratos, facturas, dinero. La marca no puede ser juguetona, pero tampoco puede parecer un portal de gobierno. El carácter correcto es el de un notario joven: serio en lo que importa, ágil en todo lo demás.

| Mint es | Mint no es |
|---|---|
| Un documento bien hecho | Un chat con adornos |
| Claro sobre plazos, montos y reglas | Vago con "soluciones integrales" |
| Neutral entre las dos partes | Vendedor de ninguna de ellas |
| Sobrio con destellos de color con intención | Un arcoíris de gradientes |
| Mexicano en lenguaje y contexto (CFDI, MXN) | Una traducción de un SaaS gringo |

## 2. La dualidad como sistema

Mint tiene dos caras y ese es su activo de marca más raro: casi ningún SaaS puede contar la historia de "dos colores, dos lados, un trato". Reglas:

- **El lienzo siempre es neutral.** Blanco, tinta navy #0A1628, hairlines #E6EAEF. Los acentos cubren menos del 10% de cualquier pantalla. Proporción objetivo: 90% neutral, 10% acento.
- **Mint green #00C07A / #00875A pertenece a las empresas que licitan.** Vive en su dashboard, sus CTAs, sus stat cards, el progreso del asistente.
- **Indigo #2D4CC8 pertenece a los proveedores.** Vive en el portal, la página de aplicar, el botón de enviar propuesta.
- **Nunca se mezclan en un componente.** Un botón, un chip, una card: un solo acento. La única excepción es el momento del trato.

**El movimiento firma: el sello del acuerdo.** Cuando una propuesta llega a "Aceptada" (el único punto del producto donde los dos lados se tocan de verdad), los dos colores se encuentran en un solo elemento por primera y única vez. Implementación concreta:

- La card aceptada recibe un borde superior de 3px con `background: linear-gradient(90deg, #00C07A 0%, #00C07A 38%, #2D4CC8 62%, #2D4CC8 100%)`. Los stops 38/62 crean una zona de fusión corta y deliberada al centro, no un arcoíris lavado.
- El chip de estado "Aceptada" usa el mismo gradiente como fondo al 12% de opacidad (`linear-gradient(90deg, rgba(0,192,122,.12), rgba(45,76,200,.12))`) con texto navy.
- En la confirmación (toast o modal), el sello circular del motivo (sección 5) se dibuja con la mitad izquierda en mint y la derecha en indigo.

Esta escasez es la regla: si el gradiente aparece en cualquier otro lugar, deja de significar "trato cerrado". Prohibido usarlo decorativamente.

## 3. Voz es-MX

**Tono en una línea:** habla como un colega competente que te ahorra trámites, de tú, sin rodeos y sin importar palabras del inglés corporativo.

1. **Hero H1:** "Licita en orden. Decide con datos."
2. **CTA principal (empresas):** "Crea tu primera licitación"
3. **CTA proveedor:** "Ver licitaciones abiertas"
4. **Empty state dashboard:** "Todavía no tienes licitaciones. Crea la primera y el asistente te ayuda a armar el documento."
5. **Empty state columna kanban:** "Nada en negociación por ahora. Arrastra aquí las propuestas que avancen."
6. **Success al publicar:** "Listo, tu licitación está publicada. Los proveedores ya pueden verla y aplicar."
7. **Success al enviar propuesta:** "Propuesta enviada. La empresa la recibió y te contactará al correo que registraste."
8. **Error genérico:** "Algo falló de nuestro lado. Tus datos están guardados, intenta de nuevo en un momento."
9. **Placeholder del chat:** "Escribe tu respuesta aquí..."
10. **Mensaje del asistente:** "Va quedando. Ahora dime: ¿qué presupuesto estimado tienes para este proyecto? Si aún no lo defines, ponemos un rango."

## 4. El asistente como personaje

**Decisión:** se queda "Asistente Mint". Un nombre propio (Lupe, Max, etc.) infantiliza un producto que redacta documentos con peso legal, y "Asistente Mint" ya carga la marca. Comparado con nombrar al personaje, la sobriedad gana en este mercado.

**Autodescripción en una línea:** "Soy el Asistente Mint. Te hago las preguntas correctas y convierto tus respuestas en una licitación completa."

**Tres reglas de cómo habla:**

1. **Una pregunta a la vez, y siempre dice para qué.** "Esto va en la sección de criterios de evaluación" ancla el chat al documento de la izquierda.
2. **Reformula, no transcribe.** Recibe respuestas coloquiales y devuelve prosa de documento formal; nunca pega lo que el usuario tecleó tal cual sin avisar.
3. **Nunca inventa.** Si falta un dato (presupuesto, fecha), lo deja marcado como pendiente y lo dice. No rellena con estimaciones propias.

## 5. Dirección visual

**Tipografía.** Sora es la voz de marca: solo en H1-H2, montos grandes y números de stat cards, weight 600-700, `letter-spacing: -0.02em`, tamaños generosos (32-48px en landing, 24-28px en app). DM Sans hace todo lo demás en 400/500, 14-16px, tracking normal. La regla dura: Sora nunca en párrafos ni en UI menor; si dudas, es DM Sans. El contraste marcado entre display apretado y body tranquilo es lo que da carácter, no agregar pesos intermedios.

**Iconos.** Phosphor en weight `regular` para toda la UI, `fill` únicamente para estados activos (tab seleccionado, stage actual del kanban). Duotone queda prohibido: pelea con la regla de un acento por componente.

**Radios y sombras.** Radio 10px en cards y inputs, 8px en botones, 999px solo en chips de estado. Postura de sombra: casi plana. Borde hairline #E6EAEF hace el trabajo de separación; sombra solo en elementos flotantes (drawer, dropdown, card mientras se arrastra en el kanban): `box-shadow: 0 8px 24px rgba(10,22,40,.10)`. Nada de sombras decorativas en reposo.

**El motivo propio: el sello de folio.** Un círculo de trazo fino con texto perimetral, como sello de tinta de notaría pero geométrico y limpio. Especificación: círculo SVG de `stroke-width: 1.5`, en su interior el número de folio de la licitación (LIC-2026-014) en Sora 600, y en el perímetro un anillo de ticks (marcas radiales de 4px cada 12 grados, como segundero) que se rellenan según el avance: en la creación, cada sección completada de las 11 rellena ticks; en el pipeline, cada stage. Color: el del lado que lo mira (mint en la app de empresa, indigo en el portal); en el estado "Aceptada", mitad y mitad como marca la sección 2. Este sello es el avatar de cada licitación en tablas, drawer y documento, y a 24px se degrada a solo círculo + ticks. Es dibujable con un `<circle>` más un loop de `<line>` rotadas; nada de assets raster.

## 6. Art direction de la landing

**Hero.** Composición asimétrica tipo Tailscale: izquierda, H1 en Sora sobre fondo blanco con el CTA mint; derecha, un panel navy #0A1628 con radio 16px del que sobresale un screenshot real del pipeline kanban, recortado por el borde derecho del viewport. Sobre el panel navy, un sello de folio grande en trazo mint al 20% como textura. Nada de ilustración 3D ni mockups de laptop.

**Marcos de screenshots.** Siempre la app real (datos demo en MXN con nombres de empresa mexicanos verosímiles, estilo Distribuidora del Bajío), dentro de un contenedor con radio 12px, borde hairline y una barra superior mínima de 28px con tres puntos. Los screenshots se recortan con intención: se muestra el 70% de una vista, nunca la pantalla completa encogida.

**Ritmo de secciones.** Alternancia blanca / #F7F9FB (gris casi imperceptible), sin fondos de color pleno hasta la sección dual. Orden: hero, cómo funciona en 3 pasos (con el sello de folio llenando ticks como hilo visual), la sección dual, asistente, CTA final.

**La sección dual** es el único lugar de la landing donde viven los dos colores: dos cards lado a lado estilo Contra, "Para empresas que licitan" con fondo `rgba(0,192,122,.06)` y CTA mint, "Para proveedores" con fondo `rgba(45,76,200,.06)` y CTA indigo, separadas por un gap de 24px. En el borde donde casi se tocan, una línea vertical de 2px con el gradiente del trato: el easter egg de la marca.

**Footer.** Navy #0A1628 pleno, texto en blanco al 70%, logo en blanco, y como cierre el sello de folio en gris al 15% de opacidad, grande y recortado por la esquina inferior derecha. Ahí caben las señales de formalidad mexicana: razón social, contacto, aviso de privacidad. Supuesto: aún no existen clientes ni logos; el footer no finge social proof.

## Referencias

- [Tailscale, hero dividido panel de marca + screenshot](https://mobbin.com/sites/sections/e72d1d36-a761-4557-b655-d2797beb7abb)
- [Contra, dos cards CTA para dos audiencias con fondos contrastantes](https://mobbin.com/sites/sections/0e71cc83-e290-499f-8060-cdae5f763d98)
- [Taste Labs, split de dos columnas para dos públicos sobre lienzo sobrio](https://mobbin.com/sites/sections/e59084cf-b600-42e1-9da2-af7112e350af)
- [Passionfroot, hero de marketplace de dos lados con fragmentos de producto](https://mobbin.com/sites/sections/d008689a-c73f-4513-a760-25a93ef6f043)
- [Wise, verde de marca como color de acción sobre canvas neutral](https://mobbin.com/screens/d104a8bc-bc31-484d-80e8-2c9a2cb1e796)
