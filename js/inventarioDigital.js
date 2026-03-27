class InventarioDigital extends GestorInventario {
  constructor(listaProductos) {
    super(listaProductos);
  }

  // En digital asumimos espacio ilimitado
  verificarEspacio(producto) {
    return true;
  }

  // Prepara el producto como digital
  prepararProducto(producto) {
    if (!producto) {
      throw new Error("Producto inválido.");
    }

    producto.tipo = "digital";
    producto.stock = 9999; // disponibilidad virtual
  }

  // En digital el stock siempre es "ilimitado"
  actualizarStock(idProducto, nuevoStock) {
    const producto = this.buscarProductoPorId(idProducto);

    if (!producto) {
      throw new Error("Producto no encontrado.");
    }

    producto.stock = 9999;

    return `Stock digital actualizado (ilimitado) para "${producto.nombre}"`;
  }
}