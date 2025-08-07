# PharmaGo - Online Pharmacy Management System

## Overview
PharmaGo is a comprehensive online pharmacy management system built with microservices architecture. It allows customers to order medicines online and provides admin functionality for inventory and order management.

## 🏗️ Architecture
- **Frontend**: React with TypeScript, Material-UI
- **Backend**: Spring Boot Microservices
- **Database**: MySQL
- **Authentication**: JWT-based
- **API Documentation**: Swagger/OpenAPI
- **Service Discovery**: Eureka
- **Architecture**: Microservices

## 🚀 Quick Start

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- Node.js 16+ with npm
- MySQL 8.0+
- Docker & Docker Compose (optional)

### 🔧 Development Setup

1. **Clone and Setup**
   ```bash
   git clone <repository-url>
   cd pharmago
   chmod +x scripts/setup-development.sh
   ./scripts/setup-development.sh
   ```

2. **Database Setup**
   ```bash
   # Start MySQL server
   sudo service mysql start
   
   # Run database setup
   ./scripts/setup-database.sh
   ```

3. **Start Services**
   ```bash
   # Terminal 1: Start backend services
   ./scripts/start-backend.sh
   
   # Terminal 2: Start frontend
   ./scripts/start-frontend.sh
   ```

### 🐳 Docker Setup

1. **Using Docker Compose**
   ```bash
   cd docker-compose
   docker-compose up -d
   ```

2. **Build and Run Individual Services**
   ```bash
   ./scripts/build-all.sh
   cd docker-compose
   docker-compose up
   ```

## 📊 Services Overview

| Service | Port | Description | URL |
|---------|------|-------------|-----|
| Frontend | 3000 | React Application | http://localhost:3000 |
| API Gateway | 8080 | Service Gateway | http://localhost:8080 |
| User Service | 8081 | Authentication & User Management | http://localhost:8081 |
| Medicine Service | 8082 | Medicine Inventory | http://localhost:8082 |
| Order Service | 8083 | Order Management | http://localhost:8083 |
| Notification Service | 8084 | Email & Notifications | http://localhost:8084 |
| Eureka Server | 8761 | Service Discovery | http://localhost:8761 |
| MySQL | 3306 | Database | localhost:3306 |

## 🔐 Default Credentials

### Admin User
- **Email**: admin@pharmago.com
- **Password**: Admin123!

### Database
- **Username**: pharmago_user
- **Password**: pharmago_password
- **Root Password**: root_password

## 🎯 Features

### Customer Features
- ✅ User Registration and Login
- ✅ Profile Management
- ✅ Medicine Search and Browsing
- ✅ Shopping Cart
- ✅ Order Placement and Tracking
- ✅ Prescription Upload
- ✅ Medicine Reminders
- ✅ Order History

### Admin Features
- ✅ User Management
- ✅ Medicine Inventory Management
- ✅ Order Management
- ✅ Dashboard with Statistics
- ✅ User Role Management

### Technical Features
- ✅ JWT Authentication
- ✅ Global Exception Handling
- ✅ Comprehensive Logging
- ✅ Swagger API Documentation
- ✅ Input Validation
- ✅ CORS Configuration
- ✅ Responsive UI Design

## 📁 Project Structure

```
pharmago/
├── pharmago-backend/
│   ├── shared-common/           # Shared utilities and configurations
│   ├── api-gateway/            # API Gateway service
│   ├── user-service/           # User management microservice
│   ├── medicine-service/       # Medicine inventory microservice
│   ├── order-service/          # Order management microservice
│   └── notification-service/   # Email and notification service
├── pharmago-frontend/          # React frontend application
├── pharmago-database/          # Database initialization scripts
├── docker-compose/            # Docker compose configurations
├── scripts/                   # Utility scripts
└── README.md
```

## 🔧 API Documentation

Once the services are running, you can access the API documentation:

- **User Service**: http://localhost:8081/swagger-ui.html
- **Medicine Service**: http://localhost:8082/swagger-ui.html
- **Order Service**: http://localhost:8083/swagger-ui.html
- **Notification Service**: http://localhost:8084/swagger-ui.html

## 🧪 Testing

### Backend Tests
```bash
# Run tests for all services
cd pharmago-backend
for service in user-service medicine-service order-service notification-service; do
    cd $service
    mvn test
    cd ..
done
```

### Frontend Tests
```bash
cd pharmago-frontend
npm test
```

## 🚀 Deployment

### Production Docker Deployment
```bash
# Build production images
docker-compose -f docker-compose/docker-compose.prod.yml build

# Deploy to production
docker-compose -f docker-compose/docker-compose.prod.yml up -d
```

### Manual Deployment
1. Build all services: `./scripts/build-all.sh`
2. Deploy JAR files to your servers
3. Configure environment variables
4. Start services in order: Database → Eureka → Services → Gateway → Frontend

## 🔧 Configuration

### Environment Variables

#### Backend Services
```bash
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=pharmago_user
DB_PASSWORD=pharmago_password

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=86400000

# Email
MAIL_HOST=smtp.gmail.com
MAIL_USERNAME=your-email
MAIL_PASSWORD=your-password

# Service Discovery
EUREKA_SERVER_URL=http://localhost:8761/eureka/
```

#### Frontend
```bash
REACT_APP_API_BASE_URL=http://localhost:8080
REACT_APP_ENVIRONMENT=production
```

## 🔍 Monitoring and Health Checks

### Health Endpoints
- User Service: http://localhost:8081/actuator/health
- Medicine Service: http://localhost:8082/actuator/health
- Order Service: http://localhost:8083/actuator/health
- Notification Service: http://localhost:8084/actuator/health

### Logs
Logs are stored in:
- Backend: `logs/<service-name>.log`
- Frontend: Browser console and network tab

## 🛠️ Development Guidelines

### Code Standards
- Follow SOLID principles
- Use consistent naming conventions (camelCase for Java methods)
- Implement comprehensive error handling
- Write unit tests for all business logic
- Document APIs using Swagger annotations

### Git Workflow
1. Create feature branch from main
2. Implement feature with tests
3. Submit pull request
4. Code review and merge

## 🚨 Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000, 8080-8084, 8761, 3306 are available
2. **Database connection**: Verify MySQL is running and credentials are correct
3. **Service discovery**: Check Eureka server is running before starting other services
4. **JWT errors**: Verify JWT secret is consistent across all services

### Reset Development Environment
```bash
# Stop all services
pkill -f "spring-boot:run"
pkill -f "npm start"

# Reset database
mysql -u root -p < pharmago-database/init.sql

# Restart services
./scripts/start-backend.sh
./scripts/start-frontend.sh
```

## 📞 Support

For technical support or questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review API documentation
- Check service logs for error details

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core user management
- ✅ Medicine inventory
- ✅ Order processing
- ✅ Basic admin dashboard

### Phase 2 (Planned)
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Payment integration
- [ ] Real-time notifications
- [ ] Multi-language support
- [ ] Advanced reporting

### Phase 3 (Future)
- [ ] AI-powered medicine recommendations
- [ ] Telemedicine integration
- [ ] Advanced inventory management
- [ ] Supply chain management

---

**PharmaGo** - Your trusted online pharmacy management solution 💊
