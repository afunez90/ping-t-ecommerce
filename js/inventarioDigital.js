import { GestorInventario } from "./gestorInventario.js";

export class InventarioDigital extends GestorInventario {
  #productos;

  constructor(productos = []) {
    super();
    this.#productos = Array.isArray(productos) ? productos : [];
  }

  get productos() {
    return [...this.#productos];
  }

  añadirProducto(producto) {
    if (!producto || typeof producto !== "object") {
      throw new Error("Producto digital inválido");
    }

    this.#productos.push(producto);
  }

  eliminarProducto(id) {
    this.#productos = this.#productos.filter(producto => producto.id !== id);
  }

  actualizarStock(id, cantidad) {
    if (cantidad < 0) {
      throw new Error("La disponibilidad no puede ser negativa");
    }

    const producto = this.#productos.find(producto => producto.id === id);

    if (!producto) {
      throw new Error("Producto digital no encontrado");
    }

    producto.stock = cantidad;
  }
}