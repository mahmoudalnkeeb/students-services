/**
 * model schema
 * order_id PK VARCHAR(16)
 * name VARCHAR(100)
 * email VARCHAR(200)
 * phone VARCHAR(20)
 * service_id FK VARCHAR(16)
 */

const { isTableExists, migrateTableUp } = require('../utils/migrationUtils');

if (!isTableExists('orders'))
  migrateTableUp('orders').finally((res) => res.client.release());

/*-------------------------------- 
async function name() {
  let client = await pool.connect();
  try {

  } catch (error) {
    client.release();
    throw new Error('adding service failed  - ${error.message}');
  } finally {
    client.release();
  }
}
-----------------------------------*/


