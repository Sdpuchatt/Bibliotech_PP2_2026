/**
 * Project     : Bibliotech
 * Description : Middleware para la verificación de JSON Web Token (JWT) y validación de roles.
 */

const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'tu_clave_secreta_super_segura';

const authMiddleware = {
    SECRET_KEY,

    // Verifica que el usuario se encuentre debidamente autenticado
    verifyToken: (req, res, next) => {
        const authHeader = req.headers['authorization'];
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).json({ message: "Formato de token incorrecto o inexistente." });
        }

        const pureToken = authHeader.split(" ")[1];

        jwt.verify(pureToken, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Token inválido o expirado." });
            }
            
            // Adjuntar información del usuario decodificada al objeto request
            req.userId = decoded.id;
            req.userRole = decoded.role;
            next();
        });
    },

    // Verifica si el rol del usuario cuenta con privilegios de Administrador
    isAdmin: (req, res, next) => {
        const roles = req.userRole;

        const hasAdminRole = Array.isArray(roles) 
            ? roles.includes('admin') 
            : roles === 'admin';

        if (!hasAdminRole) {
            return res.status(403).json({ 
                message: "Acceso denegado: Se requieren privilegios de administrador." 
            });
        }
        
        next();
    }    
};

module.exports = authMiddleware;
