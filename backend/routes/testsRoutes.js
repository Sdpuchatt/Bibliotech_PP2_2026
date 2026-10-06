/**
 * Project     : Bibliotech
 * Description : Ruta de navegación del Frontend para servir pruebas unitarias en modo testing.
 */

const express = require('express');
const router = express.Router();
const path = require('path');

// En modo testing la ruta raíz sirve la suite de pruebas
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/html/tests.html'));
});

module.exports = router;
