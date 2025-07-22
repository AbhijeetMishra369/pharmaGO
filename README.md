# PharmaGo - Online Medicine Delivery Platform

## Overview
PharmaGo is a comprehensive online medicine delivery platform built with microservices architecture. It allows customers to order medicines online and have them delivered to their doorstep, while providing administrators with tools to manage inventory and orders effectively.

## Architecture
- **Frontend**: React.js
- **Backend**: Spring Boot Microservices
- **Database**: MySQL
- **Authentication**: JWT Token-based
- **Architecture Pattern**: Microservices

## Microservices
1. **User Service** (Port 8081) - Handles user registration, authentication, and profile management
2. **Medicine Service** (Port 8082) - Manages medicine inventory and information
3. **Order Service** (Port 8083) - Handles order processing and management
4. **Notification Service** (Port 8084) - Manages email notifications and reminders
5. **Gateway Service** (Port 8080) - API Gateway for routing and load balancing

## Features

### Customer Features
- User registration and login
- Medicine search and filtering
- Prescription upload
- Shopping cart management
- Order placement and tracking
- Medicine consumption reminders
- Order history and cancellation

### Admin Features
- User management (CRUD operations)
- Medicine management (add/edit/delete)
- Order monitoring and tracking
- Expired medicine management
- Dashboard with analytics

## Technology Stack
- **Frontend**: React 18, React Router, Axios, Material-UI
- **Backend**: Spring Boot 3.x, Spring Security, Spring Data JPA
- **Database**: MySQL 8.0
- **Build Tools**: Maven, npm
- **Version Control**: Git

## Getting Started

### Prerequisites
- Java 17+
- Node.js 16+
- MySQL 8.0+
- Maven 3.6+

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd pharmago
```

2. Setup Backend Services
```bash
# Start each microservice
cd backend/user-service && mvn spring-boot:run
cd backend/medicine-service && mvn spring-boot:run
cd backend/order-service && mvn spring-boot:run
cd backend/notification-service && mvn spring-boot:run
cd backend/gateway-service && mvn spring-boot:run
```

3. Setup Frontend
```bash
cd frontend
npm install
npm start
```

4. Database Setup
- Create MySQL databases for each service
- Run the provided SQL scripts

### API Documentation
- **Gateway Service**: http://localhost:8080 (Main API endpoint)
- **User Service**: http://localhost:8081
- **Medicine Service**: http://localhost:8082
- **Order Service**: http://localhost:8083
- **Notification Service**: http://localhost:8084

### Testing
```bash
# Run comprehensive API tests for all services
./test-all-services.sh
# Backend tests
mvn test

# Individual service tests
cd backend/user-service && mvn test
cd backend/medicine-service && mvn test
cd backend/order-service && mvn test
cd backend/notification-service && mvn test

# Frontend tests
cd frontend && npm test
```

### Sample Data
The database setup script includes sample data:
- **3 Users**: 1 Admin, 2 Customers (password: "password" for all)
- **6 Medicines**: Various categories with different prescription requirements
- **3 Orders**: Sample orders with different statuses
- **3 Reminders**: Active medicine reminders

### Comprehensive API Documentation
Complete API documentation with examples: [docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)

## Project Structure
```
pharmago/
├── backend/
│   ├── user-service/
│   ├── medicine-service/
│   ├── order-service/
│   ├── notification-service/
│   └── gateway-service/
├── frontend/
├── database/
└── docs/
```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License.
