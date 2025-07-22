package com.pharmago.orderservice.repository;

import com.pharmago.orderservice.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    Page<Order> findByUserId(Long userId, Pageable pageable);

    Page<Order> findByStatus(Order.OrderStatus status, Pageable pageable);

    @Query("SELECT o FROM Order o WHERE o.userId = :userId AND o.status = :status")
    Page<Order> findByUserIdAndStatus(@Param("userId") Long userId, 
                                     @Param("status") Order.OrderStatus status, 
                                     Pageable pageable);

    @Query("SELECT o FROM Order o WHERE o.orderDate BETWEEN :startDate AND :endDate")
    List<Order> findByOrderDateBetween(@Param("startDate") LocalDateTime startDate, 
                                      @Param("endDate") LocalDateTime endDate);

    @Query("SELECT COUNT(o) FROM Order o WHERE o.status = :status")
    long countByStatus(@Param("status") Order.OrderStatus status);

    @Query("SELECT COUNT(o) FROM Order o WHERE o.userId = :userId")
    long countByUserId(@Param("userId") Long userId);

    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.status = 'DELIVERED'")
    Double getTotalRevenue();

    @Query("SELECT o FROM Order o WHERE o.status IN ('PENDING', 'CONFIRMED') ORDER BY o.orderDate ASC")
    List<Order> findPendingOrders();
}