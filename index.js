const express = require('express');
const app = express();
const conectarDB = require('./config/db.js');

const usuariosRoute = require('./routes/usuarios')

conectarDB();

// Habilitamos express.json
app.use(express.json({ extend: true }));

// port donde escucha el server
const PORT = process.env.PORT || 4000

// Crea ruta usuario api/usuarios
app.use('/api/usuarios', usuariosRoute);
app.use('/api/auth', require('./routes/auth'));// es el login....
app.use('/api/proyectos', require('./routes/proyectos'));

// ruta de Tarea
app.use('/api/tareas', require('./routes/tareas'));


app.listen(PORT, () => {
    console.log(`Server escuchando en PORT: ${4000}`);
});