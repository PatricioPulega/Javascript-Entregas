document.addEventListener("DOMContentLoaded", () => {
  const productos = [
      {
          id: 1,
          nombre: "Consola Game Stick 4K con 2 Joysticks Inalámbricos - 10 mil Juegos Retro",
          precio: 80000,
          imagen: "assets/producto1.jpg",
      },
      {
          id: 2,
          nombre: "Consola PS5 PlayStation 5 Slim - Incluye 2 juegos (Returnal + Ratchet & Clank)",
          precio: 700000,
          imagen: "assets/producto2.jpg",
      },
      {
          id: 3,
          nombre: "Xbox Series S 512 GB de Microsoft",
          precio: 900000,
          imagen: "assets/producto3.jpg",
      },
      {
          id: 4,
          nombre: "God of War Ragnarök - Juego para PlayStation 5 (PS5)",
          precio: 40000,
          imagen: "assets/producto4.jpg",
      },
      {
          id: 5,
          nombre: "Consola Nintendo Switch Oled Neon - Versión Japonesa",
          precio: 500000,
          imagen: "assets/producto5.jpg",
      },
      {
          id: 6,
          nombre: "The Legend Of Zelda Breath Of The Wild - Nintendo Switch",
          precio: 45000,
          imagen: "assets/producto6.jpg",
      },
  ];

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const listaCarrito = document.getElementById("lista-carrito");
  const totalCarrito = document.getElementById("total-carrito");
  const contenedorProductos = document.getElementById("productos");
  const btnVaciarCarrito = document.getElementById("vaciar-carrito");
  const carritoDiv = document.getElementById("carrito-menu-modal");
  const iconoCarrito = document.getElementById("icono-carrito");
  const btnCerrarCarrito = document.getElementById("cerrar-carrito");

  const renderizarProductos = () => {
    contenedorProductos.innerHTML = "";
    productos.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p>${producto.nombre} - $${producto.precio.toLocaleString("es-ES")}</p>
            <button class="agregar" data-id="${producto.id}">Agregar al carrito</button>
        `;
        contenedorProductos.appendChild(div);
    });

    agregarProductosAlCarrito();
};

  const agregarProductosAlCarrito = () => {
      document.querySelectorAll(".agregar").forEach((boton) => {
          boton.addEventListener("click", (e) => {
              const id = parseInt(e.target.dataset.id, 10);
              const producto = productos.find((p) => p.id === id);

              if (!producto || producto.precio == null) return;

              const existeEnCarrito = carrito.some((p) => p.id === id);
              if (existeEnCarrito) {
                  carrito.forEach((p) => {
                      if (p.id === id) {
                          p.cantidad += 1;
                      }
                  });
              } else {
                  carrito.push({
                      id: producto.id,
                      nombre: producto.nombre,
                      precio: producto.precio,
                      imagen: producto.imagen,
                      cantidad: 1,
                  });
              }

              actualizarCarrito();
          });
      });
  };


  const calcularTotal = () => {
      let total = carrito.reduce(
          (sum, producto) => sum + producto.precio * producto.cantidad,
          0
      );
      totalCarrito.textContent = total.toLocaleString("es-ES");
  };

  const actualizarCarrito = () => {
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        totalCarrito.textContent = "0.00";
        document.getElementById("carrito-menu-modal").style.display = "none";
        actualizarContadorCarrito();
        return;
    }

    carrito.forEach((producto, index) => {
        const imgSrc = producto.imagen ? producto.imagen : "assets/default.jpg";

        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${imgSrc}" alt="${producto.nombre}" class="img-carrito">
            <p>${producto.nombre}</p>
            <p>cantidad: ${producto.cantidad}</p>
            <p>$${(producto.precio * producto.cantidad).toLocaleString("es-ES")}</p>
        `;
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => {
            carrito.splice(index, 1);
            actualizarCarrito();
            actualizarContadorCarrito();
        });

        li.appendChild(btnEliminar);
        listaCarrito.appendChild(li);
    });

    localStorage.setItem("carrito", JSON.stringify(carrito));
    calcularTotal();
    actualizarContadorCarrito();
};
  const vaciarCarrito = () => {
      if (carrito.length === 0) return;

      carrito.length = 0;
      localStorage.removeItem("carrito");
      actualizarCarrito();
  };


  function cerrarAbrirCarrito() {
    if (carrito.length === 0) return;
    carritoDiv.classList.toggle("hidden");
    carritoDiv.style.display = carritoDiv.classList.contains("hidden") ? "none" : "block";
}



  function actualizarContadorCarrito() {
      const count = carrito.reduce((acc, p) => acc + p.cantidad, 0);
      document.getElementById("contadorCarrito").textContent = count;
  }

  iconoCarrito.addEventListener("click", cerrarAbrirCarrito);
  btnCerrarCarrito.addEventListener("click", cerrarAbrirCarrito);
  btnVaciarCarrito.addEventListener("click", vaciarCarrito);

  renderizarProductos();
  actualizarCarrito();
});