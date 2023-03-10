const { migrateTableDown } = require('../utils/migrationUtils');

async function migrateAllDown() {
  try {
    let results = [];
    results.push({ sections: (await migrateTableDown('sections')).result });
    results.push({ services: (await migrateTableDown('services')).result });
    results.push({ orders: (await migrateTableDown('orders')).result });
    results.push({ review: (await migrateTableDown('reviews')).result });
    results.push({ users: (await migrateTableDown('users')).result });
    results.push({ roles: (await migrateTableDown('roles')).result });
    results.push({
      permissions: (await migrateTableDown('permissions')).result,
    });
    results.push({
      role_permissions: (await migrateTableDown('role_permissions')).result,
    });
    results.push({ user_roles: (await migrateTableDown('user_roles')).result });
    return results;
  } catch (error) {
    throw error;
  }
}

migrateAllDown()
  .then((results) => console.info(results))
  .finally(() => process.exit());
