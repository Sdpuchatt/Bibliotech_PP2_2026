/**
 * Project     : Bibliotech
 * Description : Cliente de API centralizado para gestionar peticiones HTTP fetch y cabeceras JWT de sesión.
 */

const API_URL = "/api";

const apiService = {
    async request(endpoint, method = 'GET', data = null, isFormData = false) {
        const token = authHelper.getToken();
        
        const headers = {};
        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const config = { method, headers };
        if (data) {
            config.body = isFormData ? data : JSON.stringify(data);
        }

        const response = await fetch(`${API_URL}${endpoint}`, config);
        const result = await response.json();

        // Cierre automático de sesión en caso de expiración o token inválido
        if (response.status === 401) {
            authHelper.logout();
        }

        if (!response.ok) {
            throw new Error(result.message || 'Error en la petición');
        }
        return result;
    }
};
