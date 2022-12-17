class ContactoService {
    URL_CONTACTO = 'https://633cccc77e19b17829026cf4.mockapi.io/contacto/'

    async enviarConsulta(consulta) {
        const consultaGuardada = await http.post(this.URL_CONTACTO, consulta)
        return consultaGuardada
    }
}

const contactoService = new ContactoService()