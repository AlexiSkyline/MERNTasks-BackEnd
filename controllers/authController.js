const Usuarios = require( '../models/Usuarios' );
const bcryptjs = require( 'bcryptjs' );
const { validationResult } = require( 'express-validator' );
const jwt = require( 'jsonwebtoken' );

exports.autenticarUsuario = async ( req, res ) => {
    // TODO: Revisar si hay errores
    const errores = validationResult( req );
    if( !errores.isEmpty() ) {
        return res.status( 400 ).json({ errores: errores.array() });
    }

    // TODO: Extrae el email y password
    const { email, password } = req.body;

    try {
        let usuario = await Usuarios.findOne({ email });
        if( !usuario ) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        }

        let passCorrecto = await bcryptjs.compare( password, usuario.password );
        if( !passCorrecto ) {
            return res.status(400).json({ msg: 'Password Incorrecto' });
        }

        // * Si todo es correcto Crear y firmar el JWT
         const payload = {
            id: usuario.id
        }

        // * Firmar el JWT
        jwt.sign( payload, process.env.SECRETA, {
           expiresIn: 3600 //* 1 hora 
        }, ( error, token ) => {
            if( error ) throw error;

            // * Mensaje de confirmación
            res.json({ token: token });
        });
    } catch ( error ) {
        console.log( error )
    }
}