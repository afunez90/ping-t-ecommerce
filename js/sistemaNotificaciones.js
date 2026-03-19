export class SistemaNotificaciones {
  #observadores;

  constructor() {
    this.#observadores = [];
  }

  suscribir(observador) {
    this.#observadores.push(observador);
  }

  desuscribir(observador) {
    this.#observadores = this.#observadores.filter(o => o !== observador);
  }

  notificar(evento) {
    this.#observadores.forEach(observador => {
      observador.actualizar(evento);
    });
  }
}