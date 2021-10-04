const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');


// crear una tarea
// api/Tareas
router.post('/',
    auth,
    [
        check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
);

// Obtener las tarea / as  por proyecto
router.get('/',
    auth,
    [
        check('proyecto', 'El ID de proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.obtenerTareas
)
module.exports = router;