// Express is imported and an Express application is instantiated
const express = require('express');
const app = express();

// Definition of the port where the server will listen. The value is taken from the environment variables, or 3000 if not defined
const port = process.env.PORT || 3000;

// Importing the routers that handle the routes related to "polos", "history", and "critical"
const polosRoutes = require('./routes/polos');
const historyRoutes = require('./routes/history');
const criticalRoutes = require('./routes/critical');

// Middleware to parse the body of requests as JSON
app.use(express.json());

// Setting the base routes for the imported routers
app.use('/polos', polosRoutes);
app.use('/history', historyRoutes);
app.use('/critical', criticalRoutes);

// Starts the server to listen on the defined port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
