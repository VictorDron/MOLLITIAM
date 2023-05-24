//Express constant definition
const express = require('express');
const app = express();

///Port definition
const port = 3000;


//Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
});



//Server portal activation
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});
