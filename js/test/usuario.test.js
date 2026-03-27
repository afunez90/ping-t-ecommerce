import { Usuario } from "../usuario.js";
import { UsuarioNoValidoExcepcion } from "../excepciones.js";

describe("Usuario", () => {
  test("crea usuario correctamente", () => {
    const u = new Usuario(1, "Carlos", "carlos@gmail.com", "123456");
    expect(u.obtenerDatos().nombre).toBe("Carlos");
  });

  test("lanza error si id inválido", () => {
    expect(() => new Usuario(0, "Carlos", "c@gmail.com", "123456"))
      .toThrow(UsuarioNoValidoExcepcion);
  });

  test("lanza error si nombre corto", () => {
    expect(() => new Usuario(1, "A", "c@gmail.com", "123456"))
      .toThrow(UsuarioNoValidoExcepcion);
  });

  test("lanza error si correo inválido", () => {
    expect(() => new Usuario(1, "Carlos", "correo", "123456"))
      .toThrow(UsuarioNoValidoExcepcion);
  });

  test("lanza error si contraseña corta", () => {
    expect(() => new Usuario(1, "Carlos", "c@gmail.com", "123"))
      .toThrow(UsuarioNoValidoExcepcion);
  });

  test("autenticación correcta", () => {
    const u = new Usuario(1, "Carlos", "c@gmail.com", "123456");
    expect(u.autenticar("c@gmail.com", "123456")).toBe(true);
  });

  test("autenticación incorrecta", () => {
    const u = new Usuario(1, "Carlos", "c@gmail.com", "123456");
    expect(u.autenticar("c@gmail.com", "wrong")).toBe(false);
  });
});