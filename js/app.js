import { Producto } from './productos.js';
import { Carrito } from './carrito.js';
import { Pedido } from "./pedido.js";
import { ConfiguracionSistema } from "./configuracionSistema.js";
import { FabricaEntidades } from "./fabricaEntidades.js";

const productos = [
  new Producto(1, "Router MikroTik", 120.00, "Redes", 10),
  new Producto(2, "Switch Cisco", 250.00, "Redes", 5),
  new Producto(3, "Access Point Ubiquiti", 180.00, "Wireless", 8),
  new Producto(4, "Cable UTP Cat6", 15.00, "Cableado", 50)
];

const carrito = new Carrito();

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
  initCatalogo();
  initCarrito();
  initProductoDetalle();
});

function actualizarContadorCarrito() {
  const span = document.getElementById("contadorCarrito");
  if (!span) return;

  const totalCantidad = carrito.items.reduce((acc, item) => {
    return acc + Number(item.cantidad || 0);
  }, 0);

  span.textContent = totalCantidad;
}

function initCatalogo() {
  const contenedor = document.getElementById("listaProductos");
  if (!contenedor) return;

  const buscador = document.getElementById("buscador");
  const filtroCategoria = document.getElementById("filtroCategoria");

  function render(arr) {
    contenedor.innerHTML = "";

    if (!arr || arr.length === 0) {
      contenedor.innerHTML = "<p>No se encontraron productos.</p>";
      return;
    }

    arr.forEach((p) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <span class="badge">${p.categoria}</span>
        <h3>${p.nombre}</h3>
        <p><strong>Stock:</strong> ${p.stock}</p>
        <div class="precio">$${Number(p.precio).toFixed(2)}</div>
        <div class="acciones">
          <button class="btn" data-ver="${p.id}">Ver</button>
          <button class="btn-sec" data-add="${p.id}">Agregar</button>
        </div>
      `;

      contenedor.appendChild(card);
    });

    contenedor.querySelectorAll("[data-ver]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number(btn.getAttribute("data-ver"));
        localStorage.setItem("productoSeleccionado", String(id));
        window.location.href = "producto.html";
      });
    });

    contenedor.querySelectorAll("[data-add]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number(btn.getAttribute("data-add"));
        const producto = productos.find((p) => p.id === id);

        if (producto) {
          try {
            carrito.agregarProducto(producto, 1);
            actualizarContadorCarrito();
            alert("Producto agregado al carrito");
          } catch (error) {
            alert(error.message);
          }
        }
      });
    });
  }

  function aplicarFiltros() {
    const q = (buscador?.value || "").toLowerCase().trim();
    const cat = filtroCategoria?.value || "Todos";

    const filtrados = productos.filter((p) => {
      const coincideTexto = p.nombre.toLowerCase().includes(q);
      const coincideCategoria = cat === "Todos" ? true : p.categoria === cat;
      return coincideTexto && coincideCategoria;
    });

    render(filtrados);
  }

  buscador?.addEventListener("input", aplicarFiltros);
  filtroCategoria?.addEventListener("change", aplicarFiltros);

  render(productos);
}

function initCarrito() {
  const contenedor = document.getElementById("contenedorCarrito");
  const totalUI = document.getElementById("totalCarrito");
  if (!contenedor || !totalUI) return;

  const items = carrito.items;

  if (!items || items.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    totalUI.innerHTML = "";
    actualizarContadorCarrito();
    return;
  }

  contenedor.innerHTML = "";

  items.forEach((item, index) => {
    const p = item.producto;
    const cantidad = Number(item.cantidad);

    if (!p) return;

    const subTotal = Number(p.precio) * cantidad;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <span class="badge">${p.categoria}</span>
      <h3>${p.nombre}</h3>
      <p><strong>Stock disponible:</strong> ${p.stock}</p>
      <p><strong>Cantidad:</strong> ${cantidad}</p>
      <p><strong>Subtotal:</strong> $${subTotal.toFixed(2)}</p>
      <div class="acciones">
        <button class="btn" data-minus="${index}">-</button>
        <button class="btn" data-plus="${index}">+</button>
        <button class="btn-sec" data-del="${index}">Eliminar</button>
      </div>
    `;

    contenedor.appendChild(card);
  });

  totalUI.innerHTML = `<h3>Total: $${carrito.calcularTotal().toFixed(2)}</h3>`;
  actualizarContadorCarrito();

  contenedor.querySelectorAll("[data-plus]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = Number(btn.getAttribute("data-plus"));
      try {
        carrito.aumentarCantidad(index);
        initCarrito();
      } catch (error) {
        alert(error.message);
      }
    });
  });

  contenedor.querySelectorAll("[data-minus]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = Number(btn.getAttribute("data-minus"));
      try {
        carrito.disminuirCantidad(index);
        initCarrito();
      } catch (error) {
        alert(error.message);
      }
    });
  });

  contenedor.querySelectorAll("[data-del]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = Number(btn.getAttribute("data-del"));
      carrito.eliminarProducto(index);
      initCarrito();
    });
  });
}

function initProductoDetalle() {
  const contenedor = document.getElementById("detalleProducto");
  if (!contenedor) return;

  const id = Number(localStorage.getItem("productoSeleccionado"));
  const p = productos.find((x) => x.id === id);

  if (!p) {
    contenedor.innerHTML = "<p>No se encontró el producto.</p>";
    return;
  }

  contenedor.innerHTML = `
    <div class="card">
      <span class="badge">${p.categoria}</span>
      <h3>${p.nombre}</h3>
      <p><strong>Stock:</strong> ${p.stock}</p>
      <div class="precio">$${Number(p.precio).toFixed(2)}</div>
      <div class="acciones">
        <button class="btn-sec" id="btnAgregarDetalle">Agregar al carrito</button>
        <a class="btn" href="catalogo.html">Volver</a>
      </div>
    </div>
  `;

  document.getElementById("btnAgregarDetalle").addEventListener("click", () => {
    try {
      carrito.agregarProducto(p, 1);
      actualizarContadorCarrito();
      alert("Producto agregado al carrito");
    } catch (error) {
      alert(error.message);
    }
  });
}

// =========================
// PRUEBAS PATRONES DE DISEÑO
// Singleton, Factory, Observer
// =========================

// ---------- SINGLETON ----------
console.log("===== PRUEBA SINGLETON =====");

const config1 = ConfiguracionSistema.getInstancia();
const config2 = ConfiguracionSistema.getInstancia();

console.log("¿Es la misma instancia?", config1 === config2);
console.log("Configuración inicial:", config1.getTodas());

config1.setConfiguracion("tema", "claro");
console.log("Configuración actualizada desde config2:", config2.getTodas());

// ---------- FACTORY ----------
console.log("===== PRUEBA FACTORY =====");

const productoFisico = FabricaEntidades.crearProducto("fisico", {
  id: 101,
  nombre: "Router MikroTik",
  precio: 2500,
  categoria: "Redes",
  stock: 8
});

const productoDigital = FabricaEntidades.crearProducto("digital", {
  id: 102,
  nombre: "Licencia VoIP",
  precio: 1200,
  categoria: "Software",
  stock: 50
});

const usuarioCliente = FabricaEntidades.crearUsuario("cliente", {
  id: 1,
  nombre: "Carlos",
  correo: "carlos@gmail.com",
  password: "123456"
});

const usuarioAdmin = FabricaEntidades.crearUsuario("admin", {
  id: 2,
  nombre: "Admin Ping-T",
  correo: "admin@pingt.com",
  password: "admin123"
});

console.log("Producto físico creado:", productoFisico);
console.log("Producto digital creado:", productoDigital);
console.log("Usuario cliente creado:", usuarioCliente);
console.log("Rol cliente:", usuarioCliente.rol);
console.log("Usuario admin creado:", usuarioAdmin);
console.log("Rol admin:", usuarioAdmin.rol);

// ---------- OBSERVER ----------
console.log("===== PRUEBA OBSERVER =====");

class ObservadorUI {
  actualizar(evento) {
    console.log("Notificación recibida:", evento);
  }
}

const pedido = new Pedido();
const observador = new ObservadorUI();

pedido.suscribir(observador);
pedido.cambiarEstado("enviado");
pedido.cambiarEstado("entregado");