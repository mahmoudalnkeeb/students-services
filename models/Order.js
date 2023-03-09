/**
 * model schema
 * order_id PK VARCHAR(16)
 * name VARCHAR(100)
 * email VARCHAR(200)
 * phone VARCHAR(20)
 * service_id FK VARCHAR(16)
 */

/*-------------------------------- 
async function name() {
  let client = await pool.connect();
  try {

  } catch (error) {
    client.release();
    throw new Error('adding service failed  \n ${error}');
  } finally {
    client.release();
  }
}
-----------------------------------*/

async function getOrders() {
  let client = await pool.connect();
  try {
  } catch (error) {
    client.release();
    throw new Error(`get orders failed  \n ${error}`);
  } finally {
    client.release();
  }
}

async function getOrdersPagination(page = 1, limit = 10) {
  let client = await pool.connect();
  try {
  } catch (error) {
    client.release();
    throw new Error(`get orders failed  \n ${error}`);
  } finally {
    client.release();
  }
}

async function getoneOrders() {
  let client = await pool.connect();
  try {
  } catch (error) {
    client.release();
    throw new Error(`get order failed  \n ${error}`);
  } finally {
    client.release();
  }
}

async function createOrder() {
  let client = await pool.connect();
  try {
  } catch (error) {
    client.release();
    throw new Error(`create order failed  \n ${error}`);
  } finally {
    client.release();
  }
}

async function updateOrder() {
  let client = await pool.connect();
  try {
  } catch (error) {
    client.release();
    throw new Error(`update order failed  \n ${error}`);
  } finally {
    client.release();
  }
}

async function deleteOrder() {
  let client = await pool.connect();
  try {
  } catch (error) {
    client.release();
    throw new Error(`delete order failed  \n ${error}`);
  } finally {
    client.release();
  }
}
