const { compobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado } = require('../controllers/socket');
// Mensajes de Sockets
//client es un dispositivo que se conecta 
io.on('connection', client => {
    //client.on('event', data => { /* … */ });
    console.log("Cliente conectado");
    const [valido, uid] = compobarJWT(client.handshake.headers['x-token']);
    if (!valido) { return client.disconnect(); }
    //cliente autenticado
    usuarioConectado(uid);
    client.on('disconnect', () => {
        console.log("Cliente desconectado");
        usuarioDesconectado(uid);
    });


});
