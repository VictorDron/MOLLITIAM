//Express import and definition
const express = require('express');
const router = express.Router();


// Import your database functions
const { getHistory } = require('../db/Trasations');


// Create the route for getting all history records
router.get('/', async (req, res) => {
  try {
    const history = await getHistory();
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving history', error: error });
  }
});

module.exports = router;