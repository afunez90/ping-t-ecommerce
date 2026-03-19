export class GestorInventario {
  constructor() {
    if (new.target === GestorInventario) {
      throw new Error("No se puede instanciar directamente la clase abstracta GestorInventario");
    }
  }

  añadirProducto(producto) {
    throw new Error("El método añadirProducto() debe ser implementado");
  }

  eliminarProducto(id) {
    throw new Error("El método eliminarProducto() debe ser implementado");
  }

  actualizarStock(id, cantidad) {
    throw new Error("El método actualizarStock() debe ser implementado");
  }
}