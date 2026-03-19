import { Producto } from "./productos.js";
import { Usuario } from "./usuario.js";

export class FabricaEntidades {

  // Crear productos
  static crearProducto(tipo, datos) {
    if (!tipo || !datos) {
      throw new Error("Datos insuficientes para crear producto");
    }

    const { id, nombre, precio, categoria, stock } = datos;

    if (tipo === "fisico") {
      return new Producto(id, nombre, precio, categoria, stock);
    }

    if (tipo === "digital") {
      return new Producto(id, nombre, precio, categoria, stock);
    }

    throw new Error("Tipo de producto no válido");
  }

  // Crear usuarios
  static crearUsuario(tipo, datos) {
    if (!tipo || !datos) {
      throw new Error("Datos insuficientes para crear usuario");
    }

    const { id, nombre, correo, password } = datos;

    const usuario = new Usuario(id, nombre, correo, password);

    if (tipo === "admin") {
      usuario.rol = "administrador";
    } else if (tipo === "cliente") {
      usuario.rol = "cliente";
    } else {
      throw new Error("Tipo de usuario no válido");
    }

    return usuario;
  }
}