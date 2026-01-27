
const express = require('express');
const productRoutes = require('./routes/productRoutes');
const routeRoutes = require('./routes/routeRoutes');
const clientRoutes = require('./routes/clientRoutes');
const salesHistoryRoutes = require('./routes/salesHistoryRoutes');

const app = express();

app.use(express.json());

app.use('/', productRoutes);
app.use('/', routeRoutes);
app.use('/', clientRoutes);
app.use('/', salesHistoryRoutes); // Correctly added

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
