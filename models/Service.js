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
const deleteFile = require('../utils/deleteFile');
const { isTableExists, migrateTableUp } = require('../utils/migrationUtils');

if (!isTableExists('services'))
  migrateTableUp('services').finally((res) => res.client.release());

async function getServices() {
  let client = await pool.connect();
  try {
    let sql =
      'SELECT service_id , service_name , service_desc , service_image WHERE isAvailable=true';
    let query = await client.query(sql);
    return query.rows;
  } catch (error) {
    client.release();
    throw new Error(`get service failed  - ${error.message}`, { cause: error });
  } finally {
    client.release();
  }
}

async function getOneService(id) {
  let client = await pool.connect();
  try {
    let sql =
      'SELECT service_id , service_name , service_desc , service_image WHERE id=$1';
    let query = await client.query(sql, [id]);
    return query.rows[0];
  } catch (error) {
    client.release();
    throw new Error(`get service failed  - ${error.message}`, { cause: error });
  } finally {
    client.release();
  }
}

async function createService(name, desc, imagePath) {
  let client = await pool.connect();
  try {
    let id = shortId.generate();
    let sql =
      'INSERT INTO services(service_id , service_name , service_desc , service_image) VALUES($1 , $2 , $3 , $4)';
    let query = await client.query(sql, [id, name, desc, imagePath]);
    return query.rows[0];
  } catch (error) {
    client.release();
    throw new Error(`adding service failed  - ${error.message}`, {
      cause: error,
    });
  } finally {
    client.release();
  }
}

async function updateService(
  id,
  name = null,
  desc = null,
  imagePath = null,
  isAvailable = null
) {
  let client = await pool.connect();
  try {
    let sql = `UPDATE services SET
                  service_name = COALESCE($2, service_name),
                  service_desc = COALESCE($3, service_desc),
                  service_image = COALESCE($4, service_image)
                  isAvailable = COALESCE($5, isAvailable),
                  updated_at = NOW()
              WHERE service_id = $1 
              RETURNING service_id , service_name , service_desc , isAvailable , service_image`;
    let query = await client.query(sql, [
      id,
      name,
      desc,
      imagePath,
      isAvailable,
    ]);
    return query.rows[0];
  } catch (error) {
    client.release();
    throw new Error(`updating service failed  - ${error.message}`, {
      cause: error,
    });
  } finally {
    client.release();
  }
}

async function deleteService(id) {
  let client = await pool.connect();
  try {
    let sql =
      'DELETE FROM services WHERE service_id=$1 RETURNING service_image ';
    let imagePath = await client.query(sql, [id]);
    deleteFile(imagePath);
  } catch (error) {
    client.release();
    throw new Error(`deleting service failed  - ${error.message}`, {
      cause: error,
    });
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
