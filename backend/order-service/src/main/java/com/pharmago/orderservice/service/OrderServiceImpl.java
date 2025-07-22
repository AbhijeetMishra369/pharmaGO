package com.pharmago.orderservice.service;

import com.pharmago.orderservice.dto.OrderRequestDto;
import com.pharmago.orderservice.dto.OrderResponseDto;
import com.pharmago.orderservice.entity.Order;
import com.pharmago.orderservice.entity.OrderItem;
import com.pharmago.orderservice.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public OrderResponseDto createOrder(OrderRequestDto orderRequest) {
        Order order = new Order();
        order.setUserId(orderRequest.getUserId());
        order.setShippingAddress(orderRequest.getShippingAddress());
        order.setPaymentMethod(orderRequest.getPaymentMethod());
        order.setPrescriptionUrl(orderRequest.getPrescriptionUrl());
        order.setNotes(orderRequest.getNotes());
        order.setStatus(Order.OrderStatus.PENDING);
        order.setPaymentStatus(Order.PaymentStatus.PENDING);
        order.setOrderDate(LocalDateTime.now());

        // Create order items
        List<OrderItem> orderItems = orderRequest.getOrderItems().stream()
                .map(itemDto -> new OrderItem(order, itemDto.getMedicineId(), 
                                            itemDto.getMedicineName(), 
                                            itemDto.getQuantity(), 
                                            itemDto.getPrice()))
                .collect(Collectors.toList());

        order.setOrderItems(orderItems);

        // Calculate total amount
        BigDecimal totalAmount = orderItems.stream()
                .map(OrderItem::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        order.setTotalAmount(totalAmount);

        Order savedOrder = orderRepository.save(order);
        return new OrderResponseDto(savedOrder);
    }

    @Override
    public OrderResponseDto getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        return new OrderResponseDto(order);
    }

    @Override
    public Page<OrderResponseDto> getAllOrders(Pageable pageable) {
        Page<Order> orders = orderRepository.findAll(pageable);
        return orders.map(OrderResponseDto::new);
    }

    @Override
    public Page<OrderResponseDto> getOrdersByUserId(Long userId, Pageable pageable) {
        Page<Order> orders = orderRepository.findByUserId(userId, pageable);
        return orders.map(OrderResponseDto::new);
    }

    @Override
    public Page<OrderResponseDto> getOrdersByStatus(Order.OrderStatus status, Pageable pageable) {
        Page<Order> orders = orderRepository.findByStatus(status, pageable);
        return orders.map(OrderResponseDto::new);
    }

    @Override
    public Page<OrderResponseDto> getOrdersByUserIdAndStatus(Long userId, Order.OrderStatus status, Pageable pageable) {
        Page<Order> orders = orderRepository.findByUserIdAndStatus(userId, status, pageable);
        return orders.map(OrderResponseDto::new);
    }

    @Override
    public OrderResponseDto updateOrderStatus(Long id, Order.OrderStatus status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        
        order.setStatus(status);
        
        // Set delivery date if order is delivered
        if (status == Order.OrderStatus.DELIVERED) {
            order.setDeliveryDate(LocalDateTime.now());
        }
        
        Order updatedOrder = orderRepository.save(order);
        return new OrderResponseDto(updatedOrder);
    }

    @Override
    public OrderResponseDto updatePaymentStatus(Long id, Order.PaymentStatus paymentStatus) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        
        order.setPaymentStatus(paymentStatus);
        
        // Auto-confirm order if payment is successful
        if (paymentStatus == Order.PaymentStatus.PAID && order.getStatus() == Order.OrderStatus.PENDING) {
            order.setStatus(Order.OrderStatus.CONFIRMED);
        }
        
        Order updatedOrder = orderRepository.save(order);
        return new OrderResponseDto(updatedOrder);
    }

    @Override
    public void cancelOrder(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        
        if (order.getStatus() == Order.OrderStatus.SHIPPED || order.getStatus() == Order.OrderStatus.DELIVERED) {
            throw new RuntimeException("Cannot cancel order that has been shipped or delivered");
        }
        
        order.setStatus(Order.OrderStatus.CANCELLED);
        orderRepository.save(order);
    }

    @Override
    public Map<String, Object> getOrderStatistics() {
        Map<String, Object> stats = new HashMap<>();
        
        stats.put("totalOrders", orderRepository.count());
        stats.put("pendingOrders", orderRepository.countByStatus(Order.OrderStatus.PENDING));
        stats.put("confirmedOrders", orderRepository.countByStatus(Order.OrderStatus.CONFIRMED));
        stats.put("processingOrders", orderRepository.countByStatus(Order.OrderStatus.PROCESSING));
        stats.put("shippedOrders", orderRepository.countByStatus(Order.OrderStatus.SHIPPED));
        stats.put("deliveredOrders", orderRepository.countByStatus(Order.OrderStatus.DELIVERED));
        stats.put("cancelledOrders", orderRepository.countByStatus(Order.OrderStatus.CANCELLED));
        
        Double totalRevenue = orderRepository.getTotalRevenue();
        stats.put("totalRevenue", totalRevenue != null ? totalRevenue : 0.0);
        
        return stats;
    }
}