const { Pool } = require('pg');
const { updatePolo } = require('./Bases');

require('dotenv').config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

//Analyzes the level of criticality levels of the bases
async function calculateStockCoverage(id) {
    const result = await pool.query(`
      WITH daily_consumption AS (
        SELECT base, date, COUNT(*) as consumption
        FROM zeus
        WHERE id = $1
        GROUP BY base, date
      ),
      average_consumption AS (
        SELECT base, AVG(consumption) as average_consumption
        FROM daily_consumption
        GROUP BY base
      )
      SELECT ac.base, ac.average_consumption, pe.terminal_qtd
      FROM average_consumption ac
      INNER JOIN poloestoque pe ON ac.base = pe.nome
    `, [id]);
  
    const coverageData = [];

    for (let row of result.rows) {
      const coverageDays = row.terminal_qtd / row.average_consumption;
      const coverageLevel = coverageDays < 10 ? 'PERIGO' : 
                           coverageDays < 14 ? 'ATENÇÃO' : 
                           coverageDays < 19 ? 'COBERTURA IDEAL' : 
                           coverageDays < 24 ? 'ATENÇÃO' : 'PERIGO';
      
      coverageData.push({
        base: row.base,
        averageConsumption: parseFloat(row.average_consumption).toFixed(2),
        terminalQuantity: row.terminal_qtd,
        coverage: coverageDays.toFixed(2),
        level: coverageLevel
      });
    }

    return coverageData;
}

// This function will be called when the button is clicked to adjust the stock level
async function adjustStockLevel(id) {
  // Get the current coverage data
  const coverageData = await calculateStockCoverage(id);

  // Check if coverageData is not empty
  if (coverageData.length > 0) {
      // Get the current terminal quantity and average consumption
      const currentTerminalQty = coverageData[0].terminalQuantity;
      const averageConsumption = coverageData[0].averageConsumption;

      // Calculate the terminal quantity for ideal stock coverage (16.5 days)
      const idealTerminalQty = Math.round(averageConsumption * 16.5);

      // If the current terminal quantity is not equal to the ideal terminal quantity,
      // adjust the terminal quantity
      if (currentTerminalQty !== idealTerminalQty) {
          const terminalQtyChange = Math.round(idealTerminalQty - currentTerminalQty);
          const success = await updatePolo(id, terminalQtyChange);
          return success;
      }
  }

  return false;
}









module.exports = { calculateStockCoverage, adjustStockLevel };
