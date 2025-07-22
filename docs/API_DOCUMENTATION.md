# PharmaGo API Documentation

## Overview
PharmaGo is a microservices-based online medicine delivery platform with the following services:

- **Gateway Service** (Port 8080): Main entry point for all API requests
- **User Service** (Port 8081): User management and authentication
- **Medicine Service** (Port 8082): Medicine catalog and inventory management
- **Order Service** (Port 8083): Order processing and management
- **Notification Service** (Port 8084): Reminders and notifications

## Base URLs
- **Gateway (Recommended)**: `http://localhost:8080`
- **Direct Service Access**:
  - User Service: `http://localhost:8081`
  - Medicine Service: `http://localhost:8082`
  - Order Service: `http://localhost:8083`
  - Notification Service: `http://localhost:8084`

---

## Authentication

### POST `/api/auth/signin`
User login endpoint.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "id": 1,
  "name": "John Doe",
  "email": "user@example.com",
  "role": "CUSTOMER"
}
```

### POST `/api/auth/signup`
User registration endpoint.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "contactNumber": "+1234567890",
  "password": "password123",
  "confirmPassword": "password123",
  "address": "123 Main St",
  "city": "City",
  "state": "State",
  "postalCode": "12345"
}
```

---

## User Management

### GET `/api/users/profile`
Get current user profile (requires authentication).

### GET `/api/users`
Get all users (Admin only).

**Query Parameters:**
- `page`: Page number (default: 0)
- `size`: Page size (default: 10)
- `sortBy`: Sort field (default: id)
- `sortDir`: Sort direction (asc/desc, default: desc)
- `name`: Filter by name
- `email`: Filter by email
- `role`: Filter by role (CUSTOMER/ADMIN)
- `isActive`: Filter by active status

### GET `/api/users/{id}`
Get user by ID (Admin only).

### PUT `/api/users/{id}`
Update user (Admin only).

### DELETE `/api/users/{id}`
Deactivate user (Admin only).

### GET `/api/users/statistics`
Get user statistics (Admin only).

**Response:**
```json
{
  "totalUsers": 150,
  "totalCustomers": 140,
  "totalAdmins": 10,
  "activeUsers": 145,
  "verifiedUsers": 130
}
```

---

## Medicine Management

### GET `/api/medicines`
Get all medicines with filtering and pagination.

**Query Parameters:**
- `page`: Page number (default: 0)
- `size`: Page size (default: 10)
- `sortBy`: Sort field (default: name)
- `sortDir`: Sort direction (asc/desc, default: asc)
- `name`: Filter by medicine name
- `category`: Filter by category
- `manufacturer`: Filter by manufacturer
- `requiresPrescription`: Filter by prescription requirement (true/false)

**Response:**
```json
{
  "content": [
    {
      "id": 1,
      "name": "Paracetamol 500mg",
      "description": "Pain reliever and fever reducer",
      "category": "Pain Relief",
      "manufacturer": "PharmaCorp",
      "price": 5.99,
      "stockQuantity": 100,
      "expiryDate": "2025-12-31T23:59:59",
      "requiresPrescription": false,
      "dosage": "500mg",
      "sideEffects": "Nausea, stomach upset",
      "usageInstructions": "Take 1-2 tablets every 4-6 hours as needed",
      "imageUrl": "/images/paracetamol.jpg",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00",
      "updatedAt": "2024-01-01T00:00:00"
    }
  ],
  "pageable": {...},
  "totalElements": 6,
  "totalPages": 1
}
```

### GET `/api/medicines/{id}`
Get medicine by ID.

### POST `/api/medicines`
Create new medicine (Admin only).

**Request Body:**
```json
{
  "name": "Aspirin 325mg",
  "description": "Pain reliever and anti-inflammatory",
  "category": "Pain Relief",
  "manufacturer": "HealthCorp",
  "price": 8.99,
  "stockQuantity": 75,
  "expiryDate": "2025-10-15T23:59:59",
  "requiresPrescription": false,
  "dosage": "325mg",
  "sideEffects": "Stomach irritation, bleeding risk",
  "usageInstructions": "Take with food, 1-2 tablets every 4 hours",
  "imageUrl": "/images/aspirin.jpg"
}
```

### PUT `/api/medicines/{id}`
Update medicine (Admin only).

### DELETE `/api/medicines/{id}`
Deactivate medicine (Admin only).

### GET `/api/medicines/categories`
Get all distinct medicine categories.

### GET `/api/medicines/manufacturers`
Get all distinct manufacturers.

### GET `/api/medicines/expired`
Get expired medicines (Admin only).

### GET `/api/medicines/low-stock`
Get low stock medicines (Admin only).

### GET `/api/medicines/search`
Search medicines by name.

**Query Parameters:**
- `query`: Search term
- `page`: Page number (default: 0)
- `size`: Page size (default: 10)

---

## Order Management

### GET `/api/orders`
Get all orders (Admin only).

**Query Parameters:**
- `page`: Page number (default: 0)
- `size`: Page size (default: 10)
- `sortBy`: Sort field (default: orderDate)
- `sortDir`: Sort direction (asc/desc, default: desc)

### GET `/api/orders/{id}`
Get order by ID.

### POST `/api/orders`
Create new order.

**Request Body:**
```json
{
  "userId": 2,
  "orderItems": [
    {
      "medicineId": 1,
      "medicineName": "Paracetamol 500mg",
      "quantity": 2,
      "price": 5.99
    },
    {
      "medicineId": 3,
      "medicineName": "Ibuprofen 400mg",
      "quantity": 1,
      "price": 7.25
    }
  ],
  "shippingAddress": "123 Main St, City, State 12345",
  "paymentMethod": "Credit Card",
  "prescriptionUrl": "https://example.com/prescription.jpg",
  "notes": "Please deliver in the evening"
}
```

**Response:**
```json
{
  "id": 4,
  "userId": 2,
  "orderItems": [
    {
      "id": 7,
      "medicineId": 1,
      "medicineName": "Paracetamol 500mg",
      "quantity": 2,
      "price": 5.99,
      "subtotal": 11.98
    },
    {
      "id": 8,
      "medicineId": 3,
      "medicineName": "Ibuprofen 400mg",
      "quantity": 1,
      "price": 7.25,
      "subtotal": 7.25
    }
  ],
  "totalAmount": 19.23,
  "status": "PENDING",
  "shippingAddress": "123 Main St, City, State 12345",
  "paymentMethod": "Credit Card",
  "paymentStatus": "PENDING",
  "orderDate": "2024-01-25T15:30:00",
  "createdAt": "2024-01-25T15:30:00",
  "updatedAt": "2024-01-25T15:30:00"
}
```

### GET `/api/orders/user/{userId}`
Get orders by user ID.

### GET `/api/orders/status/{status}`
Get orders by status.

**Valid Status Values:**
- PENDING
- CONFIRMED
- PROCESSING
- SHIPPED
- DELIVERED
- CANCELLED

### GET `/api/orders/user/{userId}/status/{status}`
Get orders by user ID and status.

### PUT `/api/orders/{id}/status`
Update order status (Admin only).

**Query Parameters:**
- `status`: New status (PENDING/CONFIRMED/PROCESSING/SHIPPED/DELIVERED/CANCELLED)

### PUT `/api/orders/{id}/payment-status`
Update payment status (Admin only).

**Query Parameters:**
- `paymentStatus`: New payment status (PENDING/PAID/FAILED/REFUNDED)

### DELETE `/api/orders/{id}`
Cancel order.

### GET `/api/orders/statistics`
Get order statistics (Admin only).

**Response:**
```json
{
  "totalOrders": 45,
  "pendingOrders": 8,
  "confirmedOrders": 12,
  "processingOrders": 5,
  "shippedOrders": 7,
  "deliveredOrders": 10,
  "cancelledOrders": 3,
  "totalRevenue": 2847.65
}
```

---

## Reminder Management

### GET `/api/reminders`
Get all reminders (Admin only).

**Query Parameters:**
- `page`: Page number (default: 0)
- `size`: Page size (default: 10)
- `sortBy`: Sort field (default: createdAt)
- `sortDir`: Sort direction (asc/desc, default: desc)

### GET `/api/reminders/{id}`
Get reminder by ID.

### POST `/api/reminders`
Create new reminder.

**Request Body:**
```json
{
  "userId": 2,
  "medicineId": 1,
  "medicineName": "Paracetamol 500mg",
  "dosage": "500mg",
  "frequency": "Twice daily",
  "startDate": "2024-01-01T08:00:00",
  "endDate": "2024-01-15T08:00:00",
  "reminderTimes": ["08:00:00", "20:00:00"],
  "notes": "Take with food"
}
```

**Response:**
```json
{
  "id": 4,
  "userId": 2,
  "medicineId": 1,
  "medicineName": "Paracetamol 500mg",
  "dosage": "500mg",
  "frequency": "Twice daily",
  "startDate": "2024-01-01T08:00:00",
  "endDate": "2024-01-15T08:00:00",
  "reminderTimes": ["08:00:00", "20:00:00"],
  "isActive": true,
  "notes": "Take with food",
  "createdAt": "2024-01-25T15:30:00",
  "updatedAt": "2024-01-25T15:30:00"
}
```

### GET `/api/reminders/user/{userId}`
Get reminders by user ID.

### GET `/api/reminders/user/{userId}/active`
Get active reminders by user ID.

### PUT `/api/reminders/{id}`
Update reminder.

### DELETE `/api/reminders/{id}`
Delete reminder.

### PUT `/api/reminders/{id}/deactivate`
Deactivate reminder.

### PUT `/api/reminders/{id}/activate`
Activate reminder.

### GET `/api/reminders/statistics`
Get reminder statistics (Admin only).

**Response:**
```json
{
  "totalReminders": 25,
  "activeReminders": 18
}
```

### POST `/api/reminders/process`
Manually trigger reminder processing (Admin only).

---

## Health Checks

All services provide health check endpoints:

### GET `/actuator/health`
Get service health status.

**Response:**
```json
{
  "status": "UP",
  "components": {
    "db": {
      "status": "UP",
      "details": {
        "database": "MySQL",
        "validationQuery": "isValid()"
      }
    },
    "diskSpace": {
      "status": "UP",
      "details": {
        "total": 250685575168,
        "free": 125685575168,
        "threshold": 10485760,
        "exists": true
      }
    }
  }
}
```

---

## Error Responses

All endpoints return consistent error responses:

### 400 Bad Request
```json
{
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "errors": {
    "email": "Please provide a valid email address",
    "password": "Password is required"
  },
  "timestamp": "2024-01-25T15:30:00"
}
```

### 401 Unauthorized
```json
{
  "status": 401,
  "error": "Unauthorized",
  "message": "Access denied. Please provide a valid token.",
  "path": "/api/users/profile"
}
```

### 404 Not Found
```json
{
  "status": 404,
  "error": "Not Found",
  "message": "User not found with id: 999",
  "timestamp": "2024-01-25T15:30:00"
}
```

### 500 Internal Server Error
```json
{
  "status": 500,
  "error": "Internal Server Error",
  "message": "An unexpected error occurred",
  "timestamp": "2024-01-25T15:30:00"
}
```

---

## Sample Usage Examples

### 1. User Registration and Login
```bash
# Register a new user
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "contactNumber": "+1234567890",
    "password": "password123",
    "confirmPassword": "password123",
    "address": "123 Main St",
    "city": "City",
    "state": "State",
    "postalCode": "12345"
  }'

# Login
curl -X POST http://localhost:8080/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

### 2. Browse Medicines
```bash
# Get all medicines
curl http://localhost:8080/api/medicines

# Search for pain relief medicines
curl "http://localhost:8080/api/medicines?category=Pain Relief"

# Search by name
curl "http://localhost:8080/api/medicines/search?query=paracetamol"
```

### 3. Place an Order
```bash
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 2,
    "orderItems": [
      {
        "medicineId": 1,
        "medicineName": "Paracetamol 500mg",
        "quantity": 2,
        "price": 5.99
      }
    ],
    "shippingAddress": "123 Main St, City, State 12345",
    "paymentMethod": "Credit Card"
  }'
```

### 4. Set Medicine Reminder
```bash
curl -X POST http://localhost:8080/api/reminders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 2,
    "medicineId": 1,
    "medicineName": "Paracetamol 500mg",
    "dosage": "500mg",
    "frequency": "Twice daily",
    "startDate": "2024-01-01T08:00:00",
    "reminderTimes": ["08:00:00", "20:00:00"]
  }'
```

---

## Testing

Use the provided test script to verify all services:

```bash
./test-all-services.sh
```

This will run comprehensive tests on all endpoints and verify the microservices are working correctly.