// js/usuario.js

import { UsuarioNoValidoExcepcion } from "./excepciones.js";

export class Usuario {
  #id;
  #nombre;
  #correo;
  #password;
  #rol;

  constructor(id, nombre, correo, password, rol = "cliente") {
    this.id = id;
    this.nombre = nombre;
    this.correo = correo;
    this.password = password;
    this.rol = rol;
  }

  get id() {
    return this.#id;
  }

  set id(valor) {
    if (!Number.isInteger(valor) || valor <= 0) {
      throw new UsuarioNoValidoExcepcion("El id del usuario debe ser un entero positivo.");
    }
    this.#id = valor;
  }

  get nombre() {
    return this.#nombre;
  }

  set nombre(valor) {
    if (typeof valor !== "string" || valor.trim().length < 3) {
      throw new UsuarioNoValidoExcepcion(
        "El nombre debe tener al menos 3 caracteres."
      );
    }
    this.#nombre = valor.trim();
  }

  get correo() {
    return this.#correo;
  }

  set correo(valor) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (typeof valor !== "string" || !emailRegex.test(valor.trim())) {
      throw new UsuarioNoValidoExcepcion("El correo electrónico no es válido.");
    }

    this.#correo = valor.trim().toLowerCase();
  }

  get password() {
    return this.#password;
  }

  set password(valor) {
    if (typeof valor !== "string" || valor.length < 6) {
      throw new UsuarioNoValidoExcepcion(
        "La contraseña debe tener al menos 6 caracteres."
      );
    }

    this.#password = valor;
  }

  get rol() {
    return this.#rol;
  }

  set rol(valor) {
    const rolesValidos = ["cliente", "admin"];

    if (!rolesValidos.includes(valor)) {
      throw new UsuarioNoValidoExcepcion(
        "El rol del usuario no es válido."
      );
    }

    this.#rol = valor;
  }

  autenticar(correo, password) {
    return this.#correo === correo.trim().toLowerCase() && this.#password === password;
  }

  actualizarNombre(nuevoNombre) {
    this.nombre = nuevoNombre;
    return this.#nombre;
  }

  actualizarCorreo(nuevoCorreo) {
    this.correo = nuevoCorreo;
    return this.#correo;
  }

  actualizarPassword(nuevoPassword) {
    this.password = nuevoPassword;
    return true;
  }

  obtenerDatos() {
    return {
      id: this.#id,
      nombre: this.#nombre,
      correo: this.#correo,
      rol: this.#rol
    };
  }
}