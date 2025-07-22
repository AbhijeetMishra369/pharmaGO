#!/bin/bash

# PharmaGo - Start All Services Script

echo "🏥 Starting PharmaGo Application..."
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo -e "${BLUE}Checking prerequisites...${NC}"

if ! command_exists java; then
    echo -e "${RED}❌ Java is not installed. Please install Java 17 or higher.${NC}"
    exit 1
fi

if ! command_exists mvn; then
    echo -e "${RED}❌ Maven is not installed. Please install Maven 3.6 or higher.${NC}"
    exit 1
fi

if ! command_exists node; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 16 or higher.${NC}"
    exit 1
fi

if ! command_exists npm; then
    echo -e "${RED}❌ npm is not installed. Please install npm.${NC}"
    exit 1
fi

if ! command_exists mysql; then
    echo -e "${YELLOW}⚠️  MySQL client not found. Make sure MySQL server is running.${NC}"
fi

echo -e "${GREEN}✅ All prerequisites found!${NC}"
echo ""

# Setup database
echo -e "${BLUE}Setting up database...${NC}"
if command_exists mysql; then
    mysql -u root -p < database/setup.sql
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Database setup completed!${NC}"
    else
        echo -e "${YELLOW}⚠️  Database setup may have failed. Please check MySQL connection.${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Please run the database setup manually: mysql -u root -p < database/setup.sql${NC}"
fi
echo ""

# Function to start a Spring Boot service
start_spring_service() {
    local service_name=$1
    local port=$2
    
    echo -e "${BLUE}Starting $service_name (Port: $port)...${NC}"
    cd backend/$service_name
    
    # Check if target directory exists, if not, build the project
    if [ ! -d "target" ]; then
        echo -e "${YELLOW}Building $service_name...${NC}"
        mvn clean compile
    fi
    
    # Start the service in background
    nohup mvn spring-boot:run > ../../logs/$service_name.log 2>&1 &
    echo $! > ../../logs/$service_name.pid
    
    cd ../..
    echo -e "${GREEN}✅ $service_name started!${NC}"
}

# Create logs directory
mkdir -p logs

# Start backend services
echo -e "${BLUE}Starting Backend Services...${NC}"
echo "================================"

start_spring_service "user-service" 8081
sleep 5

start_spring_service "medicine-service" 8082
sleep 5

start_spring_service "order-service" 8083
sleep 5

start_spring_service "notification-service" 8084
sleep 5

start_spring_service "gateway-service" 8080
sleep 5

echo ""
echo -e "${BLUE}Starting Frontend...${NC}"
echo "==================="

cd frontend

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing frontend dependencies...${NC}"
    npm install
fi

# Start React development server
echo -e "${BLUE}Starting React development server...${NC}"
nohup npm start > ../logs/frontend.log 2>&1 &
echo $! > ../logs/frontend.pid

cd ..

echo ""
echo -e "${GREEN}🎉 PharmaGo Application Started Successfully!${NC}"
echo "============================================="
echo ""
echo -e "${BLUE}📱 Frontend:${NC} http://localhost:3000"
echo -e "${BLUE}🌐 API Gateway:${NC} http://localhost:8080"
echo -e "${BLUE}🔧 User Service:${NC} http://localhost:8081"
echo -e "${BLUE}💊 Medicine Service:${NC} http://localhost:8082"
echo -e "${BLUE}📦 Order Service:${NC} http://localhost:8083"
echo -e "${BLUE}🔔 Notification Service:${NC} http://localhost:8084"
echo ""
echo -e "${YELLOW}📝 Logs are available in the 'logs' directory${NC}"
echo -e "${YELLOW}🛑 To stop all services, run: ./stop-services.sh${NC}"
echo ""
echo -e "${GREEN}Demo Credentials:${NC}"
echo -e "Customer: customer@pharmago.com / password123"
echo -e "Admin: admin@pharmago.com / admin123"
echo ""
echo -e "${BLUE}Enjoy using PharmaGo! 🏥${NC}"