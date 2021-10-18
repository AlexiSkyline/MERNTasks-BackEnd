const express = require( 'express' );

// * Crear el Servidor
const app = express();

// * Puerto de la App
const PORT = process.env.PORT || 4000;

// TODO: Arranca la app
app.listen( PORT, () => {
    console.log( `El servidor esta funcionado en el puerto ${PORT}` );
});