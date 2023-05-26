//Express import and definition
const express = require('express');
const router = express.Router();

// Import functions from Post.js
const { getPolos, getPoloById, updatePolo } = require('../db/Polos');

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

//Update terminal_qtd by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { terminal_qtd } = req.body;

  try {
    const result = await updatePolo(id, terminal_qtd);
    if (result) {
      res.status(200).json({ message: 'Polo atualizado com sucesso' });
    } else {
      res.status(404).json({ message: 'Polo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o polo', error: error });
  }
});

module.exports = router;
