function actualizarContador() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contador = document.getElementById("contadorCarrito");
  if (contador) {
    contador.textContent = carrito.length;
  }
}

actualizarContador();