CREATE TABLE IF NOT EXISTS roles(
    role_id VARCHAR(16) NOT NULL UNIQUE,
    role_name VARCHAR(32) NOT NULL UNIQUE,
);