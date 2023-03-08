const { migrateTableUp } = require('../utils/migrationUtils');

async function migrateAllUp() {
  try {
    let results = [];
    results.push({ sections: (await migrateTableUp('sections')).result });
    results.push({ services: (await migrateTableUp('services')).result });
    results.push({ orders: (await migrateTableUp('orders')).result });
    results.push({ reviews: (await migrateTableUp('reviews')).result });
    return results;
  } catch (error) {
    throw error;
  }
}

migrateAllUp()
  .then((results) => console.info(results))
  .finally(() => process.exit());
