
const express = require('express');
const app = express();
const server = require('http').Server(app)

const socketIo = require('socket.io')(server);
const puerto = 8022;

let mensajes = [{
    id: 1,
    texto: 'Bienvenido a socketChat',
    nomUsuario: 'SocketChat Bot'
}]

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.status(200).send('<h1>Hola mundo desde la ruta raiz</h1>');
})

socketIo.on('connection', (socket) => {
    console.log("Se conecto un usuario con la ip: "+socket.handshake.address);
    socket.emit('mensajes', mensajes);

    socket.on('enviarMensaje', (data) => {
        mensajes.push(data);
        socketIo.sockets.emit('mensajes', mensajes)
    })

})

server.listen(puerto, () => {
    console.log("Servidor funcionando en el puerto: "+puerto);
})
