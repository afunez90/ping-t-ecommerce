import { SistemaNotificaciones } from "./sistemaNotificaciones.js";

export class Pedido {
  #estado;
  #notificador;

  constructor() {
    this.#estado = "pendiente";
    this.#notificador = new SistemaNotificaciones();
  }

  get estado() {
    return this.#estado;
  }

  suscribir(observador) {
    this.#notificador.suscribir(observador);
  }

  cambiarEstado(nuevoEstado) {
    this.#estado = nuevoEstado;

    this.#notificador.notificar({
      tipo: "estadoPedido",
      estado: nuevoEstado
    });
  }
}