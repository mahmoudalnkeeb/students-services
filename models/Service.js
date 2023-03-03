/**
 * model schema
 * service_id PK VARCHAR(16)
 * service_name VARCHAR(100)
 * service_desc TEXT
 * isAvailable boolean DEFAULT true
 */

//-- TODO LIST --
// createService(name, desc) [DONE]
// getServices() [ ]
// getOneService(id) [ ]
// updateService(id , name? , desc? , isAvailavle?) [ ]
// deleteService(id) [ ]

const pool = require('../configs/db');
const shortId = require('shortid');

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
    throw new Error('adding service failed');
  } finally {
    client.release();
  }
}

module.exports = { createService };
