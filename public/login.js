
let mistorage = window.localStorage;
const loginHTML = document.getElementById('login');
const chatHTML = document.getElementById('chat');
const botonSalir = document.getElementById('btnSalir');

const renderHTML = () => {
    if(!mistorage.getItem('nombreUsuario')){
        loginHTML.style.display = 'block';
        chatHTML.style.display = 'none';
        botonSalir.style.display = 'none';
    }
    else{
        loginHTML.style.display = 'none';
        chatHTML.style.display = 'flex';
        botonSalir.style.display = 'block';
    }
}

renderHTML();

const iniciarSesion = () => {
    let nombreUsuario = document.getElementById('nombreUsuario');

    if(nombreUsuario.value.length === 0){
        document.getElementById('errorIngreso').style.display = "block";
        return false;
    }else{
        document.getElementById('errorIngreso').style.display = "none";
    }

    mistorage.setItem('nombreUsuario', nombreUsuario.value);
    // loginHTML.style.display = 'none';
    // chatHTML.style.display = 'flex';
    // botonSalir.style.display = 'block';
    nombreUsuario.value = '';
    renderHTML();
    return nombreUsuario;
}


const salir = () => {
    mistorage.removeItem('nombreUsuario');
    renderHTML();
    // loginHTML.style.display = 'block';
    // botonSalir.style.display = 'none';
    // chatHTML.style.display = 'none';
}

