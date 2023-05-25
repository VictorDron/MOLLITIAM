//lib import globals variables
require('dotenv').config();

//lib import to talk to db
const { Pool } = require('pg');


const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

//db connection validation
pool.query('SELECT version()', (error, results) => {
  if (error) {
    console.error('Error connecting to the database:', error);
  } else {
    console.log('Database connection successful. PostgreSQL version:', results.rows[0].version);
  }
  //pool.end();
});

//Receives matrices with two poles
const getPolos = async () => {
  const result = await pool.query('SELECT * FROM PoloEstoque');
  return result.rows;
};
//Returns pole data according to id input
const getPoloById = async (id) => {
  const result = await pool.query('SELECT * FROM PoloEstoque WHERE id = $1', [id]);
  return result.rows[0];
};
//Update pole information
const updatePolo = async (id,nome, terminal_qtd) => {
  const result = await pool.query(
    'UPDATE PoloEstoque SET nome = $2, terminal_qtd = $3, data_atualizacao = CURRENT_TIMESTAMP WHERE id = $1',
    [id, nome, terminal_qtd]
  );
  return result.rowCount > 0;
};


module.exports = {
  getPolos,
  getPoloById,
  updatePolo,
};











