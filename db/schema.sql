-- Enable pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ========================
-- PRODUCT TABLE
-- ========================
CREATE TABLE "Product" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL UNIQUE,
    description TEXT,
    price INT NOT NULL,
    image_url TEXT DEFAULT '',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- USER TABLE
-- ========================
CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,   
    password TEXT NOT NULL,
    role VARCHAR(20) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    profile_image_url TEXT DEFAULT '',
    last_login_at TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verification INT,
    gamesPlayed INT DEFAULT 0
);

-- ========================
-- CONVERSATION TABLE
-- ========================
CREATE TABLE "Conversation" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id INT NOT NULL,
    admin_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES "User"(id) ON DELETE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES "User"(id) ON DELETE SET NULL
);

-- ========================
-- SUPPORT MESSAGE TABLE
-- ========================
CREATE TABLE "SupportMessage" (
    id SERIAL PRIMARY KEY,
    conversation_id UUID NOT NULL,
    sender_type VARCHAR(20) NOT NULL CHECK (sender_type IN ('user', 'support')),
    sender_id INT NOT NULL,
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_id) REFERENCES "Conversation"(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES "User"(id) ON DELETE CASCADE
);
