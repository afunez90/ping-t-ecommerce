import { ProcesoPago } from "./procesoPago.js";

export class PagoPayPal extends ProcesoPago {
  #monto;
  #estado;

  constructor() {
    super();
    this.#monto = 0;
    this.#estado = "pendiente";
  }

  get estado() {
    return this.#estado;
  }

  iniciarPago(monto) {
    if (monto <= 0) {
      throw new Error("El monto debe ser mayor que cero");
    }

    this.#monto = monto;
    this.#estado = "iniciado";
    return `Pago con PayPal iniciado por L. ${monto}`;
  }

  verificarPago(datos) {
    if (!datos || !datos.correo) {
      throw new Error("Correo de PayPal inválido");
    }

    this.#estado = "verificado";
    return "Pago con PayPal verificado correctamente";
  }

  confirmarPago() {
    if (this.#estado !== "verificado") {
      throw new Error("No se puede confirmar un pago no verificado");
    }

    this.#estado = "confirmado";
    return "Pago con PayPal confirmado";
  }
}