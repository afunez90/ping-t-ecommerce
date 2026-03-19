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


## Desafíos y soluciones
- **Problemas de carga de scripts y cache:** se resolvió ejecutando el proyecto con Live Server y ordenando los scripts.
- **Refactor a POO:** se corrigió el acceso a propiedades usando getters/setters y se centralizó el dataset de productos en `productos.js`.

## Ejecución local
1. Abrir el proyecto en VS Code
2. Ejecutar con Live Server (Open with Live Server)
3. Navegar a `catalogo.html`

## Abstracción: Gestión de Inventario
Se implementó una clase abstracta `GestorInventario` con métodos abstractos:
- `anadirProducto(producto)`
- `eliminarProducto(idProducto)`
- `actualizarStock(idProducto, nuevoStock)`

Implementaciones:
- `InventarioFisico`: controla stock real (no permite negativos).
- `InventarioDigital`: simula disponibilidad ilimitada (stock virtual 9999).

## Interfaces (Contrato) para Pagos
Como JavaScript no posee interfaces nativas, se definió un contrato `ProcesoPago` y una función
`asegurarImplementaInterfaz()` que valida que las clases de pago implementen:
- `iniciarPago()`
- `verificarPago()`
- `confirmarPago()`

Implementaciones:
- `PagoTarjeta`
- `PagoPayPal`

## Mejoras implementadas (actualización reciente)

### Portada visual (Hero Banner)
Se incorporó una sección de portada en la página principal (`index.html`) con una imagen representativa del entorno de telecomunicaciones.  
Se aplicó un diseño tipo **banner profesional (estilo Amazon)** utilizando:

- Imagen de fondo (`portada.png`)
- Capa oscura (overlay con degradado)
- Texto descriptivo sobre la imagen
- Botón de acceso directo al catálogo

Esto mejora la experiencia visual y la presentación general del sistema.

---

### Mejora en navegación (Navbar)
Se corrigió la duplicación del botón de carrito en la barra de navegación, dejando un único elemento funcional:


Donde `X` representa la cantidad total de productos en el carrito, actualizada dinámicamente.

---

### Mejora en Carrito de Compras
Se optimizó completamente la lógica del carrito (`carrito.js` y `app.js`):

#### Nuevas funcionalidades:
- Incremento de cantidad (`+`)
- Disminución de cantidad (`-`)
- Eliminación de productos
- Cálculo dinámico de subtotales
- Cálculo automático del total general

---

### Validación de Stock
Se implementó una validación crítica:

- No se permite agregar más productos que el stock disponible
- Se muestra un mensaje de error si se intenta exceder el límite

## Abstracción y Gestión de Inventario

Se implementó abstracción mediante la creación de la clase `GestorInventario`, la cual funciona como una clase abstracta simulada en JavaScript. Esta clase define métodos generales como:

- añadirProducto()
- eliminarProducto()
- actualizarStock()

Estos métodos deben ser implementados obligatoriamente por cualquier clase que extienda esta base.

A partir de esta abstracción se desarrollaron:

- `InventarioFisico`
- `InventarioDigital`

Cada una implementa su propia lógica para la gestión de productos, permitiendo manejar diferentes tipos de inventario dentro del sistema.

Además, se aplicó encapsulamiento mediante el uso de atributos privados (`#productos`) y acceso controlado mediante getters.

---

## Interfaces para Procesos de Pago

Se implementó una interfaz simulada denominada `ProcesoPago`, debido a que JavaScript no cuenta con interfaces nativas. Esta define los siguientes métodos:

- iniciarPago()
- verificarPago()
- confirmarPago()

A partir de esta interfaz se desarrollaron las clases:

- `PagoTarjeta`
- `PagoPayPal`

Cada clase implementa estos métodos con su propia lógica, asegurando que todos los procesos de pago cumplan con un mismo contrato.

Se incorporaron validaciones como:

- Verificación de monto válido
- Validación de datos de tarjeta
- Validación de correo en PayPal
- Control de estado del pago (pendiente, iniciado, verificado, confirmado)

---

## Desafíos y Soluciones

**Desafío:** JavaScript no cuenta con soporte nativo para clases abstractas e interfaces.  
**Solución:** Se simularon utilizando clases base con validaciones en el constructor (`new.target`) y métodos que lanzan errores si no son implementados.

**Desafío:** Mantener la integridad de los datos del sistema.  
**Solución:** Se implementaron validaciones en métodos y setters, evitando valores inválidos como stock negativo o datos incompletos.

**Desafío:** Evitar la manipulación directa de los datos internos.  
**Solución:** Se utilizó encapsulamiento con atributos privados (`#`) y acceso mediante getters y métodos controlados.

---

## Evidencia de Funcionalidad

El sistema permite:

- Gestión de inventario con diferentes tipos (físico y digital)
- Validación de stock antes de agregar productos al carrito
- Simulación de procesos de pago con múltiples métodos
- Control de flujo de pago (inicio → verificación → confirmación)

## Autor
Abner Funez

