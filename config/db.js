const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' });

// creamos  una funcion como es un funcion la exporto apara usarla en otros files

const conectarDB = async () => {
    try {
        // connect recibe dos parametros, primero url de conexcion, un objeto de configuracion
        await mongoose.connect(process.env.DB_MONGO, {});
        console.log("Concectado a MongoDB");

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = conectarDB;