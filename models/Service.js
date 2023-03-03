/**
 * model schema
 * service_id PK VARCHAR(16)
 * service_name VARCHAR(100)
 * service_desc TEXT
 * isAvailable boolean DEFAULT true
 */

//-- TODO LIST --
// createService(name, desc) [DONE]
// getServices() [DONE]
// getOneService(id) [DONE]
// updateService(id , name? , desc? , isAvailavle?) [DONE]
// deleteService(id) []

const pool = require('../configs/db');
const shortId = require('shortid');

/*-------------------------------- 
async function name() {
  let client = await pool.connect();
  try {

  } catch (error) {
    client.release();
    throw new Error('adding service failed ');
  } finally {
    client.release();
  }
}
-----------------------------------*/

async function getServices() {
  let client = await pool.connect();
  try {
    let sql =
      'SELECT service_id , service_name , service_desc WHERE isAvailable=true';
    let query = await client.query(sql);
    return query.rows;
  } catch (error) {
    client.release();
    throw new Error('get service failed ' + error.stack);
  } finally {
    client.release();
  }
}

async function getOneService(id) {
  let client = await pool.connect();
  try {
    let sql = 'SELECT service_id , service_name , service_desc WHERE id=$1';
    let query = await client.query(sql, [id]);
    return query.rows[0];
  } catch (error) {
    client.release();
    throw new Error('get service failed ' + error.stack);
  } finally {
    client.release();
  }
}

async function createService(name, desc) {
  let client = await pool.connect();
  try {
    let id = shortId.generate();
    let sql =
      'INSERT INTO services(service_id , service_name , service_desc) VALUES($1 , $2 , $3)';
    let query = await client.query(sql, [id, name, desc]);
    return query.rows[0];
  } catch (error) {
    client.release();
    throw new Error('adding service failed ' + error.stack);
  } finally {
    client.release();
  }
}

async function updateService(id, name = null, desc = null, isAvailable = null) {
  let client = await pool.connect();
  try {
    let sql = `UPDATE services SET
                  service_name = COALESCE($1, service_name),
                  service_desc = COALESCE($2, service_desc),
                  isAvailable = COALESCE($3, isAvailable)
              WHERE service_id = $4 
              RETURNING service_id , service_name , service_desc , isAvailable`;
    let query = await client.query(sql, [id, name, desc, isAvailable]);
    return query.rows[0];
  } catch (error) {
    client.release();
    throw new Error('updating service failed ' + error.stack);
  } finally {
    client.release();
  }
}

async function deleteService(id) {
  let client = await pool.connect();
  try {
    let sql = 'DELETE FROM services WHERE service_id=$1 ';
    await client.query(sql, [id]);
  } catch (error) {
    client.release();
    throw new Error('deleting service failed ' + error.stack);
  } finally {
    client.release();
  }
}
module.exports = {
  getServices,
  getOneService,
  createService,
  updateService,
  deleteService,
};
