/**
 * Project     : Bibliotech
 * Description : Punto de entrada principal para el servidor Backend Express.
 */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Rutas de API y Vistas
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const adminRoutes = require('./routes/adminRoutes');
const viewRoutes = require('./routes/viewRoutes');
const testsRoutes = require('./routes/testsRoutes');

// Filtro de errores global
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

// --- Middlewares de Red y Parser ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Directorio de Carga Física de PDFs ---
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
app.use('/uploads', express.static(uploadDir));

// --- Directorio Estático del Frontend ---
app.use(express.static(path.join(__dirname, '../frontend')));

// --- Registro de Enrutadores de la API ---
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/admin', adminRoutes);

// --- Carga Condicional del Enrutador de Navegación ---
if (process.env.NODE_ENV === 'testing') {
    app.use('/', testsRoutes);
} else {
    app.use('/', viewRoutes);
}

// --- Middleware Centralizado de Filtro de Errores ---
app.use(errorMiddleware);

// --- Inicialización del Servidor ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`==========================================`);
    console.log(`🚀 Bibliotech listo en:`);
    console.log(`   Punto de entrada: http://localhost:${PORT}`);
    console.log(`==========================================`);
});
