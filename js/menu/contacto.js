class FormularioContacto{
    campos = null
    formulario = null
    camposValidos=[false,false,false,false, false]
    regExpValidar = [
        /^.+$/,     /* Nombre     */
        /^.+$/,     /* Apellido  */
        /^.+$/,     /* Email    */
        /^.+$/,     /* Motivo */
        /^.+$/,     /* Info     */
    ]

/* Seleccion */

    constructor(enviarConsulta){
        this.campos = document.querySelectorAll('.campos-contacto')
        this.formulario = document.getElementsByClassName('form__contacto')[0]

        this.campos.forEach((input,index)=>{
            input.addEventListener('input',()=>{
                this.validar(input.value, this.regExpValidar[index], index)
            })
        })


/* Sumbit y limpieza de formulario */

        this.formulario.addEventListener('submit', e=>{
            e.preventDefault()  /* Previene reinicio de pagina */

            const consulta = this.leerConsulta()
            this.cleanForm()    /* Limpia el formulario luego del submit */

            if(enviarConsulta) enviarConsulta(consulta)
        })

        
    }

    algunCampoValido = () =>{
        let valido = 
            this.camposValidos[0]&&
            this.camposValidos[1]&&
            this.camposValidos[2]&&
            this.camposValidos[3]&&
            this.camposValidos[4]

        return !valido
    }

    validar = (valor, validador, index)=>{
        if(!validador.test(valor)){
            this.setCustomValidity('Campo no válido', index)
            this.camposValidos[index] = false
            return null
        }
    
        this.camposValidos[index]=true
        this.setCustomValidity('', index)
        return valor
    }

    //muestra o oculta mensaje
    setCustomValidity = (mensaje, index)=>{ 
    let divs = document.querySelectorAll('.form__contacto div')
    divs[index].innerHTML=mensaje
    divs[index].style.display = mensaje ? 'block' : 'none'
    }

    guardarConsulta() {
        return {
            nombre:this.campos[0].value,
            apellido:this.campos[1].value,
            email:this.campos[2].value,
            motivo:this.campos[3].value,
            consulta:this.campos[4].value,
        }
    }
    
    limpiarFormulario = () =>{
        this.campos.forEach((input)=>{
            input.value = ''
        })
    
        this.camposValidos = [false,false,false,false,false]
    }
}



function initContacto() {
    console.warn('initContacto()')
}
