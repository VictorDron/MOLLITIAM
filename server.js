// Express is imported and an Express application is instantiated
const express = require('express');
const app = express();

const cors = require('cors');

// Definition of the port where the server will listen. The value is taken from the environment variables, or 3000 if not defined
const port = process.env.PORT || 3000;

// Importing the routers 
const polosRoutes = require('./routes/polos');

// Middleware to parse the body of requests as JSON
app.use(express.json());

app.use(cors());

// Setting the base routes for the imported routers
app.use('/polos', polosRoutes);

// Starts the server to listen on the defined port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
