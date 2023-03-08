CREATE TABLE IF NOT EXISTS reviews(
    review_id VARCHAR(16) PRIMARY KEY UNIQUE NOT NULL,
    index SERIAL UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(200),
    phone VARCHAR(20) NOT NULL,
    rate double precision NOT NULL,
    review_text TEXT NOT NULL,
    order_id VARCHAR(16) NOT NULL,
    isAccepted BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);