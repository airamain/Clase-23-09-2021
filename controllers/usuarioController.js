const Usuario = require('../models/Usuarios');
const bcryptjs = require("bcryptjs");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


// vamos a insertar ahora que ya tenemos definido el modelo
exports.crearUsuario = async (req, res) => {

    // revisar si hay errores
    const errores = validationResult(req); // genera un []

    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });  // hacer prueba con postman
    }

    // extraer email y password
    const { email, password } = req.body;

    try {
        // revisar que sea unico el email

        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({ msg: "El usuario ya existe" })
        }

        // crea usuario, es muy facil como hacer esta tarea con mongoose. tenemos que importar nuestro modelo
        usuario = new Usuario(req.body);

        // hashaer password, primero generamos un salt, salt es un hash unico.
        const salt = await bcryptjs.genSalt(10); // mas vueltas al hasheo. luego reescribir esa parte del objeto UsuarioSchema
        usuario.password = await bcryptjs.hash(password, salt);

        // guarda el usuario
        await usuario.save()

        // Crear y  firmar el JWT
        // consiste en dos partes, primero crear JWT con su payload
        const payload = {
            usuario: {
                id: usuario.id
            }
        }

        // firmar nuestro token con su metodo sing() y le pasamos el payload de primer parametor y luego su palabra secreta.
        // es importar que esa secreta sea idem para firmar como para autenticar al usuario.
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error; // si hay marca el error
            res.json({ token });
        })

        // mensaje de confirmacion


    } catch (error) {
        console.log(error);
        res.status(400).send("Error")
    }
}