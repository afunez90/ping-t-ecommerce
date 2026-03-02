class Carrito {
  #items;

  constructor() {
    this.#items = JSON.parse(localStorage.getItem("carrito")) || [];
  }

  getItems() {
    return this.#items;
  }

  agregar(idProducto) {
    if (!idProducto) throw new Error("ID inválido");
    this.#items.push(idProducto);
    this.#guardar();
  }

  eliminar(idProducto) {
    this.#items = this.#items.filter(id => id !== idProducto);
    this.#guardar();
  }

  calcularTotal(listaProductos) {
    let total = 0;
    this.#items.forEach(id => {
      const p = listaProductos.find(prod => prod.getId() === id);
      if (p) total += p.getPrecio();
    });
    return total;
  }

  #guardar() {
    localStorage.setItem("carrito", JSON.stringify(this.#items));
  }
}

window.Carrito = Carrito;