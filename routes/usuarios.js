const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require("express-validator");


// aqui deja de ser arrow function ya que tenemos atado el metodo a nuestro controllers
router.post('/',
    [
        // vamos agregando que campos vamos a validad y que mensaje enviaremos de error y que reglas aplicaremos
        check('nombre', 'El camopo es obligatorio').not().isEmpty(),
        check('email', 'Agregar un email valido').isEmail(),
        check('password', 'El password debe contener minimoo 6 caracteres').isLength({ min: 6 }),
        // ver documentacion para mas info de validaciones
    ],
    usuarioController.crearUsuario
);

module.exports = router