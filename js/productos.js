// js/productos.js
class Producto extends Item {
  #marca;
  #modelo;
  #stock;
  #categoria;
  #tipo; // "fisico" o "digital"

  constructor(id, nombre, precio, marca, modelo, stock, categoria, tipo = "fisico") {
    super(id, nombre, precio);
    this.marca = marca;
    this.modelo = modelo;
    this.stock = stock;
    this.categoria = categoria;
    this.tipo = tipo;
  }

  // getters
  get marca() { return this.#marca; }
  get modelo() { return this.#modelo; }
  get stock() { return this.#stock; }
  get categoria() { return this.#categoria; }
  get tipo() { return this.#tipo; }

  // setters con validación
  set marca(value) {
    if (typeof value !== "string" || value.trim().length < 2) throw new Error("Marca inválida.");
    this.#marca = value.trim();
  }

  set modelo(value) {
    if (typeof value !== "string" || value.trim().length < 2) throw new Error("Modelo inválido.");
    this.#modelo = value.trim();
  }

  set stock(value) {
    if (!Number.isInteger(value) || value < 0) throw new Error("Stock inválido (no puede ser negativo).");
    this.#stock = value;
  }

  set categoria(value) {
    if (typeof value !== "string" || value.trim().length < 2) throw new Error("Categoría inválida.");
    this.#categoria = value.trim();
  }

  set tipo(value) {
    const v = String(value).toLowerCase();
    if (v !== "fisico" && v !== "digital") throw new Error("Tipo inválido (fisico/digital).");
    this.#tipo = v;
  }

  // método extra (ejemplo de comportamiento)
  disponible() {
    return this.stock > 0;
  }
}

const productos = [
  new Producto(1, "Router AC1200", 59.99, "TP-Link", "Archer C6", 10, "Router", "fisico"),
  new Producto(2, "Switch 24 Puertos", 299.0, "Cisco", "CBS250-24T", 6, "Switch", "fisico"),
  new Producto(3, "Antena 5GHz", 89.5, "Ubiquiti", "LiteBeam 5AC", 15, "Antena", "fisico"),
  new Producto(4, "Cámara IP 4MP", 75.0, "Hikvision", "DS-2CD1043G2", 12, "Camara IP", "fisico"),
  new Producto(5, "Teléfono VoIP", 49.99, "Yealink", "T31P", 20, "VoIP", "fisico"),
];

window.Producto = Producto;
window.productos = productos;