#!/bin/bash

# PharmaGo Build All Services Script
# This script builds all microservices and the frontend

set -e

echo "🚀 Building PharmaGo Application..."

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

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    print_error "Maven is not installed. Please install Maven first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Navigate to project root
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

print_status "Project root: $PROJECT_ROOT"

# Build shared common module first
print_status "Building shared-common module..."
cd pharmago-backend/shared-common
if mvn clean install -DskipTests; then
    print_success "Shared-common module built successfully"
else
    print_error "Failed to build shared-common module"
    exit 1
fi

cd "$PROJECT_ROOT"

# Build all microservices
SERVICES=("user-service" "medicine-service" "order-service" "notification-service" "api-gateway")

for service in "${SERVICES[@]}"; do
    print_status "Building $service..."
    cd "pharmago-backend/$service"
    
    if mvn clean package -DskipTests; then
        print_success "$service built successfully"
    else
        print_error "Failed to build $service"
        exit 1
    fi
    
    cd "$PROJECT_ROOT"
done

# Build frontend
print_status "Building React frontend..."
cd pharmago-frontend

if npm install; then
    print_success "Frontend dependencies installed successfully"
else
    print_error "Failed to install frontend dependencies"
    exit 1
fi

if npm run build; then
    print_success "Frontend built successfully"
else
    print_error "Failed to build frontend"
    exit 1
fi

cd "$PROJECT_ROOT"

print_success "🎉 All components built successfully!"
print_status "You can now run the application using:"
print_status "  - Docker: cd docker-compose && docker-compose up"
print_status "  - Local: Use individual scripts in the scripts/ directory"