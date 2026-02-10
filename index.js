
const express = require('express');
const path = require('path'); // Import the path module
const productRoutes = require('./routes/productRoutes');
const routeRoutes = require('./routes/routeRoutes');
const clientRoutes = require('./routes/clientRoutes');
const salesHistoryRoutes = require('./routes/salesHistoryRoutes');

const app = express();

// --- Serve Static Files ---
// This middleware tells Express to serve files from the 'public' directory.
// It will automatically find and serve 'upload.html', 'styles.css', etc.
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// --- API Routes ---
app.use('/', productRoutes);
app.use('/', routeRoutes);
app.use('/', clientRoutes);
app.use('/', salesHistoryRoutes);

// --- Generic Fallback for SPA (Optional but good practice) ---
// If no API route or static file is found, send the main html file.
// This is useful if you create a more complex single-page application.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'upload.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`Interfaz de carga disponible en: http://localhost:${port}/upload.html`);
});
