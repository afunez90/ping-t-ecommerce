class Producto {
    constructor(id, nombre, marca, modelo, categoria, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.marca = marca;
        this.modelo = modelo;
        this.categoria = categoria;
        this.precio = precio;
        this.stock = stock;
    }

    actualizarStock(cantidad) {
        this.stock -= cantidad;
    }

    aplicarDescuento(porcentaje) {
        this.precio = this.precio - (this.precio * porcentaje / 100);
    }

    esDisponible() {
        return this.stock > 0;
    }
}

// Crear objetos reales
const productos = [
    new Producto(1, "Router AC1200", "TP-Link", "Archer C6", "Router", 59.99, 10),
    new Producto(2, "Switch 24 Puertos", "Cisco", "CBS250-24T", "Switch", 299.00, 6),
    new Producto(3, "Antena 5GHz", "Ubiquiti", "LiteBeam 5AC", "Antena", 89.50, 15),
    new Producto(4, "Cámara IP 4MP", "Hikvision", "DS-2CD1043G2", "Camara IP", 75.00, 12),
    new Producto(5, "Teléfono VoIP", "Yealink", "T31P", "VoIP", 49.99, 20)
];