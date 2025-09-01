const { io } = require('../index');

// Mensajes de Sockets
//client es un dispositivo que se conecta 
io.on('connection', client => {
    //client.on('event', data => { /* … */ });
    console.log("Cliente conectado");

    client.on('disconnect', () => {
        console.log("Cliente desconectado");
    });


});
