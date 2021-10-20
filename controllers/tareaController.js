const Tarea = require( '../models/Tarea' );
const Proyecto = require( '../models/Proyecto' );
const { validationResult } = require('express-validator');

//  Todo Crea un nueva tarea 
exports.crearTarea = async ( req, res ) => {

    // TODO: Revisar si hay errores
    const errores = validationResult( req );
    if( !errores.isEmpty() ) {
        return res.status( 400 ).json({ errores: errores.array() });
    }

    try {
        // * Extrae el proyecto y comprobar si exite
        const { proyecto } = req.body;

        const isProyecto = await Proyecto.findById( proyecto );
        if( !isProyecto ) {
            return res.status(404).jso({ msg: 'Proyecto no encontrado' });
        }

        // * Revisa si el proyecto actual pertenece al usuario autenticado
        if( isProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({ msg: 'No Autorizado' });
        }

        // * Creamos la tarea
        const tarea = new Tarea( req.body );
        await tarea.save();
        res.json({ tarea });

    } catch (error) {
        console.log( error );
        res.status(500).send( 'Hubo un error' );
    }
}

//  Todo: Obtiene las tareas del proyecto 
exports.obtenerTareas = async( req, res ) => {
    
    try {
        // * Extrae el proyecto y comprobar si exite
        const { proyecto } = req.body;

        const isProyecto = await Proyecto.findById( proyecto );
        if( !isProyecto ) {
            return res.status(404).jso({ msg: 'Proyecto no encontrado' });
        }

        // * Revisa si el proyecto actual pertenece al usuario autenticado
        if( isProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({ msg: 'No Autorizado' });
        }

        // * Obtener las tareas por proyecto
        const tareas = await Tarea.find({ proyecto });
        res.json({ tareas });
    } catch (error) {
        res.status(500).send( 'Hubo un error' );
    }
}