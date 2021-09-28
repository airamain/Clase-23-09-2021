
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
        const proyecto = await Proyecto.find({ creador: req.usuario.id }).sort({ creado: -1 });//dentro de la llava va la condicion de busqueda

        // buscar proyectos
        res.json(proyecto)
    }
    catch {
        console.log(error);
        res.status(500).send('Hubo un error')
    }

}

// update o actualizar - PUT -
exports.actualizarProyecto = async (req, res) => {
    // revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ msg: errores.array() });
    }

    // extraer la informacion del proyecto
    const { nombre } = req.body;
    let proyectoActualizado = {};

    if (nombre) {
        proyectoActualizado = nombre;
    }

    try {
        // revisar el id 
        let proyecto = await Proyecto.findById({ _id: req.params.id });
        console.log("proyecto findById: ", proyecto)

        // si el proyecto existe o no
        if (!proyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        // vaerifar el creado del proyecto
        // como el payload del jwt tenemos la info

        if (proyecto.creador.toString() != req.usuario.id) {
            return res.status(401).json({ msg: "No Autorizado" });
        }

        // ahora actualizamos
        console.log("req.params.id", req.params.id)
        proyecto = await Proyecto.findByIdAndUpdate({ _id: req.params.id }, { set: proyectoActualizado }, { new: true });

        res.json({ proyecto });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el server');
    }

}

