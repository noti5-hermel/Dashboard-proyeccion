
const express = require('express');
const productRoutes = require('./routes/productRoutes');
const routeRoutes = require('./routes/routeRoutes');
const clientRoutes = require('./routes/clientRoutes');

const app = express();

app.use(express.json());

app.use('/', productRoutes);
app.use('/', routeRoutes);
app.use('/', clientRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
