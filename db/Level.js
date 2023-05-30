const { Pool } = require('pg');

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
    // Faz uma consulta ao banco de dados para obter a média de consumo diário por base
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
  
    // Exibe a média de consumo por base e a quantidade de terminais em estoque
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
    console.log(coverageData);
    return coverageData;
}


calculateStockCoverage(65);


module.exports = calculateStockCoverage;