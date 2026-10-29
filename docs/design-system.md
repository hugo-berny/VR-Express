# Design system (fuente de verdad textual)

Se llena a partir de Figma. Cada fila cita su `node-id`.
Fuente: `specs/home.md` § Tokens nuevos (pagina home, frame 1:4054).

## Tokens
| Token | Valor | Figma node-id | Archivo |
|---|---|---|---|
| `--color-primary` | #1E73E9 (azul del logo, rgb 30,115,233; definido por el usuario) | 1:4403, 1:4056, titulos | `00-tokens/colors.css` |
| `--color-primary-15` | rgba(30,115,233,0.15) (derivado) | 1:4064 | `00-tokens/colors.css` |
| `--color-primary-0` | rgba(30,115,233,0) (derivado) | 1:4164 | `00-tokens/colors.css` |
| `--color-white` | #FFFFFF | 1:4054 | `00-tokens/colors.css` |
| `--color-black` | #000000 | 1:4143;1:4170 | `00-tokens/colors.css` |
| `--color-accent` | #FFBA0B | 1:4352, 1:4063 | `00-tokens/colors.css` |
| `--color-text-muted` | rgba(0,0,0,0.6) | 1:4143;1:4171, 1:4357, borde filas servicios | `00-tokens/colors.css` |
| `--color-text-soft` | rgba(0,0,0,0.75) | 1:4063 | `00-tokens/colors.css` |
| `--color-text-inverse-soft` | rgba(255,255,255,0.85) | 1:4059 | `00-tokens/colors.css` |
| `--color-placeholder` | #D9D9D9 | 1:4359 | `00-tokens/colors.css` |
| `--font-base` | "Afacad" | todo | `00-tokens/typography.css` |
| `--fw-medium` | 500 | varios | `00-tokens/typography.css` |
| `--fw-semibold` | 600 | varios | `00-tokens/typography.css` |
| `--fw-bold` | 700 | varios | `00-tokens/typography.css` |
| `--fs-76` | 76px | 1:4058 | `00-tokens/typography.css` |
| `--fs-36` | 36px | 1:4083 | `00-tokens/typography.css` |
| `--fs-32` | 32px | 1:4059, 1:4062, 1:4066, 1:4073, 1:4142 | `00-tokens/typography.css` |
| `--fs-24` | 24px | 1:4063, 1:4085 | `00-tokens/typography.css` |
| `--fs-16` | 16px | 1:4159-1:4161, 1:4143, empresa review, 1:4406 | `00-tokens/typography.css` |
| `--fs-15` | 15px | 1:4404 | `00-tokens/typography.css` |
| `--fs-14` | 14px | descripcion servicio, texto review, cargo | `00-tokens/typography.css` |
| `--lh-hero` | 0.91 | 1:4058 | `00-tokens/typography.css` |
| `--space-neg-1` | -1px | 1:4141 | `00-tokens/spacing.css` |
| `--space-2` | 2px | bloque autor review | `00-tokens/spacing.css` |
| `--space-5` | 5px | 1:4084 padding vert. | `00-tokens/spacing.css` |
| `--space-6` | 6px | filas servicios padding vert. | `00-tokens/spacing.css` |
| `--space-7` | 7px | estrellas gap | `00-tokens/spacing.css` |
| `--space-10` | 10px | filas servicios padding horiz., footer padding vert., carrusel gap/padding horiz. | `00-tokens/spacing.css` |
| `--space-12` | 12px (PROVISIONAL A-13) | header padding vert. 1:4095 | `00-tokens/spacing.css` |
| `--space-19` | 19px | 1:4057 gap, 1:4084 padding horiz. | `00-tokens/spacing.css` |
| `--space-20` | 20px | 1:4061 gap, review gap, review padding vert., footer iconos gap | `00-tokens/spacing.css` |
| `--space-25` | 25px | footer texto-iconos | `00-tokens/spacing.css` |
| `--space-30` | 30px | review padding horiz., 1:4074 gap, CTA padding vert. | `00-tokens/spacing.css` |
| `--space-35` | 35px | 1:4056 gap | `00-tokens/spacing.css` |
| `--space-36` | 36px (PROVISIONAL A-02) | 1:4067 gap | `00-tokens/spacing.css` |
| `--space-38` | 38px | 1:4056 padding horiz. | `00-tokens/spacing.css` |
| `--space-40` | 40px | header/footer padding horiz., servicios gap fila, socios gap, CTA padding horiz., carrusel padding inf. | `00-tokens/spacing.css` |
| `--space-44` | 44px | 1:4158 gap | `00-tokens/spacing.css` |
| `--space-55` | 55px | 1:4065 gap, 1:4082 gap | `00-tokens/spacing.css` |
| `--space-60` | 60px | 1:4065 padding vert., carrusel padding sup. | `00-tokens/spacing.css` |
| `--space-70` | 70px | 1:4072 padding vert. | `00-tokens/spacing.css` |
| `--space-80` | 80px | 1:4061 padding vert. | `00-tokens/spacing.css` |
| `--size-container` | 1200px | A-15 A (valor aprobado) | `00-tokens/spacing.css` |
| `--size-tap` | 44px | A-07 A (area interactiva minima) | `00-tokens/spacing.css` |
| `--size-intro-text` | 1021px | 1:4063 | `00-tokens/spacing.css` |
| `--size-services-h` | 485px | 1:4064 | `00-tokens/spacing.css` |
| `--size-services-title-h` | 64px | 1:4142 | `00-tokens/spacing.css` |
| `--size-testimonials-title-h` | 38px | 1:4066 | `00-tokens/spacing.css` |
| `--size-review-author` | 220px | 1:4350 | `00-tokens/spacing.css` |
| `--size-star` | 28px | 1:4352 | `00-tokens/spacing.css` |
| `--size-avatar` | 39px | 1:4359 | `00-tokens/spacing.css` |
| `--size-partners-h` | 310px | 1:4072 | `00-tokens/spacing.css` |
| `--size-partner-logo` | 101px | 1:4075-1:4080 | `00-tokens/spacing.css` |
| `--size-cta-btn-w` | 177px | 1:4084 (visual; area >=44 por A-07) | `00-tokens/spacing.css` |
| `--size-cta-btn-h` | 42px | 1:4084 (visual; area >=44 por A-07) | `00-tokens/spacing.css` |
| `--size-carousel-h` | 250px | 1:4087-1:4093 | `00-tokens/spacing.css` |
| `--size-header-h` | 67px (PROVISIONAL A-13) | 1:4095 | `00-tokens/spacing.css` |
| `--size-logo-w` | 212px | 1:4157 | `00-tokens/spacing.css` |
| `--size-logo-h` | 43px | 1:4157 | `00-tokens/spacing.css` |
| `--size-contact-btn-w` | 108px | 1:4152 (c-header__contact, visual; alias semantico de Contacto 1:4162) | `00-tokens/spacing.css` |
| `--size-contact-btn-h` | 29px | 1:4152 (c-header__contact, visual; alias semantico de Contacto 1:4162) | `00-tokens/spacing.css` |
| `--size-link-btn` | 40px | 1:4164 (visual) | `00-tokens/spacing.css` |
| `--size-link-icon-w` | 28px | 1:4165 | `00-tokens/spacing.css` |
| `--size-social-h` | 28px | 1:4408-1:4411 | `00-tokens/spacing.css` |
| `--size-social-fb` | 28px | 1:4408 | `00-tokens/spacing.css` |
| `--size-social-ig` | 28px | 1:4409 | `00-tokens/spacing.css` |
| `--size-social-tt` | 25px | 1:4410 | `00-tokens/spacing.css` |
| `--size-social-x` | 30px | 1:4411 | `00-tokens/spacing.css` |
| `--size-copyright-w` | 325px | 1:4404 | `00-tokens/spacing.css` |
| `--ratio-hero` | 608 / 552 | 1:4060 (A-11 B) | `00-tokens/spacing.css` |
| `--ratio-carousel-377` | 377 / 250 | 1:4087 (A-11 B) | `00-tokens/spacing.css` |
| `--ratio-carousel-250` | 250 / 250 | 1:4089, 1:4093 (A-11 B) | `00-tokens/spacing.css` |
| `--ratio-carousel-200` | 200 / 250 | 1:4088, 1:4091 (A-11 B) | `00-tokens/spacing.css` |
| `--ratio-carousel-194` | 194 / 250 | 1:4092 (A-11 B) | `00-tokens/spacing.css` |
| `--ratio-carousel-189` | 189 / 250 | 1:4090 (A-11 B) | `00-tokens/spacing.css` |
| `--radius-3` | 3px | 1:4086, 1:4087-1:4093 | `00-tokens/effects.css` |
| `--radius-8` | 8px | 1:4084 | `00-tokens/effects.css` |
| `--radius-15` | 15px | 1:4068 | `00-tokens/effects.css` |
| `--radius-17` | 17px | 1:4056 | `00-tokens/effects.css` |
| `--radius-20` | 20px | 1:4164 | `00-tokens/effects.css` |
| `--radius-21` | 21px | 1:4082 | `00-tokens/effects.css` |
| `--radius-30` | 30px | 1:4152 | `00-tokens/effects.css` |
| `--radius-circle` | 50% | 1:4074 (partners, logos 1:4075-1:4080), 1:4359 (avatar review) | `00-tokens/effects.css` |
| `--shadow-header` | 0 -3px 16.3px 0 rgba(0,0,0,0.25) (PROVISIONAL A-13) | 1:4095 | `00-tokens/effects.css` |
| `--shadow-review` | 0 2px 12px 0 rgba(0,0,0,0.25) | 1:4068 | `00-tokens/effects.css` |
| `--border-1` | 1px | filas servicios | `00-tokens/effects.css` |
| `--border-1-8` | 1.8px | 1:4152 | `00-tokens/effects.css` |
| `--stroke-2-5` | 2.5px | 1:4165 | `00-tokens/effects.css` |

### Eliminados (no se crean ni existen en `00-tokens/`)
`--color-primary-75` (A-06), `--font-header` (A-13), `--size-page`, `--size-hero`, `--size-hero-col`, `--size-hero-h1-w/-h`, `--size-hero-sub-h`, `--size-hero-img-w/-h`, `--size-intro`, `--size-services-content`, `--size-testimonials`, `--size-testimonials-row`, `--size-review-w`, `--size-review-h-fixed`, `--size-spacer-*`, `--space-100`.

### Placeholders previos eliminados de `00-tokens/` (sin node-id, no venian de Figma)
`--color-bg`, `--color-text`, `--font-family-base` (fusionado en `--font-base`), `--font-size-base` (equivale a `--fs-16`, sin alias), `--line-height-base`, `--space-1`, `--space-3`, `--space-4`, `--space-6` (valor rem reemplazado por la escala px de Figma; `--space-6` se reasigna a 6px), `--gutter`, `--container-max` (fusionado en `--size-container`), `--radius-sm`, `--radius-md`, `--transition-base`.

## Componentes
| Componente | Clase | Archivo CSS | Variantes | Estados | Figma node-id |
|---|---|---|---|---|---|
| _(vacio)_ | | | | | |
