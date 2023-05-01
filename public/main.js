
const socket = io.connect('http://localhost:8022', {'forceNew': true});

socket.on('mensajes', (data) => {
    console.log(data);
    render(data);
})


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
    let texto = document.getElementById('textoMensaje');

    let mensaje = {
        texto: document.getElementById('textoMensaje').value,
        nomUsuario: iniciarSesion()
    }
    socket.emit('enviarMensaje', mensaje);

    texto.value = '';
    return false;
}

const iniciarSesion = () => {
    let nombreUsuario = document.getElementById('nombreUsuario').value;

    if(!nombreUsuario || nombreUsuario.lenght === 0){
        document.getElementById('errorIngreso').style.display = "block";
        return false;
    }
    document.getElementById('login').style.display = 'none';
    document.getElementById('chat').style.display = 'flex';
    return nombreUsuario;
}


// if(btnIngresar){
//     btnIngresar.addEventListener('click', () => {
//         iniciarSesion()
//     })
// }


