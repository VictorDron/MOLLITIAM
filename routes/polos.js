//Express import and definition
const express = require('express');
const router = express.Router();

// Import functions from Post.js
const { getPolos, getPoloById, updatePolo, getPolosWithZeroStock } = require('../db/Polos');

//Base route
router.get('/', async (req, res) => {
  const polos = await getPolos();
  res.json(polos);
});

//Look for poles with zero in stock
router.get('/empty', async (req, res) => {
  const polos = await getPolosWithZeroStock();
  res.json(polos);
});

// Expedition of terminals
router.post('/expedition', async (req, res) => {
  const origem_id = parseInt(req.body.origem_id);
  const destino_id = parseInt(req.body.destino_id);
  const terminal_qtd = parseInt(req.body.terminal_qtd);

  try {
    // Get current terminal quantity of origin and destination
    const origem = await getPoloById(origem_id);
    const destino = await getPoloById(destino_id);

    // Check if there is enough terminals in the origin
    if (origem.terminal_qtd < terminal_qtd) {
      res.status(400).json({ message: 'Não há terminais suficientes no polo de origem' });
      return;
    }

    // Reduce the number of terminals in the origin pole
    const success1 = await updatePolo(origem_id, -terminal_qtd);

    // Increase the number of terminals in the destination pole
    const success2 = await updatePolo(destino_id, terminal_qtd);

    if (success1 && success2) {
      res.status(200).json({ message: 'Expedição realizada com sucesso' });
    } else {
      res.status(404).json({ message: 'Expedição falhou' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro na expedição', error: error });
  }
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
