// rutas para autenticar usuarios.js

const express = require("express");
const router = express.Router();
const { check } = require('express-validator');

// importamos el controller autenticarUsuario
const authController = require('../controllers/authController');

router.post('/',
    [
        check('email', 'Agregar un email valido').isEmail(),
        check('password', 'El password debe contener minimoo 6 caracteres').isLength({ min: 6 })
    ],
    authController.autenticarUsuario
)

module.exports = router;