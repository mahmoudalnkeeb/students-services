/**
 * model schema
 * review_id PK VARCHAR(16) UNIQUE NOT NULL
 * name VARCHAR(100) NOT NULL
 * email VARCHAR(200)
 * rate double precision NOT NULL
 * review_text TEXT NOT NULL
 * service_id FK VARCHAR(16) NOT NULL
 */

const pool = require('../configs/db');
const shortId = require('shortid');

async function getReviews() {
  let client = await pool.connect();
  try {
    let sql =
      'SELECT review_id , name , rate , review_text FROM  reviews WHERE isAccepted=true AND rate >= 4';
    let query = await client.query(sql);
    return query.rows;
  } catch (error) {
    client.release();
    throw new Error(`get reviews failed  \n ${error}`);
  } finally {
    client.release();
  }
}

async function getReviewsPagination(page = 1, limit = 10) {
  let client = await pool.connect();
  try {
    let offset = (page - 1) * limit;
    let sql =
      'SELECT review_id , name , rate , review_text FROM reviews WHERE isAccepted=true AND rate >= 4 ORDER BY index ASC LIMIT $1 OFFSET $2';
    let query = await client.query(sql, [limit, offset]);
    return query.rows;
  } catch (error) {
    client.release();
    throw new Error(`get reviews failed  \n ${error}`);
  } finally {
    client.release();
  }
}

async function getOneReview(id) {
  let client = await pool.connect();
  try {
    let sql =
      'SELECT review_id , name , rate , review_text FROM reviews where review_id = $1';
    let query = await client.query(sql, [id]);
    return query.rows[0];
  } catch (error) {
    client.release();
    throw new Error(`get reviews failed  \n ${error}`);
  } finally {
    client.release();
  }
}

async function createReview(name, email, phone, rate, content, order_id) {
  let client = await pool.connect();
  try {
    let sql =
      'INSERT INTO reviews(review_id , name , email , phone , rate , review_text , order_id) VALUES($1 , $2 , $3 , $4 , $5 , $6 , $7 ) RETURNING review_id , name , email , phone , rate , review_text';
    let id = shortId.generate();
    let query = await client.query(sql, [
      id,
      name,
      email,
      phone,
      rate,
      content,
      order_id,
    ]);
    return query.rows[0];
  } catch (error) {
    client.release();
    throw new Error(`get reviews failed  \n ${error}`);
  } finally {
    client.release();
  }
}

async function updateReview(
  id,
  name = null,
  email = null,
  phone = null,
  rate = null,
  content = null
) {
  let client = await pool.connect();
  try {
    let sql = `UPDATE reviews SET
                  name = COALESCE($2, name),
                  email = COALESCE($3, email),
                  phone = COALESCE($4, phone)
                  rate = COALESCE($5, rate),
                  review_text = COALESCE($6, review_text),
                  updated_at = NOW()
              WHERE review_id = $1
              RETURNING review_id , name , email , phone , rate , review_text , isAccepted`;
    let query = await client.query(sql, [
      id,
      name,
      email,
      phone,
      rate,
      content,
    ]);
    return query.rows[0];
  } catch (error) {
    client.release();
    throw new Error(`updating service failed  \n ${error}`, {
      cause: error,
    });
  } finally {
    client.release();
  }
}

async function acceptReview(id) {
  let client = await pool.connect();
  try {
    let sql =
      'UPDATE reviews SET isAccepted=TRUE WHERE id=$1 RETURNING isAccepted';
    let query = await client.query(sql, [id]);
    return query.rows[0];
  } catch (error) {
    client.release();
    throw new Error(`updating service failed  \n ${error}`, {
      cause: error,
    });
  } finally {
    client.release();
  }
}

async function deleteReview(id) {
  let client = await pool.connect();
  try {
    let sql =
      'DELETE FROM reviews WHERE review_id=$1 RETURNING review_id , rate , review_text';
    await client.query(sql, [id]);
  } catch (error) {
    client.release();
    throw new Error(`adding service failed  \n ${error}`);
  } finally {
    client.release();
  }
}
module.exports = {
  getReviews,
  getReviewsPagination,
  getOneReview,
  createReview,
  updateReview,
  acceptReview,
  deleteReview,
};
