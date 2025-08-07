package com.pharmago.common.constants;

/**
 * Application-wide constants for PharmaGo
 */
public final class PharmaGoConstants {
    
    // Private constructor to prevent instantiation
    private PharmaGoConstants() {
        throw new UnsupportedOperationException("This is a utility class and cannot be instantiated");
    }
    
    // API Version
    public static final String API_VERSION = "v1";
    public static final String API_BASE_PATH = "/api/" + API_VERSION;
    
    // User Roles
    public static final String ROLE_CUSTOMER = "CUSTOMER";
    public static final String ROLE_ADMIN = "ADMIN";
    public static final String ROLE_PHARMACIST = "PHARMACIST";
    
    // JWT Constants
    public static final String JWT_HEADER = "Authorization";
    public static final String JWT_TOKEN_PREFIX = "Bearer ";
    
    // Order Status
    public static final String ORDER_STATUS_PENDING = "PENDING";
    public static final String ORDER_STATUS_CONFIRMED = "CONFIRMED";
    public static final String ORDER_STATUS_PROCESSING = "PROCESSING";
    public static final String ORDER_STATUS_SHIPPED = "SHIPPED";
    public static final String ORDER_STATUS_DELIVERED = "DELIVERED";
    public static final String ORDER_STATUS_CANCELLED = "CANCELLED";
    
    // Medicine Categories
    public static final String MEDICINE_CATEGORY_PRESCRIPTION = "PRESCRIPTION";
    public static final String MEDICINE_CATEGORY_OTC = "OTC"; // Over The Counter
    public static final String MEDICINE_CATEGORY_SUPPLEMENT = "SUPPLEMENT";
    
    // Medicine Status
    public static final String MEDICINE_STATUS_AVAILABLE = "AVAILABLE";
    public static final String MEDICINE_STATUS_OUT_OF_STOCK = "OUT_OF_STOCK";
    public static final String MEDICINE_STATUS_EXPIRED = "EXPIRED";
    public static final String MEDICINE_STATUS_DISCONTINUED = "DISCONTINUED";
    
    // Notification Types
    public static final String NOTIFICATION_TYPE_EMAIL = "EMAIL";
    public static final String NOTIFICATION_TYPE_SMS = "SMS";
    public static final String NOTIFICATION_TYPE_PUSH = "PUSH";
    
    // Email Templates
    public static final String EMAIL_TEMPLATE_REGISTRATION = "registration";
    public static final String EMAIL_TEMPLATE_PASSWORD_RESET = "password-reset";
    public static final String EMAIL_TEMPLATE_ORDER_CONFIRMATION = "order-confirmation";
    public static final String EMAIL_TEMPLATE_ORDER_STATUS_UPDATE = "order-status-update";
    public static final String EMAIL_TEMPLATE_MEDICINE_REMINDER = "medicine-reminder";
    
    // File Upload
    public static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    public static final String[] ALLOWED_IMAGE_EXTENSIONS = {"jpg", "jpeg", "png", "gif"};
    public static final String[] ALLOWED_DOCUMENT_EXTENSIONS = {"pdf", "doc", "docx"};
    
    // Pagination
    public static final int DEFAULT_PAGE_SIZE = 20;
    public static final int MAX_PAGE_SIZE = 100;
    public static final String DEFAULT_SORT_DIRECTION = "ASC";
    
    // Cache Names
    public static final String CACHE_MEDICINES = "medicines";
    public static final String CACHE_USERS = "users";
    public static final String CACHE_ORDERS = "orders";
    
    // Error Codes
    public static final String ERROR_USER_NOT_FOUND = "USER_NOT_FOUND";
    public static final String ERROR_MEDICINE_NOT_FOUND = "MEDICINE_NOT_FOUND";
    public static final String ERROR_ORDER_NOT_FOUND = "ORDER_NOT_FOUND";
    public static final String ERROR_INVALID_CREDENTIALS = "INVALID_CREDENTIALS";
    public static final String ERROR_INSUFFICIENT_STOCK = "INSUFFICIENT_STOCK";
    public static final String ERROR_PRESCRIPTION_REQUIRED = "PRESCRIPTION_REQUIRED";
    public static final String ERROR_EXPIRED_MEDICINE = "EXPIRED_MEDICINE";
    
    // Date Formats
    public static final String DATE_FORMAT = "yyyy-MM-dd";
    public static final String DATETIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    public static final String TIME_ZONE = "UTC";
    
    // Validation Messages
    public static final String VALIDATION_EMAIL_INVALID = "Please provide a valid email address";
    public static final String VALIDATION_PASSWORD_WEAK = "Password must be at least 8 characters long";
    public static final String VALIDATION_PHONE_INVALID = "Please provide a valid phone number";
    public static final String VALIDATION_REQUIRED_FIELD = "This field is required";
}