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
1. **User Service** - Handles user registration, authentication, and profile management
2. **Medicine Service** - Manages medicine inventory and information
3. **Order Service** - Handles order processing and management
4. **Notification Service** - Manages email notifications and reminders
5. **Gateway Service** - API Gateway for routing and load balancing

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
- Gateway Service: http://localhost:8080
- User Service: http://localhost:8081
- Medicine Service: http://localhost:8082
- Order Service: http://localhost:8083
- Notification Service: http://localhost:8084

### Testing
```bash
# Backend tests
mvn test

# Frontend tests
npm test
```

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
