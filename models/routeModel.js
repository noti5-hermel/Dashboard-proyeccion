
const pool = require('../db');

const insert = async (routes) => {
  for (const route of routes) {
    await pool.query('INSERT INTO route (route_number) VALUES ($1)', [route.route_number]);
  }
};

const create = async (route) => {
  const { route_number } = route;
  const result = await pool.query(
    'INSERT INTO route (route_number) VALUES ($1) RETURNING *',
    [route_number]
  );
  return result.rows[0];
};

const get = async () => {
  const result = await pool.query('SELECT * FROM route');
  return result.rows;
};

const update = async (id, route) => {
  const { route_number } = route;
  const result = await pool.query(
    'UPDATE route SET route_number = $1 WHERE route_number = $2 RETURNING *',
    [route_number, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  await pool.query('DELETE FROM route WHERE route_number = $1', [id]);
};

module.exports = { insert, create, get, update, remove };
