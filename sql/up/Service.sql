CREATE TABLE IF NOT EXISTS services(
    service_id VARCHAR(16) PRIMARY KEY,
    service_name VARCHAR(100),
    service_desc TEXT,
    isAvailable boolean DEFAULT TRUE
);
