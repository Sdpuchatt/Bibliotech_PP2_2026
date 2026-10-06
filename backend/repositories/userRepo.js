/**
 * Project     : Bibliotech
 * Description : Repositorio para la gestión de acceso a datos del usuario mediante Stored Procedures.
 */

const db = require('../config/db');

class UserRepository 
{
    // Buscar usuario por username (devuelve rol asociado)
    async findByUsername(username) 
    {
        const [rows] = await db.execute('CALL sp_find_user_by_username(?)', [username]);
        return rows[0][0]; 
    }

    // Crear un nuevo usuario y asociar rol en una operación atómica
    async create(username, hashedPassword, role = 'client') 
    {
        const [rows] = await db.execute(
            'CALL sp_create_user(?, ?, ?)',
            [username, hashedPassword, role]
        );
        return rows[0][0].insertId;
    }
    
    // Obtener todos los usuarios con sus roles
    async findAll()
    { 
        const [rows] = await db.execute('CALL sp_find_all_users()'); 
        return rows[0]; 
    }

    // Eliminar un usuario
    async delete(id) 
    {
        await db.execute('CALL sp_delete_user(?)', [id]);
        return true;
    }
}

module.exports = new UserRepository();
