const { response } = require("express");
const Usuario = require('../models/User');
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");

const crearUsario = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        /*         const existEmail = await Usuario.findOne({ email });
                if (existEmail) {
                    res.status(400).json({
                        ok: false,
                        msg: 'El correo ya esta registrado'
                    });
                } */
        const usuario = new Usuario(req.body);
        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(`${password}`, salt);
        await usuario.save();
        //Genrar mi JWT
        const token = await generarJWT(usuario.id);
        res.json({
            ok: true,
            msg: usuario,
            token: token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error 500'
        });
    }

}
const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas'
            });
        }
        //validar el password
        const validPassword = bcrypt.compareSync(`${password}`, usuarioDB.password);
        if (!validPassword) {
            res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas'
            });
        }
        //genrar el JWT
        const token = await generarJWT(usuarioDB.id);
        res.json({
            ok: true,
            msg: usuarioDB,
            token: token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error 500'
        });
    }
}
const renewToken = async (req, res = response) => {
    const uid = req.uid;
    const usuarioDB = await Usuario.findById(uid);
    //genrar el JWT
    const token = await generarJWT(usuarioDB.id);
    res.json({
        ok: true,
        msg: usuarioDB,
        token: token
    });
}
module.exports = { crearUsario, login, renewToken };