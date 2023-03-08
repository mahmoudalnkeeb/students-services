const migrations = {
  sections: {
    up: `CREATE TABLE IF NOT EXISTS sections(
    section_id VARCHAR(16) PRIMARY KEY UNIQUE NOT NULL,
    index SERIAL UNIQUE NOT NULL,
    section_name VARCHAR NOT NULL,
    section_desc TEXT NOT NULL,
    section_image VARCHAR,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
  );`,
    down: `DROP TABLE IF EXISTS sections CASCADE;`,
  },
  services: {
    up: `
    CREATE TABLE IF NOT EXISTS services(
      service_id VARCHAR(16) PRIMARY KEY UNIQUE NOT NULL,
      index SERIAL UNIQUE NOT NULL,
      service_name VARCHAR NOT NULL,
      service_desc TEXT NOT NULL,
      service_image VARCHAR,
      isAvailable boolean DEFAULT TRUE,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
  );`,
    down: `DROP TABLE IF EXISTS services CASCADE;`,
  },
  orders: {
    up: `
    CREATE TABLE IF NOT EXISTS orders (
      order_id VARCHAR(16) PRIMARY KEY UNIQUE NOT NULL,
      index SERIAL UNIQUE NOT NULL,
      name VARCHAR(100) NOT NULL,
      email VARCHAR,
      phone VARCHAR(20) NOT NULL,
      isDone BOOLEAN NOT NULL DEFAULT FALSE,
      service_id VARCHAR(16) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
      FOREIGN KEY (service_id) REFERENCES services(service_id) ON DELETE CASCADE
  );`,
    down: `DROP TABLE IF EXISTS orders CASCADE;`,
  },
  reviews: {
    up: `
    CREATE TABLE IF NOT EXISTS reviews(
      review_id VARCHAR(16) PRIMARY KEY UNIQUE NOT NULL,
      index SERIAL UNIQUE NOT NULL,
      name VARCHAR(100) NOT NULL,
      email VARCHAR,
      phone VARCHAR(20) NOT NULL,
      rate double precision NOT NULL,
      review_text TEXT NOT NULL,
      order_id VARCHAR(16) NOT NULL,
      isAccepted BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
      FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
  );`,
    down: `DROP TABLE IF EXISTS reviews CASCADE;`,
  },
};

module.exports = migrations;
