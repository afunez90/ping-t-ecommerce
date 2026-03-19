export class Usuario {
    #id;
    #nombre;
    #correo;
    #password;

    constructor(id, nombre, correo, password) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.password = password;
    }

    get id() {
        return this.#id;
    }

    set id(valor) {
        if (valor <= 0) throw new Error("ID inválido");
        this.#id = valor;
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(valor) {
        if (!valor || valor.trim() === "") {
            throw new Error("Nombre inválido");
        }
        this.#nombre = valor;
    }

    get correo() {
        return this.#correo;
    }

    set correo(valor) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(valor)) {
            throw new Error("Correo inválido");
        }
        this.#correo = valor;
    }

    get password() {
        return "********";
    }

    set password(valor) {
        if (!valor || valor.length < 6) {
            throw new Error("Password mínimo 6 caracteres");
        }
        this.#password = valor;
    }

    verificarPassword(pass) {
        return this.#password === pass;
    }
}