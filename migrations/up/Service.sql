CREATE TABLE IF NOT EXISTS services(
    service_id VARCHAR(16) PRIMARY KEY UNIQUE NOT NULL,
    service_name VARCHAR(100) NOT NULL,
    service_desc TEXT NOT NULL,
    service_image VARCHAR(200),
    isAvailable boolean DEFAULT TRUE,
    index SERIAL NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);