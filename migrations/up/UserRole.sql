CREATE TABLE IF NOT EXISTS user_roles(
    id VARCHAR(16) NOT NULL UNIQUE,
    user_id VARCHAR(16) NOT NULL UNIQUE,
    role_id VARCHAR(16) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE
);