const productos = [
  { id: 1, nombre: "Router AC1200", marca: "TP-Link", modelo: "Archer C6", categoria: "Router", precio: 59.99, stock: 10 },
  { id: 2, nombre: "Switch 24 Puertos", marca: "Cisco", modelo: "CBS250-24T", categoria: "Switch", precio: 299.00, stock: 6 },
  { id: 3, nombre: "Antena 5GHz", marca: "Ubiquiti", modelo: "LiteBeam 5AC", categoria: "Antena", precio: 89.50, stock: 15 },
  { id: 4, nombre: "Cámara IP 4MP", marca: "Hikvision", modelo: "DS-2CD1043G2", categoria: "Camara IP", precio: 75.00, stock: 12 },
  { id: 5, nombre: "Teléfono VoIP", marca: "Yealink", modelo: "T31P", categoria: "VoIP", precio: 49.99, stock: 20 }
];

const contenedor = document.getElementById("contenedorCarrito");
const totalUI = document.getElementById("totalCarrito");

function getCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function setCarrito(c) {
  localStorage.setItem("carrito", JSON.stringify(c));
}

function renderCarrito() {
  const carritoIds = getCarrito();

  if (carritoIds.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    totalUI.innerHTML = "";
    return;
  }

  // contar cantidades por id
  const conteo = {};
  carritoIds.forEach(id => conteo[id] = (conteo[id] || 0) + 1);

  contenedor.innerHTML = "";
  let total = 0;

  Object.keys(conteo).forEach(idStr => {
    const id = Number(idStr);
    const cantidad = conteo[id];
    const p = productos.find(x => x.id === id);
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
        <button class="btn" onclick="sumar(${p.id})">+</button>
        <button class="btn" onclick="restar(${p.id})">-</button>
        <button class="btn-sec" onclick="eliminar(${p.id})">Eliminar</button>
      </div>
    `;
    contenedor.appendChild(card);
  });

  totalUI.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}

function sumar(id) {
  const c = getCarrito();
  c.push(id);
  setCarrito(c);
  renderCarrito();
}

function restar(id) {
  const c = getCarrito();
  const idx = c.indexOf(id);
  if (idx !== -1) c.splice(idx, 1);
  setCarrito(c);
  renderCarrito();
}

function eliminar(id) {
  const c = getCarrito().filter(x => x !== id);
  setCarrito(c);
  renderCarrito();
}

renderCarrito();