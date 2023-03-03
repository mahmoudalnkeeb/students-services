CREATE TABLE IF NOT EXISTS reviews(
    review_id VARCHAR(16) PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(200),
    rate double precision,
    review_text TEXT,
    service_id VARCHAR(16),
    FOREIGN KEY (service_id) REFERENCES services(service_id)
);