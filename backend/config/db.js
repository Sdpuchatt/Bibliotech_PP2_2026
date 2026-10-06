/**
 * Project     : Bibliotech
 * Description : Configuración de conexión a la base de datos MySQL usando pool de conexiones.
 */

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'bibliotech',
    password: process.env.DB_PASS || 'bibliotech',
    database: process.env.DB_NAME || 'bibliotech',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();
