# Ping-T | e-Commerce de Equipos de Telecomunicaciones

## Descripción
Ping-T es una plataforma web (front-end) de comercio electrónico para la venta de equipos de telecomunicaciones (routers, switches, antenas, cámaras IP y VoIP). Incluye catálogo con búsqueda y filtrado, vista de detalle y carrito de compras con persistencia en LocalStorage.

## Tecnologías
- HTML5
- CSS3
- JavaScript ES6+
- POO (Encapsulamiento, Abstracción, Herencia)
- LocalStorage
- Git / GitHub

## Estructura del proyecto
- `/css` estilos
- `/js` lógica del sistema:
  - `item.js` (abstracción)
  - `productos.js` (clase Producto + datos)
  - `usuario.js` (clase Usuario)
  - `carrito.js` (clase Carrito)
  - `app.js` (UI / render)

## Encapsulamiento
Se implementaron atributos privados con `#` y acceso controlado mediante getters y setters:
- Validación de precio (no negativo) y stock (no negativo) en Producto.
- Validación de correo con regex en Usuario.
- Validación de ID en Carrito.

## Abstracción
Se creó una clase base abstracta `Item` para generalizar propiedades comunes:
- `id`, `nombre`, `precio`
La clase `Producto` hereda de `Item` y agrega propiedades específicas (marca, modelo, stock, categoría, tipo).

## Funcionalidades
- Catálogo: búsqueda y filtrado por categoría
- Vista detalle de producto
- Carrito: agregar, quitar, eliminar, total
- Persistencia con LocalStorage

## Capturas
Agrega aquí imágenes (ejemplo):
- Catálogo: `assets/img/captura-catalogo.png`
- Carrito: `assets/img/captura-carrito.png`

## Desafíos y soluciones
- **Problemas de carga de scripts y cache:** se resolvió ejecutando el proyecto con Live Server y ordenando los scripts.
- **Refactor a POO:** se corrigió el acceso a propiedades usando getters/setters y se centralizó el dataset de productos en `productos.js`.

## Ejecución local
1. Abrir el proyecto en VS Code
2. Ejecutar con Live Server (Open with Live Server)
3. Navegar a `catalogo.html`

## Autor
Abner Funez
