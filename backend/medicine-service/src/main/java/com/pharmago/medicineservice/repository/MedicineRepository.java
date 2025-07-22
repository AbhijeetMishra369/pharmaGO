package com.pharmago.medicineservice.repository;

import com.pharmago.medicineservice.entity.Medicine;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    Page<Medicine> findByIsActiveTrue(Pageable pageable);

    Page<Medicine> findByCategory(String category, Pageable pageable);

    Page<Medicine> findByManufacturer(String manufacturer, Pageable pageable);

    @Query("SELECT m FROM Medicine m WHERE m.isActive = true AND " +
           "(:name IS NULL OR LOWER(m.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
           "(:category IS NULL OR m.category = :category) AND " +
           "(:manufacturer IS NULL OR m.manufacturer = :manufacturer) AND " +
           "(:requiresPrescription IS NULL OR m.requiresPrescription = :requiresPrescription)")
    Page<Medicine> findMedicinesWithFilters(@Param("name") String name,
                                          @Param("category") String category,
                                          @Param("manufacturer") String manufacturer,
                                          @Param("requiresPrescription") Boolean requiresPrescription,
                                          Pageable pageable);

    @Query("SELECT DISTINCT m.category FROM Medicine m WHERE m.isActive = true ORDER BY m.category")
    List<String> findDistinctCategories();

    @Query("SELECT DISTINCT m.manufacturer FROM Medicine m WHERE m.isActive = true ORDER BY m.manufacturer")
    List<String> findDistinctManufacturers();

    @Query("SELECT m FROM Medicine m WHERE m.expiryDate < :currentDate AND m.isActive = true")
    List<Medicine> findExpiredMedicines(@Param("currentDate") LocalDateTime currentDate);

    @Query("SELECT m FROM Medicine m WHERE m.stockQuantity <= 10 AND m.isActive = true")
    List<Medicine> findLowStockMedicines();

    @Query("SELECT COUNT(m) FROM Medicine m WHERE m.isActive = true")
    long countActiveMedicines();
}