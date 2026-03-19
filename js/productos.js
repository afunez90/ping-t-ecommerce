import { Item } from './item.js';

export class Producto extends Item {
    #categoria;
    #stock;

    constructor(id, nombre, precio, categoria, stock) {
        super(id, nombre, precio);

        if (categoria == null || stock == null) {
            throw new Error("Datos incompletos en Producto");
        }

        this.categoria = categoria;
        this.stock = stock;
    }

    get categoria() {
        return this.#categoria;
    }

    set categoria(valor) {
        if (!valor || valor.trim() === "") {
            throw new Error("Categoría inválida");
        }
        this.#categoria = valor;
    }

    get stock() {
        return this.#stock;
    }

    set stock(valor) {
        if (valor < 0) {
            throw new Error("Stock no puede ser negativo");
        }
        this.#stock = valor;
    }

    mostrarDetalles() {
        return `${this.nombre} - L.${this.precio} - Stock: ${this.stock}`;
    }
}