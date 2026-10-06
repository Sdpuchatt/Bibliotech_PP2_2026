/**
 * Project     : Bibliotech
 * Description : Controlador frontend para la visualización y administración de usuarios del sistema.
 */

// Cargar usuarios al iniciar
document.addEventListener('DOMContentLoaded', loadUsers);

async function loadUsers() {
    try {
        const users = await apiService.request('/admin/users', 'GET');
        renderUsersTable(users);
    } catch (error) {
        showModal('Acceso denegado', error.message);
        window.location.href = '/login';
    }
}

// Renderización segura de usuarios (Zero innerHTML)
function renderUsersTable(users) {
    const tbody = document.getElementById('usersTableBody');
    tbody.replaceChildren();

    users.forEach(u => {
        const row = document.createElement('tr');

        // Celda ID
        const tdId = document.createElement('td');
        tdId.textContent = u.id;

        // Celda Username
        const tdUser = document.createElement('td');
        const boldUser = document.createElement('b');
        boldUser.textContent = u.username;
        tdUser.appendChild(boldUser);

        // Celda Rol (estilo W3.CSS)
        const tdRole = document.createElement('td');
        const spanRole = document.createElement('span');
        spanRole.className = u.role === 'admin' ? "w3-tag w3-teal" : "w3-tag w3-blue";
        spanRole.textContent = u.role;
        tdRole.appendChild(spanRole);

        // Celda Fecha de Registro
        const tdDate = document.createElement('td');
        tdDate.textContent = new Date(u.created_at).toLocaleDateString();

        // Celda Acciones
        const tdActions = document.createElement('td');
        const btnDelete = document.createElement('button');
        btnDelete.className = "w3-button w3-red w3-tiny";
        btnDelete.textContent = "Eliminar usuario y sus PDFs";
        btnDelete.addEventListener('click', () => deleteUser(u.id));
        tdActions.appendChild(btnDelete);

        // Ensamble
        row.append(tdId, tdUser, tdRole, tdDate, tdActions);
        tbody.appendChild(row);
    });
}

// Eliminar un cliente de forma recursiva
async function deleteUser(id) {
    if (!confirm('¿Estás seguro de eliminar a este usuario? Se borrarán todos sus PDFs asociados permanentemente.')) {
        return;
    }

    try {
        await apiService.request(`/admin/users/${id}`, 'DELETE');
        showModal('Éxito', 'Usuario y archivos eliminados con éxito');
        loadUsers(); 
    } catch (error) {
        showModal('Error al eliminar usuario', error.message);
    }
}
