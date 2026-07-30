# Producto - roadmap de Mint

## 1. Qué prueba el mockup y qué no

El mockup prueba que el flujo central se entiende y se ve creíble: una empresa arma un RFP de 11 secciones con ayuda de un asistente, lo publica, un proveedor lo lee y aplica, y las propuestas caen en un kanban con etapas. Eso valida narrativa, UX y lenguaje (es-MX, dos audiencias, dos colores). No prueba nada del lado real del negocio: no hay usuarios ni datos persistentes (todo vive en localStorage de un solo navegador), el asistente es un guion fijo que no razona, no hay correo ni notificaciones, no hay adjuntos reales, y sobre todo no prueba la hipótesis de mercado, que una empresa mexicana real publique una licitación aquí y que proveedores reales respondan por este canal en vez de por correo. El piloto existe para probar exactamente eso.

## 2. Feature map

### P0 - lo necesario para un piloto real

**Auth + organizaciones multi-tenant.** Qué es: cuentas de usuario y empresas separadas, cada quien ve solo lo suyo. Por qué: sin aislamiento de datos no puedes meter dos empresas reales. Cómo: Supabase Auth (magic link, sin contraseñas), tablas `orgs` y `memberships` (user_id, org_id, role cliente/proveedor), RLS en todas las tablas filtrando por org del usuario. El store de localStorage se reemplaza por queries a Supabase con el mismo shape de datos para no reescribir la UI.

**Licitaciones reales con estados.** Qué es: la licitación como registro persistente con ciclo de vida (borrador, publicada, cerrada, adjudicada, cancelada). Por qué: es el objeto central; sin estados no hay cierre ni adjudicación. Cómo: tabla `tenders` con enum de status y `closes_at`; transiciones validadas en el cliente y con check constraint; cierre automático con pg_cron que marca `cerrada` al vencer la fecha.

**Portal proveedor con invitaciones por liga/correo.** Qué es: el cliente invita proveedores por email; la liga los lleva directo a la licitación. Por qué: en el piloto los proveedores no van a descubrir Mint solos, hay que traerlos con cero fricción. Cómo: tabla `invitations` (tender_id, email, token, status); Edge Function envía el correo vía Resend con liga `mint.app/l/{token}`; al abrirla, magic link de Supabase crea la sesión y una org de proveedor mínima. Supuesto: el portal público "abierto" casi no se usará en el piloto; la invitación directa es el canal.

**Propuestas + adjuntos.** Qué es: el formulario de aplicación guarda de verdad, con archivos. Por qué: en B2B formal la propuesta es un PDF o cotización adjunta, no solo un textarea. Cómo: tabla `applications` (monto en centavos MXN, no floats) + Supabase Storage con bucket privado por tender, paths `{tender_id}/{application_id}/`; policies de Storage espejando las RLS; signed URLs para descarga desde el kanban.

**Asistente IA real.** Qué es: reemplazar el guion de 10 preguntas por Claude conversando y llenando las 11 secciones. Por qué: es el diferenciador del producto; el guion se nota falso al tercer uso. Cómo: Vercel API route (server-side, la key nunca al cliente) con streaming; system prompt con el esquema de las 11 secciones y contexto de compras B2B en México; tool use con una herramienta `actualizar_seccion(seccion, contenido)` para que cada respuesta del usuario dispare escrituras estructuradas a secciones concretas, más una `sugerir(seccion, propuesta)` para proponer criterios de evaluación y rango de presupuesto que el usuario acepta o edita. El documento sigue siendo editable a mano: es la red de seguridad si el modelo falla.

**Notificaciones de cierre y cambios de etapa.** Qué es: correos al proveedor cuando su propuesta cambia de etapa y a ambos lados cuando la licitación cierra. Por qué: nadie va a vivir dentro de Mint en el piloto; el correo es lo que regresa a la gente. Cómo: trigger de Postgres inserta en `events`, un Database Webhook llama una Edge Function que manda el correo por Resend con templates simples; el cierre lo dispara el mismo pg_cron del punto de estados.

**Export a PDF del documento.** Qué es: bajar el RFP de 11 secciones como PDF. Por qué: en México el documento circula por correo y WhatsApp para aprobaciones internas; si no sale de Mint, Mint no entra al proceso. Cómo: stylesheet de impresión sobre el tab "Documento" existente + `window.print()`. Cero dependencias; un PDF server-side con branding es P1 si el piloto lo pide.

### P1 - inmediatamente después

**Comparador de propuestas lado a lado.** Qué es: tabla de propuestas en columnas (monto, entregables, resumen). Por qué: es la decisión de compra en una pantalla, alto valor pero el kanban + drawer sobrevive un piloto. Cómo: vista nueva sobre los mismos `applications`, sin datos nuevos; ordenamiento por monto y chips de etapa.

**Mensajería/aclaraciones por licitación.** Qué es: hilo de preguntas y respuestas entre cliente y proveedor dentro del tender. Por qué: hoy esas aclaraciones se irán a correo y perdemos el proceso. Cómo: tabla `messages` (tender_id, application_id nullable, sender_user_id, body); Supabase Realtime para verlo en vivo; notificación por Resend reutilizando el pipeline de `events`.

**Datos fiscales del proveedor (CFDI como captura).** Qué es: RFC, razón social, régimen fiscal, uso de CFDI y constancia de situación fiscal adjunta en el perfil del proveedor. Por qué: para una empresa formal un proveedor sin RFC no existe; es señal de confianza, no motor fiscal. Cómo: columnas en `orgs` tipo proveedor + upload de la constancia a Storage; solo captura y display en el drawer de propuesta, cero validación contra el SAT.

### P2 - cuando el piloto dé señal

Evaluación estructurada con puntajes por criterio; directorio/marketplace de proveedores con historial; roles y aprobaciones internas (quién puede publicar, quién adjudica); firma de contratos; integraciones (ERP, facturación real); analytics para el cliente. Nada de esto se toca antes de tener una licitación adjudicada de verdad en la plataforma.

## 3. El corte del piloto

No se construye: marketplace ni descubrimiento público (el piloto es invitación directa), pagos o cobro a nadie (el pricing se decide con datos del piloto), motor fiscal o timbrado CFDI (solo captura), roles finos ni aprobaciones (un admin por org basta), apps móviles (web responsive), comparador y mensajería (P1, el kanban y el correo aguantan las primeras semanas), landing de marketing nueva (una página estática con el CTA de "solicita acceso" es suficiente), y soporte multi-idioma. Cada uno de estos es semanas de trabajo contra una hipótesis que todavía no está probada; el piloto se gana con el ciclo publicar-invitar-aplicar-adjudicar funcionando de punta a punta y nada más.

## 4. Esquema de datos propuesto

Documento como `doc jsonb` en `tenders`, no tabla de secciones: las 11 secciones son texto fijo que siempre se lee y escribe junto, nunca se consulta por sección, y el asistente escribe llaves individuales con un update de jsonb.

```
orgs          id, name, type (cliente|proveedor), rfc, razon_social, regimen_fiscal, created_at
memberships   user_id (auth.users), org_id, role, created_at        -- PK (user_id, org_id)
tenders       id, org_id, title, status, doc jsonb, currency, budget_cents,
              closes_at, published_at, created_by, created_at
invitations   id, tender_id, email, token, status, sent_at
applications  id, tender_id, provider_org_id, contact_name, contact_email,
              amount_cents, summary, description, stage, created_at
messages      id, tender_id, application_id?, sender_user_id, body, created_at
files         id, org_id, tender_id?, application_id?, storage_path, filename, size, created_at
events        id, org_id, tender_id?, application_id?, actor_user_id?, type, payload jsonb, created_at
```

RLS: todo cuelga de `org_id` vía `memberships`; los proveedores además leen tenders publicados donde tienen invitación o aplicación.

## 5. Métricas norte del piloto (4)

1. Licitaciones publicadas que reciben 3 o más propuestas (la plataforma junta a las dos caras o no sirve).
2. Tasa de respuesta de proveedores invitados (correo abierto -> aplicación enviada).
3. Tiempo de borrador a publicada usando el asistente (el pitch de "tu RFP en minutos" es medible o es humo).
4. Licitaciones que llegan a "Aceptada" dentro de Mint (el proceso terminó aquí y no en el correo).

Instrumentación mínima: la tabla `events` ya existe para notificaciones; se insertan también `tender_published`, `invitation_sent`, `invitation_opened` (redirect de la liga), `application_submitted`, `stage_changed`, `assistant_session_completed`. Las cuatro métricas salen con queries SQL directas; nada de herramienta de analytics en el piloto.

## 6. Riesgos técnicos top 3

1. **Fuga de datos entre tenants por RLS mal escrita.** Es el riesgo que mata la confianza en un mercado que ya desconfía. Mitigación: policies escritas junto con el esquema desde el día uno (no al final), suite de tests SQL que intenta leer datos ajenos con JWTs de cada rol, y bucket de Storage privado por default.
2. **El asistente produce secciones malas o rompe el flujo.** Mitigación: tool use con schema estricto en vez de parsear texto libre, prompt versionado en el repo con casos de prueba, y el documento siempre editable a mano como fallback; si el asistente falla, el usuario sigue pudiendo publicar.
3. **La migración de localStorage a Supabase toca toda la UI.** El store actual es la base de todos los componentes. Mitigación: reemplazar el módulo del store por una capa con la misma interfaz respaldada por Supabase antes de agregar features nuevas, en un solo PR, con el mockup como referencia visual de regresión.
