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


//Get full History
const getHistory = async () => {
  const result = await pool.query('SELECT * FROM history');
  return result.rows;
};

module.exports = {
  getHistory
};
