package com.pharmago.medicineservice.controller;

import com.pharmago.medicineservice.entity.Medicine;
import com.pharmago.medicineservice.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "*", maxAge = 3600)
public class MedicineController {

    @Autowired
    private MedicineRepository medicineRepository;

    @GetMapping
    public ResponseEntity<Page<Medicine>> getAllMedicines(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String manufacturer,
            @RequestParam(required = false) Boolean requiresPrescription) {

        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
            Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Medicine> medicines;
        
        if (name != null || category != null || manufacturer != null || requiresPrescription != null) {
            medicines = medicineRepository.findMedicinesWithFilters(name, category, manufacturer, requiresPrescription, pageable);
        } else {
            medicines = medicineRepository.findByIsActiveTrue(pageable);
        }

        return ResponseEntity.ok(medicines);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medicine> getMedicineById(@PathVariable Long id) {
        Optional<Medicine> medicine = medicineRepository.findById(id);
        return medicine.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Medicine> createMedicine(@RequestBody Medicine medicine) {
        Medicine savedMedicine = medicineRepository.save(medicine);
        return ResponseEntity.ok(savedMedicine);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Medicine> updateMedicine(@PathVariable Long id, @RequestBody Medicine medicineDetails) {
        Optional<Medicine> optionalMedicine = medicineRepository.findById(id);
        
        if (optionalMedicine.isPresent()) {
            Medicine medicine = optionalMedicine.get();
            medicine.setName(medicineDetails.getName());
            medicine.setDescription(medicineDetails.getDescription());
            medicine.setCategory(medicineDetails.getCategory());
            medicine.setManufacturer(medicineDetails.getManufacturer());
            medicine.setPrice(medicineDetails.getPrice());
            medicine.setStockQuantity(medicineDetails.getStockQuantity());
            medicine.setExpiryDate(medicineDetails.getExpiryDate());
            medicine.setRequiresPrescription(medicineDetails.getRequiresPrescription());
            medicine.setDosage(medicineDetails.getDosage());
            medicine.setSideEffects(medicineDetails.getSideEffects());
            medicine.setUsageInstructions(medicineDetails.getUsageInstructions());
            medicine.setImageUrl(medicineDetails.getImageUrl());
            
            Medicine updatedMedicine = medicineRepository.save(medicine);
            return ResponseEntity.ok(updatedMedicine);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMedicine(@PathVariable Long id) {
        Optional<Medicine> medicine = medicineRepository.findById(id);
        
        if (medicine.isPresent()) {
            Medicine med = medicine.get();
            med.setIsActive(false);
            medicineRepository.save(med);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Medicine deactivated successfully");
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        List<String> categories = medicineRepository.findDistinctCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/manufacturers")
    public ResponseEntity<List<String>> getManufacturers() {
        List<String> manufacturers = medicineRepository.findDistinctManufacturers();
        return ResponseEntity.ok(manufacturers);
    }

    @GetMapping("/expired")
    public ResponseEntity<List<Medicine>> getExpiredMedicines() {
        List<Medicine> expiredMedicines = medicineRepository.findExpiredMedicines(LocalDateTime.now());
        return ResponseEntity.ok(expiredMedicines);
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<Medicine>> getLowStockMedicines() {
        List<Medicine> lowStockMedicines = medicineRepository.findLowStockMedicines();
        return ResponseEntity.ok(lowStockMedicines);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Medicine>> searchMedicines(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<Medicine> medicines = medicineRepository.findMedicinesWithFilters(query, null, null, null, pageable);
        return ResponseEntity.ok(medicines);
    }
}