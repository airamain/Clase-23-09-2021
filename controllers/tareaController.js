const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyectos');
const { validationResult } = require('express-validator');

// craar una tarea
exports.crearTarea = async (req, res) => {

    // revisamos si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto } = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);
        console.log(existeProyecto)
        if (!existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado        
        // como el payload del jwt tenemos la info
        if (existeProyecto.creador.toString() != req.usuario.id) {
            return res.status(401).json({ msg: "No Autorizado" });
        }

        // Creamos la Tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({ tarea });


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

// Obtener tarea por proyecto
exports.obtenerTareas = async (req, res) => {
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto } = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);
        console.log(existeProyecto)
        if (!existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado        
        // como el payload del jwt tenemos la info
        if (existeProyecto.creador.toString() != req.usuario.id) {
            return res.status(401).json({ msg: "No Autorizado" });
        }

        // Obtener Tarea por el proyecto
        const tarea = await Tarea.find({ proyecto });
        res.json({ tarea });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}
