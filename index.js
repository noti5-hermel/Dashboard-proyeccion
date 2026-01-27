
const express = require('express');
const productRoutes = require('./routes/productRoutes');
const routeRoutes = require('./routes/routeRoutes');
const clientRoutes = require('./routes/clientRoutes');
const salesHistoryRoutes = require('./routes/salesHistoryRoutes'); // Added

const app = express();

app.use(express.json());

app.use('/', productRoutes); // Changed prefix for clarity
app.use('/', routeRoutes); // Changed prefix for clarity
app.use('/', clientRoutes); // Changed prefix for clarity
app.use('/', salesHistoryRoutes); // Added new routes with a specific prefix

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
