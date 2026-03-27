// js/carrito.js

import {
  CarritoVacioExcepcion,
  InventarioInsuficienteExcepcion,
  ProductoNoEncontradoExcepcion,
  StockInvalidoExcepcion
} from "./excepciones.js";

export class Carrito {
  #items;

  constructor() {
    this.#items = [];
  }

  get items() {
    return this.#items;
  }

  agregarProducto(producto, cantidad = 1) {
    if (!producto) {
      throw new ProductoNoEncontradoExcepcion("El producto no existe.");
    }

    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      throw new StockInvalidoExcepcion("La cantidad debe ser un entero mayor que cero.");
    }

    if (!Number.isInteger(producto.stock) || producto.stock < cantidad) {
      throw new InventarioInsuficienteExcepcion("No hay suficiente stock disponible.");
    }

    const itemExistente = this.#items.find(
      (item) => item.producto.id === producto.id
    );

    if (itemExistente) {
      const nuevaCantidad = itemExistente.cantidad + cantidad;

      if (nuevaCantidad > producto.stock) {
        throw new InventarioInsuficienteExcepcion(
          "No se puede agregar más cantidad que el stock disponible."
        );
      }

      itemExistente.cantidad = nuevaCantidad;
    } else {
      this.#items.push({ producto, cantidad });
    }

    return this.#items;
  }

  eliminarProducto(index) {
    if (this.#items.length === 0) {
      throw new CarritoVacioExcepcion("No se puede eliminar porque el carrito está vacío.");
    }

    if (!Number.isInteger(index) || index < 0 || index >= this.#items.length) {
      throw new ProductoNoEncontradoExcepcion("No se encontró el producto en el carrito.");
    }

    return this.#items.splice(index, 1)[0];
  }

  aumentarCantidad(index) {
    if (this.#items.length === 0) {
      throw new CarritoVacioExcepcion("El carrito está vacío.");
    }

    if (!Number.isInteger(index) || index < 0 || index >= this.#items.length) {
      throw new ProductoNoEncontradoExcepcion("Índice de producto inválido.");
    }

    const item = this.#items[index];

    if (item.cantidad + 1 > item.producto.stock) {
      throw new InventarioInsuficienteExcepcion(
        "No hay suficiente stock para aumentar la cantidad."
      );
    }

    item.cantidad += 1;
    return item;
  }

  disminuirCantidad(index) {
    if (this.#items.length === 0) {
      throw new CarritoVacioExcepcion("El carrito está vacío.");
    }

    if (!Number.isInteger(index) || index < 0 || index >= this.#items.length) {
      throw new ProductoNoEncontradoExcepcion("Índice de producto inválido.");
    }

    const item = this.#items[index];

    if (item.cantidad > 1) {
      item.cantidad -= 1;
      return item;
    }

    return this.eliminarProducto(index);
  }

  calcularTotal() {
    if (this.#items.length === 0) {
      return 0;
    }

    return this.#items.reduce((total, item) => {
      return total + Number(item.producto.precio) * Number(item.cantidad);
    }, 0);
  }

  vaciarCarrito() {
    if (this.#items.length === 0) {
      throw new CarritoVacioExcepcion("El carrito ya está vacío.");
    }

    this.#items = [];
    return true;
  }
}