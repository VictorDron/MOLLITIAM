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

//Get full History
const getHistory = async () => {
  const result = await pool.query('SELECT * FROM history');
  return result.rows;
};

module.exports = {
  getHistory
};
