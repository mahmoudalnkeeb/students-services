const { migrateTableUp } = require('../utils/migrationUtils');

async function migrateAllUp() {
  try {
    let results = [];
    results.push({ services: (await migrateTableUp('services')).result });
    results.push({ services: (await migrateTableUp('orders')).result });
    results.push({ services: (await migrateTableUp('reviews')).result });
    return results;
  } catch (error) {
    throw error;
  }
}

migrateAllUp()
  .then((results) => console.info(results))
  .finally(() => process.exit());
