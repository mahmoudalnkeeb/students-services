const { migrateTableDown } = require('../utils/migrationUtils');

async function migrateAllDown() {
  try {
    let results = [];
    results.push({ services: (await migrateTableDown('services')).result });
    results.push({ services: (await migrateTableDown('orders')).result });
    results.push({ services: (await migrateTableDown('reviews')).result });
    return results;
  } catch (error) {
    throw error;
  }
}

migrateAllDown()
  .then((results) => console.info(results))
  .finally(() => process.exit());
