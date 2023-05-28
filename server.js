//Express import and definition
const express = require('express');
const app = express();

//Port definition
const port = process.env.PORT || 3000;

//Import routes related to "polos"
const polosRoutes = require('./routes/polos');
//Import routes related to "history"
const historyRoutes = require('./routes/history');

app.use(express.json());

//base route to poles
app.use('/polos', polosRoutes);
//base route to history
app.use('/history', historyRoutes);



//Server Start
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
