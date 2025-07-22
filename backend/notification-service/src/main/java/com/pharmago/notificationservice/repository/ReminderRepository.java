package com.pharmago.notificationservice.repository;

import com.pharmago.notificationservice.entity.Reminder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.List;

@Repository
public interface ReminderRepository extends JpaRepository<Reminder, Long> {

    Page<Reminder> findByUserId(Long userId, Pageable pageable);

    Page<Reminder> findByUserIdAndIsActive(Long userId, Boolean isActive, Pageable pageable);

    List<Reminder> findByMedicineId(Long medicineId);

    @Query("SELECT r FROM Reminder r WHERE r.isActive = true AND :currentTime MEMBER OF r.reminderTimes")
    List<Reminder> findActiveRemindersForTime(@Param("currentTime") LocalTime currentTime);

    @Query("SELECT COUNT(r) FROM Reminder r WHERE r.userId = :userId AND r.isActive = true")
    long countActiveRemindersByUserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(r) FROM Reminder r WHERE r.isActive = true")
    long countActiveReminders();

    List<Reminder> findByIsActiveTrue();

    @Query("SELECT r FROM Reminder r WHERE r.userId = :userId AND r.medicineId = :medicineId AND r.isActive = true")
    List<Reminder> findActiveRemindersByUserAndMedicine(@Param("userId") Long userId, @Param("medicineId") Long medicineId);
}