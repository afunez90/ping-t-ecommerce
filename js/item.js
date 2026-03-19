export class Item {
    #id;
    #nombre;
    #precio;

    constructor(id, nombre, precio) {
        if (this.constructor === Item) {
            throw new Error("No se puede instanciar una clase abstracta");
        }

        // VALIDACIÓN INICIAL (extra seguridad)
        if (id == null || nombre == null || precio == null) {
            throw new Error("Datos incompletos en Item");
        }

        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }

    // GETTERS
    get id() {
        return this.#id;
    }

    get nombre() {
        return this.#nombre;
    }

    get precio() {
        return this.#precio;
    }

    // SETTERS CON VALIDACIÓN
    set id(valor) {
        if (valor <= 0) throw new Error("ID inválido");
        this.#id = valor;
    }

    set nombre(valor) {
        if (!valor || valor.trim() === "") throw new Error("Nombre vacío");
        this.#nombre = valor;
    }

    set precio(valor) {
        if (valor < 0) throw new Error("Precio no puede ser negativo");
        this.#precio = valor;
    }

    // MÉTODO ABSTRACTO
    mostrarDetalles() {
        throw new Error("Método abstracto no implementado");
    }
}