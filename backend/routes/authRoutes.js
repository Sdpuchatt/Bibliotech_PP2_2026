/**
 * Project     : Bibliotech
 * Description : Rutas de API para la autenticación de usuarios.
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validationMiddleware');

// Ruta para el registro con validación intermedia
router.post('/register', validateRegister, authController.register);

// Ruta para el login con validación intermedia
router.post('/login', validateLogin, authController.login);

module.exports = router;
