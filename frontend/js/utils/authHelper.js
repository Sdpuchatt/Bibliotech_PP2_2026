/**
 * Project     : Bibliotech
 * Description : Utilidades auxiliares para gestionar el almacenamiento y cierre de sesión local de la sesión.
 */

const authHelper = {
    // Almacenamiento configurable (localStorage para persistencia o sessionStorage)
    storage: localStorage,

    saveSession(token, role) {
        this.storage.setItem('token', token);
        this.storage.setItem('role', role);
    },

    getToken() {
        return this.storage.getItem('token');
    },

    getRole() {
        return this.storage.getItem('role');
    },

    logout() {
        this.storage.clear();
        window.location.href = '/login';
    },

    // Buscar todos los botones de logout de forma global y vincular el evento
    initLogoutButtons() {
        const logoutBtns = document.querySelectorAll('.btn-logout');
        logoutBtns.forEach(btn => {
            btn.addEventListener('click', () => this.logout());
        });
    }
};

// Vinculación automática en la carga de la página
document.addEventListener('DOMContentLoaded', () => authHelper.initLogoutButtons());
