/**
 * Project     : Bibliotech
 * Description : Rutas de API para la administración de usuarios y limpieza recursiva.
 */

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Validar token y verificar permisos de Administrador en toda la sección
router.use(verifyToken, isAdmin);

// Listar todos los usuarios registrados
router.get('/users', adminController.getAllUsers);

// Eliminar un usuario del sistema por su ID
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;
