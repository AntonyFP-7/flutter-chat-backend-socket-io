/* path: api/mensajes */

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMensajes } = require('../controllers/mensajes');

const route = Router();
route.get('/:de',validarJWT,getMensajes);
module.exports = route;