// js/excepciones.js

export class PlataformaError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class InventarioInsuficienteExcepcion extends PlataformaError {
  constructor(message = "Inventario insuficiente.") {
    super(message);
  }
}

export class ProductoNoEncontradoExcepcion extends PlataformaError {
  constructor(message = "Producto no encontrado.") {
    super(message);
  }
}

export class UsuarioNoValidoExcepcion extends PlataformaError {
  constructor(message = "Datos de usuario inválidos.") {
    super(message);
  }
}

export class PagoFallidoExcepcion extends PlataformaError {
  constructor(message = "El pago no pudo procesarse.") {
    super(message);
  }
}

export class CarritoVacioExcepcion extends PlataformaError {
  constructor(message = "El carrito está vacío.") {
    super(message);
  }
}

export class StockInvalidoExcepcion extends PlataformaError {
  constructor(message = "Stock inválido.") {
    super(message);
  }
}