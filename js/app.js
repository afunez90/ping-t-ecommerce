// js/app.js

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
  initCatalogo();
  initCarrito();
  initProductoDetalle();
});

/* =========================
   UTILIDADES
========================= */

function getCarritoArray() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function actualizarContadorCarrito() {
  const span = document.getElementById("contadorCarrito");
  if (!span) return;
  span.textContent = getCarritoArray().length;
}

/* =========================
   CATÁLOGO (catalogo.html)
========================= */

function initCatalogo() {
  const contenedor = document.getElementById("listaProductos");
  if (!contenedor) return; // no es catalogo.html

  const buscador = document.getElementById("buscador");
  const filtroCategoria = document.getElementById("filtroCategoria");

  const lista = window.productos;
  if (!Array.isArray(lista)) {
    contenedor.innerHTML = "<p>Error: productos no cargados.</p>";
    return;
  }

  function render(arr) {
    contenedor.innerHTML = "";

    if (arr.length === 0) {
      contenedor.innerHTML = "<p>No se encontraron productos.</p>";
      return;
    }

    arr.forEach((p) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <span class="badge">${p.categoria}</span>
        <h3>${p.nombre}</h3>
        <p><strong>Marca:</strong> ${p.marca}</p>
        <p><strong>Modelo:</strong> ${p.modelo}</p>
        <p><strong>Stock:</strong> ${p.stock}</p>
        <div class="precio">$${Number(p.precio).toFixed(2)}</div>
        <div class="acciones">
          <button class="btn" data-ver="${p.id}">Ver</button>
          <button class="btn-sec" data-add="${p.id}">Agregar</button>
        </div>
      `;
      contenedor.appendChild(card);
    });

    // Ver detalle
    contenedor.querySelectorAll("[data-ver]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number(btn.getAttribute("data-ver"));
        localStorage.setItem("productoSeleccionado", String(id));
        window.location.href = "producto.html";
      });
    });

    // Agregar al carrito
    contenedor.querySelectorAll("[data-add]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number(btn.getAttribute("data-add"));
        const carrito = new Carrito();
        carrito.agregar(id);
        actualizarContadorCarrito();
        alert("Producto agregado al carrito");
      });
    });
  }

  function aplicarFiltros() {
    const q = (buscador?.value || "").toLowerCase().trim();
    const cat = filtroCategoria?.value || "Todos";

    const filtrados = lista.filter((p) => {
      const coincideTexto =
        p.nombre.toLowerCase().includes(q) ||
        p.marca.toLowerCase().includes(q) ||
        p.modelo.toLowerCase().includes(q);

      const coincideCategoria = cat === "Todos" ? true : p.categoria === cat;

      return coincideTexto && coincideCategoria;
    });

    render(filtrados);
  }

  buscador?.addEventListener("input", aplicarFiltros);
  filtroCategoria?.addEventListener("change", aplicarFiltros);

  render(lista);
}

/* =========================
   CARRITO (carrito.html)
========================= */

function initCarrito() {
  const contenedor = document.getElementById("contenedorCarrito");
  const totalUI = document.getElementById("totalCarrito");
  if (!contenedor || !totalUI) return; // no es carrito.html

  const listaProductos = window.productos;
  if (!Array.isArray(listaProductos)) {
    contenedor.innerHTML = "<p>Error: productos no cargados.</p>";
    totalUI.innerHTML = "";
    return;
  }

  const carrito = new Carrito();
  const items = carrito.items; // getter retorna copia

  if (!items || items.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    totalUI.innerHTML = "";
    actualizarContadorCarrito();
    return;
  }

  // conteo por id
  const conteo = {};
  items.forEach((id) => (conteo[id] = (conteo[id] || 0) + 1));

  contenedor.innerHTML = "";
  let total = 0;

  Object.keys(conteo).forEach((idStr) => {
    const id = Number(idStr);
    const cantidad = conteo[id];

    const p = listaProductos.find((x) => x.id === id);
    if (!p) return;

    const subTotal = p.precio * cantidad;
    total += subTotal;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <span class="badge">${p.categoria}</span>
      <h3>${p.nombre}</h3>
      <p><strong>Marca:</strong> ${p.marca}</p>
      <p><strong>Modelo:</strong> ${p.modelo}</p>
      <p><strong>Cantidad:</strong> ${cantidad}</p>
      <p><strong>Subtotal:</strong> $${subTotal.toFixed(2)}</p>

      <div class="acciones">
        <button class="btn" data-plus="${p.id}">+</button>
        <button class="btn" data-minus="${p.id}">-</button>
        <button class="btn-sec" data-del="${p.id}">Eliminar</button>
      </div>
    `;

    contenedor.appendChild(card);
  });

  totalUI.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
  actualizarContadorCarrito();

  // + agrega 1
  contenedor.querySelectorAll("[data-plus]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-plus"));
      const c = new Carrito();
      c.agregar(id);
      initCarrito();
    });
  });

  // - quita 1 (quita una ocurrencia)
  contenedor.querySelectorAll("[data-minus]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-minus"));
      const c = new Carrito();
      c.quitarUno(id);
      initCarrito();
    });
  });

  // Eliminar todas las ocurrencias
  contenedor.querySelectorAll("[data-del]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-del"));
      const c = new Carrito();
      c.eliminar(id);
      initCarrito();
    });
  });
}

/* =========================
   DETALLE (producto.html)
========================= */

function initProductoDetalle() {
  const contenedor = document.getElementById("detalleProducto");
  if (!contenedor) return; // no es producto.html

  const lista = window.productos;
  if (!Array.isArray(lista)) {
    contenedor.innerHTML = "<p>Error: productos no cargados.</p>";
    return;
  }

  const id = Number(localStorage.getItem("productoSeleccionado"));
  const p = lista.find((x) => x.id === id);

  if (!p) {
    contenedor.innerHTML = "<p>No se encontró el producto.</p>";
    return;
  }

  contenedor.innerHTML = `
    <div class="card">
      <span class="badge">${p.categoria}</span>
      <h3>${p.nombre}</h3>
      <p><strong>Marca:</strong> ${p.marca}</p>
      <p><strong>Modelo:</strong> ${p.modelo}</p>
      <p><strong>Stock:</strong> ${p.stock}</p>
      <div class="precio">$${Number(p.precio).toFixed(2)}</div>

      <div class="acciones">
        <button class="btn-sec" id="btnAgregarDetalle">Agregar al carrito</button>
        <a class="btn" href="catalogo.html">Volver</a>
      </div>
    </div>
  `;

  document.getElementById("btnAgregarDetalle").addEventListener("click", () => {
    const carrito = new Carrito();
    carrito.agregar(p.id);
    actualizarContadorCarrito();
    alert("Producto agregado al carrito");
  });
}