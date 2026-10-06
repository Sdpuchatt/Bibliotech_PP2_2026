/**
 * Project     : Bibliotech
 * Description : Utilidad para operaciones en el sistema de archivos (ej: borrar archivos PDF obsoletos).
 */

const fs = require('fs');
const path = require('path');

const fileHelper = {
    /**
     * Elimina un archivo físico del disco de forma segura.
     * @param {string} relativePath - Ruta relativa almacenada en la base de datos (ej. /uploads/archivo.pdf).
     */
    deleteFile(relativePath) {
        if (!relativePath) return false;

        // Construir la ruta absoluta usando el directorio de trabajo del proceso
        const absolutePath = path.join(process.cwd(), relativePath);

        try {
            if (fs.existsSync(absolutePath)) {
                fs.unlinkSync(absolutePath);
                console.log(`✅ Archivo eliminado del almacenamiento: ${relativePath}`);
                return true;
            }
            console.warn(`⚠️ Archivo no encontrado en disco: ${absolutePath}`);
        } catch (error) {
            console.error(`❌ Error al borrar el archivo físico: ${error.message}`);
        }
        return false;
    }
};

module.exports = fileHelper;
