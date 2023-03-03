CREATE TABLE IF NOT EXISTS orders (
    order_id VARCHAR(16) PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(200),
    phone VARCHAR(20),
    service_id VARCHAR(16),
    FOREIGN KEY (service_id) REFERENCES services(service_id)
);