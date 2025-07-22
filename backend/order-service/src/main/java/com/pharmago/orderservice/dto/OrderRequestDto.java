package com.pharmago.orderservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class OrderRequestDto {

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotEmpty(message = "Order items cannot be empty")
    private List<OrderItemDto> orderItems;

    @NotBlank(message = "Shipping address is required")
    private String shippingAddress;

    private String paymentMethod;
    private String prescriptionUrl;
    private String notes;

    // Constructors
    public OrderRequestDto() {}

    public OrderRequestDto(Long userId, List<OrderItemDto> orderItems, String shippingAddress, String paymentMethod) {
        this.userId = userId;
        this.orderItems = orderItems;
        this.shippingAddress = shippingAddress;
        this.paymentMethod = paymentMethod;
    }

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<OrderItemDto> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemDto> orderItems) {
        this.orderItems = orderItems;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getPrescriptionUrl() {
        return prescriptionUrl;
    }

    public void setPrescriptionUrl(String prescriptionUrl) {
        this.prescriptionUrl = prescriptionUrl;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public static class OrderItemDto {
        @NotNull(message = "Medicine ID is required")
        private Long medicineId;

        @NotBlank(message = "Medicine name is required")
        private String medicineName;

        @NotNull(message = "Quantity is required")
        private Integer quantity;

        @NotNull(message = "Price is required")
        private java.math.BigDecimal price;

        // Constructors
        public OrderItemDto() {}

        public OrderItemDto(Long medicineId, String medicineName, Integer quantity, java.math.BigDecimal price) {
            this.medicineId = medicineId;
            this.medicineName = medicineName;
            this.quantity = quantity;
            this.price = price;
        }

        // Getters and Setters
        public Long getMedicineId() {
            return medicineId;
        }

        public void setMedicineId(Long medicineId) {
            this.medicineId = medicineId;
        }

        public String getMedicineName() {
            return medicineName;
        }

        public void setMedicineName(String medicineName) {
            this.medicineName = medicineName;
        }

        public Integer getQuantity() {
            return quantity;
        }

        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }

        public java.math.BigDecimal getPrice() {
            return price;
        }

        public void setPrice(java.math.BigDecimal price) {
            this.price = price;
        }
    }
}