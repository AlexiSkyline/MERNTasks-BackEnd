const express = require( 'express' );
const router = express.Router();
const proyectoController = require( '../controllers/proyectoController' );

// * Crea un Proyecto
// * api/auth
router.post( '/' , 
    proyectoController.crearProyecto
);

module.exports = router;