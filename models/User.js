const pool = require('../configs/db');
const { hash, createJwt, verfiyJwt, compare } = require('../utils/authUtils');
async function createUser(username, email, password) {
  let client = await pool.connect();
  try {
    let id = shortId.generate();
    let hashData = hash(password);
    let hashed_pass = hashData.hashed;
    let salt = hashData.salt;
    let sql =
      'INSERT INTO users(user_id , username , email , hashed_pass , slat) VALUES($1 , $2 ,$3 , $4 , $5) RETURNING user_id , username , email , created_at';
    let query = await client.query(sql, [
      id,
      username,
      email,
      hashed_pass,
      salt,
    ]);
    return query.rows[0];
  } catch (error) {
    throw new Error(`creating user failed  \n ${error}`, {
      cause: error,
    });
  } finally {
    client.release();
  }
}

async function getUsers() {
  let client = await pool.connect();
  try {
    let sql = 'SELECT user_id , username , email , phone , FROM users';
    let query = await client.query(sql);
    return query.rows;
  } catch (error) {
    throw new Error(`getting users failed  \n ${error}`, {
      cause: error,
    });
  } finally {
    client.release();
  }
}

async function getUsersPaginations(page = 1, limit = 10) {
  let client = await pool.connect();
  try {
    let offset = (page - 1) * limit;
    let sql =
      'SELECT user_id , username , email , phone , FROM users LIMIT $1 OFFSET $2';
    let query = await client.query(sql, [limit, offset]);
    return query.rows;
  } catch (error) {
    throw new Error(`getting users failed  \n ${error}`, {
      cause: error,
    });
  } finally {
    client.release();
  }
}

async function updateUser(id, username, email, phone) {
  let client = await pool.connect();
  try {
    let sql = `UPDATE services SET
                  username = COALESCE($2, username),
                  email = COALESCE($3, email),
                  phone = COALESCE($4, phone),
                  updated_at = NOW()
              WHERE user_id = $1 
              RETURNING user_id`;
    let query = await client.query(sql, [id, username, email, phone]);
    return query.rows[0];
  } catch (error) {
    throw new Error(`updating user failed  \n ${error}`, {
      cause: error,
    });
  } finally {
    client.release();
  }
}

async function deleteUser(id) {
  let client = await pool.connect();
  try {
    let sql = 'DELETE FROM users WHERE user_id = $1 RETURNING  user_id';
    let query = await client.query(sql, [id]);
    return query.rows[0];
  } catch (error) {
    throw new Error(`delete user failed  \n ${error}`, {
      cause: error,
    });
  } finally {
    client.release();
  }
}

// auth

async function addToken(username) {
  let client = await pool.connect();
  try {
    let sql =
      'UPDATE users SET access_token = $1 WHERE username = $2 RETURNING access_token ';
    let tokenData = createJwt({ sub: username } , '24h');
    let query = await client.query(sql, [tokenData.token, username]);
    return query.rows[0];
  } catch (error) {
    throw new Error(`creating user failed  \n ${error}`, {
      cause: error,
    });
  } finally {
    client.release();
  }
}

async function checkUserToken(token) {
  let client = await pool.connect();
  try {
    let sql =
      'SELECT  access_token , token_secret FROM users WHERE username = $1';
    let query = await client.query(sql, [username]);
    if (query.rows.length == 0) return false;
    if (verfiyJwt(query.rows[0].access_token, query.rows[0].token_secret))
      return query.rows[0];
    return false;
  } catch (error) {
    throw new Error(`check user's token failed  \n ${error}`, {
      cause: error,
    });
  } finally {
    client.release();
  }
}

async function checkUserPassword(username, password) {
  let client = await pool.connect();
  try {
    let sql = 'SELECT  hashed_pass , salt FROM users WHERE username = $1';
    let query = await client.query(sql, [username]);
    if (query.rows.length == 0) return false;
    if (compare(password, query.rows[0].salt, query.rows[0].hashed_pass))
      return true;
    return false;
  } catch (error) {
    throw new Error(`check user's password failed  \n ${error}`, {
      cause: error,
    });
  } finally {
    client.release();
  }
}

module.exports = {
  createUser,
  getUsers,
  getUsersPaginations,
  updateUser,
  deleteUser,
  addToken,
  checkUserToken,
  checkUserPassword,
};
