

const socket = io.connect('http://localhost:8022', {'forceNew': true});

socket.on('mensajes', (data) => {
    console.log(data);
    render(data);
})

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('ingresar').addEventListener('keypress', e => {
        if(e.which == 13) {
            e.preventDefault();
        }
    })
});

const render = (data) => {
    console.log(data)
    let htmlMensajes = data.map((mensaje, index) => {
        return (`
            <div class="mensaje">
                <div class="logo">
                    <span class="logo-inicial">${mensaje.nomUsuario[0]}</span>
                </div>
                <div class="mensaje-burbuja">
                    <p class="mensaje-usuario">${mensaje.nomUsuario}:</p>
                    <p class="mensaje-texto">${mensaje.texto}</p>
                </div>
            </div>
        `)
    }).join(' ');
    
    let contenedorMensajes = document.getElementById('contenedorMensajes');
    contenedorMensajes.innerHTML = htmlMensajes;
    contenedorMensajes.scrollTop =  contenedorMensajes.scrollHeight;
}

const enviarMensaje = (event) => {
    mistorage = window.localStorage
    let texto = document.getElementById('textoMensaje');
    if(texto.value.length === 0){
        return false;
    }

    let mensaje = {
        texto: document.getElementById('textoMensaje').value,
        nomUsuario: mistorage.getItem('nombreUsuario')
    }
    socket.emit('enviarMensaje', mensaje);
    texto.value = "";
    return false;
}





