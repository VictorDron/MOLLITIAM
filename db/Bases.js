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

// Update pole information
const updatePolo = async (id, terminal_qtd_delta) => {
  try {
    const result = await pool.query(
      'UPDATE PoloEstoque SET terminal_qtd = terminal_qtd + $2, data_atualizacao = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
      [id, terminal_qtd_delta]
    );
    return result.rowCount > 0;
  } catch (error) {
    console.error('Error in updatePolo: ', error);
    throw error;
  }
};

//Get zero stock
const getPolosWithZeroStock = async () => {
  const result = await pool.query('SELECT * FROM PoloEstoque WHERE terminal_qtd = 0');
  return result.rows;
};

// Create a new history record
const createHistory = async (origem_id, destino_id, terminal_qtd) => {
  try {
    const result = await pool.query(
      'INSERT INTO history (origem_id, destino_id, terminal_qtd) VALUES ($1, $2, $3)',
      [origem_id, destino_id, terminal_qtd]
    );
    return result.rowCount > 0;
  } catch (error) {
    console.error('Error in createHistory: ', error);
    throw error;
  }
};

module.exports = {
  getPolos,
  getPoloById,
  updatePolo,
  getPolosWithZeroStock,
  createHistory
};











