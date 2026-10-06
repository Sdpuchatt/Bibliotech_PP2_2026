# 📚 Bibliotech

**Bibliotech** es una plataforma web para la gestión documental de libros y archivos en formato PDF (.pdf). Diseñada bajo una arquitectura en **N capas**, aplicando el **patrón Repository**, uso estricto de **Stored Procedures** en base de datos y un frontend seguro con manipulación nativa del DOM (**Zero innerHTML**).

Este proyecto surge de la evolución y transformación del sistema *Sample Vault*, adaptando la gestión multimedia hacia un repositorio documental de lectura y descarga digital.

---

## 🎯 Hitos del Proyecto

1. **Arquitectura en N Capas**: Separación estricta de responsabilidades:
   - **Base de Datos**: Stored Procedures para transacciones y principio de menor privilegio.
   - **Repositorios**: Abstracción y acceso a datos mediante el patrón *Repository*.
   - **Controladores**: Lógica de negocio pura.
   - **Middlewares**: Autenticación, validación modular y control de errores centralizado.
   - **Rutas**: Enrutamiento declarativo para la API y navegación web.
   - **Frontend**: Separación en servicios, utilidades, controladores frontend y componentes UI.
2. **Modularización de Validaciones y Filtro de Errores**:
   - `validationMiddleware.js`: Valida datos de entrada (registro, login, campos obligatorios del PDF y formato) desacoplando la lógica de los controladores.
   - `errorMiddleware.js`: Filtro global que captura y normaliza códigos de error de MySQL (duplicados `ER_DUP_ENTRY`, conexión rechazada), excepciones de Multer y errores del servidor en formato JSON unificado.
3. **Gestión Documental PDF**:
   - Migración completa de archivos de audio a documentos PDF (`application/pdf`).
   - Configuración de Multer con filtros de tipo MIME y límites de tamaño.
   - Atributos específicos del documento: Título, Autor, Categoría/Género, Cantidad de páginas y Archivo binario.
4. **Lectura Integrada y Descarga Directa**:
   - **Lectura en el sitio**: Visor modal interactivo mediante `iframe` integrado en la misma interfaz, permitiendo leer el contenido sin abandonar la plataforma.
   - **Descarga**: Enlace de descarga directa para almacenar el archivo PDF localmente.
5. **Dos Roles de Usuario**:
   - **Cliente (`client`)**: Gestiona su propia biblioteca privada (subir, leer online, descargar y eliminar sus documentos).
   - **Administrador (`admin`)**: Panel de control global para visualizar usuarios registrados y eliminarlos junto a todos sus documentos físicos asociados del disco.

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js & Express**: Servidor HTTP modular y enrutamiento REST.
- **MySQL / MariaDB (`mysql2`)**: Base de datos relacional orientada a procedimientos almacenados.
- **Multer**: Procesamiento seguro de cargas `multipart/form-data` para archivos PDF.
- **JSON Web Tokens (JWT)**: Autenticación stateless basada en tokens Bearer.
- **Bcrypt**: Hashing seguro de contraseñas.
- **Dotenv**: Gestión de variables de entorno fuera del código fuente.

### Frontend
- **Vanilla JavaScript**: Lógica frontend pura sin frameworks pesados ni dependencias externas.
- **W3.CSS**: Framework CSS ligero para diseño responsive y componentes modales.
- **Manipulación Nativa del DOM**: Enfoque *Zero innerHTML* para mitigar riesgos de inyección XSS y optimizar el rendimiento.

---

## 📂 Estructura del Proyecto

```text
bibliotech/
├── backend/
│   ├── config/
│   │   ├── db.js                 # Pool de conexiones MySQL
│   │   ├── init.sql              # Script DDL: tablas, usuario y Stored Procedures
│   │   └── multerConfig.js       # Configuración y filtro de archivos PDF
│   ├── controllers/
│   │   ├── adminController.js    # Lógica de administración y limpieza de archivos
│   │   ├── authController.js     # Registro e inicio de sesión
│   │   └── bookController.js     # Carga, consulta y borrado de libros
│   ├── middleware/
│   │   ├── authMiddleware.js     # Verificación de JWT y roles (client / admin)
│   │   ├── errorMiddleware.js    # Manejador y filtro global de errores
│   │   └── validationMiddleware.js # Validaciones desacopladas de requests
│   ├── repositories/
│   │   ├── bookRepo.js           # Acceso a datos de libros (Stored Procedures)
│   │   └── userRepo.js           # Acceso a datos de usuarios (Stored Procedures)
│   ├── routes/
│   │   ├── adminRoutes.js        # Endpoints protegidos para administradores
│   │   ├── authRoutes.js         # Endpoints de autenticación
│   │   ├── bookRoutes.js         # Endpoints de biblioteca de libros
│   │   ├── testsRoutes.js        # Ruta de navegación para suite de pruebas
│   │   └── viewRoutes.js         # Rutas de navegación HTML
│   ├── uploads/                  # Directorio de almacenamiento de PDFs
│   ├── utils/
│   │   ├── checkDb.js            # Script de diagnóstico de conexión y datos
│   │   ├── fileHelper.js         # Utilidad para eliminación física de archivos en disco
│   │   └── setupDb.js            # Script para inicialización automática de la base de datos
│   ├── .env                      # Variables de entorno locales
│   ├── .env.example              # Plantilla de variables de entorno
│   ├── package.json              # Dependencias y scripts de Node
│   └── server.js                 # Punto de entrada de la aplicación
├── frontend/
│   ├── css/
│   │   ├── style.css             # Estilos personalizados de Bibliotech
│   │   └── w3.css                # Framework CSS
│   ├── html/
│   │   ├── admin-dashboard.html  # Panel de administración de usuarios
│   │   ├── client-dashboard.html # Panel del cliente con biblioteca y visor PDF
│   │   ├── login.html            # Pantalla de inicio de sesión
│   │   ├── register.html         # Pantalla de registro de nuevos clientes
│   │   └── tests.html            # Laboratorio interactivo de pruebas API
│   ├── img/                      # Favicon e imágenes del sitio
│   └── js/
│       ├── components/
│       │   └── uiHandlers.js     # Modales dinámicos (notificaciones y visor PDF)
│       ├── frontControllers/
│       │   ├── adminFrontController.js
│       │   ├── authFrontController.js
│       │   └── booksFrontController.js
│       ├── services/
│       │   └── apiService.js     # Cliente Fetch centralizado con inyección de JWT
│       ├── tests/
│       │   ├── adminTests.js     # Pruebas para endpoints de administración
│       │   ├── authTests.js      # Pruebas para login, registro y validaciones
│       │   ├── bookTests.js      # Pruebas de carga y consulta de PDFs
│       │   └── testUtils.js      # Consola simulada y botones de prueba
│       └── utils/
│           └── authHelper.js     # Persistencia y gestión de sesión en localStorage
├── .gitignore
└── README.md
```

---

## ⚙️ Instalación y Puesta en Marcha

### 1. Prerrequisitos
- **Node.js** (v18 o superior recomendado)
- **MySQL** o **MariaDB** (por ejemplo mediante XAMPP, Laragon o servicio local)

### 2. Configurar Variables de Entorno
En la carpeta `backend/` existe un archivo `.env` (puedes tomar de base `.env.example`):

```env
PORT=3000
DB_HOST=localhost
DB_USER=bibliotech
DB_PASS=bibliotech
DB_NAME=bibliotech
JWT_SECRET=tu_clave_secreta_super_segura
NODE_ENV=production
```

### 3. Instalar Dependencias
Desde la terminal, accede a la carpeta `backend`:

```bash
cd backend
npm install
```

### 4. Inicializar la Base de Datos
Para crear automáticamente la base de datos `bibliotech`, el usuario con permisos de menor privilegio, las tablas y los Stored Procedures, ejecuta:

```bash
node utils/setupDb.js
```

*(Opcional: Si cuentas con una contraseña para el usuario root de MySQL, puedes importar manualmente el archivo `backend/config/init.sql` desde **phpMyAdmin**, **MySQL Workbench** o la consola de MySQL).*

### 5. Iniciar la Aplicación

```bash
npm start
```

El servidor estará listo y escuchando en:
👉 **`http://localhost:3000`**

---

## 🚀 Guía de Uso

Abre tu navegador e ingresa a `http://localhost:3000`.

### Usuarios de Prueba Preconfigurados:

| Rol | Usuario | Contraseña | Permisos y Funcionalidad |
| :--- | :--- | :--- | :--- |
| **Cliente** | `pepe` | `12345` | Carga de libros PDF, visualización en modal, descarga y borrado. |
| **Administrador** | `admin` | `12345` | Vista de todos los clientes y borrado recursivo (DB + archivos en disco). |

*(También es posible crear nuevos usuarios desde el enlace **Regístrate** en la pantalla de inicio).*

---

## 🧪 Laboratorio de Pruebas API

El proyecto incluye un entorno integrado para validar los endpoints y filtros de error:

1. En el archivo `backend/.env`, cambia la variable `NODE_ENV`:
   ```env
   NODE_ENV=testing
   ```
2. Reinicia el servidor (`npm start`).
3. Accede a `http://localhost:3000`. Verás la consola interactiva con botones para ejecutar tests automatizados de:
   - Login correcto e incorrecto.
   - Control de contraseñas cortas (< 6 caracteres) con respuesta HTTP 400.
   - Prevención de usuarios duplicados con respuesta HTTP 409 (`ER_DUP_ENTRY`).
   - Carga y listado de documentos PDF con autenticación Bearer.
   - Listado administrativo de cuentas.
