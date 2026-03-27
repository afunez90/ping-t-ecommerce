// js/inventarioDigital.js

import { GestorInventario } from "./inventario.js";
import { ProductoNoEncontradoExcepcion } from "./excepciones.js";

export class InventarioDigital extends GestorInventario {
  constructor(listaProductos) {
    super(listaProductos);
  }

  verificarEspacio() {
    return true;
  }

  prepararProducto(producto) {
    if (!producto) {
      throw new ProductoNoEncontradoExcepcion("Producto inválido.");
    }

    producto.tipo = "digital";
    producto.stock = 9999;
  }

  actualizarStock(idProducto) {
    const producto = this.buscarProductoPorId(idProducto);

    if (!producto) {
      throw new ProductoNoEncontradoExcepcion("Producto no encontrado.");
    }

    producto.stock = 9999;
    return producto;
  }
}