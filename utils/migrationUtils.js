const pool = require('../configs/db');
const migrations = require('../migrations/migrations');

async function isTableExists(table) {
  let client = await pool.connect();
  try {
    let query = await client.query(
      `SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  =$1)`,
      [table]
    );
    console.info(
      query.rows[0].exists
        ? `${table} exist`
        : `${table} doesn't exist creating it....`
    );
    return query.rows[0].exists;
  } catch (error) {
    client.release();
    throw new Error('adding service failed  - ${error.message}');
  } finally {
    client.release();
  }
}

async function migrateTableUp(table) {
  let client = await pool.connect();
  try {
    let sql = migrations[table].up;
    let query = await client.query(sql);
    console.info(query);
    return { result: query, client };
  } catch (error) {
    client.release();
    throw new Error(`adding table failed  - ${error.message}`);
  } finally {
    client.release();
  }
}

async function migrateTableDown(table) {
  let client = await pool.connect();
  try {
    let sql = migrations[table].down;
    let query = await client.query(sql);
    console.info(query);
    return { result: query, client };
  } catch (error) {
    client.release();
    throw new Error(`adding table failed  - ${error.message}`);
  } finally {
    client.release();
  }
}

module.exports = { isTableExists, migrateTableDown, migrateTableUp };
