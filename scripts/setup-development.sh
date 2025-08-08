#!/bin/bash

# PharmaGo Development Setup Script
# This script sets up the entire development environment

set -e

echo "🚀 Setting up PharmaGo Development Environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
print_status "Checking prerequisites..."

# Check Java
if ! command -v java &> /dev/null; then
    print_error "Java is not installed. Please install Java 17 or higher."
    exit 1
fi

JAVA_VERSION=$(java -version 2>&1 | head -n1 | cut -d'"' -f2 | cut -d'.' -f1)
if [ "$JAVA_VERSION" -lt 17 ]; then
    print_error "Java 17 or higher is required. Found version: $JAVA_VERSION"
    exit 1
fi

# Check Maven
if ! command -v mvn &> /dev/null; then
    print_error "Maven is not installed. Please install Maven."
    exit 1
fi

# Check Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 16 or higher."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    print_error "Node.js 16 or higher is required. Found version: $NODE_VERSION"
    exit 1
fi

# Check npm
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm."
    exit 1
fi

# Check Docker (optional)
if ! command -v docker &> /dev/null; then
    print_warning "Docker is not installed. You'll need to run services manually."
fi

# Check MySQL (if not using Docker)
if ! command -v mysql &> /dev/null && ! command -v docker &> /dev/null; then
    print_warning "MySQL is not installed and Docker is not available. Please install MySQL or Docker."
fi

print_success "Prerequisites check completed!"

# Navigate to project root
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

print_status "Project root: $PROJECT_ROOT"

# Create environment files
print_status "Creating environment configuration files..."

# Backend environment files
for service in user-service medicine-service order-service notification-service api-gateway; do
    env_file="pharmago-backend/$service/src/main/resources/application-dev.yml"
    if [ ! -f "$env_file" ]; then
        print_status "Creating $env_file..."
        # This would contain service-specific development configurations
        # For now, we'll use the main application.yml
    fi
done

# Frontend environment file
if [ ! -f "pharmago-frontend/.env.development" ]; then
    print_status "Creating frontend environment file..."
    cat > pharmago-frontend/.env.development << EOF
# React App Configuration
REACT_APP_API_BASE_URL=http://localhost:8080
REACT_APP_ENVIRONMENT=development
REACT_APP_VERSION=1.0.0

# Debug mode
REACT_APP_DEBUG=true

# Authentication
REACT_APP_TOKEN_STORAGE_KEY=pharmago_token
REACT_APP_REFRESH_TOKEN_KEY=pharmago_refresh_token

# API Timeouts (in milliseconds)
REACT_APP_API_TIMEOUT=30000
EOF
    print_success "Frontend environment file created!"
fi

# Build shared common module
print_status "Building shared-common module..."
cd pharmago-backend/shared-common
mvn clean install -DskipTests
cd "$PROJECT_ROOT"

# Install frontend dependencies
print_status "Installing frontend dependencies..."
cd pharmago-frontend
npm install
cd "$PROJECT_ROOT"

# Create startup scripts
print_status "Creating startup scripts..."

# Backend startup script
cat > scripts/start-backend.sh << 'EOF'
#!/bin/bash

# Start all backend services in development mode

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Starting PharmaGo Backend Services..."

# Start services in background
cd "$PROJECT_ROOT/pharmago-backend/user-service"
mvn spring-boot:run -Dspring-boot.run.profiles=dev &
USER_SERVICE_PID=$!

cd "$PROJECT_ROOT/pharmago-backend/medicine-service"
mvn spring-boot:run -Dspring-boot.run.profiles=dev &
MEDICINE_SERVICE_PID=$!

cd "$PROJECT_ROOT/pharmago-backend/order-service"
mvn spring-boot:run -Dspring-boot.run.profiles=dev &
ORDER_SERVICE_PID=$!

cd "$PROJECT_ROOT/pharmago-backend/notification-service"
mvn spring-boot:run -Dspring-boot.run.profiles=dev &
NOTIFICATION_SERVICE_PID=$!

cd "$PROJECT_ROOT/pharmago-backend/api-gateway"
mvn spring-boot:run -Dspring-boot.run.profiles=dev &
API_GATEWAY_PID=$!

echo "Backend services started!"
echo "User Service PID: $USER_SERVICE_PID"
echo "Medicine Service PID: $MEDICINE_SERVICE_PID"
echo "Order Service PID: $ORDER_SERVICE_PID"
echo "Notification Service PID: $NOTIFICATION_SERVICE_PID"
echo "API Gateway PID: $API_GATEWAY_PID"

echo "Press Ctrl+C to stop all services..."
wait
EOF

# Frontend startup script
cat > scripts/start-frontend.sh << 'EOF'
#!/bin/bash

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Starting PharmaGo Frontend..."

cd "$PROJECT_ROOT/pharmago-frontend"
npm start
EOF

# Make scripts executable
chmod +x scripts/start-backend.sh
chmod +x scripts/start-frontend.sh

# Create database setup script
cat > scripts/setup-database.sh << 'EOF'
#!/bin/bash

echo "Setting up PharmaGo Database..."

# This script assumes MySQL is running on localhost:3306
# Update credentials as needed

MYSQL_HOST=${DB_HOST:-localhost}
MYSQL_PORT=${DB_PORT:-3306}
MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD:-root_password}

echo "Creating databases and user..."

mysql -h $MYSQL_HOST -P $MYSQL_PORT -u root -p$MYSQL_ROOT_PASSWORD < ../pharmago-database/init.sql

echo "Database setup completed!"
EOF

chmod +x scripts/setup-database.sh

print_success "Development environment setup completed!"

print_status "Next steps:"
echo "1. Set up MySQL database:"
echo "   - Start MySQL server"
echo "   - Run: ./scripts/setup-database.sh"
echo ""
echo "2. Start backend services:"
echo "   - Run: ./scripts/start-backend.sh"
echo ""
echo "3. Start frontend (in another terminal):"
echo "   - Run: ./scripts/start-frontend.sh"
echo ""
echo "4. Access the application:"
echo "   - Frontend: http://localhost:3000"
echo "   - API Gateway: http://localhost:8080"
echo "   - User Service: http://localhost:8081"
echo "   - Medicine Service: http://localhost:8082"
echo "   - Order Service: http://localhost:8083"
echo "   - Notification Service: http://localhost:8084"
echo ""
echo "5. Default admin credentials:"
echo "   - Email: admin@pharmago.com"
echo "   - Password: Admin123!"

print_success "🎉 PharmaGo development environment is ready!"