/**
 * Pruebas Unitarias para Endpoints de Administración
 */

testUtils.createTestButton("Test Admin: Listar Usuarios Registrados", async (btn) => {
    // Login rápido como administrador
    const loginRes = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: '12345' })
    });
    
    const { token } = await loginRes.json();

    const response = await fetch('/api/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const data = await response.json();
    testUtils.log(data);
    
    if (response.ok) {
        testUtils.setSuccess(btn);
    }
});
