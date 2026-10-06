/**
 * Project     : Bibliotech
 * Description : Controlador frontend para gestionar la carga, listado, lectura y borrado de documentos PDF.
 */

// Cargar la biblioteca del cliente al iniciar
document.addEventListener('DOMContentLoaded', loadBooks);

async function loadBooks() {
    try {
        const books = await apiService.request('/books/my-books', 'GET');
        renderBooksTable(books);
    } catch (error) {
        showModal('Error', 'No se pudieron cargar los documentos: ' + error.message);
    }
}

// Renderizar la tabla de libros con manipulación limpia de nodos DOM (Zero innerHTML)
function renderBooksTable(books) {
    const tbody = document.getElementById('booksTableBody');
    tbody.replaceChildren(); // Vaciar cuerpo de la tabla eficientemente

    books.forEach(b => {
        const row = document.createElement('tr');

        // Celda Título
        const tdTitle = document.createElement('td');
        const boldTitle = document.createElement('b');
        boldTitle.textContent = b.title;
        tdTitle.appendChild(boldTitle);
        
        // Celda Autor
        const tdAuthor = document.createElement('td');
        tdAuthor.textContent = b.author;

        // Celda Categoría
        const tdCategory = document.createElement('td');
        const spanCat = document.createElement('span');
        spanCat.className = 'w3-tag w3-round w3-black';
        spanCat.textContent = b.category;
        tdCategory.appendChild(spanCat);

        // Celda Páginas
        const tdPages = document.createElement('td');
        tdPages.textContent = b.pages;

        // Celda Lectura / Visor / Descargas
        const tdReading = document.createElement('td');
        
        // Botón para visualizar cómodamente en el modal integrado
        const btnView = document.createElement('button');
        btnView.className = 'w3-button w3-teal w3-tiny w3-round w3-margin-right';
        btnView.textContent = 'Visualizar';
        btnView.addEventListener('click', () => showPdfModal(b.title, b.file_path));
        tdReading.appendChild(btnView);

        // Enlace para descarga directa del archivo PDF
        const linkDownload = document.createElement('a');
        linkDownload.className = 'w3-button w3-dark-grey w3-tiny w3-round';
        linkDownload.textContent = 'Descargar';
        linkDownload.href = b.file_path;
        linkDownload.setAttribute('download', `${b.title}.pdf`);
        tdReading.appendChild(linkDownload);

        // Celda Acciones
        const tdActions = document.createElement('td');
        const btnDelete = document.createElement('button');
        btnDelete.className = 'w3-button w3-red w3-tiny w3-round';
        btnDelete.textContent = 'Borrar';
        btnDelete.addEventListener('click', () => deleteBook(b.id));
        tdActions.appendChild(btnDelete);

        // Ensamble
        row.append(tdTitle, tdAuthor, tdCategory, tdPages, tdReading, tdActions);
        tbody.appendChild(row);
    });
}

// Eliminar un libro
async function deleteBook(id) {
    if (!confirm('¿Estás seguro de eliminar este documento de tu biblioteca?')) return;
    try {
        await apiService.request(`/books/${id}`, 'DELETE');
        showModal('Eliminado', 'El documento ha sido borrado.');
        loadBooks();
    } catch (error) {
        showModal('Error', error.message);
    }
}

// Evento de submit del formulario de carga
const uploadForm = document.getElementById('uploadForm');
if (uploadForm) {
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', document.getElementById('title').value);
        formData.append('author', document.getElementById('author').value);
        formData.append('category', document.getElementById('category').value);
        formData.append('pages', document.getElementById('pages').value);
        formData.append('pdfFile', document.getElementById('pdfFile').files[0]);

        try {
            await apiService.request('/books/upload', 'POST', formData, true);
            showModal('Éxito', 'Documento guardado e indexado correctamente.');
            uploadForm.reset();
            loadBooks();
        } catch (error) {
            showModal('Error al cargar', error.message);
        }
    });
}
