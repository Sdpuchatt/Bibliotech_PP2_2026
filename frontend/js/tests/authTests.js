/**
 * Pruebas Unitarias para Endpoints de Autenticación
 */

// 1. Test Login Correcto (Pepe y 12345)
testUtils.createTestButton("Test Login Correcto (pepe y 12345)", async (btn) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'pepe', password: '12345' })
    });
    
    const data = await response.json();
    testUtils.log(data);

    if (response.ok && data.role === 'client') {
        testUtils.setSuccess(btn);
    }
});

// 2. Test Login - Password Incorrecto (pepe y clave errónea)
testUtils.createTestButton("Test Login - Password Incorrecto (pepe y 123)", async (btn) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'pepe', password: '123' })
    });
    
    const data = await response.json();
    testUtils.log(data);

    if (response.status === 401) {
        testUtils.setSuccess(btn);
    }
});

// 3. Test Registro - Evitar Duplicados (pepe ya existe)
testUtils.createTestButton("Test Registro - Evitar Duplicados (pepe)", async (btn) => {
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'pepe', password: 'Password123' })
    });
    
    const data = await response.json();
    testUtils.log(data);

    if (response.status === 409 && data.message === "El nombre de usuario ya está en uso.") {
        testUtils.setSuccess(btn);
    }
});

// 4. Test Registro - Contraseña Corta (Bad Request HTTP 400)
testUtils.createTestButton("Test Registro - Contraseña Corta (123)", async (btn) => {
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'test_usuario_corto', password: '123' })
    });
    
    const data = await response.json();
    testUtils.log(data);

    if (response.status === 400 && data.message === "La contraseña es demasiado corta") {
        testUtils.setSuccess(btn);
    }
});
