const Usuarios = require( '../models/Usuarios' );
const bcryptjs = require( 'bcryptjs' );
const { validationResult } = require( 'express-validator' );
const jwt = require( 'jsonwebtoken' );

exports.crearUsuario = async ( req, res ) => {
    
    // TODO: Revisar si hay errores
    const errores = validationResult( req );
    if( !errores.isEmpty() ) {
        return res.status( 400 ).json({ errores: errores.array() });
    }

    // TODO: Extrae email y password
    const { email, password } = req.body;

    try {
        let usuario = await Usuarios.findOne({ email });

        if( usuario ) {
            return res.status( 400 ).json({ msg: 'El usuario ya exite' });
        }

        // * Creamos el nuevo usuario
        usuario = new Usuarios( req.body );

        // * Hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash( password, salt );

        // * Guardamos usuario
        await usuario.save();

        // TODO: Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        // * Firmar el JWT
        jwt.sign( payload, process.env.SECRETA, {
           expiresIn: 3600 //* 1 hora 
        }, ( error, token ) => {
            if( error ) throw error;

            // * Mensaje de confirmación
            res.json({ token: token });
        });

    } catch ( error ) {
        console.log( error );
        res.status( 400 ).json({ msg: 'Hubo un error' });
    }
}