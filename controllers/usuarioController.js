const Usuarios = require("../models/Usuarios");


exports.crearUsuario = async ( req, res ) => {
    
    // TODO: Extrae email y password
    const { email, password } = req.body;

    try {
        let usuario = await Usuarios.findOne({ email });

        if( usuario ) {
            return res.status( 400 ).json({ msg: 'El usuario ya exite' });
        }

        // * Creamos el nuevo usuari
        usuario = new Usuarios( req.body );

        // * Guardamos usuario
        await usuario.save();

        // * Mensje de confirmación
        res.json({ msg:'Usuario creado correctamente' });
    } catch ( error ) {
        console.log( error );
        res.status( 400 ).json({ msg: 'Hubo un error' });
    }
}