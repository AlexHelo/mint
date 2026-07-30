# Estrategia - Mint en México

## 1. Tesis en una frase y por qué ahora

**Tesis:** las empresas medianas mexicanas ya corren licitaciones informales por correo y WhatsApp ("mínimo tres cotizaciones"), y Mint las formaliza en 15 minutos con un asistente de IA que convierte una necesidad vaga en un RFP serio, comparable y con pipeline.

**Por qué ahora:** el documento de licitación bien redactado era el cuello de botella real (nadie tiene tiempo de escribir 11 secciones), y hasta ahora la IA no podía hacerlo con calidad. Hoy sí. El costo de producir un RFP formal cae casi a cero, y el que controla el documento controla el proceso completo: recepción, comparación y decisión.

## 2. El wedge: empresas primero

**Lado a ganar: empresas que licitan.** Razón estructural: una empresa trae a sus propios proveedores. En México nadie compra a desconocidos; los proveedores relevantes ya están en el celular del comprador. Si ganamos a la empresa, la red de proveedores llega por invitación, no por adquisición. Intentar juntar proveedores primero produce un directorio muerto.

**El hook:** "publica una licitación formal en 15 minutos y recibe propuestas comparables en un solo lugar". No vendemos marketplace, vendemos orden: el asistente redacta el RFP, el proveedor aplica con un link, todo cae en el kanban. El proveedor no necesita cuenta pesada ni pagar nada; entra por el link que le mandó su cliente por WhatsApp o correo. Ese es el truco de arranque en frío: cada licitación es su propio mini-marketplace con proveedores que la empresa ya conoce.

**Primeras 10 licitaciones reales, plan concreto:**

- Mike recluta 3 a 5 empresas de su red directa (dueños o gerentes de compras que le deben una llamada). Criterio: empresas que ya piden tres cotizaciones por regla interna, con al menos una compra recurrente arriba de ~100 mil MXN. Supuesto: Mike tiene ese acceso; si no, el plan cambia a referidos de segundo grado y se alarga.
- Alex hace onboarding concierge: se sienta (o Zoom) con cada empresa en su siguiente compra real y saca la licitación con ellos, en vivo. No self-service todavía.
- Cada empresa invita mínimo 3 proveedores propios por licitación. Nosotros redactamos el mensaje de invitación (WhatsApp y correo) para que el proveedor entienda en 10 segundos qué hacer.
- Meta: 10 licitaciones reales de 3 a 5 empresas, no 10 empresas con una cada una. Repetición vale más que amplitud.

## 3. Confianza

Los mecanismos que importan en B2B mexicano, en orden:

1. **Verificación fiscal (construir primero).** Todo participante sube su Constancia de Situación Fiscal; validamos RFC y razón social, y mostramos un badge "verificado". Es el proxy mexicano de "esta empresa existe y factura". Barato de construir, señal fuerte, y habilita todo lo demás.
2. **Referencias comprobables.** Historial dentro de Mint (licitaciones ganadas, clientes que repiten) más referencias externas declaradas. Se construye solo con el uso; no requiere feature grande al inicio.
3. **Contratos.** Plantilla de contrato ligada a la propuesta aceptada, prellenada con los datos de la licitación. Fase 2: reduce fricción post-adjudicación pero no bloquea la adopción inicial.
4. **Escrow: no.** Los pagos B2B en México viven en términos de crédito (30-90 días) y facturación CFDI directa entre las partes. Meternos al flujo de dinero es carga regulatoria y desconfianza extra, no confianza. Mint no toca el dinero.

**Decisión:** verificación fiscal primero. Una sola feature, badge visible en cada propuesta del kanban y en cada licitación del portal.

## 4. Monetización

- **Take rate sobre el monto adjudicado:** inaplicable. El pago ocurre fuera de la plataforma, con CFDI directo; no hay forma honesta de cobrarlo y invita a cerrar por fuera. Descartado.
- **Freemium puro:** no valida nada. Necesitamos saber pronto si alguien paga.
- **Cobro por licitación:** buena señal de valor pero castiga justo el comportamiento que queremos (publicar más). Sirve solo como puente.
- **Suscripción a la empresa:** alinea con el valor real (proceso ordenado, recurrente) y con cómo compran software las empresas medianas: un gasto mensual facturable. El proveedor nunca paga; es el lado que necesitamos abundante y su disposición a pagar es la más baja.

**Decisión:** suscripción mensual a la empresa licitante, proveedores gratis siempre. Postura inicial: gratis las primeras 2 licitaciones (prueba el valor), luego plan único mensual con licitaciones ilimitadas y usuarios ilimitados. Precio de arranque razonado a primeros principios: debe costar claramente menos que una fracción del tiempo mensual de un analista de compras y ser aprobable por un gerente sin comité, es decir rango de pocos miles de MXN al mes, con CFDI desde el día uno. Supuesto: el número exacto se calibra con las primeras 3 conversaciones de cobro reales; no lo inventamos antes. Un solo plan, sin matriz de tiers, hasta que alguien la pida con dinero.

## 5. Riesgos top 5

1. **Marketplace vacío del lado proveedor:** mitigado por diseño, cada empresa trae sus proveedores por invitación; el portal abierto es secundario.
2. **Cierre por fuera (desintermediación):** no cobramos por transacción, así que salirse no ahorra nada; el valor está en el proceso, no en el match.
3. **Ancho de banda de Alex (solo dev, segundo trabajo):** alcance brutalmente recortado, nada de features fuera del flujo licitación-propuesta-decisión en 90 días; Mike es dueño de todo lo comercial.
4. **La empresa lo usa una vez y no repite:** el onboarding concierge apunta a compras recurrentes desde el inicio y medimos repetición como métrica central.
5. **Datos sensibles de compras en la plataforma:** Supabase con RLS estricto por organización desde el primer día de datos reales, no después.

## 6. Plan 90 días (Alex dev + Mike comercial)

**Semanas 1-4: de mockup a producto real.**
Cablear Supabase (auth, organizaciones, RLS por tenant), migrar el store de localStorage, reemplazar el asistente scripted por el Claude API con las mismas 10 preguntas, todo en MXN con datos demo mexicanos realistas. Landing genérica fuera, una página simple con el pitch real.
*Milestone:* app desplegada en producción donde una empresa real puede crear cuenta y publicar.
*Validación:* 3 empresas de la red de Mike comprometidas por escrito (WhatsApp cuenta) a correr su siguiente compra en Mint.

**Semanas 5-8: primeras licitaciones reales, modo concierge.**
Invitaciones a proveedores por link (correo y WhatsApp), notificaciones básicas (nueva propuesta, cierre próximo), pulir el flujo de aplicar sin fricción. Alex acompaña cada licitación en vivo y anota cada tropiezo.
*Milestone:* primera licitación real completada de punta a punta, publicada, con propuestas y una aceptada en el kanban.
*Validación:* 5 licitaciones reales con 3 o más propuestas cada una; lista escrita de los 10 tropiezos principales.

**Semanas 9-12: confianza y repetición.**
Verificación fiscal (subir CSF, validar RFC, badge), vista de comparación de propuestas lado a lado, y la conversación de cobro con las empresas activas usando el plan único.
*Milestone:* 10 licitaciones reales acumuladas y verificación en producción.
*Validación:* al menos una empresa publica su segunda licitación sin acompañamiento, y al menos una dice sí (o un no con razones) al precio propuesto.

## 7. Decisiones tomadas

- Ganamos primero a las empresas licitantes; los proveedores llegan por invitación de su propio cliente, no por adquisición directa.
- Hook: RFP formal en 15 minutos con IA más pipeline de propuestas, vendido como orden, no como marketplace.
- Arranque en frío: 3 a 5 empresas de la red de Mike, onboarding concierge por Alex, 10 licitaciones reales como meta única.
- Confianza: verificación fiscal (CSF/RFC con badge) se construye primero; referencias y contratos después; escrow descartado, Mint no toca el dinero.
- Monetización: suscripción mensual a la empresa, plan único, proveedores gratis siempre; 2 licitaciones gratis de prueba; take rate descartado.
- Precio: pocos miles de MXN mensuales como postura, calibrado con las primeras 3 conversaciones reales de cobro, con CFDI desde el día uno.
- Alcance técnico 90 días: Supabase con RLS multi-tenant, Claude API en el asistente, MXN, invitaciones por link, verificación fiscal, comparación de propuestas. Nada más.
- Métrica central: repetición (segunda licitación de una misma empresa), no volumen de cuentas.
