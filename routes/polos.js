//Express import and definition
const express = require('express');
const router = express.Router();

// Import functions from Post.js
const { getPolos, getPoloById, updatePolo } = require('../db/Post');

//Base route
router.get('/', async (req, res) => {
  const polos = await getPolos();
  res.json(polos);
});

//Search by id
router.get('/:id', async (req, res) => {
  const polo = await getPoloById(req.params.id);
  res.json(polo);
});

//Update by id
router.put('/:id', async (req, res) => {
  const { nome, terminal_qtd } = req.body;
  const result = await updatePolo(req.params.id, nome, terminal_qtd);
  res.json({ success: result });
});

module.exports = router;
