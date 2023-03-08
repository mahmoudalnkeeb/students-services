CREATE TABLE IF NOT EXISTS sections(
    section_id VARCHAR(16) PRIMARY KEY UNIQUE NOT NULL,
    index SERIAL UNIQUE NOT NULL,
    section_name VARCHAR NOT NULL,
    section_desc TEXT NOT NULL,
    section_image VARCHAR(200),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);