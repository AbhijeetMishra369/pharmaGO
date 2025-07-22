package com.pharmago.orderservice.service;

import com.pharmago.orderservice.dto.OrderRequestDto;
import com.pharmago.orderservice.dto.OrderResponseDto;
import com.pharmago.orderservice.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface OrderService {
    OrderResponseDto createOrder(OrderRequestDto orderRequest);
    OrderResponseDto getOrderById(Long id);
    Page<OrderResponseDto> getAllOrders(Pageable pageable);
    Page<OrderResponseDto> getOrdersByUserId(Long userId, Pageable pageable);
    Page<OrderResponseDto> getOrdersByStatus(Order.OrderStatus status, Pageable pageable);
    OrderResponseDto updateOrderStatus(Long id, Order.OrderStatus status);
    OrderResponseDto updatePaymentStatus(Long id, Order.PaymentStatus paymentStatus);
    void cancelOrder(Long id);
    Map<String, Object> getOrderStatistics();
    Page<OrderResponseDto> getOrdersByUserIdAndStatus(Long userId, Order.OrderStatus status, Pageable pageable);
}