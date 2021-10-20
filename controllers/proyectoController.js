const Proyecto = require( '../models/Proyecto' );
const { check } = require('express-validator');

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