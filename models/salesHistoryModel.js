
const pool = require('../db');

const insert = async (data) => {
  if (data.length === 0) {
    return;
  }

  const columns = Object.keys(data[0]);
  const columnNames = columns.map(col => `"${col}"`).join(', ');
  const valuePlaceholders = columns.map((_, i) => `$${i + 1}`).join(', ');
  const query = `INSERT INTO sales_history (${columnNames}) VALUES (${valuePlaceholders})`;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const row of data) {
      const values = columns.map(col => row[col]);
      await client.query(query, values);
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const create = async (sale) => {
  const columns = Object.keys(sale);
  const columnNames = columns.map(col => `"${col}"`).join(', ');
  const valuePlaceholders = columns.map((_, i) => `$${i + 1}`).join(', ');
  const query = `INSERT INTO sales_history (${columnNames}) VALUES (${valuePlaceholders}) RETURNING *`;
  const values = columns.map(col => sale[col]);
  const result = await pool.query(query, values);
  return result.rows[0];
};

const get = async () => {
  const query = 'SELECT * FROM sales_history';
  const result = await pool.query(query);
  return result.rows;
};

const getByInvoiceNumber = async (invoiceNumber) => {
  const query = 'SELECT * FROM sales_history WHERE invoice_number = $1';
  const result = await pool.query(query, [invoiceNumber]);
  return result.rows; 
};

const updateByInvoiceNumber = async (invoiceNumber, sale) => {
  const columns = Object.keys(sale);
  const set = columns.map((col, i) => `"${col}" = $${i + 1}`).join(', ');
  const query = `UPDATE sales_history SET ${set} WHERE invoice_number = $${columns.length + 1} RETURNING *`;
  const values = [...columns.map(col => sale[col]), invoiceNumber];
  const result = await pool.query(query, values);
  return result.rows;
};

const removeByInvoiceNumber = async (invoiceNumber) => {
  const query = 'DELETE FROM sales_history WHERE invoice_number = $1';
  await pool.query(query, [invoiceNumber]);
};

module.exports = { 
  insert, 
  create, 
  get, 
  getByInvoiceNumber, 
  updateByInvoiceNumber, 
  removeByInvoiceNumber 
};
