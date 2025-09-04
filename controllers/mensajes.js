const { response } = require("express");
const Mensajes = require('../models/mensaje');

const getMensajes = async (req, res = response) => {
    try {
        const miId = req.uid;
        const mensajesDe = req.params.de;

        const mensajes = await Mensajes.find({
            $or: [{ de: miId, para: mensajesDe }, { de: mensajesDe, para: miId }]
        }).sort({ createdAt: 'desc' })
            .limit(30);
        res.json({
            ok: true,
            mensajes
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener mensajes'
        });
    }
}
module.exports = {
    getMensajes
}