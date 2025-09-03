const express = require('express');
const path = require('path');
require('dotenv').config();

//BD CONFIG
const{dbConnection}= require('./database/config');
dbConnection();
//App de Express
const app = express();
//configurar la lectura y parseo de body
app.use(express.json());

//Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./socket/socket');


//path publico
const publicPath = path.resolve(__dirname, 'public');
//le decimos que inicie en el archivo html index
app.use(express.static(publicPath));

//mis rutas
app.use('/api/login',require('./routes/auth'));
app.use('/api/usuarios',require('./routes/usuarios'));

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('servidor corriendo en el puerto', process.env.PORT);
});