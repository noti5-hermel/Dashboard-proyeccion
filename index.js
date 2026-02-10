
const express = require('express');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const routeRoutes = require('./routes/routeRoutes');
const clientRoutes = require('./routes/clientRoutes');
const salesHistoryRoutes = require('./routes/salesHistoryRoutes');

const app = express();

// Sirve archivos estáticos desde la carpeta 'public'
// Esto es lo que te permite acceder a upload.html
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// --- API Routes ---
app.use('/', productRoutes);
app.use('/', routeRoutes);
app.use('/', clientRoutes);
app.use('/', salesHistoryRoutes);

// El bloque de fallback app.get('/*', ...) ha sido eliminado para prevenir el crash.

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
  console.log(`Interfaz de carga disponible en: http://localhost:${port}/upload.html`);
});
