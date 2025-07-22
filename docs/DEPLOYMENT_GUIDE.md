# PharmaGo Deployment Guide

This guide will help you deploy the PharmaGo application with all its microservices.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Database Configuration](#database-configuration)
4. [Backend Services](#backend-services)
5. [Frontend Application](#frontend-application)
6. [Running the Application](#running-the-application)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements
- **Java**: 17 or higher
- **Maven**: 3.6 or higher
- **Node.js**: 16 or higher
- **npm**: 7 or higher
- **MySQL**: 8.0 or higher

### Installation Commands

#### Ubuntu/Debian
```bash
# Java 17
sudo apt update
sudo apt install openjdk-17-jdk

# Maven
sudo apt install maven

# Node.js & npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# MySQL
sudo apt install mysql-server
sudo mysql_secure_installation
```

#### macOS (using Homebrew)
```bash
# Java 17
brew install openjdk@17

# Maven
brew install maven

# Node.js & npm
brew install node

# MySQL
brew install mysql
brew services start mysql
```

#### Windows
- Download and install Java 17 from Oracle or OpenJDK
- Download and install Maven from Apache Maven website
- Download and install Node.js from nodejs.org
- Download and install MySQL from MySQL website

## Environment Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd pharmago
```

### 2. Verify Prerequisites
```bash
java -version    # Should show Java 17+
mvn -version     # Should show Maven 3.6+
node -version    # Should show Node 16+
npm -version     # Should show npm 7+
mysql --version  # Should show MySQL 8.0+
```

## Database Configuration

### 1. Start MySQL Service
```bash
# Ubuntu/Debian
sudo systemctl start mysql

# macOS
brew services start mysql

# Windows
# Start MySQL service from Services management console
```

### 2. Create Database User (Optional)
```sql
-- Connect to MySQL as root
mysql -u root -p

-- Create a dedicated user for PharmaGo
CREATE USER 'pharmago'@'localhost' IDENTIFIED BY 'pharmago123';
GRANT ALL PRIVILEGES ON pharmago_* TO 'pharmago'@'localhost';
FLUSH PRIVILEGES;
exit;
```

### 3. Run Database Setup
```bash
# Using root user
mysql -u root -p < database/setup.sql

# Or using the dedicated user
mysql -u pharmago -p < database/setup.sql
```

## Backend Services

### 1. User Service (Port 8081)
```bash
cd backend/user-service
mvn clean install
mvn spring-boot:run
```

### 2. Medicine Service (Port 8082)
```bash
cd backend/medicine-service
mvn clean install
mvn spring-boot:run
```

### 3. Additional Services
For a complete setup, you can extend with:
- Order Service (Port 8083)
- Notification Service (Port 8084)
- Gateway Service (Port 8080)

## Frontend Application

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
Create or update `.env` file:
```bash
REACT_APP_API_URL=http://localhost:8080
REACT_APP_APP_NAME=PharmaGo
REACT_APP_VERSION=1.0.0
```

### 3. Start Development Server
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Running the Application

### Option 1: Automated Startup (Recommended)
```bash
# Make scripts executable (Linux/macOS)
chmod +x start-services.sh stop-services.sh

# Start all services
./start-services.sh

# Stop all services
./stop-services.sh
```

### Option 2: Manual Startup
1. Start MySQL service
2. Start backend services in separate terminals:
   ```bash
   # Terminal 1: User Service
   cd backend/user-service && mvn spring-boot:run
   
   # Terminal 2: Medicine Service
   cd backend/medicine-service && mvn spring-boot:run
   ```
3. Start frontend:
   ```bash
   # Terminal 3: Frontend
   cd frontend && npm start
   ```

## Testing

### 1. Service Health Checks
```bash
# User Service
curl http://localhost:8081/actuator/health

# Medicine Service
curl http://localhost:8082/actuator/health

# Frontend
curl http://localhost:3000
```

### 2. API Testing
```bash
# Test user registration
curl -X POST http://localhost:8081/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "contactNumber": "1234567890",
    "password": "password123",
    "confirmPassword": "password123"
  }'

# Test user login
curl -X POST http://localhost:8081/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@pharmago.com",
    "password": "password123"
  }'
```

### 3. Default Login Credentials
- **Customer**: `customer@pharmago.com` / `password123`
- **Admin**: `admin@pharmago.com` / `admin123`

## Application URLs

- **Frontend**: http://localhost:3000
- **User Service**: http://localhost:8081
- **Medicine Service**: http://localhost:8082
- **API Gateway**: http://localhost:8080 (when implemented)

## Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Find process using port
lsof -i :8081  # or any other port
kill -9 <PID>  # Kill the process
```

#### 2. MySQL Connection Issues
- Verify MySQL is running: `sudo systemctl status mysql`
- Check credentials in `application.yml` files
- Ensure databases are created: `SHOW DATABASES;`

#### 3. Frontend Build Issues
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

#### 4. Java Version Issues
```bash
# Check Java version
java -version

# Set JAVA_HOME if needed
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
```

#### 5. Maven Build Issues
```bash
# Clean and rebuild
mvn clean install -DskipTests

# Update dependencies
mvn dependency:resolve
```

### Log Files
When using the automated startup script, logs are available in:
- `logs/user-service.log`
- `logs/medicine-service.log`
- `logs/frontend.log`

### Database Verification
```sql
-- Check if databases exist
SHOW DATABASES;

-- Check sample data
USE pharmago_users;
SELECT * FROM users;

USE pharmago_medicines;
SELECT * FROM medicines;
```

## Production Deployment

For production deployment, consider:

1. **Database**: Use a dedicated MySQL server with proper backup
2. **Application Server**: Deploy JAR files to application servers
3. **Web Server**: Use Nginx to serve the React build
4. **Security**: Configure HTTPS and proper authentication
5. **Monitoring**: Set up application monitoring and logging
6. **Load Balancing**: Use a load balancer for multiple instances

### Build for Production
```bash
# Backend services
cd backend/user-service
mvn clean package

# Frontend
cd frontend
npm run build
```

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review log files for error messages
3. Ensure all prerequisites are correctly installed
4. Verify database connectivity and setup

Happy coding with PharmaGo! 🏥💊