const migrations = {
  services: {
    up: `
    CREATE TABLE IF NOT EXISTS services(
        service_id VARCHAR(16) PRIMARY KEY UNIQUE NOT NULL,
        service_name VARCHAR(100) NOT NULL,
        service_desc TEXT NOT NULL,
        service_image VARCHAR(200),
        isAvailable boolean DEFAULT TRUE,
        index SERIAL NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );`,
    down: `DROP TABLE IF EXISTS services CASCADE;`,
  },
  orders: {
    up: `
    CREATE TABLE IF NOT EXISTS orders (
        order_id VARCHAR(16) PRIMARY KEY UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(200),
        phone VARCHAR(20) NOT NULL,
        isDone BOOLEAN NOT NULL DEFAULT FALSE,
        service_id VARCHAR(16) NOT NULL,
        FOREIGN KEY (service_id) REFERENCES services(service_id) ON DELETE CASCADE,
        index SERIAL NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );`,
    down: `DROP TABLE IF EXISTS orders CASCADE;`,
  },
  reviews: {
    up: `
    CREATE TABLE IF NOT EXISTS reviews(
        review_id VARCHAR(16) PRIMARY KEY UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(200),
        phone VARCHAR(20) NOT NULL,
        rate double precision NOT NULL,
        review_text TEXT NOT NULL,
        service_id VARCHAR(16) NOT NULL,
        order_id VARCHAR(16) NOT NULL,
        isAccepted BOOLEAN NOT NULL DEFAULT FALSE,
        FOREIGN KEY (service_id) REFERENCES services(service_id) ON DELETE CASCADE,
        FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
        index SERIAL NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );`,
    down: `DROP TABLE IF EXISTS reviews CASCADE;`,
  },
};

module.exports = migrations