
const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Crea proyectos
// api/proyectos
router.post('/',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
)

// obtiene todos los proyectos
// api/proyectos
router.get('/',
    auth,
    proyectoController.getProyectos
)

// actualizar proyecto seria un update "PUT"

// tener en cuenta que segun nuestra regla de negocio
// delete, como tal, que elimina el registro
// o un update que seria cambiar algun valor de un atributo en nuestra db por "eliminado" bool 0/1
// si hacemos o declaramos un metod "DELETE"

// router.delete('/',
//     auth,
//     proyectoController.getProyectos
// )

module.exports = router;