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

        const proyectoExiste = await Proyecto.findById( proyecto );

        // * Revisa si la proyecto no existe
        if( !proyectoExiste ) {
            return res.status(404).jso({ msg: 'Proyecto no encontrado' });
        }

        // * Revisa si el proyecto actual pertenece al usuario autenticado
        if( proyectoExiste.creador.toString() !== req.usuario.id ) {
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

        const proyectoExiste = await Proyecto.findById( proyecto );

        // * Revisa si la proyecto no existe
        if( !proyectoExiste ) {
            return res.status(404).jso({ msg: 'Proyecto no encontrado' });
        }

        // * Revisa si el proyecto actual pertenece al usuario autenticado
        if( proyectoExiste.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({ msg: 'No Autorizado' });
        }

        // * Obtener las tareas por proyecto
        const tareas = await Tarea.find({ proyecto });
        res.json({ tareas });
    } catch (error) {
        console.log( error );
        res.status(500).send( 'Hubo un error' );
    }
}

// Todo: Actualizar una tarea
exports.actualizarTarea = async( req, res ) => {

    try {
        // * Extrae el proyecto y comprobar si exite
        const { proyecto, nombre, estado } = req.body;

        // * Si la tarea existe o no
        let tarea = await Tarea.findById( req.params.id );

        // * Revisa si la tarea no existe
        if( !tarea ) {
            return res.status(404).json({ msg: 'No existe esa tarea' });
        }

         //* Extraer el proyecto
        const proyectoExiste = await Proyecto.findById( proyecto );
        
        // * Revisa si el proyecto actual pertenece al usuario autenticado
        if( proyectoExiste.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({ msg: 'No Autorizado' });
        }

        // * Crear un objeto con la nueva información
        const nuevaTarea = {};

        if( nombre ) {
            nuevaTarea.nombre = nombre;
        }

        if( estado ) {
            nuevaTarea.estado = estado;
        }

        // * Guardar la tarea
        tarea = await Tarea.findByIdAndUpdate({ _id: req.params.id }, nuevaTarea, { new: true });
        res.json({ tarea });

    } catch (error) {
        console.log( error );
        res.status(500).send( 'Hubo un error' );
    }
}

// Todo: Eliminaos la tarea de un proyecto
exports.eliminarTarea = async ( req, res ) => {
    try {
        // * Extrae el proyecto y comprobar si exite
        const { proyecto } = req.body;

        // * Si la tarea existe o no
        let tarea = await Tarea.findById( req.params.id );

        // * Revisa si la tarea no existe
        if( !tarea ) {
            return res.status(404).json({ msg: 'No existe esa tarea' });
        }

        //* Extraer el proyecto
        const proyectoExiste = await Proyecto.findById( proyecto );
        
        // * Revisa si el proyecto actual pertenece al usuario autenticado
        if( proyectoExiste.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({ msg: 'No Autorizado' });
        }

        // * Eliminar
        await Tarea.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Tarea Eliminada' });

    } catch (error) {
        console.log( error );
        res.status(500).send( 'Hubo un error' );
    }
}