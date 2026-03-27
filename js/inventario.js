// js/inventario.js

import {
  InventarioInsuficienteExcepcion,
  ProductoNoEncontradoExcepcion
} from "./excepciones.js";

export class GestorInventario {
  #lista;

  constructor(listaProductos) {
    if (new.target === GestorInventario) {
      throw new Error("GestorInventario es abstracta.");
    }

    if (!Array.isArray(listaProductos)) {
      throw new Error("La lista debe ser un arreglo.");
    }

    this.#lista = listaProductos;
  }

  anadirProducto(producto) {
    if (!producto) {
      throw new ProductoNoEncontradoExcepcion("Producto inválido.");
    }

    if (!this.verificarEspacio(producto)) {
      throw new InventarioInsuficienteExcepcion(
        "No hay espacio en inventario."
      );
    }

    this.prepararProducto(producto);
    this.#lista.push(producto);

    return producto;
  }

  eliminarProducto(idProducto) {
    const idx = this.#lista.findIndex(p => p.id === idProducto);

    if (idx === -1) {
      throw new ProductoNoEncontradoExcepcion("Producto no encontrado.");
    }

    return this.#lista.splice(idx, 1)[0];
  }

  obtenerProductos() {
    return this.#lista;
  }

  buscarProductoPorId(idProducto) {
    return this.#lista.find(p => p.id === idProducto);
  }

  // ABSTRACTOS
  prepararProducto(producto) {
    throw new Error("Método abstracto.");
  }

  verificarEspacio(producto) {
    throw new Error("Método abstracto.");
  }

  actualizarStock(idProducto, nuevoStock) {
    throw new Error("Método abstracto.");
  }
}