class InventarioFisico extends GestorInventario {
  #capacidadMaxima;

  constructor(listaProductos, capacidadMaxima = 100) {
    super(listaProductos);
    this.#capacidadMaxima = capacidadMaxima;
  }

  // Verifica si hay espacio físico disponible
  verificarEspacio(producto) {
    return this.obtenerProductos().length < this.#capacidadMaxima;
  }

  // Prepara el producto antes de agregarlo
  prepararProducto(producto) {
    if (!producto) {
      throw new Error("Producto inválido.");
    }

    producto.tipo = "fisico";

    if (!Number.isInteger(producto.stock) || producto.stock < 0) {
      throw new Error("Stock inválido para inventario físico.");
    }
  }

  // Actualiza el stock real del producto
  actualizarStock(idProducto, nuevoStock) {
    if (!Number.isInteger(nuevoStock) || nuevoStock < 0) {
      throw new Error("Stock inválido (no puede ser negativo).");
    }

    const producto = this.buscarProductoPorId(idProducto);

    if (!producto) {
      throw new Error("Producto no encontrado.");
    }

    producto.stock = nuevoStock;

    return `Stock actualizado. Nuevo stock de "${producto.nombre}": ${producto.stock}`;
  }
}