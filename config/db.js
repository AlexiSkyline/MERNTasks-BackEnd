const mongoose = require( 'mongoose' );
require( 'dotenv' ).config({ path: 'variables.env' });

const conectarDB = async () => {
    mongoose.connect( process.env.DB_MONGO, async ( error ) => {
        if( error ){
            console.log(error);
            process.exit(1); // * Detener la app
        };
        console.log( 'DB Conectada' );
    });
}

module.exports = conectarDB;