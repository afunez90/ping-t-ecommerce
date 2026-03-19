export class ConfiguracionSistema {
  static #instancia;

  constructor() {
    if (ConfiguracionSistema.#instancia) {
      return ConfiguracionSistema.#instancia;
    }

    this.config = {
      moneda: "Lempira",
      idioma: "es-HN",
      tema: "oscuro",
      impuesto: 0.15,
      inventarioHabilitado: true
    };

    ConfiguracionSistema.#instancia = this;
  }

  static getInstancia() {
    if (!ConfiguracionSistema.#instancia) {
      ConfiguracionSistema.#instancia = new ConfiguracionSistema();
    }
    return ConfiguracionSistema.#instancia;
  }

  getConfiguracion(clave) {
    return this.config[clave];
  }

  setConfiguracion(clave, valor) {
    this.config[clave] = valor;
  }

  getTodas() {
    return { ...this.config };
  }
}