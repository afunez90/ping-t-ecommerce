// js/usuario.js
class Usuario {
  #id;
  #nombre;
  #email;
  #rol;

  constructor(id, nombre, email, rol = "cliente") {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.rol = rol;
  }

  get id() { return this.#id; }
  get nombre() { return this.#nombre; }
  get email() { return this.#email; }
  get rol() { return this.#rol; }

  set id(value) {
    if (!Number.isInteger(value) || value <= 0) throw new Error("ID de usuario inválido.");
    this.#id = value;
  }

  set nombre(value) {
    if (typeof value !== "string" || value.trim().length < 3) throw new Error("Nombre de usuario inválido.");
    this.#nombre = value.trim();
  }

  set email(value) {
    const v = String(value).trim().toLowerCase();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(v)) throw new Error("Email inválido.");
    this.#email = v;
  }

  set rol(value) {
    const v = String(value).toLowerCase();
    if (!["cliente", "admin"].includes(v)) throw new Error("Rol inválido.");
    this.#rol = v;
  }
}

window.Usuario = Usuario;