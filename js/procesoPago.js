export class ProcesoPago {
  constructor() {
    if (new.target === ProcesoPago) {
      throw new Error("No se puede instanciar directamente la interfaz ProcesoPago");
    }
  }

  iniciarPago(monto) {
    throw new Error("El método iniciarPago() debe ser implementado");
  }

  verificarPago(datos) {
    throw new Error("El método verificarPago() debe ser implementado");
  }

  confirmarPago() {
    throw new Error("El método confirmarPago() debe ser implementado");
  }
}