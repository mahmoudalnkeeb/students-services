CREATE TABLE IF NOT EXISTS role_permissions(
    id VARCHAR(16) NOT NULL UNIQUE,
    permission_id VARCHAR(16) NOT NULL UNIQUE,
    role_id VARCHAR(16) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE
);