const { compobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');
// Mensajes de Sockets
//client es un dispositivo que se conecta 
io.on('connection', client => {
    //client.on('event', data => { /* … */ });
    console.log("Cliente conectado");
    const [valido, uid] = compobarJWT(client.handshake.headers['x-token']);
    if (!valido) { return client.disconnect(); }
    //cliente autenticado
    usuarioConectado(uid);

    //Ingresar al usuario a una sala espesifica
    //sala global => todos los dispsotivos conectados
    // client.id sala unica
    //vleamos sala 
    client.join(uid);
    //escuhar del cliente elmenesaje personal
    client.on('mensaje-personal', async (payload) => {
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
    });

    client.on('disconnect', () => {
        console.log("Cliente desconectado");
        usuarioDesconectado(uid);
    });


});
