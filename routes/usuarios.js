/* 
path: api/usuarios
 */
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {getUsuarios} = require('../controllers/usuarios');

const routers = Router();

routers.get('/', validarJWT, getUsuarios);
module.exports = routers;