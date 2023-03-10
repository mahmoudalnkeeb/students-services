/**
 * model schema
 * section_id PK VARCHAR(16)
 * section_image
 * section_name VARCHAR(100)
 * section_desc TEXT
 * isAvailable boolean DEFAULT true
 */

//-- TODO LIST --
// createsection(name, desc) [DONE]
// getsections() [DONE]
// getOnesection(id) [DONE]
// updatesection(id , name? , desc? , isAvailavle?) [DONE]
// deletesection(id) []

const pool = require('../configs/db');
const shortId = require('shortid');
const deleteFile = require('../utils/deleteFile');

async function getSections() {
  let client = await pool.connect();
  try {
    let sql =
      'SELECT section_id , section_name , section_desc , section_image FROM sections';
    let query = await client.query(sql);
    return query.rows;
  } catch (error) {
    throw new Error(`get section failed  \n ${error}`, { cause: error });
  } finally {
    client.release();
  }
}

async function getSectionsPagination(page = 1, limit = 10) {
  let client = await pool.connect();
  try {
    let offset = (page - 1) * limit;
    let sql =
      'SELECT section_id , section_name , section_desc , section_image FROM sections ORDER BY index ASC LIMIT $1 OFFSET $2';
    let query = await client.query(sql, [limit, offset]);
    return query.rows;
  } catch (error) {
    throw new Error(`get section failed  \n ${error}`, { cause: error });
  } finally {
    client.release();
  }
}

async function getOneSection(id) {
  let client = await pool.connect();
  try {
    let sql =
      'SELECT section_id , section_name , section_desc , section_image WHERE section_id=$1';
    let query = await client.query(sql, [id]);
    return query.rows[0];
  } catch (error) {
    throw new Error(`get section failed  \n ${error}`, { cause: error });
  } finally {
    client.release();
  }
}

async function createSection(name, desc, imagePath = 'default') {
  let client = await pool.connect();
  try {
    let id = shortId.generate();
    let sql =
      'INSERT INTO sections(section_id , section_name , section_desc , section_image) VALUES($1 , $2 , $3 , $4) RETURNING section_id , section_name , section_desc , section_image';
    let query = await client.query(sql, [id, name, desc, imagePath]);
    return query.rows[0];
  } catch (error) {
    throw new Error(`adding section failed  \n ${error}`, {
      cause: error,
    });
  } finally {
    client.release();
  }
}

async function updateSection(id, name = null, desc = null, imagePath = null) {
  let client = await pool.connect();
  try {
    let sql = `UPDATE sections SET
                  section_name = COALESCE($2, section_name),
                  section_desc = COALESCE($3, section_desc),
                  section_image = COALESCE($4, section_image)
                  updated_at = NOW()
              WHERE section_id = $1 
              RETURNING section_id , section_name , section_desc , isAvailable , section_image`;
    let query = await client.query(sql, [id, name, desc, imagePath]);
    return query.rows[0];
  } catch (error) {
    throw new Error(`updating section failed  \n ${error}`, {
      cause: error,
    });
  } finally {
    client.release();
  }
}

async function updateIndex(index) {
  let client = await pool.connect();
  try {
    let sql = 'UPDATE sections SET index=$1 RETURNING index';
    let query = await client.query(sql, [index]);
    return query.rows[0];
  } catch (error) {
    throw new Error(`updating section failed  \n ${error}`, {
      cause: error,
    });
  } finally {
    client.release();
  }
}

async function deleteSection(id) {
  let client = await pool.connect();
  try {
    let sql =
      'DELETE FROM sections WHERE section_id=$1 RETURNING section_image ';
    let imagePath = await client.query(sql, [id]);
    deleteFile(imagePath, 'sections');
  } catch (error) {
    throw new Error(`deleting section failed  \n ${error}`, {
      cause: error,
    });
  } finally {
    client.release();
  }
}
module.exports = {
  getSections,
  getSectionsPagination,
  getOneSection,
  createSection,
  updateSection,
  updateIndex,
  deleteSection,
};
