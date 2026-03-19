export class Carrito {
    #items;

    constructor() {
        const guardado = JSON.parse(localStorage.getItem("carrito"));
        this.#items = Array.isArray(guardado) ? guardado : [];
    }

    get items() {
        return [...this.#items];
    }

    guardar() {
        localStorage.setItem("carrito", JSON.stringify(this.#items));
    }

    agregarProducto(producto, cantidad = 1) {
        if (!producto || typeof producto !== "object") {
            throw new Error("Producto inválido");
        }

        if (cantidad <= 0) {
            throw new Error("Cantidad inválida");
        }

        const existente = this.#items.find(
            item => item.producto && item.producto.id === producto.id
        );

        if (existente) {
            const nuevaCantidad = existente.cantidad + cantidad;

            if (nuevaCantidad > producto.stock) {
                throw new Error(`No puedes agregar más de ${producto.stock} unidades de ${producto.nombre}`);
            }

            existente.cantidad = nuevaCantidad;
        } else {
            if (cantidad > producto.stock) {
                throw new Error(`No puedes agregar más de ${producto.stock} unidades de ${producto.nombre}`);
            }

            this.#items.push({
                producto: {
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: Number(producto.precio),
                    categoria: producto.categoria,
                    stock: Number(producto.stock)
                },
                cantidad: Number(cantidad)
            });
        }

        this.guardar();
    }

    actualizarCantidad(index, nuevaCantidad) {
        if (index < 0 || index >= this.#items.length) {
            throw new Error("Índice inválido");
        }

        if (nuevaCantidad <= 0) {
            throw new Error("La cantidad debe ser mayor que cero");
        }

        const item = this.#items[index];

        if (nuevaCantidad > item.producto.stock) {
            throw new Error(`Solo hay ${item.producto.stock} unidades disponibles`);
        }

        item.cantidad = Number(nuevaCantidad);
        this.guardar();
    }

    aumentarCantidad(index) {
        if (index < 0 || index >= this.#items.length) {
            throw new Error("Índice inválido");
        }

        const item = this.#items[index];

        if (item.cantidad >= item.producto.stock) {
            throw new Error(`Solo hay ${item.producto.stock} unidades disponibles`);
        }

        item.cantidad += 1;
        this.guardar();
    }

    disminuirCantidad(index) {
        if (index < 0 || index >= this.#items.length) {
            throw new Error("Índice inválido");
        }

        const item = this.#items[index];

        if (item.cantidad > 1) {
            item.cantidad -= 1;
        } else {
            this.#items.splice(index, 1);
        }

        this.guardar();
    }

    eliminarProducto(index) {
        if (index < 0 || index >= this.#items.length) {
            throw new Error("Índice inválido");
        }

        this.#items.splice(index, 1);
        this.guardar();
    }

    vaciarCarrito() {
        this.#items = [];
        this.guardar();
    }

    calcularTotal() {
        return this.#items.reduce((total, item) => {
            const precio = Number(item.producto.precio);
            const cantidad = Number(item.cantidad);
            return total + (precio * cantidad);
        }, 0);
    }
}