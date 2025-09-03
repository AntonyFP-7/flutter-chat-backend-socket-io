const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                //no se peudo crear el toekn
                reject('No se puedo henerar JWT');
            } else {
                //token
                resolve(token);
            }
        });
    });
}

const compobarJWT = (token = '') => {
    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        return [true, uid];
    } catch (error) {
        return [false, null]
    }
}

module.exports = {
    generarJWT,
    compobarJWT
}