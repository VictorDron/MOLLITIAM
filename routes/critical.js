//Express import and definition
const express = require('express');
const router = express.Router();

const calculateStockCoverage = require('../db/Level');


router.get('/', (req, res) => {
    res.send('enter search/:id in search to continue');
});

router.get('/search/:id', async (req, res) => {
    
    if (!isNaN(req.params.id)) {
        const id = parseInt(req.params.id);
        const coverageData = await calculateStockCoverage(id);
        res.json(coverageData);
    } else {
        res.status(400).json({ error: 'Invalid ID' });
    }
});


module.exports = router;
