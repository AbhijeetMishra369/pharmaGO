#!/bin/bash

# ===========================================
# PharmaGo Microservices Testing Script
# ===========================================

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test configuration
GATEWAY_URL="http://localhost:8080"
USER_SERVICE_URL="http://localhost:8081"
MEDICINE_SERVICE_URL="http://localhost:8082"
ORDER_SERVICE_URL="http://localhost:8083"
NOTIFICATION_SERVICE_URL="http://localhost:8084"

# Test results
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Function to print test header
print_header() {
    echo ""
    echo -e "${BLUE}=============================================${NC}"
    echo -e "${BLUE} $1${NC}"
    echo -e "${BLUE}=============================================${NC}"
}

# Function to test endpoint
test_endpoint() {
    local service_name="$1"
    local url="$2"
    local expected_status="$3"
    local description="$4"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    
    echo -n "Testing $description... "
    
    response=$(curl -s -w "%{http_code}" -o /dev/null "$url")
    
    if [ "$response" -eq "$expected_status" ]; then
        echo -e "${GREEN}✓ PASSED${NC} ($response)"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${RED}✗ FAILED${NC} (Expected: $expected_status, Got: $response)"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
}

# Function to test endpoint with JSON response
test_json_endpoint() {
    local service_name="$1"
    local url="$2"
    local description="$3"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    
    echo -n "Testing $description... "
    
    response=$(curl -s -w "%{http_code}" "$url")
    http_code=$(echo "$response" | tail -c 4)
    json_body=$(echo "$response" | head -c -4)
    
    if [ "$http_code" -eq 200 ] || [ "$http_code" -eq 201 ]; then
        if echo "$json_body" | jq . >/dev/null 2>&1; then
            echo -e "${GREEN}✓ PASSED${NC} ($http_code) - Valid JSON"
            PASSED_TESTS=$((PASSED_TESTS + 1))
        else
            echo -e "${YELLOW}⚠ PARTIAL${NC} ($http_code) - Invalid JSON"
            FAILED_TESTS=$((FAILED_TESTS + 1))
        fi
    else
        echo -e "${RED}✗ FAILED${NC} ($http_code)"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
}

# Function to test POST endpoint
test_post_endpoint() {
    local service_name="$1"
    local url="$2"
    local data="$3"
    local expected_status="$4"
    local description="$5"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    
    echo -n "Testing $description... "
    
    response=$(curl -s -w "%{http_code}" -o /dev/null -X POST \
        -H "Content-Type: application/json" \
        -d "$data" \
        "$url")
    
    if [ "$response" -eq "$expected_status" ]; then
        echo -e "${GREEN}✓ PASSED${NC} ($response)"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${RED}✗ FAILED${NC} (Expected: $expected_status, Got: $response)"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
}

# Wait for services to be ready
wait_for_services() {
    echo -e "${YELLOW}Waiting for services to be ready...${NC}"
    
    services=(
        "Gateway:$GATEWAY_URL"
        "User Service:$USER_SERVICE_URL"
        "Medicine Service:$MEDICINE_SERVICE_URL"
        "Order Service:$ORDER_SERVICE_URL"
        "Notification Service:$NOTIFICATION_SERVICE_URL"
    )
    
    for service in "${services[@]}"; do
        IFS=':' read -r name url <<< "$service"
        echo -n "Checking $name... "
        
        max_attempts=30
        attempt=0
        
        while [ $attempt -lt $max_attempts ]; do
            if curl -s -f "$url/actuator/health" >/dev/null 2>&1 || curl -s -f "$url" >/dev/null 2>&1; then
                echo -e "${GREEN}✓ Ready${NC}"
                break
            fi
            
            sleep 2
            attempt=$((attempt + 1))
            
            if [ $attempt -eq $max_attempts ]; then
                echo -e "${RED}✗ Not ready after ${max_attempts} attempts${NC}"
            fi
        done
    done
    
    echo ""
    sleep 3
}

# Main testing function
run_tests() {
    print_header "PharmaGo Microservices Testing"
    
    wait_for_services
    
    # ===========================================
    # Test Gateway Service
    # ===========================================
    print_header "Gateway Service Tests"
    
    test_endpoint "Gateway" "$GATEWAY_URL/actuator/health" 200 "Gateway health check"
    test_json_endpoint "Gateway" "$GATEWAY_URL/api/medicines" "Gateway routing to Medicine Service"
    
    # ===========================================
    # Test User Service
    # ===========================================
    print_header "User Service Tests"
    
    test_endpoint "User Service" "$USER_SERVICE_URL/actuator/health" 200 "User Service health check"
    test_json_endpoint "User Service" "$USER_SERVICE_URL/api/users/statistics" "User statistics endpoint"
    
    # Test user registration
    user_data='{"name":"Test User","email":"test@example.com","contactNumber":"+1234567899","password":"password123","confirmPassword":"password123","address":"123 Test St","city":"Test City","state":"TS","postalCode":"12345"}'
    test_post_endpoint "User Service" "$USER_SERVICE_URL/api/auth/signup" "$user_data" 200 "User registration"
    
    # ===========================================
    # Test Medicine Service
    # ===========================================
    print_header "Medicine Service Tests"
    
    test_endpoint "Medicine Service" "$MEDICINE_SERVICE_URL/actuator/health" 200 "Medicine Service health check"
    test_json_endpoint "Medicine Service" "$MEDICINE_SERVICE_URL/api/medicines" "Get all medicines"
    test_json_endpoint "Medicine Service" "$MEDICINE_SERVICE_URL/api/medicines/categories" "Get medicine categories"
    test_json_endpoint "Medicine Service" "$MEDICINE_SERVICE_URL/api/medicines/manufacturers" "Get manufacturers"
    test_endpoint "Medicine Service" "$MEDICINE_SERVICE_URL/api/medicines/1" 200 "Get medicine by ID"
    
    # Test medicine creation
    medicine_data='{"name":"Test Medicine","description":"Test description","category":"Test Category","manufacturer":"Test Manufacturer","price":10.99,"stockQuantity":50,"requiresPrescription":false,"dosage":"10mg","sideEffects":"None","usageInstructions":"Take as needed"}'
    test_post_endpoint "Medicine Service" "$MEDICINE_SERVICE_URL/api/medicines" "$medicine_data" 200 "Create medicine"
    
    # ===========================================
    # Test Order Service
    # ===========================================
    print_header "Order Service Tests"
    
    test_endpoint "Order Service" "$ORDER_SERVICE_URL/actuator/health" 200 "Order Service health check"
    test_json_endpoint "Order Service" "$ORDER_SERVICE_URL/api/orders" "Get all orders"
    test_json_endpoint "Order Service" "$ORDER_SERVICE_URL/api/orders/statistics" "Order statistics"
    test_json_endpoint "Order Service" "$ORDER_SERVICE_URL/api/orders/user/2" "Get orders by user ID"
    
    # Test order creation
    order_data='{"userId":2,"orderItems":[{"medicineId":1,"medicineName":"Test Medicine","quantity":2,"price":10.99}],"shippingAddress":"123 Test Address","paymentMethod":"Credit Card","notes":"Test order"}'
    test_post_endpoint "Order Service" "$ORDER_SERVICE_URL/api/orders" "$order_data" 201 "Create order"
    
    # ===========================================
    # Test Notification Service
    # ===========================================
    print_header "Notification Service Tests"
    
    test_endpoint "Notification Service" "$NOTIFICATION_SERVICE_URL/actuator/health" 200 "Notification Service health check"
    test_json_endpoint "Notification Service" "$NOTIFICATION_SERVICE_URL/api/reminders" "Get all reminders"
    test_json_endpoint "Notification Service" "$NOTIFICATION_SERVICE_URL/api/reminders/statistics" "Reminder statistics"
    test_json_endpoint "Notification Service" "$NOTIFICATION_SERVICE_URL/api/reminders/user/2" "Get reminders by user ID"
    
    # Test reminder creation
    reminder_data='{"userId":2,"medicineId":1,"medicineName":"Test Medicine","dosage":"10mg","frequency":"Once daily","startDate":"2024-01-01T08:00:00","reminderTimes":["08:00:00"],"notes":"Test reminder"}'
    test_post_endpoint "Notification Service" "$NOTIFICATION_SERVICE_URL/api/reminders" "$reminder_data" 201 "Create reminder"
    
    # ===========================================
    # Test Gateway Routing
    # ===========================================
    print_header "Gateway Routing Tests"
    
    test_json_endpoint "Gateway" "$GATEWAY_URL/api/medicines" "Gateway -> Medicine Service routing"
    test_json_endpoint "Gateway" "$GATEWAY_URL/api/orders" "Gateway -> Order Service routing"
    test_json_endpoint "Gateway" "$GATEWAY_URL/api/reminders" "Gateway -> Notification Service routing"
    test_json_endpoint "Gateway" "$GATEWAY_URL/api/users/statistics" "Gateway -> User Service routing"
    
    # ===========================================
    # Integration Tests
    # ===========================================
    print_header "Integration Tests"
    
    # Test complete workflow through gateway
    test_endpoint "Integration" "$GATEWAY_URL/api/medicines/1" 200 "Get specific medicine through gateway"
    test_endpoint "Integration" "$GATEWAY_URL/api/orders/user/2" 200 "Get user orders through gateway"
    test_endpoint "Integration" "$GATEWAY_URL/api/reminders/user/2" 200 "Get user reminders through gateway"
}

# Function to print final results
print_results() {
    print_header "Test Results Summary"
    
    echo ""
    echo -e "Total Tests: ${BLUE}$TOTAL_TESTS${NC}"
    echo -e "Passed:      ${GREEN}$PASSED_TESTS${NC}"
    echo -e "Failed:      ${RED}$FAILED_TESTS${NC}"
    echo ""
    
    if [ $FAILED_TESTS -eq 0 ]; then
        echo -e "${GREEN}🎉 All tests passed! PharmaGo microservices are working correctly.${NC}"
        exit 0
    else
        echo -e "${RED}❌ Some tests failed. Please check the services and try again.${NC}"
        exit 1
    fi
}

# Check if required tools are installed
check_requirements() {
    if ! command -v curl &> /dev/null; then
        echo -e "${RED}❌ curl is required but not installed. Please install curl.${NC}"
        exit 1
    fi
    
    if ! command -v jq &> /dev/null; then
        echo -e "${YELLOW}⚠ jq is not installed. JSON validation will be skipped.${NC}"
        echo "To install jq: sudo apt-get install jq (Ubuntu/Debian) or brew install jq (macOS)"
        echo ""
    fi
}

# Main execution
main() {
    echo -e "${BLUE}"
    echo "================================================"
    echo "     PharmaGo Microservices Test Suite"
    echo "================================================"
    echo -e "${NC}"
    
    check_requirements
    run_tests
    print_results
}

# Run the tests
main