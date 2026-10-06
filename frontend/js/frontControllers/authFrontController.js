/**
 * Project     : Bibliotech
 * Description : Controlador frontend para gestionar el inicio de sesión y registro de usuarios.
 */

// Formulario de Inicio de Sesión
const loginForm = document.getElementById('loginForm');
if (loginForm) 
{
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try 
        {
            const data = await apiService.request('/auth/login', 'POST', { username, password });
            
            // Persistir sesión localmente
            authHelper.saveSession(data.token, data.role);

            // Redirigir según el rol recibido
            if (data.role === 'admin') 
            {
                window.location.href = '/admin-dashboard';
            }
            else
            {
                window.location.href = '/client-dashboard';
            }
        }
        catch (error)
        {
            showModal('Error de Acceso', error.message);
        }
    });
}

// Formulario de Registro
const registerForm = document.getElementById('registerForm');
if (registerForm) 
{
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try 
        {
            await apiService.request('/auth/register', 'POST', { username, password });
            showModal('¡Éxito!', 'Usuario creado. Ahora puedes iniciar sesión.');
            setTimeout(() => { window.location.href = '/login'; }, 2000);
        }
        catch (error)
        {
            showModal('Error de Registro', error.message);
        }
    });
}
