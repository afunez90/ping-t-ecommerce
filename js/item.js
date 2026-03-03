// js/item.js
class Item {
  #id;
  #nombre;
  #precio;

  constructor(id, nombre, precio) {
    if (new.target === Item) {
      throw new Error("Item es abstracta: no se puede instanciar directamente.");
    }
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
  }

  // getters
  get id() { return this.#id; }
  get nombre() { return this.#nombre; }
  get precio() { return this.#precio; }

  // setters (validación)
  set id(value) {
    if (!Number.isInteger(value) || value <= 0) throw new Error("ID inválido.");
    this.#id = value;
  }

  set nombre(value) {
    if (typeof value !== "string" || value.trim().length < 3) throw new Error("Nombre inválido.");
    this.#nombre = value.trim();
  }

  set precio(value) {
    const num = Number(value);
    if (Number.isNaN(num) || num < 0) throw new Error("Precio inválido (no puede ser negativo).");
    this.#precio = num;
  }
}

window.Item = Item;