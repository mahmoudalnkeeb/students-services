const { migrateTableUp } = require('../utils/migrationUtils');

async function migrateAllUp() {
  try {
    let results = [];
    results.push({ sections: (await migrateTableUp('sections')).result });
    results.push({ services: (await migrateTableUp('services')).result });
    results.push({ orders: (await migrateTableUp('orders')).result });
    results.push({ users: (await migrateTableUp('users')).result });
    results.push({ roles: (await migrateTableUp('roles')).result });
    results.push({ permissions: (await migrateTableUp('permissions')).result });
    results.push({ role_permissions: (await migrateTableUp('role_permissions')).result });
    results.push({ user_roles: (await migrateTableUp('user_roles')).result });
    return results;
  } catch (error) {
    throw error;
  }
}

migrateAllUp()
  .then((results) => console.info(results))
  .finally(() => process.exit());
