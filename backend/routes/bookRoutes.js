/**
 * Project     : Bibliotech
 * Description : Rutas de API para la gestión documental de libros PDF.
 */

const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const uploadMiddleware = require('../config/multerConfig');
const { verifyToken } = require('../middleware/authMiddleware');
const { validateBookUpload } = require('../middleware/validationMiddleware');

// Todas las rutas de libros requieren sesión activa
router.use(verifyToken);

// Cargar un nuevo documento PDF
router.post('/upload', uploadMiddleware, validateBookUpload, bookController.uploadBook);

// Obtener la biblioteca del cliente actual
router.get('/my-books', bookController.getMyBooks);

// Eliminar un documento por ID
router.delete('/:id', bookController.deleteBook);

module.exports = router;
