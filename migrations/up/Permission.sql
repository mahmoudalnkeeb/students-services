CREATE TABLE IF NOT EXISTS permissions(
    permission_id VARCHAR(16) NOT NULL UNIQUE,
    slug VARCHAR(32) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);