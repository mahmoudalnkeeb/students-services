CREATE TABLE IF NOT EXISTS orders (
    order_id VARCHAR(16) PRIMARY KEY UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(200),
    phone VARCHAR(20) NOT NULL,
    isDone BOOLEAN NOT NULL DEFAULT FALSE,
    service_id VARCHAR(16) NOT NULL,
    FOREIGN KEY (service_id) REFERENCES services(service_id)
);