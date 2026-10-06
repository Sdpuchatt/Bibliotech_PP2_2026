/**
 * Pruebas Unitarias para Endpoints de Libros / Documentos PDF
 */

async function okLogin() {
    // Autenticarse como cliente pepe para obtener token
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'pepe', password: '12345' })
    });
    const data = await response.json();
    localStorage.setItem('test_token', data.token);
}

// 1. Listar Libros
testUtils.createTestButton("Test Listar Mis Libros", async (btn) => {
    await okLogin();
    const token = localStorage.getItem('test_token');
    
    const response = await fetch('/api/books/my-books', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const data = await response.json();
    testUtils.log(data);
    if (response.ok) {
        testUtils.setSuccess(btn);
    }
});

// 2. Subir Libro Simulado
testUtils.createTestButton("Test Subir Libro PDF (Simulado)", async (btn) => {
    await okLogin();
    const token = localStorage.getItem('test_token');
    
    const formData = new FormData();
    formData.append('title', 'Don Quijote de la Mancha');
    formData.append('author', 'Miguel de Cervantes');
    formData.append('category', 'Novela');
    formData.append('pages', '862');

    // Simulación de archivo PDF (Blob binario simulado)
    const blob = new Blob(["%PDF-1.4 Simulated PDF Document Content"], { type: 'application/pdf' });
    formData.append('pdfFile', blob, 'don_quijote.pdf');

    const response = await fetch('/api/books/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
    });

    const data = await response.json();
    testUtils.log(data);
    if (response.ok) {
        testUtils.setSuccess(btn);
    }
});
