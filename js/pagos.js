// js/pagos.js

// "Interfaz" como contrato (JS no tiene interfaces nativas)
const ProcesoPago = {
  methods: ["iniciarPago", "verificarPago", "confirmarPago"],
};

function asegurarImplementaInterfaz(instancia, interfaz) {
  interfaz.methods.forEach((m) => {
    if (typeof instancia[m] !== "function") {
      throw new Error(`Clase no cumple interfaz ProcesoPago: falta ${m}()`);
    }
  });
}

/**
 * Pago con Tarjeta (simulado)
 */
class PagoTarjeta {
  #monto;
  #estado; // "iniciado", "verificado", "confirmado"

  constructor(monto) {
    this.#monto = Number(monto);
    if (Number.isNaN(this.#monto) || this.#monto <= 0) throw new Error("Monto inválido.");
    this.#estado = "iniciado";
    asegurarImplementaInterfaz(this, ProcesoPago);
  }

  iniciarPago(datosTarjeta) {
    // Validación simple (simulada)
    if (!datosTarjeta || !datosTarjeta.numero || String(datosTarjeta.numero).length < 12) {
      throw new Error("Datos de tarjeta inválidos.");
    }
    this.#estado = "iniciado";
    return { ok: true, estado: this.#estado };
  }

  verificarPago() {
    // Simulación de verificación
    this.#estado = "verificado";
    return { ok: true, estado: this.#estado };
  }

  confirmarPago() {
    if (this.#estado !== "verificado") {
      throw new Error("Debe verificar el pago antes de confirmar.");
    }
    this.#estado = "confirmado";
    return { ok: true, estado: this.#estado };
  }
}

/**
 * Pago con PayPal (simulado)
 */
class PagoPayPal {
  #monto;
  #estado;

  constructor(monto) {
    this.#monto = Number(monto);
    if (Number.isNaN(this.#monto) || this.#monto <= 0) throw new Error("Monto inválido.");
    this.#estado = "iniciado";
    asegurarImplementaInterfaz(this, ProcesoPago);
  }

  iniciarPago(correoPayPal) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(String(correoPayPal).trim())) {
      throw new Error("Correo PayPal inválido.");
    }
    this.#estado = "iniciado";
    return { ok: true, estado: this.#estado };
  }

  verificarPago() {
    this.#estado = "verificado";
    return { ok: true, estado: this.#estado };
  }

  confirmarPago() {
    if (this.#estado !== "verificado") {
      throw new Error("Debe verificar el pago antes de confirmar.");
    }
    this.#estado = "confirmado";
    return { ok: true, estado: this.#estado };
  }
}

window.ProcesoPago = ProcesoPago;
window.PagoTarjeta = PagoTarjeta;
window.PagoPayPal = PagoPayPal;
window.asegurarImplementaInterfaz = asegurarImplementaInterfaz;