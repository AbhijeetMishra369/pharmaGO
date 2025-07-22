package com.pharmago.notificationservice.controller;

import com.pharmago.notificationservice.dto.ReminderRequestDto;
import com.pharmago.notificationservice.dto.ReminderResponseDto;
import com.pharmago.notificationservice.service.ReminderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/reminders")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ReminderController {

    @Autowired
    private ReminderService reminderService;

    @PostMapping
    public ResponseEntity<ReminderResponseDto> createReminder(@Valid @RequestBody ReminderRequestDto reminderRequest) {
        try {
            ReminderResponseDto reminder = reminderService.createReminder(reminderRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(reminder);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReminderResponseDto> getReminderById(@PathVariable Long id) {
        try {
            ReminderResponseDto reminder = reminderService.getReminderById(id);
            return ResponseEntity.ok(reminder);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<Page<ReminderResponseDto>> getAllReminders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
            Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<ReminderResponseDto> reminders = reminderService.getAllReminders(pageable);
        return ResponseEntity.ok(reminders);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<ReminderResponseDto>> getRemindersByUserId(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
            Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<ReminderResponseDto> reminders = reminderService.getRemindersByUserId(userId, pageable);
        return ResponseEntity.ok(reminders);
    }

    @GetMapping("/user/{userId}/active")
    public ResponseEntity<Page<ReminderResponseDto>> getActiveRemindersByUserId(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
            Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<ReminderResponseDto> reminders = reminderService.getActiveRemindersByUserId(userId, pageable);
        return ResponseEntity.ok(reminders);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReminderResponseDto> updateReminder(
            @PathVariable Long id,
            @Valid @RequestBody ReminderRequestDto reminderRequest) {
        try {
            ReminderResponseDto reminder = reminderService.updateReminder(id, reminderRequest);
            return ResponseEntity.ok(reminder);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReminder(@PathVariable Long id) {
        try {
            reminderService.deleteReminder(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Reminder deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/deactivate")
    public ResponseEntity<?> deactivateReminder(@PathVariable Long id) {
        try {
            reminderService.deactivateReminder(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Reminder deactivated successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/activate")
    public ResponseEntity<?> activateReminder(@PathVariable Long id) {
        try {
            reminderService.activateReminder(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Reminder activated successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getReminderStatistics() {
        Map<String, Object> statistics = reminderService.getReminderStatistics();
        return ResponseEntity.ok(statistics);
    }

    @PostMapping("/process")
    public ResponseEntity<?> processReminders() {
        reminderService.processScheduledReminders();
        Map<String, String> response = new HashMap<>();
        response.put("message", "Reminders processed successfully");
        return ResponseEntity.ok(response);
    }
}