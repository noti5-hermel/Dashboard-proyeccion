
const pool = require('../database');

const insert = async (data) => {
  if (data.length === 0) {
    return;
  }

  const columns = Object.keys(data[0]);
  const columnNames = columns.map(col => `"${col}"`).join(', ');
  const valuePlaceholders = columns.map((_, i) => `$${i + 1}`).join(', ');
  const query = `INSERT INTO product (${columnNames}) VALUES (${valuePlaceholders})`;

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

const create = async (product) => {
  const columns = Object.keys(product);
  const columnNames = columns.map(col => `"${col}"`).join(', ');
  const valuePlaceholders = columns.map((_, i) => `$${i + 1}`).join(', ');
  const query = `INSERT INTO product (${columnNames}) VALUES (${valuePlaceholders}) RETURNING *`;
  const values = columns.map(col => product[col]);
  const result = await pool.query(query, values);
  return result.rows[0];
};

const get = async () => {
  const query = 'SELECT * FROM product';
  const result = await pool.query(query);
  return result.rows;
};

const getById = async (id) => {
  const query = 'SELECT * FROM product WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

const update = async (id, product) => {
  const columns = Object.keys(product);
  const set = columns.map((col, i) => `"${col}" = $${i + 1}`).join(', ');
  const query = `UPDATE product SET ${set} WHERE id = $${columns.length + 1} RETURNING *`;
  const values = [...columns.map(col => product[col]), id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const remove = async (id) => {
  const query = 'DELETE FROM product WHERE id = $1';
  await pool.query(query, [id]);
};

module.exports = { insert, create, get, getById, update, remove };
