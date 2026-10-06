/**
 * Project     : Bibliotech
 * Description : Middleware para el manejo y filtrado centralizado de errores.
 */

const errorMiddleware = (err, req, res, next) => {
    console.error(`[Error Handler] Detalle:`, err.stack || err);

    // 1. Errores específicos del driver de MySQL
    if (err.code) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ 
                message: "El nombre de usuario ya está en uso." 
            });
        }
        if (err.code === 'ECONNREFUSED') {
            return res.status(500).json({ 
                message: "Servicio de base de datos no disponible temporalmente." 
            });
        }
    }

    // 2. Errores de Multer (ej. tamaño del PDF mayor a los límites)
    if (err.name === 'MulterError') {
        return res.status(400).json({ 
            message: `Error al subir el archivo: ${err.message}` 
        });
    }

    // 3. Errores de filtro manual de archivos de Multer
    if (err.message && err.message.includes('Tipo de archivo inválido')) {
        return res.status(400).json({
            message: err.message
        });
    }

    // 4. Errores genéricos HTTP o del sistema
    const statusCode = err.statusCode || 500;
    const message = err.message || "Error interno en el servidor.";

    res.status(statusCode).json({
        message,
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = errorMiddleware;
