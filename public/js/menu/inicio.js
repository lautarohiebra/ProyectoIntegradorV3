async function renderPlantillaListado(listado) {
  try {
    const respuesta = await fetch("plantillas/inicio.hbs")
    const plantillaHbs = await respuesta.text()
    const template = Handlebars.compile(plantillaHbs)

    const html = template({ listado })

    document.getElementsByClassName("cards-container")[0].innerHTML = html
  } catch (error) {
    console.error(error)
  }
}

function agregarCarrito(e, id, ref) {
  e.preventDefault()
  //console.log(id)
  //console.log(ref)
  const producto = productoController.productos.find(
    (producto) => producto.id == id
  )

  //Modal de Agregar al Carrito
  const modal = document.getElementById("modalAgregarAlCarrito");
  modal.style.display = "block";

  //Para cerrar el modal
  const span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
    modal.style.display = "none";
  }

  //Timer para el Modal
  setTimeout(function() {
    modal.style.display = "none";
  }, 3000);

  //debugger
  console.log(producto)
  carritoController.agregarAlCarrito(producto)
}

async function initInicio() {
  console.warn("initInicio()")

  const productos = await productoController.obtenerProductos()

  await renderPlantillaListado(productos)

  document.querySelector(
    ".section-cards__header p"
  ).innerHTML = `Se encontraron ${productos.length} productos`

  const cards = document.querySelectorAll(".card")
  cards.forEach((card) => {
    card.removeAttribute("href")
  })
}


