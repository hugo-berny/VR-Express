# home — datos Figma

Fuente: archivo Design `PPh2wVGw7yF07KrgHUrhwa`, SECTION "Home" `1:4138` (1408x3154), frame "Desktop" `1:4054` (1280x2990, fill #FFFFFF, column, alignItems center).
Nota: el archivo Sites `swQmSbnkWPmVepebFqwoPF` devuelve 400 "File type not supported" en la API; los mismos node-id existen en Design (1:4138 = "Home", 1:4215 "/garantia", 1:4241 "/servicios", 1:4261 "/rastreo", 1:4349 "/contacto").
Breakpoints: solo Desktop 1280. Movil/tablet: SIN VERSION MOVIL.

## Tokens
- Azul primario #1D73E9 (fill_010282e1; footer 1:4403, hero 1:4056, titulos)
- Blanco #FFFFFF; Negro #000000 (1:4143;1:4170)
- Amarillo #FFBA0B (estrellas 1:4352; resaltado texto ts2 en 1:4063)
- Texto gris: rgba(0,0,0,0.6) (1:4143;1:4171, 1:4357, borde), rgba(0,0,0,0.75) (1:4063), rgba(255,255,255,0.85) (1:4059)
- Azul 75%: rgba(29,115,233,0.75) (cargo reviews 1:4362); Servicios Section fill rgba(29,115,233,0.15) (1:4064); avatar placeholder #D9D9D9 (1:4359)
- Fuente: Afacad (todo salvo Header: "ITF Devanagari Marathi" Demi 600 16px)
- Sombra review: 0 2 12 0 rgba(0,0,0,0.25) (1:4068)
- Sombra header: 0 -3 16.3 0 rgba(0,0,0,0.25) (1:4095) (componente base 1:4156: 0 5 7.4 0 rgba(0,0,0,0.25), padding 10px 40px)
- Radios: hero 17px (1:4056), CTA 21px (1:4082), boton CTA 8px (1:4084), review 15px (1:4068), carrusel img 3px (1:4087), boton contacto 30px (1:4152), link button 20px (1:4164 instancia)

## Arbol de secciones (orden dentro de 1:4054, column)
0. Rectangulo blanco espaciador 176x109 (1:4055)
1. Header (1:4095) position absolute x0 y0, 1280x67, fill #FFF, row space-between center, padding 12px 40px
   - Logo 212x43 (1:4157, imageRef e7e5d0be7f4f5227b8bb58187c336ccecd236253)
   - Buttons row gap 44 (1:4158): "Servicios" (1:4159), "Garantía" (1:4160), "Rastrea tu envío" (1:4161, underline), Button "Contacto" (1:4162) 108x29, texto 71x24 azul, borde 1.8px #1D73E9 radio 30px (1:4152)
   - Colores texto #1D73E9
2. Hero2 (1:4056) 1213 wide, row, padding 0 38, gap 35, align center, fill #1D73E9, radio 17
   - Col texto (1:4057) 585, gap 19
     - H1 (1:4058) "Importación express de EEUU a México" Afacad Bold 76, lineHeight 0.91em, blanco, caja 642x169
     - (1:4059) "Somos tus aliados para importar en México de una manera segura y confiable." Afacad SemiBold 32, blanco 85%, alto 90
   - Imagen (1:4060) "Free_Shipping_Container_Mockup_4 1" 608x552, imageRef 2cb09a0bb3a5db49f341d3b4078fbe5fff8bcbf7, crop [[0.6938,0,0.1817],[0,0.8386,0.1427]] sufijo 6bd0cc
3. Que hacemos (1:4061) 1163 wide, column, padding 80 0, gap 20, center
   - (1:4062) "¿Qué hacemos?" Afacad SemiBold 32 center #1D73E9
   - (1:4063) ancho 1021, Afacad Medium 24 center, rgba(0,0,0,0.75), negrita 600. Texto exacto: "Somos **VR Express**, **especialistas en importar** de Estados Unidos a México. Nos encargamos de todo el proceso: recibimos y almacenamos tu mercancía, gestionamos el despacho aduanal y la entregamos en destino, con seguimiento en tiempo real. Conocemos los permisos, normas y clasificación arancelaria de cada sector, para que tu importación llegue completa y en regla."
     - "VR Express": Bold 700 (ts1); "especialistas en importar": SemiBold, color #FFBA0B (ts2); ultima frase: color rgba(0,0,0,0.6) (ts3)
4. Servicios Section (1:4064) instancia de 1:4140, 1280x485, fill rgba(29,115,233,0.15), column center, padding 0 100; contenido (1:4141) 1001 wide, gap -1
   - Titulo (1:4142) "Nuestros servicios" Afacad Bold 32 center #1D73E9, alto 64
   - 5 filas "Servicios Index" (comp 1:4168/1:4169): row, padding 6px 10px, gap 40, center, borde rgba(0,0,0,0.6) 1px (arriba/abajo en la primera, 0 0 1 en el resto). Cada fila: titulo Afacad Bold 16 negro; descripcion Afacad Medium 14 rgba(0,0,0,0.6); Link Button 40x40 (comp 1:4164, radio 20, fill rgba(29,115,233,0)) con icono SVG linea 28 de ancho, stroke #1D73E9 2.5px (1:4165)
     1. (1:4143) "Importaciones de EEUU a México" / "Movemos mercancías de forma segura y eficiente entre ambos países. Nos encargamos de todo: almacenaje, inventarios, despacho aduanal y entrega final, con seguimiento en tiempo real y soporte en ambos lados de la frontera."
     2. (1:4144) "Soluciones Logísticas Integrales" / "Cada negocio es diferente, y su logística también. Diseñamos rutas, estrategias y procesos adaptados a cada necesidad, optimizando tiempos y costos en cada envío."
     3. (1:4145) "Gestión Aduanal y Documental" / "Nos ocupamos de toda la documentación requerida para importar o exportar sin contratiempos. Pedimentos, Certificados, Normas, Permisos y Clasificación Arancelaria. Todo bajo control y conforme a la normativa vigente."
     4. (1:4146) "Soluciones Especiales por Sector" / "Desarrollamos soluciones específicas para industrias como textil, tecnológica, maquinaria, mobiliario, suplementos, [salto de linea] entre otras. Conocemos las particularidades de cada padrón sectorial para garantizar envíos seguros y documentados."
     5. (1:4147) "Gestión Global de Proveedores" / "Facilitamos la relación con proveedores en el extranjero. Contamos con staff bilingüe para coordinar órdenes de compra, pagos internacionales y condiciones comerciales (Incoterms), así como supervisar cada etapa logística hasta entrega."
5. Testimonios (1:4065) 1155 wide, column, padding 60 0, gap 55, center
   - (1:4066) "Lo que opinan nuestros clientes" Afacad Bold 32 center #1D73E9, alto 38
   - Fila (1:4067) 1185, row, gap 36, center; 3... 4 Reviews (comp 1:4350), 371 wide, fill #FFF, sombra, radio 15, padding 20 30, column; las de 245 alto fijo (1:4069 gap 40; 1:4071 gap 38), las otras hug gap 20. Cada una: 5 estrellas #FFBA0B 28x28 gap 7; texto Afacad Bold 14 rgba(0,0,0,0.6); avatar SVG 39x39 #D9D9D9; empresa Afacad Bold 16 #1D73E9; cargo Afacad Medium 14 rgba(29,115,233,0.75); bloque autor 220 wide gap 2
     1. (1:4068) "VR EXPRESS se ocupa de todo el proceso de importación y logística de nuestros equipos. Tiene una muy buena comunicación con nuestros proveedores, la coordinación es excelente y siempre nos mantienen informados. No tenemos que preocuparnos por nada." / MEX BURGER / Jose E. Dogre - CFO
     2. (1:4069) "Encontramos a un gran aliado para todas nuestras compras internacionales en VR EXPRESS. Su servicio puerta a puerta nos brinda seguridad y tranquilidad." / LIGA MEX BEISBOL / Gonzalo Medina - Compras
     3. (1:4070) "Nuestra experiencia con VR EXPRESS ha sido muy buena. La facilitación en las importaciones lo hacen un socio logístico estrategico para nuestra tienda de productos hipicos. El servicio integral que ofrecen hace toda la diferencia" / MUNDO HIPICO / Carlos Briceño - Director General
     4. (1:4071) "VR EXPRESS nos ha ayudado a cumplir nuestros compromisos con los equipos importados, logrando posicionarnos como líderes en el sureste de México." / INTEGRATIUM / Juan C. Jacobo
   - Observacion: el frame de 1155 contiene fila de 1185 (desborda 30px); 4 tarjetas x 371 + 3x36 = 1592 > 1185. Reportar, no corregido.
6. Socios (1:4072) fill width, alto 310, column, padding 70 0, gap 40
   - (1:4073) "Conoce a nuestros socios comerciales" Afacad Bold 32 center #1D73E9
   - Fila (1:4074) row center gap 30; 6 elipses 101x101 con imagen: 1:4075 (0fd607ee970a5e62ea33cd0e8f323f28d02b8fd9, cover), 1:4076 (be95998b511527cd210a3246b4e2d3c587ffb411, FIT/contain), 1:4077 (44b34dafaa832bc643cd90724348d95d850a1f2b), 1:4078 (d56c1ff0b90a2195540adf9b1ea1a28a0dce5d46), 1:4079 (52ce6edcf7b37ef4637087053fcdb79e8fc99e35), 1:4080 (4f2c37560ea8b9b0f3591ac90e7add146c424ead)
7. Espaciador blanco 573x110 (1:4081)
8. CTA (1:4082) 1030 wide, column, padding 30 40, gap 55, center, fill #1D73E9, radio 21
   - (1:4083) "Optimiza tu cadena de suministro con VR Express" Afacad Bold 36 center blanco
   - Boton (1:4084) 177x42, fill #FFF, radio 8, padding 5 19; texto (1:4085) "Cotiza tu envío" Afacad Bold 24 center #1D73E9 (140x32)
9. Carrucel (1:4086) 1280 wide, row, padding 60 10 40, gap 10, center, radio 3. 7 imagenes alto 250, radio 3 (alt: sin texto en Figma):
   - 1:4087 377x250 b4c3ba690eac702d42d89133b139eb6028166014
   - 1:4088 200x250 33ccb7b9c9924dbf62bb7840505c35b79a1a1204
   - 1:4089 250x250 4bda7738e229ced0350dcffbb925475d574d0bfc
   - 1:4090 189x250 ba47c1889e5c6d74f7fef508d19f1cbf75120f8b
   - 1:4091 200x250 6a0973c8821c91beb910d56e496c62ff0d1c174a
   - 1:4092 194x250 944488eed515163bb34583c8d42329b20ba9ae33
   - 1:4093 250x250 f2ee5c09083692d40d1e8ed9733ce0f9afd51a6c
   - Suma anchos 1660 + gaps 60 > 1280: probable carrusel desbordado (comportamiento no especificado en Figma)
10. Footer (1:4094) instancia de 1:4403, 1280 wide, hug, row space-between center, padding 10 40, fill #1D73E9
   - (1:4404) "Copyright © 2025 VR Express is a registered trademark of VRI Freight S.A. de C.V. All rights reserved." Afacad Medium 15 blanco, ancho 325
   - (1:4406) "Síguenos en redes sociales" Afacad Medium 16 blanco; gap 25 con iconos (gap 20)
   - Iconos: Facebook 28x28 (1:4408, c02d3c7d590704d033fd881ebad6cd018af0edab), Instagram 28x28 (1:4409, c6583c00c166fc11f66dc11cd3c8acb0a4f68901), TikTok 25x28 (1:4410, 4e1f1bdf7a50e10f34c019e6234bb7d07a4c5dbb, crop sufijo 3cf150), X 30x28 (1:4411, fe8a29349e223eac688d543a304b6373974fba28, crop sufijo 127880)

## Assets (no descargados; no se pidio)
Logo 1:4157 (png); hero 1:4060 (png, crop); socios 1:4075-1:4080 (png); carrusel 1:4087-1:4093 (png); iconos sociales 1:4408-1:4411 (png); iconos SVG: flecha link 1:4165, avatar 1:4359, estrella 1:4352 (vector).

## Enlaces del header (hyperlinks Figma, apuntan al archivo Sites)
Servicios -> node-id 31-908; Garantía -> 31-895; Rastrea tu envío -> 31-911. No hay URL para Contacto.
