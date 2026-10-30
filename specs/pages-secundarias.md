# Spec: garantia, servicios, contacto
Fuente: capturas `tests/visual/figma/{garantia,servicios,contacto}.png` (frames 1280; capturas a escala 0.75 / 1.14 / 1.37). La API de Figma devolvio 429 (plan Starter, asiento Viewer), asi que NO hay node-id por elemento ni medidas exactas.

## Pendiente de verificar contra Figma (PROVISIONAL)
- Medidas derivadas de captura: `--size-narrow` 880, `--size-trust-w` 800, `--size-form-w` 443, `--size-offices-w` 476, `--size-seal` 167, `--size-circle-media` 220, `--size-pay-media-w` 296, `--size-textarea-h` 100, `--ratio-*` nuevos, `--color-danger`.
- Sin frames 375/768: layouts movil/tablet apilados por supuesto (A-01).
- Textos tomados de la captura; en Figma "Conoce más"/descripciones traen cortes de palabra (`conoci miento`): se corrigio al texto normal.
- "Tipo de compra" se implemento como `<select>` Personal/Comercial (Figma muestra un campo simple).

## Pendiente de usuario
- Garantia: imagen de tarjetas (Visa/Mastercard/Amex) e icono de mano rojo = placeholders (`c-pay__media`, `c-restricted__media`).
- URL de Terminos y Condiciones, destino de "Conoce mas", pagina `/pages/rastreo/`.
- Endpoint de correo: `config.contactEndpoint` (`/.netlify/functions/send-contact`); contrato en `scripts/services/contact.js`.

## Formulario
`c-form` (`components/contact-form.js`): Nombre, Contacto (correo o WhatsApp >= 10 digitos), Mensaje (obligatorio salvo con cotizador). Interruptor "Cotizador Express" muestra un `fieldset` (oculto + `disabled` = no se valida ni se envia): tipo de compra, peso, dimensiones, link. Se abre solo con `/pages/contacto/#cotizador` o `?cotizador` (usado por el CTA "Cotiza tu envio" de la home). Campo trampa `website` anti-spam.
