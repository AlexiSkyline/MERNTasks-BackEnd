const express = require( 'express' );
const conectarDB = require( './config/db' );

// * Crear el Servidor
const app = express();

// * Conectarnos A mongoDB
conectarDB();

// * Puerto de la App
const PORT = process.env.PORT || 4000;

// TODO: Arranca la app
app.listen( PORT, () => {
    console.log( `El servidor esta funcionado en el puerto ${PORT}` );
});