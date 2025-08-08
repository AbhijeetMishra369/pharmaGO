-- PharmaGo Database Initialization Script
-- This script creates databases for all microservices

-- Create databases
CREATE DATABASE IF NOT EXISTS pharmago_users CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS pharmago_medicines CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS pharmago_orders CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS pharmago_notifications CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user and grant privileges
CREATE USER IF NOT EXISTS 'pharmago_user'@'%' IDENTIFIED BY 'pharmago_password';

-- Grant privileges for all databases
GRANT ALL PRIVILEGES ON pharmago_users.* TO 'pharmago_user'@'%';
GRANT ALL PRIVILEGES ON pharmago_medicines.* TO 'pharmago_user'@'%';
GRANT ALL PRIVILEGES ON pharmago_orders.* TO 'pharmago_user'@'%';
GRANT ALL PRIVILEGES ON pharmago_notifications.* TO 'pharmago_user'@'%';

FLUSH PRIVILEGES;

-- Use users database to create initial admin user
USE pharmago_users;

-- Insert default admin user (password: Admin123!)
-- This user will be created during application startup if not exists
-- Password hash is bcrypt encrypted version of 'Admin123!'
INSERT IGNORE INTO users (
    id, first_name, last_name, email, password, phone_number, role, 
    enabled, account_non_expired, account_non_locked, credentials_non_expired, 
    email_verified, created_at, updated_at, created_by, country
) VALUES (
    1, 'System', 'Administrator', 'admin@pharmago.com', 
    '$2a$10$8oBl4zUbO6FXGsePfKQR0ehgBQrWRZqRZvlqvBx4SScmK0VuPKMB6',
    '+1234567890', 'ADMIN', 
    true, true, true, true, 
    true, NOW(), NOW(), 'SYSTEM', 'USA'
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_enabled ON users(enabled);
CREATE INDEX idx_users_email_verified ON users(email_verified);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_users_verification_token ON users(verification_token);
CREATE INDEX idx_users_password_reset_token ON users(password_reset_token);