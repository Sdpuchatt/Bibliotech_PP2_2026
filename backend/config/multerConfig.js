/**
 * Project     : Bibliotech
 * Description : Configuración del middleware Multer para carga exclusiva de documentos PDF.
 */

const multer = require('multer');

// Configuración de almacenamiento en disco
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta física de almacenamiento
    },
    filename: (req, file, cb) => {
        // Formato único: timestamp actual + nombre de archivo original
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Filtro de validación para tipos de archivo permitidos
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['application/pdf'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de archivo inválido. Solo se admiten documentos PDF.'), false);
    }
};

// Configurar límite de tamaño a 15 MB
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 15 * 1024 * 1024 // 15 Megabytes
    }
});

// El campo en el FormData debe llamarse 'pdfFile'
module.exports = upload.single('pdfFile');
