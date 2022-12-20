class CarritoController extends CarritoModel {
    totales = document.getElementsByClassName('totales')

    constructor() {
        super()
        
        try {
            // console.log(JSON.parse(localStorage.getItem('carrito')))
            this.carrito = JSON.parse(localStorage.getItem('carrito')) || []

        } catch (error) {

            console.error('Algo ocurrió con la lectura del localStorage', error)
            this.carrito = []
            localStorage.setItem('carrito', this.carrito)
            
        }

    }

    elProductoEstaEnElCarrito(producto) {
        return this.carrito.filter(prod => prod.id == producto.id).length
    }

    obtenerProductoDeCarrito(producto) {
        return this.carrito.find(prod => prod.id == producto.id)
    }

    agregarAlCarrito(producto) {
        console.log(producto)

        if(!this.elProductoEstaEnElCarrito(producto)) {
            producto.cantidad = 1
            producto.precioTotal;
            producto.precioTotal = producto.precio * producto.cantidad
            this.carrito.push(producto)
        } else {
            const productoDeCarrito = this.obtenerProductoDeCarrito(producto)
            productoDeCarrito.cantidad++
            producto.precioTotal = producto.precio * producto.cantidad
        }

        localStorage.setItem('carrito', JSON.stringify(this.carrito))

    }

    async borrarProductoCarrito(id) {
        
        try {
            const index = this.carrito.findIndex(prod => prod.id == id)
            this.carrito.splice(index, 1)
            localStorage.setItem('carrito', JSON.stringify(this.carrito))

            await renderTablaCarrito(this.carrito)
            this.renderValores()
        } catch (error) {
            console.log(error)
        }
    }

    async enviarCarrito() {
        
        try {
            const elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]

            elemSectionCarrito.innerHTML = '<h2>Enviando carrito...</h2>'
            const preference = await carritoService.guardarCarritoServicio(this.carrito)
            this.carrito = []
            localStorage.setItem('carrito', JSON.stringify(this.carrito))

            elemSectionCarrito.innerHTML = '<h2>¡Carrito enviado!</h2>'
            setTimeout( async () => {
                elemSectionCarrito.classList.remove('section-carrito--visible')

                console.log(preference)
                await renderPago(preference)
            }, 0)

        } catch (error) {
            console.error(error)
        }

    }
    
    cerrarCarrito() {
        const carrito=document.querySelectorAll('.section-carrito--visible')[0]
        carrito.classList.remove('section-carrito--visible')
    }
    
    async sumarUno(id) {
        try {
            const indice=this.carrito.findIndex(producto => producto.id == id)
            this.carrito[indice].cantidad++
            this.carrito[indice].precioTotal = this.carrito[indice].precio * this.carrito[indice].cantidad
            localStorage.setItem("carrito", JSON.stringify(this.carrito))
            await renderTablaCarrito(this.carrito)
            this.renderValores()

        } catch (error) {
            console.log(`Error en sumar , ${error}`);
        }
    }

    async quitarUno(id) {
        try {
            const indice=this.carrito.findIndex(producto => producto.id == id)
            this.carrito[indice].cantidad--
            this.carrito[indice].precioTotal = this.carrito[indice].precio * this.carrito[indice].cantidad
            localStorage.setItem("carrito", JSON.stringify(this.carrito))
            await renderTablaCarrito(this.carrito)
            this.renderValores()
            if (this.carrito[indice].cantidad == 0) {
                this.borrarProductoCarrito(id)
                this.renderValores()
            }

        } catch (error) {
            console.log(`Error en restar , ${error}`);
        }
    }

    totalProductos() {
        const items = this.carrito.map(productos=>{
        return productos.cantidad
    })

    const totalItems = items.reduce(
        (previo, actual) => previo + actual,
        0
    );
    return totalItems
    }  


    totalPrecio() {
        const items = this.carrito.map(productos=>{
        return productos.precioTotal
    })

    const totalPrecio = items.reduce(
        (previo, actual) => previo + actual,
        0
    );

    return totalPrecio
    } 

    renderValores() {
        this.totales[0].innerHTML = `Total Items: ${this.totalProductos()}`
        this.totales[1].innerHTML = `Total a pagar: $${this.totalPrecio()}`
    }

    cargaValorInicial() {
        setTimeout(() => {
            this.renderValores()
        }, 100);
    }
}

const carritoController = new CarritoController()