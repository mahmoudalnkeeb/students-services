CREATE TABLE IF NOT EXISTS services(
    service_id VARCHAR(16) PRIMARY KEY UNIQUE NOT NULL,
    index SERIAL UNIQUE NOT NULL,
    service_name VARCHAR NOT NULL,
    service_desc TEXT NOT NULL,
    service_image VARCHAR(200),
    isAvailable boolean DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);