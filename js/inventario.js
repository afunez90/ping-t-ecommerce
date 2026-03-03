// js/inventario.js

// Clase abstracta
class GestorInventario {
  constructor() {
    if (new.target === GestorInventario) {
      throw new Error("GestorInventario es abstracta. No se puede instanciar.");
    }
  }

  // Métodos abstractos (se obligan en hijos)
  anadirProducto(producto) {
    throw new Error("Método abstracto: anadirProducto() debe implementarse.");
  }

  eliminarProducto(idProducto) {
    throw new Error("Método abstracto: eliminarProducto() debe implementarse.");
  }

  actualizarStock(idProducto, nuevoStock) {
    throw new Error("Método abstracto: actualizarStock() debe implementarse.");
  }
}

/**
 * Inventario físico: valida stock >= 0 y afecta stock
 */
class InventarioFisico extends GestorInventario {
  #lista;

  constructor(listaProductos) {
    super();
    this.#lista = listaProductos; // referencia al array window.productos
  }

  anadirProducto(producto) {
    if (!producto) throw new Error("Producto inválido.");
    this.#lista.push(producto);
  }

  eliminarProducto(idProducto) {
    const idx = this.#lista.findIndex((p) => p.id === idProducto);
    if (idx !== -1) this.#lista.splice(idx, 1);
  }

  actualizarStock(idProducto, nuevoStock) {
    if (!Number.isInteger(nuevoStock) || nuevoStock < 0) {
      throw new Error("Stock inválido (no puede ser negativo).");
    }
    const p = this.#lista.find((x) => x.id === idProducto);
    if (!p) throw new Error("Producto no encontrado.");
    p.stock = nuevoStock; // usa setter encapsulado
  }
}

/**
 * Inventario digital: no maneja stock físico (siempre “disponible”).
 * aquí el stock se fuerza a 9999 para simular disponibilidad.
 */
class InventarioDigital extends GestorInventario {
  #lista;

  constructor(listaProductos) {
    super();
    this.#lista = listaProductos;
  }

  anadirProducto(producto) {
    if (!producto) throw new Error("Producto inválido.");
    producto.tipo = "digital";
    producto.stock = 9999; // disponibilidad virtual
    this.#lista.push(producto);
  }

  eliminarProducto(idProducto) {
    const idx = this.#lista.findIndex((p) => p.id === idProducto);
    if (idx !== -1) this.#lista.splice(idx, 1);
  }

  actualizarStock(idProducto, nuevoStock) {
    // En digital se ignora stock real; se deja como “ilimitado”
    const p = this.#lista.find((x) => x.id === idProducto);
    if (!p) throw new Error("Producto no encontrado.");
    p.stock = 9999;
  }
}

// Exportar a window
window.GestorInventario = GestorInventario;
window.InventarioFisico = InventarioFisico;
window.InventarioDigital = InventarioDigital;