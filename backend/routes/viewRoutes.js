/**
 * Project     : Bibliotech
 * Description : Rutas de navegación del Frontend para servir pantallas HTML.
 */

const express = require('express');
const router = express.Router();
const path = require('path');

// Redireccionar raíz al Login
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/html/login.html'));
});

// Pantalla de Login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/html/login.html'));
});

// Pantalla de Registro
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/html/register.html'));
});

// Panel de Clientes (Biblioteca)
router.get('/client-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/html/client-dashboard.html'));
});

// Panel de Administración (Usuarios)
router.get('/admin-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/html/admin-dashboard.html'));
});

// Captura de rutas inexistentes (Redireccionar al login)
router.use((req, res) => {
    // Si se está pidiendo un archivo físico con extensión (ej. CSS, JS), retornar un 404 limpio
    if (req.path.includes('.')) {
        return res.status(404).send('Recurso no encontrado');
    }

    // Rutas amigables incorrectas se reconducen al Login
    res.status(404).sendFile(path.join(__dirname, '../../frontend/html/login.html'));
});

module.exports = router;
