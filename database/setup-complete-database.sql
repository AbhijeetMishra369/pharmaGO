-- ===========================================
-- PharmaGo Complete Database Setup Script
-- ===========================================

-- Create databases for all microservices
CREATE DATABASE IF NOT EXISTS pharmago_users;
CREATE DATABASE IF NOT EXISTS pharmago_medicines;
CREATE DATABASE IF NOT EXISTS pharmago_orders;
CREATE DATABASE IF NOT EXISTS pharmago_notifications;

-- ===========================================
-- USER SERVICE DATABASE
-- ===========================================
USE pharmago_users;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contact_number VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('CUSTOMER', 'ADMIN') DEFAULT 'CUSTOMER',
    is_active BOOLEAN DEFAULT TRUE,
    is_email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token VARCHAR(255),
    password_reset_token VARCHAR(255),
    password_reset_token_expiry DATETIME,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    date_of_birth DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sample users
INSERT INTO users (name, email, contact_number, password, role, is_active, is_email_verified, address, city, state, postal_code) VALUES
('Admin User', 'admin@pharmago.com', '+1234567890', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a', 'ADMIN', TRUE, TRUE, '123 Admin St', 'Admin City', 'CA', '12345'),
('John Doe', 'john.doe@email.com', '+1234567891', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a', 'CUSTOMER', TRUE, TRUE, '456 Customer Ave', 'Customer City', 'NY', '67890'),
('Jane Smith', 'jane.smith@email.com', '+1234567892', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a', 'CUSTOMER', TRUE, TRUE, '789 Health Blvd', 'Health City', 'TX', '54321');

-- ===========================================
-- MEDICINE SERVICE DATABASE
-- ===========================================
USE pharmago_medicines;

-- Medicines table
CREATE TABLE IF NOT EXISTS medicines (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    manufacturer VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    expiry_date DATETIME,
    requires_prescription BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    dosage VARCHAR(100),
    side_effects TEXT,
    usage_instructions TEXT,
    image_url VARCHAR(500),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sample medicines
INSERT INTO medicines (name, description, category, manufacturer, price, stock_quantity, expiry_date, requires_prescription, dosage, side_effects, usage_instructions, image_url) VALUES
('Paracetamol 500mg', 'Pain reliever and fever reducer', 'Pain Relief', 'PharmaCorp', 5.99, 100, '2025-12-31 23:59:59', FALSE, '500mg', 'Nausea, stomach upset', 'Take 1-2 tablets every 4-6 hours as needed', '/images/paracetamol.jpg'),
('Amoxicillin 250mg', 'Antibiotic for bacterial infections', 'Antibiotics', 'MediCorp', 12.50, 50, '2025-06-30 23:59:59', TRUE, '250mg', 'Diarrhea, nausea, skin rash', 'Take as prescribed by doctor', '/images/amoxicillin.jpg'),
('Ibuprofen 400mg', 'Anti-inflammatory pain reliever', 'Pain Relief', 'HealthPharma', 7.25, 75, '2025-09-15 23:59:59', FALSE, '400mg', 'Stomach irritation, dizziness', 'Take with food, 1 tablet every 6-8 hours', '/images/ibuprofen.jpg'),
('Vitamin D3 1000IU', 'Vitamin D supplement', 'Vitamins', 'VitaLife', 15.99, 200, '2026-03-20 23:59:59', FALSE, '1000IU', 'Rare: kidney stones with overdose', 'Take 1 tablet daily with meal', '/images/vitamin-d3.jpg'),
('Lisinopril 10mg', 'Blood pressure medication', 'Cardiovascular', 'CardioMed', 18.75, 30, '2025-11-10 23:59:59', TRUE, '10mg', 'Dry cough, dizziness, fatigue', 'Take once daily, preferably in morning', '/images/lisinopril.jpg'),
('Cetirizine 10mg', 'Antihistamine for allergies', 'Allergy', 'AllergyFree', 8.99, 120, '2025-08-25 23:59:59', FALSE, '10mg', 'Drowsiness, dry mouth', 'Take 1 tablet daily, preferably at bedtime', '/images/cetirizine.jpg');

-- ===========================================
-- ORDER SERVICE DATABASE
-- ===========================================
USE pharmago_orders;

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING',
    shipping_address TEXT,
    prescription_url VARCHAR(500),
    order_date DATETIME NOT NULL,
    delivery_date DATETIME,
    payment_method VARCHAR(50),
    payment_status ENUM('PENDING', 'PAID', 'FAILED', 'REFUNDED') DEFAULT 'PENDING',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    medicine_id BIGINT NOT NULL,
    medicine_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Sample orders
INSERT INTO orders (user_id, total_amount, status, shipping_address, order_date, payment_method, payment_status) VALUES
(2, 23.98, 'DELIVERED', '456 Customer Ave, Customer City, NY 67890', '2024-01-15 10:30:00', 'Credit Card', 'PAID'),
(3, 15.99, 'SHIPPED', '789 Health Blvd, Health City, TX 54321', '2024-01-20 14:15:00', 'PayPal', 'PAID'),
(2, 31.24, 'PROCESSING', '456 Customer Ave, Customer City, NY 67890', '2024-01-25 09:45:00', 'Credit Card', 'PAID');

-- Sample order items
INSERT INTO order_items (order_id, medicine_id, medicine_name, quantity, price, subtotal) VALUES
(1, 1, 'Paracetamol 500mg', 2, 5.99, 11.98),
(1, 3, 'Ibuprofen 400mg', 1, 7.25, 7.25),
(1, 1, 'Paracetamol 500mg', 1, 5.99, 5.99), -- Additional item for testing
(2, 4, 'Vitamin D3 1000IU', 1, 15.99, 15.99),
(3, 2, 'Amoxicillin 250mg', 1, 12.50, 12.50),
(3, 6, 'Cetirizine 10mg', 2, 8.99, 17.98);

-- ===========================================
-- NOTIFICATION SERVICE DATABASE
-- ===========================================
USE pharmago_notifications;

-- Reminders table
CREATE TABLE IF NOT EXISTS reminders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    medicine_id BIGINT NOT NULL,
    medicine_name VARCHAR(255) NOT NULL,
    dosage VARCHAR(100),
    frequency VARCHAR(100),
    start_date DATETIME NOT NULL,
    end_date DATETIME,
    is_active BOOLEAN DEFAULT TRUE,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Reminder times table (for ElementCollection)
CREATE TABLE IF NOT EXISTS reminder_times (
    reminder_id BIGINT NOT NULL,
    reminder_time TIME NOT NULL,
    FOREIGN KEY (reminder_id) REFERENCES reminders(id) ON DELETE CASCADE
);

-- Sample reminders
INSERT INTO reminders (user_id, medicine_id, medicine_name, dosage, frequency, start_date, end_date, notes) VALUES
(2, 2, 'Amoxicillin 250mg', '250mg', 'Twice daily', '2024-01-15 08:00:00', '2024-01-25 08:00:00', 'Complete the full course'),
(3, 5, 'Lisinopril 10mg', '10mg', 'Once daily', '2024-01-01 08:00:00', NULL, 'Take in the morning'),
(2, 4, 'Vitamin D3 1000IU', '1000IU', 'Once daily', '2024-01-01 09:00:00', NULL, 'Take with breakfast');

-- Sample reminder times
INSERT INTO reminder_times (reminder_id, reminder_time) VALUES
(1, '08:00:00'),
(1, '20:00:00'),
(2, '08:00:00'),
(3, '09:00:00');

-- ===========================================
-- INDEXES FOR PERFORMANCE
-- ===========================================

-- User service indexes
USE pharmago_users;
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_active ON users(is_active);

-- Medicine service indexes
USE pharmago_medicines;
CREATE INDEX idx_medicines_category ON medicines(category);
CREATE INDEX idx_medicines_manufacturer ON medicines(manufacturer);
CREATE INDEX idx_medicines_active ON medicines(is_active);
CREATE INDEX idx_medicines_name ON medicines(name);

-- Order service indexes
USE pharmago_orders;
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_date ON orders(order_date);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_medicine_id ON order_items(medicine_id);

-- Notification service indexes
USE pharmago_notifications;
CREATE INDEX idx_reminders_user_id ON reminders(user_id);
CREATE INDEX idx_reminders_medicine_id ON reminders(medicine_id);
CREATE INDEX idx_reminders_active ON reminders(is_active);
CREATE INDEX idx_reminder_times_reminder_id ON reminder_times(reminder_id);

-- ===========================================
-- VERIFY SETUP
-- ===========================================
SHOW DATABASES;

-- Verify each database has tables
USE pharmago_users; SHOW TABLES;
USE pharmago_medicines; SHOW TABLES;
USE pharmago_orders; SHOW TABLES;
USE pharmago_notifications; SHOW TABLES;

SELECT 'Database setup completed successfully!' AS status;