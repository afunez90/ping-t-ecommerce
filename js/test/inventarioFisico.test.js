import { InventarioFisico } from "../inventarioFisico.js";
import {
  InventarioInsuficienteExcepcion,
  ProductoNoEncontradoExcepcion,
  StockInvalidoExcepcion
} from "../excepciones.js";

describe("InventarioFisico", () => {
  let inventario;

  beforeEach(() => {
    inventario = new InventarioFisico([], 2);
  });

  test("agrega producto correctamente", () => {
    inventario.anadirProducto({ id: 1, nombre: "Router", stock: 5 });
    expect(inventario.obtenerProductos().length).toBe(1);
  });

  test("lanza error por capacidad", () => {
    inventario.anadirProducto({ id: 1, nombre: "Router", stock: 5 });
    inventario.anadirProducto({ id: 2, nombre: "Switch", stock: 3 });

    expect(() =>
      inventario.anadirProducto({ id: 3, nombre: "Antena", stock: 1 })
    ).toThrow(InventarioInsuficienteExcepcion);
  });

  test("lanza error si stock negativo", () => {
    expect(() =>
      inventario.anadirProducto({ id: 1, nombre: "Router", stock: -1 })
    ).toThrow(StockInvalidoExcepcion);
  });

  test("actualiza stock correctamente", () => {
    inventario.anadirProducto({ id: 1, nombre: "Router", stock: 5 });
    inventario.actualizarStock(1, 10);
    expect(inventario.buscarProductoPorId(1).stock).toBe(10);
  });

  test("lanza error si producto no existe", () => {
    expect(() => inventario.actualizarStock(99, 5))
      .toThrow(ProductoNoEncontradoExcepcion);
  });
});