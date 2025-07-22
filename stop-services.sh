#!/bin/bash

# PharmaGo - Stop All Services Script

echo "🛑 Stopping PharmaGo Application..."
echo "==================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to stop a service by PID file
stop_service() {
    local service_name=$1
    local pid_file="logs/$service_name.pid"
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if ps -p $pid > /dev/null 2>&1; then
            echo -e "${BLUE}Stopping $service_name (PID: $pid)...${NC}"
            kill $pid
            
            # Wait for process to terminate
            local count=0
            while ps -p $pid > /dev/null 2>&1 && [ $count -lt 30 ]; do
                sleep 1
                count=$((count + 1))
            done
            
            if ps -p $pid > /dev/null 2>&1; then
                echo -e "${YELLOW}Force killing $service_name...${NC}"
                kill -9 $pid
            fi
            
            echo -e "${GREEN}✅ $service_name stopped!${NC}"
        else
            echo -e "${YELLOW}⚠️  $service_name was not running${NC}"
        fi
        rm -f "$pid_file"
    else
        echo -e "${YELLOW}⚠️  No PID file found for $service_name${NC}"
    fi
}

# Stop all services
echo -e "${BLUE}Stopping Backend Services...${NC}"
stop_service "user-service"
stop_service "medicine-service"
stop_service "order-service"
stop_service "notification-service"
stop_service "gateway-service"

echo ""
echo -e "${BLUE}Stopping Frontend...${NC}"
stop_service "frontend"

# Kill any remaining Java processes for PharmaGo
echo ""
echo -e "${BLUE}Cleaning up remaining processes...${NC}"

# Find and kill any remaining Maven/Spring Boot processes
pkill -f "spring-boot:run"
pkill -f "pharmago"

# Find and kill any React development server
pkill -f "react-scripts"

echo ""
echo -e "${GREEN}🎉 All PharmaGo services stopped successfully!${NC}"
echo ""
echo -e "${BLUE}📝 Log files are preserved in the 'logs' directory${NC}"
echo -e "${BLUE}🔄 To restart the application, run: ./start-services.sh${NC}"