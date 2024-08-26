const express = require('express');
const cors = require('cors');

const especialidadRoutes = require('./src/routes/especialidad.routes.js');
const inscriptosMovRoutes = require('./src/routes/inscriptos.routes.js');
const vacantesRoutes = require('./src/routes/vacantes.routes.js');
const listadoVacMovRoutes = require('./src/routes/listados.routes.js');
const asignacionMovRoutes = require('./src/routes/asignacion.routes.js');

const app = express();

//Configuracion de Middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//HABILITO CORS
app.use(cors());

//rutas
app.use('/api', especialidadRoutes);
app.use('/api', inscriptosMovRoutes);
app.use('/api', vacantesRoutes);
app.use('/api', listadoVacMovRoutes);
app.use('/api', asignacionMovRoutes);



module.exports = app;