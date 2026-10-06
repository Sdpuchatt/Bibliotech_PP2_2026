/**
 * Project     : Bibliotech
 * Description : Middleware para la validación modularizada de datos de entrada.
 */

const fileHelper = require('../utils/fileHelper');

const validationMiddleware = {
    // Validar registro de usuarios
    validateRegister: (req, res, next) => {
        const { username, password } = req.body;

        if (!username || username.trim() === '') {
            return res.status(400).json({ message: "Usuario y contraseña son requeridos." });
        }

        if (!password || password.trim().length < 6) {
            return res.status(400).json({ message: "La contraseña es demasiado corta" });
        }

        next();
    },

    // Validar login de usuarios
    validateLogin: (req, res, next) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Credenciales incompletas." });
        }

        next();
    },

    // Validar carga de libros/documentos PDF
    validateBookUpload: (req, res, next) => {
        // Validar si Multer subió el archivo
        if (!req.file) {
            return res.status(400).json({ message: "No se subió ningún archivo o el formato es inválido." });
        }

        const { title, author, category, pages } = req.body;

        // Validar campos de texto obligatorios
        if (!title || !title.trim() || !author || !author.trim() || !category || !category.trim()) {
            fileHelper.deleteFile(`/uploads/${req.file.filename}`);
            return res.status(400).json({ message: "El título, autor y categoría son obligatorios." });
        }

        // Validar número de páginas
        const parsedPages = parseInt(pages);
        if (isNaN(parsedPages) || parsedPages <= 0) {
            fileHelper.deleteFile(`/uploads/${req.file.filename}`);
            return res.status(400).json({ message: "La cantidad de páginas debe ser un número mayor a cero." });
        }

        next();
    }
};

module.exports = validationMiddleware;
