//Express import and definition
const express = require('express');
const app = express();

//Port definition
const port = process.env.PORT || 3000;

//Import routes related to "polos"
const polosRoutes = require('./routes/polos');

app.use(express.json());

//Base route
app.use('/', polosRoutes);

// Use "polos" routes
app.use('/polos', polosRoutes);

//Use "polos:id" routes
app.use('/polos/:id',polosRoutes)

//Server Start
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
