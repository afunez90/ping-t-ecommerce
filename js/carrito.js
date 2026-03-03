// js/carrito.js
class Carrito {
  #items; // array de IDs

  constructor() {
    this.#items = JSON.parse(localStorage.getItem("carrito")) || [];
  }

  get items() {
    // devuelve copia para no exponer el arreglo interno directamente
    return [...this.#items];
  }

  agregar(idProducto) {
    if (!Number.isInteger(idProducto) || idProducto <= 0) throw new Error("ID de producto inválido.");
    this.#items.push(idProducto);
    this.#guardar();
  }

  quitarUno(idProducto) {
    const idx = this.#items.indexOf(idProducto);
    if (idx !== -1) {
      this.#items.splice(idx, 1);
      this.#guardar();
    }
  }

  eliminar(idProducto) {
    this.#items = this.#items.filter((id) => id !== idProducto);
    this.#guardar();
  }

  vaciar() {
    this.#items = [];
    this.#guardar();
  }

  calcularTotal(listaProductos) {
    let total = 0;
    this.#items.forEach((id) => {
      const p = listaProductos.find((x) => x.id === id);
      if (p) total += p.precio;
    });
    return total;
  }

  #guardar() {
    localStorage.setItem("carrito", JSON.stringify(this.#items));
  }
}

window.Carrito = Carrito;