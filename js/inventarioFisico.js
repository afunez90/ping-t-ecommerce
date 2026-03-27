// js/inventarioFisico.js

import { GestorInventario } from "./inventario.js";
import {
  ProductoNoEncontradoExcepcion,
  StockInvalidoExcepcion
} from "./excepciones.js";

export class InventarioFisico extends GestorInventario {
  #capacidadMaxima;

  constructor(listaProductos, capacidadMaxima = 100) {
    super(listaProductos);

    if (!Number.isInteger(capacidadMaxima) || capacidadMaxima <= 0) {
      throw new StockInvalidoExcepcion("Capacidad inválida.");
    }

    this.#capacidadMaxima = capacidadMaxima;
  }

  verificarEspacio() {
    return this.obtenerProductos().length < this.#capacidadMaxima;
  }

  prepararProducto(producto) {
    if (!producto) {
      throw new ProductoNoEncontradoExcepcion("Producto inválido.");
    }

    producto.tipo = "fisico";

    if (!Number.isInteger(producto.stock) || producto.stock < 0) {
      throw new StockInvalidoExcepcion("Stock inválido.");
    }
  }

  actualizarStock(idProducto, nuevoStock) {
    if (!Number.isInteger(nuevoStock) || nuevoStock < 0) {
      throw new StockInvalidoExcepcion("Stock inválido.");
    }

    const producto = this.buscarProductoPorId(idProducto);

    if (!producto) {
      throw new ProductoNoEncontradoExcepcion("Producto no encontrado.");
    }

    producto.stock = nuevoStock;
    return producto;
  }
}