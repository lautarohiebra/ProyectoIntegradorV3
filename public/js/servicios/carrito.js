class CarritoService {
    //URL_CARRITO = 'https://633cccc77e19b17829026cf4.mockapi.io/carrito/'
    URL_CARRITO = '/api/carrito/'

    async guardarCarritoServicio(carrito) {
        const carritoGuardado = await http.post(this.URL_CARRITO, carrito)
        return carritoGuardado
    }

}

const carritoService = new CarritoService()