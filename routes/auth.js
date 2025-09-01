/* 
path: api/login
 */
const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const Usuario = require('../models/User');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new', [
    check('nombre', 'El nombres es requerido').notEmpty(),
    check('email').trim().notEmpty().withMessage('El correo electronico es requerido').isEmail().withMessage('Correo lectronico invalido')
        .custom(async value => {
            const user = await Usuario.findOne({ email: value });
            if (user) {
                throw new Error('E-mail already in use');
            }
        }),
    check('password', 'La contraseña es requerida').notEmpty().isLength({ min: 6 }).withMessage('Contraseña mayot a 5 caracteres'),
    validarCampos
], crearUsario);

router.post('/', [
    check('email').trim().notEmpty().withMessage('El correo electronico es requerido'),
    check('password', 'La contraseña es requerida').notEmpty().isLength({ min: 6 }).withMessage('Contraseña mayot a 5 caracteres'),
    validarCampos
], login);

router.get('/renew', validarJWT, renewToken);
module.exports = router;