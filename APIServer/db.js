const { Pool } = require('pg');
require('dotenv').config();


// Configure the database connection
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: {rejectUnauthorized: false}
});

// Function to execute SQL queries
async function query(text, params) {
  try {
    const result = await pool.query(text, params);
    return result.rows; // Return the query results (rows)
  } catch (error) {
    console.error('Database query error:', error.stack);
    throw error; // Rethrow the error for the caller to handle
  }
}

// Export the query function
module.exports = { query };