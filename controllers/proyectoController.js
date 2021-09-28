
const Proyecto = require('../models/Proyectos');
const { validationResult } = require('express-validator');

// post
exports.crearProyecto = async (req, res) => {

    // revisamos si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        // crear un nuevo proyectoController
        const proyecto = new Proyecto(req.body);

        // guardar el creadro via JWT
        proyecto.creador = req.usuario.id;

        // guardar proyecto
        proyecto.save();
        res.json(proyecto)
    }
    catch {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

// obtener todos los proyectos del usuario actual
exports.getProyectos = async (req, res) => {
    // vemos que el usuario actual esta autenticado
    console.log("adsfafd", req.usuario);

    // revisamos si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        // crear un nuevo proyecto
        const proyecto = await Proyecto.find({ creador: req.usuario.id }).sort({creado: -1});//dentro de la llava va la condicion de busqueda

        // buscar proyectos
        res.json(proyecto)
    }
    catch {
        console.log(error);
        res.status(500).send('Hubo un error')
    }

}
