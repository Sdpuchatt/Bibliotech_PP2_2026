/**
 * Project     : Bibliotech
 * Description : Repositorio para la gestión de acceso a datos de los libros mediante Stored Procedures.
 */

const db = require('../config/db');

class BookRepository 
{
    // Crear un nuevo registro de libro PDF
    async create(bookData) 
    {
        const { user_id, filename, title, author, category, pages, file_path } = bookData;
        const [rows] = await db.execute(
            'CALL sp_create_book(?, ?, ?, ?, ?, ?, ?)', 
            [user_id, filename, title, author, category, pages, file_path]
        );
        return rows[0][0].insertId;
    }

    // Obtener todos los libros de un cliente específico
    async findByUserId(userId) 
    {
        const [rows] = await db.execute('CALL sp_find_books_by_user(?)', [userId]);
        return rows[0];
    }

    // Buscar un libro específico por ID y validar propiedad
    async findById(id, userId) 
    {
        const [rows] = await db.execute('CALL sp_find_book_by_id(?, ?)', [id, userId]);
        return rows[0][0]; 
    }

    // Eliminar un libro validando la propiedad
    async delete(id, userId) 
    {
        await db.execute('CALL sp_delete_book(?, ?)', [id, userId]);
        return true;
    }
}

module.exports = new BookRepository();
