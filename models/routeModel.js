
const pool = require('../database');

const insert = async (data) => {
  if (data.length === 0) {
    return;
  }

  const columns = Object.keys(data[0]);
  const columnNames = columns.map(col => `"${col}"`).join(', ');
  const valuePlaceholders = columns.map((_, i) => `$${i + 1}`).join(', ');
  const query = `INSERT INTO route (${columnNames}) VALUES (${valuePlaceholders})`;

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

const create = async (route) => {
  const columns = Object.keys(route);
  const columnNames = columns.map(col => `"${col}"`).join(', ');
  const valuePlaceholders = columns.map((_, i) => `$${i + 1}`).join(', ');
  const query = `INSERT INTO route (${columnNames}) VALUES (${valuePlaceholders}) RETURNING *`;
  const values = columns.map(col => route[col]);
  const result = await pool.query(query, values);
  return result.rows[0];
};

const get = async () => {
  const query = 'SELECT * FROM route';
  const result = await pool.query(query);
  return result.rows;
};

const update = async (id, route) => {
  const columns = Object.keys(route);
  const set = columns.map((col, i) => `"${col}" = $${i + 1}`).join(', ');
  const query = `UPDATE route SET ${set} WHERE id = $${columns.length + 1} RETURNING *`;
  const values = [...columns.map(col => route[col]), id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const remove = async (id) => {
  const query = 'DELETE FROM route WHERE id = $1';
  await pool.query(query, [id]);
};

module.exports = { insert, create, get, update, remove };
