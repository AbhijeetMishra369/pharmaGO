-- PharmaGo Database Setup Script

-- Create databases
CREATE DATABASE IF NOT EXISTS pharmago_users;
CREATE DATABASE IF NOT EXISTS pharmago_medicines;
CREATE DATABASE IF NOT EXISTS pharmago_orders;
CREATE DATABASE IF NOT EXISTS pharmago_notifications;

-- Use the user database to create default admin user
USE pharmago_users;

-- Create admin user (password: admin123 - BCrypt hashed)
INSERT IGNORE INTO users (name, email, contact_number, password, role, is_active, is_email_verified, created_at, updated_at)
VALUES ('Admin User', 'admin@pharmago.com', '9999999999', '$2a$10$Y3ZY.U8kVjJgKs3ZbH8K.Og4JhH1WHXV5mE.gZKjf4F4H1.C3xH0O', 'ADMIN', true, true, NOW(), NOW());

-- Create sample customer (password: password123 - BCrypt hashed)
INSERT IGNORE INTO users (name, email, contact_number, password, role, is_active, is_email_verified, created_at, updated_at)
VALUES ('Customer User', 'customer@pharmago.com', '8888888888', '$2a$10$4K3L5.T8gSvJgKr3ZbH8K.Og4JhH1WHXV5mE.gZKjf4F4H1.C3xH1P', 'CUSTOMER', true, true, NOW(), NOW());

-- Use medicines database to create sample medicines
USE pharmago_medicines;

-- Sample medicines data
INSERT IGNORE INTO medicines (name, description, category, manufacturer, price, stock_quantity, requires_prescription, is_active, created_at, updated_at, dosage, usage_instructions) VALUES
('Paracetamol 500mg', 'Pain reliever and fever reducer', 'Pain Relief', 'PharmaCorp', 15.50, 100, false, true, NOW(), NOW(), '1-2 tablets every 4-6 hours', 'Take with water after meals'),
('Amoxicillin 250mg', 'Antibiotic for bacterial infections', 'Antibiotics', 'MediLife', 85.00, 50, true, true, NOW(), NOW(), '1 capsule 3 times daily', 'Complete the full course as prescribed'),
('Ibuprofen 400mg', 'Anti-inflammatory pain reliever', 'Pain Relief', 'HealthMax', 22.00, 75, false, true, NOW(), NOW(), '1 tablet every 6-8 hours', 'Take with food to avoid stomach upset'),
('Cetirizine 10mg', 'Antihistamine for allergies', 'Allergy', 'AllerCare', 12.50, 120, false, true, NOW(), NOW(), '1 tablet daily', 'Take in the evening for best results'),
('Metformin 500mg', 'Diabetes medication', 'Diabetes', 'DiabetesPlus', 45.00, 80, true, true, NOW(), NOW(), '1 tablet twice daily', 'Take with meals'),
('Vitamin D3 1000IU', 'Vitamin D supplement', 'Vitamins', 'VitaHealth', 18.75, 200, false, true, NOW(), NOW(), '1 tablet daily', 'Take with a meal containing fat'),
('Omeprazole 20mg', 'Proton pump inhibitor for acid reflux', 'Gastroenterology', 'GastroMed', 32.00, 60, false, true, NOW(), NOW(), '1 capsule daily', 'Take 30 minutes before breakfast'),
('Aspirin 75mg', 'Blood thinner and pain reliever', 'Cardiovascular', 'CardioLife', 8.25, 150, false, true, NOW(), NOW(), '1 tablet daily', 'Take with food'),
('Lisinopril 10mg', 'ACE inhibitor for blood pressure', 'Cardiovascular', 'CardioLife', 28.50, 40, true, true, NOW(), NOW(), '1 tablet daily', 'Take at the same time each day'),
('Loratadine 10mg', 'Non-drowsy antihistamine', 'Allergy', 'AllerCare', 16.00, 90, false, true, NOW(), NOW(), '1 tablet daily', 'Can be taken with or without food');

-- Use orders database for initial setup
USE pharmago_orders;

-- The orders table will be created automatically by JPA

-- Use notifications database for initial setup  
USE pharmago_notifications;

-- The notifications table will be created automatically by JPA

COMMIT;