const Usuarios = require("../models/Usuarios");


exports.crearUsuario = async ( req, res ) => {
    
    try {
        let usuario;

        // * Creamos el nuevo usuari
        usuario = new Usuarios( res.body );

        // * Guardamos usuario
        await usuario.save();

        // * Mensje de confirmación
        res.send( 'Usuario creado correctamente' );

    } catch (error) {
        console.log( error );
        res.status( 400 ).send( 'Hubo un error' );
    }
}