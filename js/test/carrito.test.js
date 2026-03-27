import { Carrito } from "../carrito.js";
import {
  CarritoVacioExcepcion,
  InventarioInsuficienteExcepcion,
  ProductoNoEncontradoExcepcion,
  StockInvalidoExcepcion
} from "../excepciones.js";

describe("Carrito", () => {
  let carrito;
  let producto;

  beforeEach(() => {
    carrito = new Carrito();
    producto = { id: 1, nombre: "Router", precio: 100, stock: 5 };
  });

  test("agrega producto correctamente", () => {
    carrito.agregarProducto(producto, 1);
    expect(carrito.items.length).toBe(1);
  });

  test("lanza error si producto es null", () => {
    expect(() => carrito.agregarProducto(null, 1))
      .toThrow(ProductoNoEncontradoExcepcion);
  });

  test("lanza error si cantidad es inválida", () => {
    expect(() => carrito.agregarProducto(producto, 0))
      .toThrow(StockInvalidoExcepcion);
  });

  test("lanza error si no hay stock", () => {
    expect(() => carrito.agregarProducto(producto, 10))
      .toThrow(InventarioInsuficienteExcepcion);
  });

  test("aumenta cantidad correctamente", () => {
    carrito.agregarProducto(producto, 1);
    carrito.aumentarCantidad(0);
    expect(carrito.items[0].cantidad).toBe(2);
  });

  test("disminuye cantidad correctamente", () => {
    carrito.agregarProducto(producto, 2);
    carrito.disminuirCantidad(0);
    expect(carrito.items[0].cantidad).toBe(1);
  });

  test("elimina producto correctamente", () => {
    carrito.agregarProducto(producto, 1);
    carrito.eliminarProducto(0);
    expect(carrito.items.length).toBe(0);
  });

  test("lanza error si carrito vacío al eliminar", () => {
    expect(() => carrito.eliminarProducto(0))
      .toThrow(CarritoVacioExcepcion);
  });

  test("calcula total correctamente", () => {
    carrito.agregarProducto(producto, 2);
    expect(carrito.calcularTotal()).toBe(200);
  });
});