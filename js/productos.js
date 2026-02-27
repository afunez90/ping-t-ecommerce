// Lista base de productos (telecom)
const productos = [
  { id: 1, nombre: "Router AC1200", marca: "TP-Link", modelo: "Archer C6", categoria: "Router", precio: 59.99, stock: 10 },
  { id: 2, nombre: "Switch 24 Puertos", marca: "Cisco", modelo: "CBS250-24T", categoria: "Switch", precio: 299.00, stock: 6 },
  { id: 3, nombre: "Antena 5GHz", marca: "Ubiquiti", modelo: "LiteBeam 5AC", categoria: "Antena", precio: 89.50, stock: 15 },
  { id: 4, nombre: "Cámara IP 4MP", marca: "Hikvision", modelo: "DS-2CD1043G2", categoria: "Camara IP", precio: 75.00, stock: 12 },
  { id: 5, nombre: "Teléfono VoIP", marca: "Yealink", modelo: "T31P", categoria: "VoIP", precio: 49.99, stock: 20 }
];

const contenedor = document.getElementById("listaProductos");
const buscador = document.getElementById("buscador");
const filtroCategoria = document.getElementById("filtroCategoria");

function render(lista) {
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }

  lista.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <span class="badge">${p.categoria}</span>
      <h3>${p.nombre}</h3>
      <p><strong>Marca:</strong> ${p.marca}</p>
      <p><strong>Modelo:</strong> ${p.modelo}</p>
      <p><strong>Stock:</strong> ${p.stock}</p>
      <div class="precio">$${p.precio.toFixed(2)}</div>
      <div class="acciones">
        <button class="btn" onclick="verDetalle(${p.id})">Ver</button>
        <button class="btn-sec" onclick="agregarCarrito(${p.id})">Agregar</button>
      </div>
    `;
    contenedor.appendChild(card);
  });
}

function aplicarFiltros() {
  const q = buscador.value.toLowerCase().trim();
  const cat = filtroCategoria.value;

  const filtrados = productos.filter(p => {
    const coincideTexto =
      p.nombre.toLowerCase().includes(q) ||
      p.marca.toLowerCase().includes(q) ||
      p.modelo.toLowerCase().includes(q);

    const coincideCategoria = (cat === "Todos") ? true : (p.categoria === cat);

    return coincideTexto && coincideCategoria;
  });

  render(filtrados);
}

// Simulación de acciones (siguiente paso: carrito real)
function verDetalle(id) {
  // Guardamos el id para usarlo en producto.html
  localStorage.setItem("productoSeleccionado", String(id));
  window.location.href = "producto.html";
}

function agregarCarrito(id) {
  // Carrito simple en localStorage
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto agregado al carrito");
}

// Eventos
buscador.addEventListener("input", aplicarFiltros);
filtroCategoria.addEventListener("change", aplicarFiltros);

// Inicial
render(productos);