package com.pharmago.service;

import com.pharmago.model.Order;
import com.pharmago.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order createOrder(Order order) {
        order.setOrderDate(java.time.LocalDateTime.now());
        order.setStatus(com.pharmago.model.OrderStatus.PENDING);
        order.getOrderItems().forEach(item -> item.setOrder(order));
        double totalAmount = order.getOrderItems().stream()
                .mapToDouble(item -> item.getPrice().doubleValue() * item.getQuantity())
                .sum();
        order.setTotalAmount(java.math.BigDecimal.valueOf(totalAmount));
        return orderRepository.save(order);
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }
}
