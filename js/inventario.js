// js/inventario.js

class GestorInventario {
  #lista;

  constructor(listaProductos) {
    if (new.target === GestorInventario) {
      throw new Error("GestorInventario es abstracta. No se puede instanciar.");
    }
    this.#lista = listaProductos;
  }

  anadirProducto(producto) {
    if (!producto) {
      throw new Error("Producto inválido.");
    }

    if (!this.verificarEspacio(producto)) {
      throw new Error("No hay espacio disponible para agregar el producto.");
    }

    this.prepararProducto(producto);
    this.#lista.push(producto);
  }

  eliminarProducto(idProducto) {
    const idx = this.#lista.findIndex((p) => p.id === idProducto);

    if (idx === -1) {
      throw new Error("Producto no encontrado.");
    }

    this.#lista.splice(idx, 1);
  }

  obtenerProductos() {
    return this.#lista;
  }

  buscarProductoPorId(idProducto) {
    return this.#lista.find((p) => p.id === idProducto);
  }

  prepararProducto(producto) {
    throw new Error("Método abstracto: prepararProducto() debe implementarse.");
  }

  verificarEspacio(producto) {
    throw new Error("Método abstracto: verificarEspacio() debe implementarse.");
  }

  actualizarStock(idProducto, nuevoStock) {
    throw new Error("Método abstracto: actualizarStock() debe implementarse.");
  }
}

class InventarioFisico extends GestorInventario {
  #capacidadMaxima;

  constructor(listaProductos, capacidadMaxima = 100) {
    super(listaProductos);
    this.#capacidadMaxima = capacidadMaxima;
  }

  verificarEspacio(producto) {
    return this.obtenerProductos().length < this.#capacidadMaxima;
  }

  prepararProducto(producto) {
    producto.tipo = "fisico";

    if (!Number.isInteger(producto.stock) || producto.stock < 0) {
      throw new Error("Stock inválido para inventario físico.");
    }
  }

  actualizarStock(idProducto, nuevoStock) {
    if (!Number.isInteger(nuevoStock) || nuevoStock < 0) {
      throw new Error("Stock inválido (no puede ser negativo).");
    }

    const p = this.buscarProductoPorId(idProducto);

    if (!p) {
      throw new Error("Producto no encontrado.");
    }

    p.stock = nuevoStock;
  }
}

class InventarioDigital extends GestorInventario {
  constructor(listaProductos) {
    super(listaProductos);
  }

  verificarEspacio(producto) {
    return true;
  }

  prepararProducto(producto) {
    producto.tipo = "digital";
    producto.stock = 9999;
  }

  actualizarStock(idProducto, nuevoStock) {
    const p = this.buscarProductoPorId(idProducto);

    if (!p) {
      throw new Error("Producto no encontrado.");
    }

    p.stock = 9999;
  }
}

window.GestorInventario = GestorInventario;
window.InventarioFisico = InventarioFisico;
window.InventarioDigital = InventarioDigital;