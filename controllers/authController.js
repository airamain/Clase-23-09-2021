const Usuario = require('../models/Usuarios');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
    // revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    // extraer email y password
    const { email, password } = req.body;
    

    try {
        // revisar que sea usuario exista
        let usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({ msg: 'El usuario no existe' })
        }

        // revisar password
        const pasCorrecto = await bcryptjs.compare(password, usuario.password);
        if (!pasCorrecto) {
            return res.status(400).json({ msg: 'password incorrecto' })
        }

        //  si el password es correcto crear el TOKEN 
        const payload = {
            usuario: {
                id: usuario.id
            }
        }

        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;

            res.json({ token });
        })

    } catch (error) {
        console.log(error)
    }
}
