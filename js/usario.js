class Usuario {
    constructor(id, nombre, email, rol) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.rol = rol;
    }

    iniciarSesion() {
        console.log(`${this.nombre} ha iniciado sesión`);
    }

    cerrarSesion() {
        console.log(`${this.nombre} ha cerrado sesión`);
    }
}

// Herencia
class Cliente extends Usuario {
    constructor(id, nombre, email) {
        super(id, nombre, email, "cliente");
        this.carrito = [];
    }

    agregarAlCarrito(producto) {
        this.carrito.push(producto);
    }
}

class Administrador extends Usuario {
    constructor(id, nombre, email) {
        super(id, nombre, email, "admin");
    }

    gestionarInventario() {
        console.log("Accediendo a panel administrativo");
    }
}