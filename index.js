const express = require( 'express' );
const conectarDB = require( './config/db' );
const cors = require( 'cors' );

// * Crear el Servidor
const app = express();

// * Conectarnos A mongoDB
conectarDB();

// * Habilitar cors
app.use( cors() );

// * Habilitar express.json
app.use( express.json({ extended: true }) );

// * Puerto de la App
const PORT = process.env.PORT || 4000;

// * Importar Rutas
app.use( '/api/usuarios', require( './routes/usuarios' ) );
app.use( '/api/auth', require( './routes/auth' ) );
app.use( '/api/proyectos', require( './routes/proyectos' ) );
app.use( '/api/tareas', require( './routes/tareas' ) );

// TODO: Arranca la app
app.listen( PORT, () => {
    console.log( `El servidor esta funcionado en el puerto ${PORT}` );
});