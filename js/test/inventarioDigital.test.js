import { InventarioDigital } from "../inventarioDigital.js";
import { ProductoNoEncontradoExcepcion } from "../excepciones.js";

describe("InventarioDigital", () => {
  let inventario;

  beforeEach(() => {
    inventario = new InventarioDigital([]);
  });

  test("agrega producto digital correctamente", () => {
    inventario.anadirProducto({ id: 1, nombre: "Software" });
    expect(inventario.obtenerProductos()[0].stock).toBe(9999);
  });

  test("mantiene stock ilimitado", () => {
    inventario.anadirProducto({ id: 1, nombre: "Software" });
    inventario.actualizarStock(1, 2);
    expect(inventario.buscarProductoPorId(1).stock).toBe(9999);
  });

  test("lanza error si producto no existe", () => {
    expect(() => inventario.actualizarStock(99, 1))
      .toThrow(ProductoNoEncontradoExcepcion);
  });
});