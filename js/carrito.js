class Carrito {
    constructor() {
        this.items = JSON.parse(localStorage.getItem("carrito")) || [];
    }

    agregar(idProducto) {
        this.items.push(idProducto);
        this.guardar();
    }

    eliminar(idProducto) {
        this.items = this.items.filter(id => id !== idProducto);
        this.guardar();
    }

    guardar() {
        localStorage.setItem("carrito", JSON.stringify(this.items));
    }

    vaciar() {
        this.items = [];
        this.guardar();
    }

    obtenerItems() {
        return this.items;
    }

    calcularTotal(listaProductos) {
        let total = 0;
        this.items.forEach(id => {
            const producto = listaProductos.find(p => p.id === id);
            if (producto) total += producto.precio;
        });
        return total;
    }
}