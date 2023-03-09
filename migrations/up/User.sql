CREATE TABLE IF NOT EXISTS users(
    user_id VARCHAR(16) PRIMARY KEY UNIQUE NOT NULL,
    username VARCHAR(16) UNIQUE NOT NULL,
    email VARCHAR(200) NOT NULL,
    hashed_pass TEXT NOT NULL,
    salt TEXT NOT NULL,
    access_token TEXT UNIQUE,
    token_secret TEXT UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);