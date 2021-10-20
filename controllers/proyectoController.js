const Proyecto = require( '../models/Proyecto' );
const { validationResult } = require( 'express-validator' );


exports.crearProyecto = async ( req, res ) => {

    // TODO: Revisar si hay errores
    const errores = validationResult( req );
    if( !errores.isEmpty() ) {
        return res.status( 400 ).json({ errores: errores.array() });
    }

    try {
        // Todo: Crea un nuevo proyecto
        const proyecto = new Proyecto( req.body );

        // * Guardar el creador via JWT
        proyecto.creador = req.usuario.id;

        // * Guardamos el proyecto
        proyecto.save();
        res.json( proyecto );

    } catch ( error ) {
        console.log( error );
        res.status(500).send( 'Hubo un error' );
    }
}

// Todo: obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async ( req, res ) => {
    try {
        const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({ creado: -1 });
        res.json({ proyectos });
    } catch ( error ) {
        console.log( error );
        res.status(500).send( 'Hubo un error' );
    }
}

// Todo: Actualizar un proyecto
exports.actualizarProyecto = async ( req, res ) => {
    
     // TODO: Revisar si hay errores
     const errores = validationResult( req );
     if( !errores.isEmpty() ) {
         return res.status( 400 ).json({ errores: errores.array() });
     }

    //  * Extrae la información del proyecto
    const { nombre } = req.body;
    const nuevoProyecto = {};

    if( nombre ) {
        nuevoProyecto.nombre = nombre;
    }

    try {
        // * Resivar el ID
        let proyecto = await Proyecto.findById( req.params.id );

        // * si el proyecto existe o no
        if( !proyecto ) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        // * Varifica el creador del proyecto
        if( proyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({ msg: 'No Autorizado' });
        }

        // * Actualiza
        proyecto = await Proyecto.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevoProyecto }, { new: true } );
        res.json({ proyecto });

    } catch ( error ) {
        console.log( error );
        res.status(500).send( 'Error en el servidor' );
    }

}

// Todo: Elimina un proyecto por un id
exports.eliminarProyecto = async ( req, res ) => {

    // TODO: Revisar si hay errores
    const errores = validationResult( req );
    if( !errores.isEmpty() ) {
        return res.status( 400 ).json({ errores: errores.array() });
    }
    
    try {
        // * Resivar el ID
        let proyecto = await Proyecto.findById( req.params.id );

        // * si el proyecto existe o no
        if( !proyecto ) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        // * Varifica el creador del proyecto
        if( proyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({ msg: 'No Autorizado' });
        }
        
        //* Eliminar el proyecto
        await Proyecto.findByIdAndRemove({ _id: req.params.id });
        res.json({ msg: 'Proyecto eliminado' });

    } catch ( error ) {
        console.log( error );
        res.status(500).send( 'Error en el servidor' );
    }
}